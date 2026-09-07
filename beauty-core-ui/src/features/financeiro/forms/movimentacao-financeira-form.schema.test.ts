import { describe, expect, it } from "vitest";

import { movimentacaoFinanceiraFormSchema } from "@/features/financeiro/forms/movimentacao-financeira-form.schema";

const base = {
  categoriaId: "550e8400-e29b-41d4-a716-446655440000",
  clienteId: "",
  agendamentoId: "",
  descricao: "Energia",
  tipo: "DESPESA",
  valor: "150,00",
  formaPagamento: "PIX",
  observacoes: "",
};

describe("movimentacao financeira form schema", () => {
  it("aceita contrato real", () => {
    expect(movimentacaoFinanceiraFormSchema.safeParse(base).success).toBe(true);
  });

  it("rejeita valor monetário inválido", () => {
    expect(
      movimentacaoFinanceiraFormSchema.safeParse({
        ...base,
        valor: "abc",
      }).success,
    ).toBe(false);
  });

  it("rejeita categoria inválida", () => {
    expect(
      movimentacaoFinanceiraFormSchema.safeParse({
        ...base,
        categoriaId: "categoria",
      }).success,
    ).toBe(false);
  });

  it("rejeita status e empresaId no formulário", () => {
    expect(
      movimentacaoFinanceiraFormSchema.safeParse({
        ...base,
        status: "PAGO",
      }).success,
    ).toBe(false);

    expect(
      movimentacaoFinanceiraFormSchema.safeParse({
        ...base,
        empresaId: "empresa",
      }).success,
    ).toBe(false);
  });
});
