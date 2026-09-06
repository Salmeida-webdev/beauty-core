import {
  normalizePortalAuthError,
  type PortalAuthError,
} from "../auth/portal-auth-errors";

export type PortalResourceError = PortalAuthError;

export function normalizePortalResourceError(
  error: unknown,
): PortalResourceError {
  return normalizePortalAuthError(error);
}

export function getPortalResourceErrorStatus(
  error: unknown,
): number | null {
  return normalizePortalResourceError(error).status;
}

export function isPortalResourceAccessError(
  error: unknown,
): boolean {
  const status = getPortalResourceErrorStatus(error);

  return status === 401 || status === 403;
}
