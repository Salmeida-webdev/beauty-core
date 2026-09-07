import { describe, expect, it } from "vitest";

import { getNavigationForRole } from "@/config/admin-navigation";
import type { AdminRole } from "@/constants/roles";

function getRoleHrefs(role: AdminRole): string[] {
  return getNavigationForRole(role)
    .flatMap((group) => group.items)
    .filter((item) => item.state === "available")
    .map((item) => item.href);
}

describe("Chat55 navigation", () => {
  it.each(["ADMIN", "GERENTE"] as const)(
    "disponibiliza Arquivos e Configuracoes para %s",
    (role) => {
      const hrefs = getRoleHrefs(role);

      expect(hrefs).toContain("/arquivos");
      expect(hrefs).toContain("/configuracoes");
    },
  );

  it.each(["SUPER_ADMIN", "RECEPCAO", "PROFISSIONAL"] as const)(
    "nao inclui configuracao tenant para %s",
    (role) => {
      const hrefs = getRoleHrefs(role);

      expect(hrefs).not.toContain("/arquivos");
      expect(hrefs).not.toContain("/configuracoes");
    },
  );

  it("nao cria entradas paralelas de branding", () => {
    const hrefs = ["ADMIN", "GERENTE"].flatMap((role) =>
      getRoleHrefs(role as AdminRole),
    );

    expect(hrefs).not.toContain("/branding");
    expect(hrefs).not.toContain("/white-label");
  });
});
