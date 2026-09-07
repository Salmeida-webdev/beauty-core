import type { AdminRole } from "@/constants/roles";

export const SERVICOS_ACCESS_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

export const SERVICOS_MANAGEMENT_ROLES = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

function roleIncluded(
  roles: readonly AdminRole[],
  role: AdminRole | null | undefined,
): boolean {
  return role ? roles.includes(role) : false;
}

export function canAccessServicos(role: AdminRole | null | undefined): boolean {
  return roleIncluded(SERVICOS_ACCESS_ROLES, role);
}

export function canCreateServico(role: AdminRole | null | undefined): boolean {
  return roleIncluded(SERVICOS_MANAGEMENT_ROLES, role);
}

export const canEditServico = canCreateServico;
export const canDeactivateServico = canCreateServico;
