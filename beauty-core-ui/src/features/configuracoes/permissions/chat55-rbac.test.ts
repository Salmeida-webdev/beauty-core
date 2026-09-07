import { describe, expect, it } from "vitest";

import {
  canAccessArquivos,
  canAccessFiles,
  canAccessGallery,
  canDeleteArquivo,
  canDownloadArquivo,
  canUploadArquivo,
  canUploadGallery,
} from "@/features/arquivos/permissions/arquivos-permissions";
import {
  canAccessBranding,
  canAccessConfiguracoes,
  canManageBranding,
  canManageCompanySettings,
  canManagePrimaryColor,
  canManageWhiteLabel,
  canUploadBrandingLogo,
} from "@/features/configuracoes/permissions/configuracoes-permissions";

describe("Chat55 RBAC", () => {
  it.each(["ADMIN", "GERENTE"] as const)(
    "libera gestao de Arquivos para %s",
    (role) => {
      expect(canAccessArquivos(role)).toBe(true);
      expect(canAccessFiles(role)).toBe(true);
      expect(canUploadArquivo(role)).toBe(true);
      expect(canDownloadArquivo(role)).toBe(true);
      expect(canDeleteArquivo(role)).toBe(true);
      expect(canUploadGallery(role)).toBe(true);
    },
  );

  it.each(["SUPER_ADMIN", "RECEPCAO", "PROFISSIONAL"] as const)(
    "nao amplia gestao de Arquivos para %s",
    (role) => {
      expect(canAccessArquivos(role)).toBe(false);
    },
  );

  it.each(["ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"] as const)(
    "preserva leitura da Galeria para %s",
    (role) => {
      expect(canAccessGallery(role)).toBe(true);
    },
  );

  it.each(["RECEPCAO", "PROFISSIONAL"] as const)(
    "nao amplia upload da Galeria para %s",
    (role) => {
      expect(canUploadGallery(role)).toBe(false);
    },
  );

  it.each(["ADMIN", "GERENTE"] as const)(
    "libera Configuracoes e white-label comprovado para %s",
    (role) => {
      expect(canAccessConfiguracoes(role)).toBe(true);

      expect(canAccessBranding(role)).toBe(true);

      expect(canUploadBrandingLogo(role)).toBe(true);

      expect(canManageBranding(role)).toBe(true);

      expect(canManageWhiteLabel(role)).toBe(true);
    },
  );

  it.each(["SUPER_ADMIN", "RECEPCAO", "PROFISSIONAL"] as const)(
    "nao amplia Configuracoes tenant para %s",
    (role) => {
      expect(canAccessConfiguracoes(role)).toBe(false);

      expect(canAccessBranding(role)).toBe(false);

      expect(canManageWhiteLabel(role)).toBe(false);
    },
  );

  it("mantem mutations nao comprovadas bloqueadas", () => {
    expect(canManageCompanySettings("ADMIN")).toBe(false);

    expect(canManagePrimaryColor("ADMIN")).toBe(false);
  });
});
