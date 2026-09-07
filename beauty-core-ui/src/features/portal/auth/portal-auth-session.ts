import { isAxiosError } from "axios";

import { tokenStorage } from "@/services/auth/token-storage";

import type { PortalClientIdentity } from "./portal-auth";
import {
  portalAuthApi,
} from "./portal-auth-api";
import type {
  PortalLogoutResponse,
  PortalMeResponse,
  PortalRefreshTokenResponse,
  PortalVerifyOtpResponse,
} from "./portal-auth-contracts";

type PortalJwtClaims = Readonly<{
  sub?: unknown;
  clienteId?: unknown;
  empresaId?: unknown;
  sid?: unknown;
  iat?: unknown;
  exp?: unknown;
}>;

type PortalStoredTokens = Readonly<{
  accessToken: string;
  refreshToken: string;
}>;

function decodeBase64Url(value: string): string {
  const normalized = value
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );

  return globalThis.atob(padded);
}

function decodeAccessToken(accessToken: string): PortalJwtClaims {
  const parts = accessToken.split(".");

  if (parts.length !== 3) {
    throw new Error("Token Cliente inválido.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(
      decodeBase64Url(parts[1]),
    );
  } catch {
    throw new Error("Payload do Token Cliente inválido.");
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Payload do Token Cliente inválido.");
  }

  return parsed as PortalJwtClaims;
}

function getRequiredString(
  value: unknown,
  field: string,
): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Claim obrigatória ausente: ${field}.`);
  }

  return value;
}

function getTokenLifetimeInSeconds(
  claims: PortalJwtClaims,
): number {
  if (
    typeof claims.iat !== "number" ||
    typeof claims.exp !== "number"
  ) {
    throw new Error(
      "O Token Cliente não possui expiração verificável.",
    );
  }

  const lifetime = claims.exp - claims.iat;

  if (!Number.isInteger(lifetime) || lifetime <= 0) {
    throw new Error(
      "A expiração do Token Cliente é inválida.",
    );
  }

  return lifetime;
}

function identityFromToken(
  accessToken: string,
  clienteId: string,
  empresaId: string,
): PortalClientIdentity {
  const claims = decodeAccessToken(accessToken);

  const tokenClienteId = getRequiredString(
    claims.clienteId ?? claims.sub,
    "clienteId",
  );

  const tokenEmpresaId = getRequiredString(
    claims.empresaId,
    "empresaId",
  );

  const sid = getRequiredString(
    claims.sid,
    "sid",
  );

  if (tokenClienteId !== clienteId) {
    throw new Error(
      "O cliente da sessão não corresponde ao Token Cliente.",
    );
  }

  if (tokenEmpresaId !== empresaId) {
    throw new Error(
      "A empresa da sessão não corresponde ao Token Cliente.",
    );
  }

  return {
    clienteId,
    empresaId,
    sid,
  };
}

function persistTokenPair(
  tokens: PortalStoredTokens,
): void {
  const claims = decodeAccessToken(tokens.accessToken);
  const expiresInSeconds = getTokenLifetimeInSeconds(claims);

  tokenStorage.setTokens({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresInSeconds,
  });
}

function persistApiTokens(
  response: PortalRefreshTokenResponse,
): string {
  persistTokenPair({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
  });

  return response.access_token;
}

async function refreshPortalAccess(
  refreshToken: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const response = await portalAuthApi.refresh({
    refreshToken,
  });

  const accessToken = persistApiTokens(response);

  return {
    accessToken,
    refreshToken: response.refresh_token,
  };
}

function isAccessRejected(error: unknown): boolean {
  return (
    isAxiosError(error) &&
    (error.response?.status === 401 ||
      error.response?.status === 403)
  );
}

function isUnauthorized(error: unknown): boolean {
  return (
    isAxiosError(error) &&
    error.response?.status === 401
  );
}

export function hasPortalSession(): boolean {
  return Boolean(
    tokenStorage.getAccessToken() ||
    tokenStorage.getRefreshToken(),
  );
}

export function startPortalSession(
  response: PortalVerifyOtpResponse,
): PortalClientIdentity {
  const identity = identityFromToken(
    response.access_token,
    response.cliente.id,
    response.cliente.empresaId,
  );

  persistTokenPair({
    accessToken: response.access_token,
    refreshToken: response.refresh_token,
  });

  return identity;
}

export async function restorePortalSession(): Promise<
  PortalClientIdentity | null
> {
  let accessToken = tokenStorage.getAccessToken();
  let refreshToken = tokenStorage.getRefreshToken();
  let refreshed = false;

  if (!accessToken && !refreshToken) {
    return null;
  }

  try {
    if (!accessToken && refreshToken) {
      const refreshedTokens = await refreshPortalAccess(
        refreshToken,
      );

      accessToken = refreshedTokens.accessToken;
      refreshToken = refreshedTokens.refreshToken;
      refreshed = true;
    }

    if (!accessToken) {
      return null;
    }

    let profile: PortalMeResponse;

    try {
      profile = await portalAuthApi.me();
    } catch (error) {
      if (
        !isUnauthorized(error) ||
        !refreshToken ||
        refreshed
      ) {
        throw error;
      }

      const refreshedTokens = await refreshPortalAccess(
        refreshToken,
      );

      accessToken = refreshedTokens.accessToken;
      refreshToken = refreshedTokens.refreshToken;
      profile = await portalAuthApi.me();
    }

    return identityFromToken(
      accessToken,
      profile.id,
      profile.empresaId,
    );
  } catch (error) {
    if (isAccessRejected(error)) {
      clearPortalSession();
    }

    throw error;
  }
}

export function clearPortalSession(): void {
  tokenStorage.clearTokens();
}

export async function logoutPortalSession(): Promise<
  PortalLogoutResponse | null
> {
  const refreshToken = tokenStorage.getRefreshToken();

  try {
    if (!refreshToken) {
      return null;
    }

    return await portalAuthApi.logout({
      refreshToken,
    });
  } finally {
    clearPortalSession();
  }
}

export async function logoutAllPortalSessions(): Promise<
  PortalLogoutResponse
> {
  try {
    return await portalAuthApi.logoutAll();
  } finally {
    clearPortalSession();
  }
}