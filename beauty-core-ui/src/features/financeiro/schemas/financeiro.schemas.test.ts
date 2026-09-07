import { describe, expect, it } from "vitest";

import {
  financeiroListQuerySchema,
  financeiroResumoSchema,
  formaPagamentoFinanceiroSchema,
  statusPagamentoFinanceiroSchema,
  tipoMovimentacaoFinanceiraSchema,
} from "@/features/financeiro/schemas/financeiro.schemas";

describe("financeiro schemas", () => {
  it("aceita somente tipos financeiros reais", () => {
    expect(tipoMovimentacaoFinanceiraSchema.parse("RECEITA")).toBe("RECEITA");

    expect(tipoMovimentacaoFinanceiraSchema.parse("DESPESA")).toBe("DESPESA");

    expect(tipoMovimentacaoFinanceiraSchema.safeParse("ENTRADA").success).toBe(
      false,
    );
  });

  it("aceita somente formas de pagamento reais", () => {
    expect(formaPagamentoFinanceiroSchema.parse("PIX")).toBe("PIX");

    expect(formaPagamentoFinanceiroSchema.parse("CARTAO_CREDITO")).toBe(
      "CARTAO_CREDITO",
    );

    expect(formaPagamentoFinanceiroSchema.safeParse("CARTAO").success).toBe(
      false,
    );
  });

  it("preserva os quatro status reais", () => {
    for (const status of ["PENDENTE", "PAGO", "CANCELADO", "ESTORNADO"]) {
      expect(statusPagamentoFinanceiroSchema.safeParse(status).success).toBe(
        true,
      );
    }

    expect(statusPagamentoFinanceiroSchema.safeParse("CONCLUIDO").success).toBe(
      false,
    );
  });

  it("aceita somente filtros server-side contratados", () => {
    const parsed = financeiroListQuerySchema.parse({
      page: 2,
      limit: 30,
      categoriaId: "550e8400-e29b-41d4-a716-446655440000",
      tipo: "RECEITA",
      status: "PAGO",
    });

    expect(parsed.page).toBe(2);
    expect(parsed.tipo).toBe("RECEITA");
    expect(parsed.status).toBe("PAGO");
  });

  it("rejeita empresaId no contrato frontend", () => {
    expect(
      financeiroListQuerySchema.safeParse({
        empresaId: "550e8400-e29b-41d4-a716-446655440000",
      }).success,
    ).toBe(false);
  });

  it("valida o resumo retornado pelo backend sem recalcular valores", () => {
    expect(
      financeiroResumoSchema.parse({
        receitas: 1000,
        despesas: 250,
        saldo: 750,
      }),
    ).toEqual({
      receitas: 1000,
      despesas: 250,
      saldo: 750,
    });
  });
});
