import { describe, expect, it, vi } from "vitest";

import {
  financeiroMovimentacoesQueryOptions,
  financeiroResumoQueryOptions,
} from "@/features/financeiro/queries/financeiro-query-options";

describe("financeiro query options", () => {
  it("usa a key centralizada do resumo", () => {
    const queryFn = vi.fn(async () => ({
      receitas: 100,
      despesas: 25,
      saldo: 75,
    }));

    const options = financeiroResumoQueryOptions(queryFn);

    expect(options.queryKey).toEqual(["financeiro", "resumo"]);

    expect(options.queryFn).toBe(queryFn);
  });

  it("usa filtros canônicos na listagem", () => {
    const queryFn = vi.fn(async () => []);

    const options = financeiroMovimentacoesQueryOptions(
      {
        status: "PAGO",
        tipo: "RECEITA",
      },
      queryFn,
    );

    expect(options.queryKey).toEqual([
      "financeiro",
      "movimentacoes",
      {
        tipo: "RECEITA",
        status: "PAGO",
      },
    ]);

    expect(options.queryFn).toBe(queryFn);
  });
});
