import { describe, expect, it } from "vitest";

import {
  toCreateMovimentacaoFinanceiraPayload,
  toUpdateMovimentacaoFinanceiraPayload,
} from "@/features/financeiro/forms/movimentacao-financeira-payload";

const receitaValues = {
  categoriaId: "550e8400-e29b-41d4-a716-446655440000",
  clienteId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
  descricao: " Procedimento ",
  tipo: "RECEITA" as const,
  valor: "150,25",
  formaPagamento: "PIX" as const,
  observacoes: " Observação ",
};

describe("movimentacao financeira payload", () => {
  it("gera receita somente com campos permitidos", () => {
    const payload = toCreateMovimentacaoFinanceiraPayload(receitaValues);

    expect(payload).toEqual({
      categoriaId: receitaValues.categoriaId,
      clienteId: receitaValues.clienteId,
      agendamentoId: receitaValues.agendamentoId,
      descricao: "Procedimento",
      tipo: "RECEITA",
      valor: 150.25,
      formaPagamento: "PIX",
      observacoes: "Observação",
    });

    expect(payload).not.toHaveProperty("empresaId");
    expect(payload).not.toHaveProperty("status");
  });

  it("não envia cliente/agendamento em despesa", () => {
    const payload = toCreateMovimentacaoFinanceiraPayload({
      ...receitaValues,
      tipo: "DESPESA",
    });

    expect(payload).not.toHaveProperty("clienteId");

    expect(payload).not.toHaveProperty("agendamentoId");
  });

  it("gera update sem status ou empresaId", () => {
    const payload = toUpdateMovimentacaoFinanceiraPayload(receitaValues);

    expect(payload).not.toHaveProperty("status");

    expect(payload).not.toHaveProperty("empresaId");
  });
});
