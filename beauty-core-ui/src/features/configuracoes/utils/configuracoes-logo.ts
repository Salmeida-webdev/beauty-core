import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

function isSafeTenantLogoUrl(value: string): boolean {
  const normalized = value.trim();

  return (
    normalized.startsWith("/uploads/public/") &&
    !normalized.startsWith("//") &&
    !normalized.includes("..") &&
    !normalized.includes("\\")
  );
}

export function getUploadedTenantLogoUrl(arquivo: Arquivo): string | null {
  if (arquivo.tipo !== "LOGO_EMPRESA") {
    return null;
  }

  if (typeof arquivo.url !== "string") {
    return null;
  }

  const normalized = arquivo.url.trim();

  return isSafeTenantLogoUrl(normalized) ? normalized : null;
}

export function withUploadedTenantLogo(
  tenant: TenantPublicConfig,
  arquivo: Arquivo,
): TenantPublicConfig | null {
  const logoUrl = getUploadedTenantLogoUrl(arquivo);

  if (!logoUrl) {
    return null;
  }

  return {
    ...tenant,
    branding: {
      ...tenant.branding,
      logoUrl,
    },
  };
}
