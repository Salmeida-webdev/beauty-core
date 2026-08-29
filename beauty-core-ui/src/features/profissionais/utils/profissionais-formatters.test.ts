import { describe, expect, it } from "vitest";

import { formatProfissionalTelefone } from "@/features/profissionais/utils/profissionais-formatters";

describe("profissionais formatters", () => {
  it("representa telefone ausente", () => {
    expect(formatProfissionalTelefone(null)).toBe("\u2014");
  });

  it("formata celular brasileiro", () => {
    expect(formatProfissionalTelefone("83999999999")).toBe("(83) 99999-9999");
  });

  it("formata telefone brasileiro com +55", () => {
    expect(formatProfissionalTelefone("+5583999999999")).toBe(
      "(83) 99999-9999",
    );
  });

  it("preserva numero internacional", () => {
    expect(formatProfissionalTelefone("+1 347 536-2108")).toBe(
      "+1 347 536-2108",
    );
  });
});
