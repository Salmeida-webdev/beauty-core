import { describe, expect, it } from "vitest";

import {
  comissoesKeys,
  financeiroKeys,
} from "@/features/financeiro/queries/financeiro-keys";

describe("financeiro query keys", () => {
  it("mantém namespace financeiro único", () => {
    expect(financeiroKeys.all).toEqual(["financeiro"]);

    expect(financeiroKeys.resumo()).toEqual(["financeiro", "resumo"]);
  });

  it("normaliza filtros na key de movimentações", () => {
    expect(
      financeiroKeys.movimentacoes({
        status: "PAGO",
        page: 2,
        tipo: "RECEITA",
      }),
    ).toEqual([
      "financeiro",
      "movimentacoes",
      {
        page: 2,
        tipo: "RECEITA",
        status: "PAGO",
      },
    ]);
  });

  it("mantém comissões em namespace próprio sem QueryClient paralelo", () => {
    expect(comissoesKeys.lista()).toEqual(["comissoes", "lista"]);
  });
});
