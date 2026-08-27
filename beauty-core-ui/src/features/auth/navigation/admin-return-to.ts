export type AdminLoginReason =
  | "session-expired";

const DEFAULT_ADMIN_RETURN_TO =
  "/dashboard";

const INTERNAL_BASE_URL =
  "https://beauty-core.internal";

const INVALID_CONTROL_CHARACTERS =
  /[\u0000-\u001F\u007F]/;

function isForbiddenAdminDestination(
  pathname: string,
): boolean {
  return (
    pathname === "/login" ||
    pathname.startsWith("/login/") ||
    pathname === "/acesso-negado"
  );
}

export function normalizeAdminLoginReason(
  value: string | null | undefined,
): AdminLoginReason | null {
  if (value === "session-expired") {
    return value;
  }

  return null;
}

export function normalizeAdminReturnTo(
  value: string | null | undefined,
): string {
  if (typeof value !== "string") {
    return DEFAULT_ADMIN_RETURN_TO;
  }

  const candidate = value.trim();

  if (
    !candidate.startsWith("/") ||
    candidate.startsWith("//") ||
    candidate.includes("\\") ||
    INVALID_CONTROL_CHARACTERS.test(candidate)
  ) {
    return DEFAULT_ADMIN_RETURN_TO;
  }

  try {
    const parsed = new URL(
      candidate,
      INTERNAL_BASE_URL,
    );

    if (
      parsed.origin !== INTERNAL_BASE_URL
    ) {
      return DEFAULT_ADMIN_RETURN_TO;
    }

    if (
      isForbiddenAdminDestination(
        parsed.pathname,
      )
    ) {
      return DEFAULT_ADMIN_RETURN_TO;
    }

    return (
      parsed.pathname +
      parsed.search +
      parsed.hash
    );
  } catch {
    return DEFAULT_ADMIN_RETURN_TO;
  }
}

export function buildAdminLoginHref(
  returnTo: string,
  reason?: AdminLoginReason | null,
): string {
  const params = new URLSearchParams();

  params.set(
    "returnTo",
    normalizeAdminReturnTo(returnTo),
  );

  const safeReason =
    normalizeAdminLoginReason(reason);

  if (safeReason) {
    params.set("reason", safeReason);
  }

  return `/login?${params.toString()}`;
}

export function getAdminReturnToFromSearch(
  search: string,
): string {
  const searchParams =
    new URLSearchParams(search);

  return normalizeAdminReturnTo(
    searchParams.get("returnTo"),
  );
}
