import { describe, expect, it } from "vitest";

import {
  categoriasFinanceirasControllerObservedRoles,
  comissoesControllerObservedRoles,
  financeiroControllerObservedRoles,
  hasObservedFinanceiroRole,
} from "@/features/financeiro/permissions/financeiro-permissions";

describe("financeiro permissions foundation", () => {
  it("não inclui SUPER_ADMIN em domínio financeiro tenant", () => {
    expect(financeiroControllerObservedRoles).not.toContain("SUPER_ADMIN");

    expect(categoriasFinanceirasControllerObservedRoles).not.toContain(
      "SUPER_ADMIN",
    );

    expect(comissoesControllerObservedRoles).not.toContain("SUPER_ADMIN");
  });

  it("não inclui CLIENTE nos controllers administrativos", () => {
    expect(financeiroControllerObservedRoles).not.toContain("CLIENTE");

    expect(categoriasFinanceirasControllerObservedRoles).not.toContain(
      "CLIENTE",
    );

    expect(comissoesControllerObservedRoles).not.toContain("CLIENTE");
  });

  it("avalia somente roles presentes na matriz observada", () => {
    const firstRole = financeiroControllerObservedRoles[0];

    expect(
      hasObservedFinanceiroRole(firstRole, financeiroControllerObservedRoles),
    ).toBe(true);

    expect(
      hasObservedFinanceiroRole(
        "SUPER_ADMIN",
        financeiroControllerObservedRoles,
      ),
    ).toBe(false);
  });
});
