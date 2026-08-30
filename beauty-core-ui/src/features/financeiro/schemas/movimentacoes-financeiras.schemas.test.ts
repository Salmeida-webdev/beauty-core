import { describe, expect, it } from "vitest";

import {
  movimentacaoFinanceiraSchema,
  movimentacoesFinanceirasPageSchema,
} from "@/features/financeiro/schemas/movimentacoes-financeiras.schemas";

const movimentacao = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  categoriaId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  clienteId: null,
  agendamentoId: null,
  descricao: "Energia",
  tipo: "DESPESA",
  valor: "150.00",
  formaPagamento: "PIX",
  status: "PAGO",
  dataMovimentacao: "2026-08-29T12:00:00.000Z",
  observacoes: null,
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("movimentações financeiras schemas", () => {
  it("aceita Decimal serializado como string", () => {
    expect(movimentacaoFinanceiraSchema.parse(movimentacao).valor).toBe(
      "150.00",
    );
  });

  it("aceita valor number sem recalcular", () => {
    expect(
      movimentacaoFinanceiraSchema.parse({
        ...movimentacao,
        valor: 150,
      }).valor,
    ).toBe(150);
  });

  it("aceita relações opcionais quando retornadas", () => {
    const parsed = movimentacaoFinanceiraSchema.parse({
      ...movimentacao,
      categoria: {
        id: movimentacao.categoriaId,
        nome: "Despesas fixas",
        tipo: "DESPESA",
        ativo: true,
      },
    });

    expect(parsed.categoria?.nome).toBe("Despesas fixas");
  });

  it("remove empresaId da resposta consumida", () => {
    const parsed = movimentacaoFinanceiraSchema.parse({
      ...movimentacao,
      empresaId: "empresa-interna",
    });

    expect(parsed).not.toHaveProperty("empresaId");
  });

  it("rejeita status inexistente", () => {
    expect(
      movimentacaoFinanceiraSchema.safeParse({
        ...movimentacao,
        status: "CONCLUIDO",
      }).success,
    ).toBe(false);
  });

  it("parseia resposta paginada real", () => {
    expect(
      movimentacoesFinanceirasPageSchema.parse({
        data: [movimentacao],
        total: 1,
        page: 1,
        limit: 20,
      }),
    ).toMatchObject({
      total: 1,
      page: 1,
      limit: 20,
    });
  });
});
