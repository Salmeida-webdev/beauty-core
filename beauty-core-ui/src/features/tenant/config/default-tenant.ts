import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

/**
 * Configuração neutra da fundação.
 * A identidade visual definitiva será definida no Chat 45.
 */
export const DEFAULT_TENANT = {
  id: null,
  name: "Beauty Core",
  slug: "beauty-core",
  domain: null,
  locale: "pt-BR",
  branding: {
    logoUrl: null,
    faviconUrl: null,
    primaryColor: "#18181B",
    secondaryColor: "#E4E4E7",
    accentColor: "#A1A1AA",
  },
  settings: {
    allowDarkMode: true,
    showPoweredByBeautyCore: true,
  },
} satisfies TenantPublicConfig;
