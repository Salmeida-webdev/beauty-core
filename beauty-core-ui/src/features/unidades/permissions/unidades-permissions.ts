import type { AdminRole } from "@/constants/roles";

export const UNIDADES_ACCESS_ROLES = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

function roleIncluded(
  roles: readonly AdminRole[],
  role: AdminRole | null | undefined,
): boolean {
  return role ? roles.includes(role) : false;
}

export function canAccessUnidades(role: AdminRole | null | undefined): boolean {
  return roleIncluded(UNIDADES_ACCESS_ROLES, role);
}

export const canCreateUnidade = canAccessUnidades;
export const canEditUnidade = canAccessUnidades;
export const canDeactivateUnidade = canAccessUnidades;
