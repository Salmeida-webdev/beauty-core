import { getApiClient, getPublicApiClient } from "@/services/api/api-client";

import type {
  AdminSession,
  AuthenticatedProfile,
  LoginRequest,
  LoginResponse,
  LogoutAllResponse,
  LogoutRequest,
  MessageResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from "@/features/auth/types/auth.types";

const AUTH_ROUTES = {
  login: "/auth/login",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
  logoutAll: "/auth/logout-all",
  me: "/auth/me",
  sessions: "/auth/sessoes",
} as const;

export async function loginAdmin(
  payload: LoginRequest,
  signal?: AbortSignal,
): Promise<LoginResponse> {
  const response = await getPublicApiClient().post<LoginResponse>(
    AUTH_ROUTES.login,
    payload,
    { signal },
  );

  return response.data;
}

export async function refreshAdminSession(
  payload: RefreshTokenRequest,
  signal?: AbortSignal,
): Promise<RefreshTokenResponse> {
  const response = await getPublicApiClient().post<RefreshTokenResponse>(
    AUTH_ROUTES.refresh,
    payload,
    { signal },
  );

  return response.data;
}

export async function logoutAdmin(
  payload: LogoutRequest,
  signal?: AbortSignal,
): Promise<MessageResponse> {
  const response = await getApiClient().post<MessageResponse>(
    AUTH_ROUTES.logout,
    payload,
    { signal },
  );

  return response.data;
}

export async function logoutAllAdminSessions(
  signal?: AbortSignal,
): Promise<LogoutAllResponse> {
  const response = await getApiClient().post<LogoutAllResponse>(
    AUTH_ROUTES.logoutAll,
    undefined,
    { signal },
  );

  return response.data;
}

export async function getAuthenticatedAdminProfile(
  signal?: AbortSignal,
): Promise<AuthenticatedProfile> {
  const response = await getApiClient().get<AuthenticatedProfile>(
    AUTH_ROUTES.me,
    { signal },
  );

  return response.data;
}

export async function listAdminSessions(
  signal?: AbortSignal,
): Promise<AdminSession[]> {
  const response = await getApiClient().get<AdminSession[]>(
    AUTH_ROUTES.sessions,
    { signal },
  );

  return response.data;
}

export async function revokeAdminSession(
  sessionId: string,
  signal?: AbortSignal,
): Promise<MessageResponse> {
  const encodedSessionId = encodeURIComponent(sessionId);

  const response = await getApiClient().delete<MessageResponse>(
    `${AUTH_ROUTES.sessions}/${encodedSessionId}`,
    { signal },
  );

  return response.data;
}
