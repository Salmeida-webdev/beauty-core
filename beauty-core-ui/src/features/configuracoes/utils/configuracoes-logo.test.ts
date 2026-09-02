import { describe, expect, it } from "vitest";

import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import {
  getUploadedTenantLogoUrl,
  withUploadedTenantLogo,
} from "@/features/configuracoes/utils/configuracoes-logo";

const tenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
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
};

const logoArquivo: Arquivo = {
  id: "550e8400-e29b-41d4-a716-446655440010",
  empresaId: "550e8400-e29b-41d4-a716-446655440000",
  tipo: "LOGO_EMPRESA",
  nomeOriginal: "logo.png",
  nomeArquivo: "logo-uuid.png",
  mimeType: "image/png",
  tamanhoBytes: 1024,
  url: "/uploads/public/tenant/logo-uuid.png",
  status: "ATIVO",
  visibilidade: "PUBLICO",
};

describe("configuracoes logo", () => {
  it("aceita URL local de upload retornada pelo backend", () => {
    expect(getUploadedTenantLogoUrl(logoArquivo)).toBe(
      "/uploads/public/tenant/logo-uuid.png",
    );
  });

  it("rejeita tipo diferente de logo", () => {
    expect(
      getUploadedTenantLogoUrl({
        ...logoArquivo,
        tipo: "DOCUMENTO",
      }),
    ).toBeNull();
  });

  it("rejeita URL externa ou traversal", () => {
    expect(
      getUploadedTenantLogoUrl({
        ...logoArquivo,
        url: "https://externo.example/logo.png",
      }),
    ).toBeNull();

    expect(
      getUploadedTenantLogoUrl({
        ...logoArquivo,
        url: "/uploads/../segredo.png",
      }),
    ).toBeNull();
  });

  it("atualiza somente logoUrl preservando o tenant", () => {
    expect(withUploadedTenantLogo(tenant, logoArquivo)).toEqual({
      ...tenant,
      branding: {
        ...tenant.branding,
        logoUrl: "/uploads/public/tenant/logo-uuid.png",
      },
    });
  });

  it("nao altera tenant quando resposta nao possui logo segura", () => {
    expect(
      withUploadedTenantLogo(tenant, {
        ...logoArquivo,
        url: null,
      }),
    ).toBeNull();
  });
});
