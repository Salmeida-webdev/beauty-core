import type { PacotesRole } from "../types/pacotes.types";

type RoleInput = string | null | undefined;

const managementRoles = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly PacotesRole[];

const assignmentRoles = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
] as const satisfies readonly PacotesRole[];

const clientPackagesAccessRoles = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly PacotesRole[];

function includesRole(
  role: RoleInput,
  roles: readonly PacotesRole[],
): role is PacotesRole {
  return typeof role === "string" && roles.includes(role as PacotesRole);
}

export function canAccessPackages(role: RoleInput): boolean {
  return includesRole(role, managementRoles);
}

export function canManagePackages(role: RoleInput): boolean {
  return includesRole(role, managementRoles);
}

export function canAccessClientPackages(role: RoleInput): boolean {
  return includesRole(role, clientPackagesAccessRoles);
}

export function canAssignPackage(role: RoleInput): boolean {
  return includesRole(role, assignmentRoles);
}

export function canConsumePackageSession(role: RoleInput): boolean {
  return includesRole(role, clientPackagesAccessRoles);
}

export function canCancelClientPackage(role: RoleInput): boolean {
  return includesRole(role, managementRoles);
}
