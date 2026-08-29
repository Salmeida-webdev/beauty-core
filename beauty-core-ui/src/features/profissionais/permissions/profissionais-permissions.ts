import type { AdminRole } from "@/constants/roles";

export const PROFISSIONAIS_ACCESS_ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

function roleIncluded(role: AdminRole | null | undefined): boolean {
  return role
    ? (PROFISSIONAIS_ACCESS_ROLES as readonly AdminRole[]).includes(role)
    : false;
}

export function canAccessProfissionais(
  role: AdminRole | null | undefined,
): boolean {
  return roleIncluded(role);
}

export const canCreateProfissional = canAccessProfissionais;
export const canEditProfissional = canAccessProfissionais;
export const canDeactivateProfissional = canAccessProfissionais;
