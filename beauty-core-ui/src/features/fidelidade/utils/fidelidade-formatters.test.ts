import { describe, expect, it } from "vitest";

import {
  formatBeneficiosNivel,
  formatPontos,
} from "./fidelidade-formatters";

describe("fidelidade formatters", () => {
  it("formata pontos sem aplicar regra de negócio", () => {
    expect(formatPontos(1250)).toContain("1.250");
    expect(formatPontos(1250)).toContain("pts");
  });

  it("diferencia benefício ausente", () => {
    expect(formatBeneficiosNivel(null)).toBe("Não informado");
    expect(formatBeneficiosNivel("  Benefício real  ")).toBe(
      "Benefício real",
    );
  });
});
