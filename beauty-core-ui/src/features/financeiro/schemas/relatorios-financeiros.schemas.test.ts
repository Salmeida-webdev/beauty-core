import { describe, expect, it } from "vitest";

import {
  fluxoCaixaFinanceiroSchema,
  resumoFinanceiroOperacionalSchema,
  totalFinanceiroMesSchema,
} from "@/features/financeiro/schemas/relatorios-financeiros.schemas";

const movimentacao = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  categoriaId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  clienteId: null,
  agendamentoId: null,
  descricao: "Recebimento",
  tipo: "RECEITA",
  valor: 200,
  formaPagamento: "PIX",
  status: "PAGO",
  dataMovimentacao: "2026-08-29T12:00:00.000Z",
  observacoes: null,
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("relatórios financeiros schemas", () => {
  it("parseia resumo calculado pelo backend", () => {
    expect(
      resumoFinanceiroOperacionalSchema.parse({
        receitas: 1000,
        despesas: 400,
        saldo: 600,
        empresaId: "interno",
      }),
    ).toEqual({
      receitas: 1000,
      despesas: 400,
      saldo: 600,
    });
  });

  it("parseia fluxo com totais backend", () => {
    const parsed = fluxoCaixaFinanceiroSchema.parse({
      totalEntradas: 1000,
      totalSaidas: 400,
      saldo: 600,
      movimentacoes: [movimentacao],
    });

    expect(parsed.totalEntradas).toBe(1000);

    expect(parsed.saldo).toBe(600);
    expect(parsed.movimentacoes).toHaveLength(1);
  });

  it("parseia total mensal", () => {
    expect(
      totalFinanceiroMesSchema.parse({
        total: 500,
        mes: 8,
      }),
    ).toEqual({
      total: 500,
    });
  });

  it("rejeita total não numérico", () => {
    expect(
      totalFinanceiroMesSchema.safeParse({
        total: "500",
      }).success,
    ).toBe(false);
  });
});
