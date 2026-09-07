import { describe, expect, it } from "vitest";

import {
  categoriaFinanceiraSchema,
  categoriasFinanceirasSchema,
} from "@/features/financeiro/schemas/categorias-financeiras.schemas";

const categoria = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  nome: "Procedimentos",
  tipo: "RECEITA",
  ativo: true,
  createdAt: "2026-08-29T10:00:00.000Z",
  updatedAt: "2026-08-29T10:00:00.000Z",
};

describe("categorias financeiras schemas", () => {
  it("parseia categoria real", () => {
    expect(categoriaFinanceiraSchema.parse(categoria)).toEqual(categoria);
  });

  it("remove empresaId da resposta consumida", () => {
    const parsed = categoriaFinanceiraSchema.parse({
      ...categoria,
      empresaId: "empresa-interna",
    });

    expect(parsed).not.toHaveProperty("empresaId");
  });

  it("rejeita tipo inexistente", () => {
    expect(
      categoriaFinanceiraSchema.safeParse({
        ...categoria,
        tipo: "OUTRA",
      }).success,
    ).toBe(false);
  });

  it("parseia listagem sem paginação fictícia", () => {
    expect(categoriasFinanceirasSchema.parse([categoria])).toHaveLength(1);
  });
});
