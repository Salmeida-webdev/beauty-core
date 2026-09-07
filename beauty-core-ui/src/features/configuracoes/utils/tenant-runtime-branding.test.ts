import { describe, expect, it } from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import { getTenantRuntimeBranding } from "@/features/configuracoes/utils/tenant-runtime-branding";

const tenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  domain: null,
  locale: "pt-BR",
  branding: {
    logoUrl: "/uploads/public/tenant/logo.png",
    faviconUrl: "/uploads/public/tenant/favicon.png",
    primaryColor: "#7a1234",
    secondaryColor: "#ABCDEF",
    accentColor: "#FEDCBA",
  },
  settings: {
    allowDarkMode: true,
    showPoweredByBeautyCore: true,
  },
};

describe("tenant runtime branding", () => {
  it("aplica somente primary persistida do tenant", () => {
    expect(getTenantRuntimeBranding(tenant)).toEqual({
      slug: "clinica-aurora",
      primaryColor: "#7A1234",
      secondaryColor: DEFAULT_TENANT.branding.secondaryColor,
      accentColor: DEFAULT_TENANT.branding.accentColor,
    });
  });

  it("nao promove secondary e accent nao suportadas", () => {
    const runtime = getTenantRuntimeBranding(tenant);

    expect(runtime.secondaryColor).not.toBe("#ABCDEF");

    expect(runtime.accentColor).not.toBe("#FEDCBA");
  });

  it("normaliza primary invalida para fallback", () => {
    expect(
      getTenantRuntimeBranding({
        ...tenant,
        branding: {
          ...tenant.branding,
          primaryColor: "red",
        },
      }).primaryColor,
    ).toBe("#18181B");
  });
});
