import { describe, expect, it } from "vitest";

import {
  movimentacaoFinanceiraQueryOptions,
  movimentacoesFinanceirasQueryOptions,
} from "@/features/financeiro/queries/movimentacoes-financeiras-query-options";

describe("movimentações financeiras query options", () => {
  it("usa namespace central da listagem", () => {
    expect(
      movimentacoesFinanceirasQueryOptions({
        page: 1,
      }).queryKey,
    ).toEqual([
      "financeiro",
      "movimentacoes",
      {
        page: 1,
      },
    ]);
  });

  it("usa key isolada de detalhe", () => {
    expect(movimentacaoFinanceiraQueryOptions("mov-1").queryKey).toEqual([
      "financeiro",
      "movimentacao",
      "mov-1",
    ]);
  });

  it("desabilita detalhe sem id", () => {
    expect(movimentacaoFinanceiraQueryOptions("").enabled).toBe(false);
  });
});
