import { describe, expect, it } from "vitest";

import { CONFIGURACOES_CAPABILITIES } from "@/features/configuracoes/config/configuracoes-capabilities";
import {
  canAccessSettings,
  canManageBranding,
  canManageCompanySettings,
  canManageWhiteLabel,
} from "@/features/configuracoes/permissions/configuracoes-permissions";
import { configuracoesKeys } from "@/features/configuracoes/queries/configuracoes-keys";
import {
  configuracoesBrandingSchema,
  corPrimariaConfiguracaoSchema,
} from "@/features/configuracoes/schemas/configuracoes.schemas";

describe("Chat 55 — foundations de Configuracoes", () => {
  it("valida a unica cor persistida comprovada", () => {
    expect(corPrimariaConfiguracaoSchema.parse("#7C3AED")).toBe("#7C3AED");

    expect(corPrimariaConfiguracaoSchema.safeParse("purple").success).toBe(
      false,
    );
  });

  it("valida branding persistido conhecido", () => {
    expect(
      configuracoesBrandingSchema.parse({
        logo: "/uploads/logos/logo.webp",
        corPrimaria: "#7C3AED",
      }),
    ).toEqual({
      logo: "/uploads/logos/logo.webp",
      corPrimaria: "#7C3AED",
    });
  });

  it("limita acesso tenant de configuracoes a ADMIN e GERENTE", () => {
    expect(canAccessSettings("ADMIN")).toBe(true);
    expect(canAccessSettings("GERENTE")).toBe(true);
    expect(canAccessSettings("RECEPCAO")).toBe(false);
    expect(canAccessSettings("PROFISSIONAL")).toBe(false);
    expect(canAccessSettings("SUPER_ADMIN")).toBe(false);
  });

  it("libera apenas branding comprovado", () => {
    expect(canManageBranding("ADMIN")).toBe(true);
    expect(canManageWhiteLabel("GERENTE")).toBe(true);

    expect(canManageCompanySettings("ADMIN")).toBe(false);
    expect(canManageCompanySettings("GERENTE")).toBe(false);
  });

  it("mantem gaps Backend 1.1 explicitamente fechados", () => {
    expect(CONFIGURACOES_CAPABILITIES.logoUpload).toBe(true);
    expect(CONFIGURACOES_CAPABILITIES.primaryColorPersisted).toBe(true);

    expect(CONFIGURACOES_CAPABILITIES.tenantSafePrimaryColorMutation).toBe(
      false,
    );

    expect(CONFIGURACOES_CAPABILITIES.tenantFavicon).toBe(false);
    expect(CONFIGURACOES_CAPABILITIES.tenantDarkLogo).toBe(false);
    expect(CONFIGURACOES_CAPABILITIES.tenantSecondaryColor).toBe(false);
    expect(CONFIGURACOES_CAPABILITIES.tenantAccentColor).toBe(false);
  });

  it("cria namespace sem QueryClient paralelo", () => {
    expect(configuracoesKeys.branding()).toEqual(["configuracoes", "branding"]);
  });
});
