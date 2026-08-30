import { describe, expect, it } from "vitest";

import {
  canAccessLoyalty,
  canAdjustPoints,
  canManageBenefits,
  canManageCoupons,
  canManageLevels,
  canManageLoyaltySettings,
  canReadLoyaltySettings,
} from "./fidelidade-permissions";

describe("fidelidade permissions", () => {
  it("permite leitura às quatro roles reais", () => {
    for (const role of [
      "ADMIN",
      "GERENTE",
      "RECEPCAO",
      "PROFISSIONAL",
    ]) {
      expect(canAccessLoyalty(role)).toBe(true);
    }
  });

  it("limita operação de pontos", () => {
    expect(canAdjustPoints("ADMIN")).toBe(true);
    expect(canAdjustPoints("GERENTE")).toBe(true);
    expect(canAdjustPoints("RECEPCAO")).toBe(true);
    expect(canAdjustPoints("PROFISSIONAL")).toBe(false);
  });

  it("limita leitura da configuração", () => {
    expect(canReadLoyaltySettings("ADMIN")).toBe(true);
    expect(canReadLoyaltySettings("GERENTE")).toBe(true);
    expect(canReadLoyaltySettings("RECEPCAO")).toBe(false);
  });

  it("limita gestão da configuração ao ADMIN", () => {
    expect(canManageLoyaltySettings("ADMIN")).toBe(true);
    expect(canManageLoyaltySettings("GERENTE")).toBe(false);
  });

  it("limita gestão estrutural a ADMIN/GERENTE", () => {
    expect(canManageLevels("ADMIN")).toBe(true);
    expect(canManageLevels("GERENTE")).toBe(true);
    expect(canManageLevels("RECEPCAO")).toBe(false);

    expect(canManageBenefits("ADMIN")).toBe(true);
    expect(canManageCoupons("GERENTE")).toBe(true);
  });

  it("não adiciona SUPER_ADMIN automaticamente", () => {
    expect(canAccessLoyalty("SUPER_ADMIN")).toBe(false);
    expect(canManageLevels("SUPER_ADMIN")).toBe(false);
  });
});
