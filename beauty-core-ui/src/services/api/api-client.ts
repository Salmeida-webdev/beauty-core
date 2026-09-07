import axios, {
  AxiosHeaders,
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

import { getPublicEnv } from "@/config/env";
import { dispatchAdminForbiddenEvent } from "@/services/auth/access-events";
import { refreshAccessToken } from "@/services/auth/refresh-coordinator";
import { tokenStorage } from "@/services/auth/token-storage";

const API_TIMEOUT_MS = 15_000;

type CreateApiClientOptions = {
  authenticated?: boolean;
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let publicApiClient: AxiosInstance | undefined;
let authenticatedApiClient: AxiosInstance | undefined;

function createRequestId(): string {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function prepareRequestHeaders(
  config: InternalAxiosRequestConfig,
  authenticated: boolean,
): InternalAxiosRequestConfig {
  const headers = AxiosHeaders.from(config.headers);

  if (!headers.has("x-request-id")) {
    headers.set("x-request-id", createRequestId());
  }

  if (!headers.has("x-correlation-id")) {
    const requestId = headers.get("x-request-id");

    headers.set(
      "x-correlation-id",
      typeof requestId === "string"
        ? requestId
        : createRequestId(),
    );
  }

  if (authenticated) {
    const accessToken = tokenStorage.getAccessToken();

    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    } else {
      headers.delete("Authorization");
    }
  }

  config.headers = headers;

  return config;
}

function installAuthenticationRefresh(
  client: AxiosInstance,
): void {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest =
        error.config as RetryableRequestConfig | undefined;

      const requestUrl =
        originalRequest?.url ?? "";

      const forbiddenRedirectExcludedRoutes =
        new Set([
          "/auth/login",
          "/auth/refresh",
          "/auth/logout",
          "/auth/logout-all",
        ]);

      if (
        error.response?.status === 403 &&
        !forbiddenRedirectExcludedRoutes.has(
          requestUrl,
        )
      ) {
        dispatchAdminForbiddenEvent();

        return Promise.reject(error);
      }
      if (
        error.response?.status !== 401 ||
        !originalRequest ||
        originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await refreshAccessToken(getPublicApiClient());

        return client.request(originalRequest);
      } catch (refreshError: unknown) {
        return Promise.reject(refreshError);
      }
    },
  );
}

function installDevelopmentLogging(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => {
      if (process.env.NODE_ENV === "development") {
        console.debug("[Beauty Core API]", {
          method: response.config.method?.toUpperCase() ?? null,
          url: response.config.url ?? null,
          status: response.status,
          requestId: response.headers["x-request-id"] ?? null,
          correlationId:
            response.headers["x-correlation-id"] ?? null,
        });
      }

      return response;
    },
    (error: unknown) => {
      if (
        process.env.NODE_ENV === "development" &&
        axios.isAxiosError(error)
      ) {
        console.debug("[Beauty Core API] Falha HTTP", {
          method: error.config?.method?.toUpperCase() ?? null,
          url: error.config?.url ?? null,
          status: error.response?.status ?? null,
          requestId:
            error.response?.headers["x-request-id"] ?? null,
          correlationId:
            error.response?.headers["x-correlation-id"] ?? null,
        });
      }

      return Promise.reject(error);
    },
  );
}

export function createApiClient({
  authenticated = false,
}: CreateApiClientOptions = {}): AxiosInstance {
  const env = getPublicEnv();

  const client = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    timeout: API_TIMEOUT_MS,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  client.interceptors.request.use((config) =>
    prepareRequestHeaders(config, authenticated),
  );

  if (authenticated) {
    installAuthenticationRefresh(client);
  }

  installDevelopmentLogging(client);

  return client;
}

export function getPublicApiClient(): AxiosInstance {
  publicApiClient ??= createApiClient();

  return publicApiClient;
}

export function getApiClient(): AxiosInstance {
  authenticatedApiClient ??= createApiClient({
    authenticated: true,
  });

  return authenticatedApiClient;
}
