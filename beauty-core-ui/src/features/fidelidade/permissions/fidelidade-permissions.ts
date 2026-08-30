const READ_ROLES = new Set([
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
]);

const POINT_OPERATION_ROLES = new Set([
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
]);

const SETTINGS_READ_ROLES = new Set([
  "ADMIN",
  "GERENTE",
]);

const SETTINGS_MANAGE_ROLES = new Set([
  "ADMIN",
]);

const STRUCTURE_MANAGE_ROLES = new Set([
  "ADMIN",
  "GERENTE",
]);

function hasRole(
  roles: ReadonlySet<string>,
  role: string | null | undefined,
): boolean {
  return Boolean(role && roles.has(role));
}

export function canAccessLoyalty(
  role: string | null | undefined,
): boolean {
  return hasRole(READ_ROLES, role);
}

export function canAdjustPoints(
  role: string | null | undefined,
): boolean {
  return hasRole(POINT_OPERATION_ROLES, role);
}

export function canReadLoyaltySettings(
  role: string | null | undefined,
): boolean {
  return hasRole(SETTINGS_READ_ROLES, role);
}

export function canManageLoyaltySettings(
  role: string | null | undefined,
): boolean {
  return hasRole(SETTINGS_MANAGE_ROLES, role);
}

export function canManageLevels(
  role: string | null | undefined,
): boolean {
  return hasRole(STRUCTURE_MANAGE_ROLES, role);
}

export function canManageBenefits(
  role: string | null | undefined,
): boolean {
  return hasRole(STRUCTURE_MANAGE_ROLES, role);
}

export function canManageCoupons(
  role: string | null | undefined,
): boolean {
  return hasRole(STRUCTURE_MANAGE_ROLES, role);
}
