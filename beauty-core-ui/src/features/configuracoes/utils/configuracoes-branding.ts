import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

const BEAUTY_CORE_PRIMARY_FALLBACK = "#18181B";
const HEX_COLOR_PATTERN = /^#[0-9A-Fa-f]{6}$/;

export type ConfiguracoesBrandingOverview = {
  tenantName: string;
  primaryColor: string;
  hasCustomLogo: boolean;
  logoStatus: "custom" | "fallback";
};

function normalizeTenantName(value: string): string {
  const normalized = value.trim();

  return normalized || "Beauty Core";
}

export function normalizeBrandingPrimaryColor(value: string): string {
  const normalized = value.trim();

  return HEX_COLOR_PATTERN.test(normalized)
    ? normalized.toUpperCase()
    : BEAUTY_CORE_PRIMARY_FALLBACK;
}

export function hasTenantCustomLogo(logoUrl: string | null): boolean {
  return Boolean(logoUrl?.trim());
}

export function getConfiguracoesBrandingOverview(
  tenant: TenantPublicConfig,
): ConfiguracoesBrandingOverview {
  const hasCustomLogo = hasTenantCustomLogo(tenant.branding.logoUrl);

  return {
    tenantName: normalizeTenantName(tenant.name),
    primaryColor: normalizeBrandingPrimaryColor(tenant.branding.primaryColor),
    hasCustomLogo,
    logoStatus: hasCustomLogo ? "custom" : "fallback",
  };
}
