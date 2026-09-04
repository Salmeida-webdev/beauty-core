const PORTAL_ORIGIN = "https://portal.invalid";
const DEFAULT_PORTAL_RETURN_TO = "/portal";
const CONTROL_CHARACTERS = /[\u0000-\u001f\u007f]/;

function resolveSafePortalPath(
  value: unknown,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const candidate = value.trim();

  if (
    candidate.length === 0 ||
    candidate.length > 512 ||
    CONTROL_CHARACTERS.test(candidate) ||
    /\s/.test(candidate) ||
    candidate.includes("\\") ||
    candidate.includes("%") ||
    candidate.includes("?") ||
    candidate.includes("#") ||
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(candidate)
  ) {
    return null;
  }

  let parsed: URL;

  try {
    parsed = new URL(candidate, PORTAL_ORIGIN);
  } catch {
    return null;
  }

  if (
    parsed.origin !== PORTAL_ORIGIN ||
    parsed.username ||
    parsed.password ||
    parsed.port ||
    parsed.search ||
    parsed.hash
  ) {
    return null;
  }

  if (
    parsed.pathname !== "/portal" &&
    !parsed.pathname.startsWith("/portal/")
  ) {
    return null;
  }

  return parsed.pathname;
}

export function isSafePortalReturnTo(value: unknown): boolean {
  return resolveSafePortalPath(value) !== null;
}

export function sanitizePortalReturnTo(
  value: unknown,
  fallback = DEFAULT_PORTAL_RETURN_TO,
): string {
  return (
    resolveSafePortalPath(value) ??
    resolveSafePortalPath(fallback) ??
    DEFAULT_PORTAL_RETURN_TO
  );
}
