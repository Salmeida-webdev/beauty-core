import { normalizeBrandingPrimaryColor } from "@/features/configuracoes/utils/configuracoes-branding";
import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

export type TenantRuntimeBranding = {
  slug: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
};

export function getTenantRuntimeBranding(
  tenant: TenantPublicConfig,
): TenantRuntimeBranding {
  return {
    slug: tenant.slug,
    primaryColor: normalizeBrandingPrimaryColor(tenant.branding.primaryColor),
    secondaryColor: DEFAULT_TENANT.branding.secondaryColor,
    accentColor: DEFAULT_TENANT.branding.accentColor,
  };
}
