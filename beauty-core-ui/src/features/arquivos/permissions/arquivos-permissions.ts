import type { AdminRole } from "@/constants/roles";

export const ARQUIVOS_ACCESS_ROLES = [
  "ADMIN",
  "GERENTE",
] as const satisfies readonly AdminRole[];

export const ARQUIVOS_GALLERY_READ_ROLES = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AdminRole[];

export const arquivosAccessRoles = ARQUIVOS_ACCESS_ROLES;

function roleIncluded(
  roles: readonly AdminRole[],
  role: AdminRole | null | undefined,
): boolean {
  return role ? roles.includes(role) : false;
}

export function canAccessArquivos(role: AdminRole | null | undefined): boolean {
  return roleIncluded(ARQUIVOS_ACCESS_ROLES, role);
}

export const canAccessFiles = canAccessArquivos;
export const canListArquivos = canAccessArquivos;

export const canUploadArquivo = canAccessArquivos;

export const canUploadFile = canAccessArquivos;

export const canDownloadArquivo = canAccessArquivos;

export const canDownloadFile = canAccessArquivos;

export const canDeleteArquivo = canAccessArquivos;

export const canDeleteFile = canAccessArquivos;

export function canAccessGallery(role: AdminRole | null | undefined): boolean {
  return roleIncluded(ARQUIVOS_GALLERY_READ_ROLES, role);
}

export const canUploadGallery = canAccessArquivos;
