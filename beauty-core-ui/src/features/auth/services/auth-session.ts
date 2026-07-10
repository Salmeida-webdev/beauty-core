import { isAdminRole, type AdminRole } from "@/constants/roles";
import {
  getAuthenticatedAdminProfile,
  loginAdmin,
  logoutAdmin,
} from "@/features/auth/services/auth-api";
import type {
  AdminSessionIdentity,
  LoginRequest,
} from "@/features/auth/types/auth.types";
import { getPublicApiClient } from "@/services/api/api-client";
import { refreshAccessToken } from "@/services/auth/refresh-coordinator";
import { tokenStorage } from "@/services/auth/token-storage";
import { getAuthState } from "@/stores/auth-store";

let restorePromise: Promise<boolean> | null = null;

function requireAdminRole(role: unknown): AdminRole {
  if (!isAdminRole(role)) {
    throw new Error(
      "O usuário autenticado não possui acesso ao painel administrativo.",
    );
  }

  return role;
}

export async function authenticateAdmin(
  credentials: LoginRequest,
  signal?: AbortSignal,
): Promise<AdminSessionIdentity> {
  const response = await loginAdmin(credentials, signal);
  const role = requireAdminRole(response.usuario.role);

  tokenStorage.setTokens({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
    expiresInSeconds: response.expires_in,
  });

  const identity: AdminSessionIdentity = {
    id: response.usuario.id,
    nome: response.usuario.nome,
    email: response.usuario.email,
    role,
    empresaId: response.usuario.empresaId,
  };

  getAuthState().setAuthenticated(identity);

  return identity;
}

async function executeRestoreAdminSession(): Promise<boolean> {
  const authState = getAuthState();

  authState.beginSessionRestore();

  if (!tokenStorage.getRefreshToken()) {
    tokenStorage.clearTokens();
    authState.setUnauthenticated();

    return false;
  }

  try {
    await refreshAccessToken(getPublicApiClient());

    const profile = await getAuthenticatedAdminProfile();
    const role = requireAdminRole(profile.role);

    authState.setAuthenticated({
      id: profile.id,
      email: profile.email,
      role,
      empresaId: profile.empresaId,
      sessaoId: profile.sessaoId,
    });

    return true;
  } catch {
    tokenStorage.clearTokens();
    authState.setUnauthenticated();

    return false;
  }
}

export function restoreAdminSession(): Promise<boolean> {
  restorePromise ??= executeRestoreAdminSession().finally(() => {
    restorePromise = null;
  });

  return restorePromise;
}

export async function terminateCurrentAdminSession(
  signal?: AbortSignal,
): Promise<void> {
  const refreshToken = tokenStorage.getRefreshToken();
  const accessToken = tokenStorage.getAccessToken();

  try {
    if (refreshToken && accessToken) {
      await logoutAdmin({ refreshToken }, signal);
    }
  } finally {
    tokenStorage.clearTokens();
    getAuthState().setUnauthenticated();
  }
}

export function clearLocalAdminSession(): void {
  tokenStorage.clearTokens();
  getAuthState().setUnauthenticated();
}

