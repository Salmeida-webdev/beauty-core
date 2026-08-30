import { describe, expect, it } from "vitest";

import {
  buildFinanceiroSearchParams,
  financeiroEndpoints,
} from "@/features/financeiro/services/financeiro-api";

describe("financeiro api contracts", () => {
  it("mantém somente endpoints comprovados", () => {
    expect(financeiroEndpoints.movimentacoes).toBe("/financeiro");

    expect(financeiroEndpoints.cancelarMovimentacao("abc")).toBe(
      "/financeiro/abc/cancelar",
    );

    expect(financeiroEndpoints.pagarMovimentacao("abc")).toBe(
      "/financeiro/abc/pagar",
    );

    expect(financeiroEndpoints.resumo).toBe("/financeiro/resumo");

    expect(financeiroEndpoints.categorias).toBe("/categorias-financeiras");

    expect(financeiroEndpoints.comissoes).toBe("/comissoes");
  });

  it("serializa somente filtros financeiros reais", () => {
    const params = buildFinanceiroSearchParams({
      page: 2,
      limit: 20,
      categoriaId: "categoria-1",
      clienteId: "cliente-1",
      agendamentoId: "agendamento-1",
      tipo: "RECEITA",
      status: "PAGO",
    });

    expect(Object.fromEntries(params.entries())).toEqual({
      page: "2",
      limit: "20",
      categoriaId: "categoria-1",
      clienteId: "cliente-1",
      agendamentoId: "agendamento-1",
      tipo: "RECEITA",
      status: "PAGO",
    });

    expect(params.has("empresaId")).toBe(false);
    expect(params.has("unidadeId")).toBe(false);
    expect(params.has("profissionalId")).toBe(false);
  });
});
