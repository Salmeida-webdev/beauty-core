import type { AxiosInstance } from "axios";

import type { RefreshTokenResponse } from "@/features/auth/types/auth.types";
import { tokenStorage } from "@/services/auth/token-storage";

export const SESSION_EXPIRED_EVENT =
  "beauty-core:admin-session-expired";

const AUTH_REFRESH_ROUTE = "/auth/refresh";

let refreshPromise: Promise<string> | null = null;

function dispatchSessionExpiredEvent(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(SESSION_EXPIRED_EVENT));
}

async function executeRefresh(
  publicClient: AxiosInstance,
): Promise<string> {
  const refreshToken = tokenStorage.getRefreshToken();

  if (!refreshToken) {
    tokenStorage.clearTokens();
    dispatchSessionExpiredEvent();

    throw new Error("Refresh token administrativo ausente.");
  }

  try {
    const response = await publicClient.post<RefreshTokenResponse>(
      AUTH_REFRESH_ROUTE,
      { refreshToken },
    );

    tokenStorage.setTokens({
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresInSeconds: response.data.expires_in,
    });

    return response.data.access_token;
  } catch (error: unknown) {
    tokenStorage.clearTokens();
    dispatchSessionExpiredEvent();

    throw error;
  }
}

export function refreshAccessToken(
  publicClient: AxiosInstance,
): Promise<string> {
  refreshPromise ??= executeRefresh(publicClient).finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}
