import { describe, expect, it } from "vitest";

import { canAccessFinanceiroModule } from "@/features/financeiro/permissions/financeiro-permissions";

describe("RBAC do módulo Financeiro", () => {
  it("permite ADMIN e GERENTE", () => {
    expect(canAccessFinanceiroModule("ADMIN")).toBe(true);

    expect(canAccessFinanceiroModule("GERENTE")).toBe(true);
  });

  it("bloqueia roles fora do contrato backend", () => {
    expect(canAccessFinanceiroModule("SUPER_ADMIN")).toBe(false);

    expect(canAccessFinanceiroModule("RECEPCAO")).toBe(false);

    expect(canAccessFinanceiroModule("PROFISSIONAL")).toBe(false);

    expect(canAccessFinanceiroModule("CLIENTE")).toBe(false);
  });
});
