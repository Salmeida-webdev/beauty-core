import { describe, expect, it } from "vitest";

import { categoriaFinanceiraFormSchema } from "@/features/financeiro/forms/categoria-financeira-form.schema";

describe("categoria financeira form schema", () => {
  it("aceita receita", () => {
    expect(
      categoriaFinanceiraFormSchema.safeParse({
        nome: "Serviços",
        tipo: "RECEITA",
      }).success,
    ).toBe(true);
  });

  it("aceita despesa", () => {
    expect(
      categoriaFinanceiraFormSchema.safeParse({
        nome: "Energia",
        tipo: "DESPESA",
      }).success,
    ).toBe(true);
  });

  it("rejeita nome vazio", () => {
    expect(
      categoriaFinanceiraFormSchema.safeParse({
        nome: "   ",
        tipo: "RECEITA",
      }).success,
    ).toBe(false);
  });

  it("rejeita tipo fictício", () => {
    expect(
      categoriaFinanceiraFormSchema.safeParse({
        nome: "Categoria",
        tipo: "OUTRA",
      }).success,
    ).toBe(false);
  });
});
