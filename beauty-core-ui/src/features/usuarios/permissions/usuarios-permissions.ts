import type { AdminRole } from "@/constants/roles";
import {
  canChangeAdminUserRole,
  canManageAdminUser,
  getCreatableAdminRoles,
} from "@/features/auth/permissions/admin-permissions";

export const USUARIOS_ACCESS_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

function hasRole(role: AdminRole | null | undefined): role is AdminRole {
  return role
    ? (USUARIOS_ACCESS_ROLES as readonly AdminRole[]).includes(role)
    : false;
}

export function canAccessUsuarios(role: AdminRole | null | undefined): boolean {
  return hasRole(role);
}

export function canCreateUsuario(role: AdminRole | null | undefined): boolean {
  return hasRole(role) && getCreatableAdminRoles(role).length > 0;
}

type UsuarioTargetInput = {
  actorId: string;
  actorRole: AdminRole | null | undefined;
  targetId: string;
  targetRole: AdminRole;
};

export function canEditUsuario({
  actorId,
  actorRole,
  targetId,
  targetRole,
}: UsuarioTargetInput): boolean {
  if (!hasRole(actorRole)) {
    return false;
  }

  return actorId === targetId || canManageAdminUser(actorRole, targetRole);
}

export function canDeactivateUsuario({
  actorId,
  actorRole,
  targetId,
  targetRole,
}: UsuarioTargetInput): boolean {
  return (
    hasRole(actorRole) &&
    actorId !== targetId &&
    canManageAdminUser(actorRole, targetRole)
  );
}

type ChangeUsuarioRoleInput = UsuarioTargetInput & {
  newTargetRole: AdminRole;
};

export function canChangeUsuarioRole({
  actorId,
  actorRole,
  targetId,
  targetRole,
  newTargetRole,
}: ChangeUsuarioRoleInput): boolean {
  if (!hasRole(actorRole)) {
    return false;
  }

  return canChangeAdminUserRole({
    actorRole,
    currentTargetRole: targetRole,
    newTargetRole,
    isSameUser: actorId === targetId,
  });
}
