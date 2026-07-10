import type { AdminRole } from "@/constants/roles";

/**
 * Regras utilizadas apenas para apresentação e experiência da interface.
 * O backend permanece como autoridade definitiva de autorização.
 */

const CREATABLE_ROLES: Record<AdminRole, readonly AdminRole[]> = {
  SUPER_ADMIN: [
    "SUPER_ADMIN",
    "ADMIN",
    "GERENTE",
    "RECEPCAO",
    "PROFISSIONAL",
  ],
  ADMIN: ["GERENTE", "RECEPCAO", "PROFISSIONAL"],
  GERENTE: ["RECEPCAO", "PROFISSIONAL"],
  RECEPCAO: [],
  PROFISSIONAL: [],
};

const MANAGEABLE_ROLES: Record<AdminRole, readonly AdminRole[]> = {
  SUPER_ADMIN: [
    "SUPER_ADMIN",
    "ADMIN",
    "GERENTE",
    "RECEPCAO",
    "PROFISSIONAL",
  ],
  ADMIN: ["GERENTE", "RECEPCAO", "PROFISSIONAL"],
  GERENTE: ["RECEPCAO", "PROFISSIONAL"],
  RECEPCAO: [],
  PROFISSIONAL: [],
};

export function isGlobalAdministrator(role: AdminRole): boolean {
  return role === "SUPER_ADMIN";
}

export function requiresCompany(role: AdminRole): boolean {
  return role !== "SUPER_ADMIN";
}

export function canAccessCompaniesModule(
  role: AdminRole,
): boolean {
  return role === "SUPER_ADMIN";
}

export function getCreatableAdminRoles(
  actorRole: AdminRole,
): readonly AdminRole[] {
  return CREATABLE_ROLES[actorRole];
}

export function getManageableAdminRoles(
  actorRole: AdminRole,
): readonly AdminRole[] {
  return MANAGEABLE_ROLES[actorRole];
}

export function canCreateAdminUser(
  actorRole: AdminRole,
  targetRole: AdminRole,
): boolean {
  return CREATABLE_ROLES[actorRole].includes(targetRole);
}

export function canManageAdminUser(
  actorRole: AdminRole,
  targetRole: AdminRole,
): boolean {
  return MANAGEABLE_ROLES[actorRole].includes(targetRole);
}

type CanChangeAdminUserRoleInput = {
  actorRole: AdminRole;
  currentTargetRole: AdminRole;
  newTargetRole: AdminRole;
  isSameUser: boolean;
};

export function canChangeAdminUserRole({
  actorRole,
  currentTargetRole,
  newTargetRole,
  isSameUser,
}: CanChangeAdminUserRoleInput): boolean {
  if (isSameUser && currentTargetRole !== newTargetRole) {
    return false;
  }

  return (
    canManageAdminUser(actorRole, currentTargetRole) &&
    canCreateAdminUser(actorRole, newTargetRole)
  );
}
