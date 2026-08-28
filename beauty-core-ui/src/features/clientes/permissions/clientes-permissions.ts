import type { AdminRole } from "@/constants/roles";

export const CLIENTES_ACCESS_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

export const CLIENTES_MANAGEMENT_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

export const CLIENTES_PHOTO_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
] as const satisfies readonly AdminRole[];

export const CLIENTES_LGPD_ROLES = [
  "ADMIN",
] as const satisfies readonly AdminRole[];

function roleIncluded(
  roles: readonly AdminRole[],
  role: AdminRole | null | undefined,
): boolean {
  return role ? roles.includes(role) : false;
}

export function canAccessClientes(
  role: AdminRole | null | undefined,
): boolean {
  return roleIncluded(
    CLIENTES_ACCESS_ROLES,
    role,
  );
}

export function canManageClientes(
  role: AdminRole | null | undefined,
): boolean {
  return roleIncluded(
    CLIENTES_MANAGEMENT_ROLES,
    role,
  );
}

export function canUploadClientePhoto(
  role: AdminRole | null | undefined,
): boolean {
  return roleIncluded(
    CLIENTES_PHOTO_ROLES,
    role,
  );
}

export function canUseClienteLgpd(
  role: AdminRole | null | undefined,
): boolean {
  return roleIncluded(
    CLIENTES_LGPD_ROLES,
    role,
  );
}
