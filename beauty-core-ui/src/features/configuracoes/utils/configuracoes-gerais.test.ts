import { describe, expect, it } from "vitest";

import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import { getConfiguracoesGerais } from "@/features/configuracoes/utils/configuracoes-gerais";

const tenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  domain: "aurora.example.com",
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
};

describe("configuracoes gerais", () => {
  it("mapeia somente campos publicos do tenant", () => {
    expect(getConfiguracoesGerais(tenant)).toEqual([
      {
        key: "nome",
        label: "Nome da empresa",
        value: "Clínica Aurora",
      },
      {
        key: "slug",
        label: "Identificador",
        value: "clinica-aurora",
      },
      {
        key: "dominio",
        label: "Domínio",
        value: "aurora.example.com",
      },
      {
        key: "locale",
        label: "Localidade",
        value: "pt-BR",
      },
    ]);
  });

  it("usa fallback para dominio ausente", () => {
    expect(
      getConfiguracoesGerais({
        ...tenant,
        domain: null,
      }),
    ).toContainEqual({
      key: "dominio",
      label: "Domínio",
      value: "Não informado",
    });
  });
});
