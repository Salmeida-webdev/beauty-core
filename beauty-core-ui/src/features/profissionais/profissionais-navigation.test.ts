import { describe, expect, it } from "vitest";

import type { AdminRole } from "@/constants/roles";
import { getNavigationForRole } from "@/config/admin-navigation";

function getIds(role: AdminRole): string[] {
  return getNavigationForRole(role).flatMap((group) =>
    group.items.map((item) => item.id),
  );
}

describe("navegacao de Profissionais", () => {
  it("fica disponivel somente para roles de gestao", () => {
    for (const role of ["SUPER_ADMIN", "ADMIN", "GERENTE"] as const) {
      expect(getIds(role)).toContain("professionals");
    }

    for (const role of ["RECEPCAO", "PROFISSIONAL"] as const) {
      expect(getIds(role)).not.toContain("professionals");
    }
  });
});
