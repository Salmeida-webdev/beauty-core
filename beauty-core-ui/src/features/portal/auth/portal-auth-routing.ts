import {
  sanitizePortalReturnTo,
} from "@/features/portal/security/portal-safe-return-to";

export const PORTAL_FIRST_ACCESS_PATH =
  "/portal/primeiro-acesso";

export function sanitizePortalFirstAccessReturnTo(
  value: unknown,
): string {
  const safeReturnTo = sanitizePortalReturnTo(value);

  return safeReturnTo === PORTAL_FIRST_ACCESS_PATH
    ? "/portal"
    : safeReturnTo;
}

export function getPortalFirstAccessHref(
  returnTo: unknown,
): string {
  const safeReturnTo =
    sanitizePortalFirstAccessReturnTo(returnTo);

  return `${PORTAL_FIRST_ACCESS_PATH}?returnTo=${encodeURIComponent(
    safeReturnTo,
  )}`;
}

type ResolvePortalAuthRouteInput = {
  currentPath: string;
  primeiroAcesso: boolean;
  returnTo: unknown;
};

export function resolvePortalAuthRoute({
  currentPath,
  primeiroAcesso,
  returnTo,
}: ResolvePortalAuthRouteInput): string | null {
  if (primeiroAcesso) {
    if (currentPath === PORTAL_FIRST_ACCESS_PATH) {
      return null;
    }

    return getPortalFirstAccessHref(returnTo);
  }

  if (currentPath === PORTAL_FIRST_ACCESS_PATH) {
    return sanitizePortalFirstAccessReturnTo(returnTo);
  }

  return null;
}
