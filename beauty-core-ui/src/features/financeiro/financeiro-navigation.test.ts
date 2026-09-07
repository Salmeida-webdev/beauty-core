import { describe, expect, it } from "vitest";

import { getNavigationForRole } from "@/config/admin-navigation";

function findFinanceiro(
  role: "SUPER_ADMIN" | "ADMIN" | "GERENTE" | "RECEPCAO" | "PROFISSIONAL",
) {
  return getNavigationForRole(role)
    .flatMap((group) => group.items)
    .find((item) => item.href === "/financeiro");
}

describe("navegação do Financeiro", () => {
  it("disponibiliza para ADMIN", () => {
    const item = findFinanceiro("ADMIN");

    expect(item?.state).toBe("available");

    expect(item?.href).toBe("/financeiro");
  });

  it("disponibiliza para GERENTE", () => {
    const item = findFinanceiro("GERENTE");

    expect(item?.state).toBe("available");
  });

  it.each(["SUPER_ADMIN", "RECEPCAO", "PROFISSIONAL"] as const)(
    "não expõe Financeiro para %s",
    (role) => {
      expect(findFinanceiro(role)).toBeUndefined();
    },
  );
});
