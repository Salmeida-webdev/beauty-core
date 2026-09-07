import { describe, expect, it } from "vitest";

import {
  categoriaFinanceiraQueryOptions,
  categoriasFinanceirasQueryOptions,
} from "@/features/financeiro/queries/categorias-financeiras-query-options";

describe("categorias financeiras query options", () => {
  it("usa key da listagem", () => {
    expect(categoriasFinanceirasQueryOptions().queryKey).toEqual([
      "financeiro",
      "categorias",
    ]);
  });

  it("usa key do detalhe", () => {
    expect(categoriaFinanceiraQueryOptions("categoria-1").queryKey).toEqual([
      "financeiro",
      "categorias",
      "categoria-1",
    ]);
  });

  it("desabilita detalhe vazio", () => {
    expect(categoriaFinanceiraQueryOptions("").enabled).toBe(false);
  });
});
