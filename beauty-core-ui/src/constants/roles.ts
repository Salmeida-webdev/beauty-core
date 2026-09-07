export const APP_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
  "CLIENTE",
] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const ADMIN_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const;

export type AdminRole = (typeof ADMIN_ROLES)[number];

const appRoleSet = new Set<string>(APP_ROLES);
const adminRoleSet = new Set<string>(ADMIN_ROLES);

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === "string" && appRoleSet.has(value);
}

export function isAdminRole(value: unknown): value is AdminRole {
  return typeof value === "string" && adminRoleSet.has(value);
}
