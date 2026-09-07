import { isAdminRole, type AdminRole } from "@/constants/roles";
import {
  getAuthenticatedAdminProfile,
  loginAdmin,
  logoutAdmin,
  logoutAllAdminSessions,
} from "@/features/auth/services/auth-api";
import type {
  AdminSessionIdentity,
  LoginRequest,
  LogoutAllResponse,
} from "@/features/auth/types/auth.types";
import { getPublicApiClient } from "@/services/api/api-client";
import { refreshAccessToken } from "@/services/auth/refresh-coordinator";
import { tokenStorage } from "@/services/auth/token-storage";
import { getAuthState } from "@/stores/auth-store";

let restorePromise:
  Promise<boolean> | null = null;

function requireAdminRole(
  role: unknown,
): AdminRole {
  if (!isAdminRole(role)) {
    throw new Error(
      "O usuário autenticado não possui acesso ao painel administrativo.",
    );
  }

  return role;
}

function clearAdminAuthenticationState():
  void {
  tokenStorage.clearTokens();

  getAuthState()
    .setUnauthenticated();
}

export async function authenticateAdmin(
  credentials: LoginRequest,
  signal?: AbortSignal,
): Promise<AdminSessionIdentity> {
  const response =
    await loginAdmin(
      credentials,
      signal,
    );

  requireAdminRole(
    response.usuario.role,
  );

  tokenStorage.setTokens({
    accessToken:
      response.access_token,
    refreshToken:
      response.refresh_token,
    expiresInSeconds:
      response.expires_in,
  });

  try {
    const profile =
      await getAuthenticatedAdminProfile(
        signal,
      );

    const role =
      requireAdminRole(
        profile.role,
      );

    const identity:
      AdminSessionIdentity = {
        id: profile.id,
        nome: response.usuario.nome,
        email: profile.email,
        role,
        empresaId:
          profile.empresaId,
        sessaoId:
          profile.sessaoId,
      };

    getAuthState()
      .setAuthenticated(identity);

    return identity;
  } catch (error: unknown) {
    clearAdminAuthenticationState();

    throw error;
  }
}

async function executeRestoreAdminSession():
  Promise<boolean> {
  const authState = getAuthState();

  authState.beginSessionRestore();

  if (
    !tokenStorage.getRefreshToken()
  ) {
    clearAdminAuthenticationState();

    return false;
  }

  try {
    await refreshAccessToken(
      getPublicApiClient(),
    );

    const profile =
      await getAuthenticatedAdminProfile();

    const role =
      requireAdminRole(
        profile.role,
      );

    authState.setAuthenticated({
      id: profile.id,
      email: profile.email,
      role,
      empresaId:
        profile.empresaId,
      sessaoId:
        profile.sessaoId,
    });

    return true;
  } catch {
    clearAdminAuthenticationState();

    return false;
  }
}

export function restoreAdminSession():
  Promise<boolean> {
  restorePromise ??=
    executeRestoreAdminSession()
      .finally(() => {
        restorePromise = null;
      });

  return restorePromise;
}

export async function terminateCurrentAdminSession(
  signal?: AbortSignal,
): Promise<void> {
  const refreshToken =
    tokenStorage.getRefreshToken();

  const accessToken =
    tokenStorage.getAccessToken();

  try {
    if (
      refreshToken &&
      accessToken
    ) {
      await logoutAdmin(
        { refreshToken },
        signal,
      );
    }
  } finally {
    clearAdminAuthenticationState();
  }
}

export async function terminateAllAdminSessions(
  signal?: AbortSignal,
): Promise<LogoutAllResponse> {
  try {
    return await logoutAllAdminSessions(
      signal,
    );
  } finally {
    clearAdminAuthenticationState();
  }
}

export function clearLocalAdminSession():
  void {
  clearAdminAuthenticationState();
}
