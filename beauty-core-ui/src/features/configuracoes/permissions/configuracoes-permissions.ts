import type { AdminRole } from "@/constants/roles";

export const CONFIGURACOES_ACCESS_ROLES = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

export const configuracoesAccessRoles = CONFIGURACOES_ACCESS_ROLES;

function roleIncluded(
  roles: readonly AdminRole[],
  role: AdminRole | null | undefined,
): boolean {
  return role ? roles.includes(role) : false;
}

export function canAccessConfiguracoes(
  role: AdminRole | null | undefined,
): boolean {
  return roleIncluded(CONFIGURACOES_ACCESS_ROLES, role);
}

export const canAccessSettings = canAccessConfiguracoes;

export function canAccessBranding(role: AdminRole | null | undefined): boolean {
  return canAccessConfiguracoes(role);
}

export function canUploadBrandingLogo(
  role: AdminRole | null | undefined,
): boolean {
  return canAccessConfiguracoes(role);
}

export const canUploadLogoEmpresa = canUploadBrandingLogo;

export function canManageBranding(role: AdminRole | null | undefined): boolean {
  return canAccessConfiguracoes(role);
}

export function canManageWhiteLabel(
  role: AdminRole | null | undefined,
): boolean {
  return canManageBranding(role);
}

export function canManageCompanySettings(
  role: AdminRole | null | undefined,
): boolean {
  void role;

  return false;
}

export function canManagePrimaryColor(
  role: AdminRole | null | undefined,
): boolean {
  void role;

  return false;
}
