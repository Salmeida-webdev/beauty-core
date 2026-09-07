import { describe, expect, it } from "vitest";

import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import {
  getConfiguracoesBrandingOverview,
  hasTenantCustomLogo,
  normalizeBrandingPrimaryColor,
} from "@/features/configuracoes/utils/configuracoes-branding";

const tenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  domain: null,
  locale: "pt-BR",
  branding: {
    logoUrl: "/uploads/public/tenant/logo.png",
    faviconUrl: null,
    primaryColor: "#7a1234",
    secondaryColor: "#E4E4E7",
    accentColor: "#A1A1AA",
  },
  settings: {
    allowDarkMode: true,
    showPoweredByBeautyCore: true,
  },
};

describe("configuracoes branding", () => {
  it("normaliza cor hexadecimal segura", () => {
    expect(normalizeBrandingPrimaryColor("#7a1234")).toBe("#7A1234");
  });

  it("usa fallback Beauty Core para cor invalida", () => {
    expect(normalizeBrandingPrimaryColor("url(javascript:alert(1))")).toBe(
      "#18181B",
    );
  });

  it("detecta logo personalizada sem expor a URL", () => {
    expect(hasTenantCustomLogo("/uploads/public/tenant/logo.png")).toBe(true);

    expect(hasTenantCustomLogo(null)).toBe(false);
  });

  it("monta overview somente com identidade suportada", () => {
    expect(getConfiguracoesBrandingOverview(tenant)).toEqual({
      tenantName: "Clínica Aurora",
      primaryColor: "#7A1234",
      hasCustomLogo: true,
      logoStatus: "custom",
    });
  });

  it("usa fallback quando logo nao existe", () => {
    expect(
      getConfiguracoesBrandingOverview({
        ...tenant,
        branding: {
          ...tenant.branding,
          logoUrl: null,
        },
      }).logoStatus,
    ).toBe("fallback");
  });
});
