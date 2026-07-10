import { describe, expect, it } from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import { parseTenantPublicConfig } from "@/features/tenant/schemas/tenant.schema";

describe("tenantPublicConfigSchema", () => {
  it("aceita a configuração padrão", () => {
    expect(parseTenantPublicConfig(DEFAULT_TENANT)).toEqual(
      DEFAULT_TENANT,
    );
  });

  it("aceita URLs e caminhos relativos de ativos", () => {
    const tenant = parseTenantPublicConfig({
      ...DEFAULT_TENANT,
      branding: {
        ...DEFAULT_TENANT.branding,
        logoUrl: "/branding/logo.svg",
        faviconUrl: "https://cdn.example.com/favicon.ico",
      },
    });

    expect(tenant.branding.logoUrl).toBe("/branding/logo.svg");
  });

  it("rejeita slug e cores inválidos", () => {
    expect(() =>
      parseTenantPublicConfig({
        ...DEFAULT_TENANT,
        slug: "Beauty Core",
      }),
    ).toThrow();

    expect(() =>
      parseTenantPublicConfig({
        ...DEFAULT_TENANT,
        branding: {
          ...DEFAULT_TENANT.branding,
          primaryColor: "navy",
        },
      }),
    ).toThrow();
  });

  it("rejeita propriedades desconhecidas", () => {
    expect(() =>
      parseTenantPublicConfig({
        ...DEFAULT_TENANT,
        secretKey: "não permitido",
      }),
    ).toThrow();
  });
});
