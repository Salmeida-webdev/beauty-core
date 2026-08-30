import { describe, expect, it } from "vitest";

import { pagamentoMovimentacaoFormSchema } from "@/features/financeiro/forms/pagamento-movimentacao-form.schema";

const formas = [
  "DINHEIRO",
  "PIX",
  "CARTAO_CREDITO",
  "CARTAO_DEBITO",
  "TRANSFERENCIA",
  "BOLETO",
  "OUTRO",
] as const;

describe("pagamento movimentação form schema", () => {
  it("aceita as sete formas reais", () => {
    for (const formaPagamento of formas) {
      expect(
        pagamentoMovimentacaoFormSchema.safeParse({
          formaPagamento,
        }).success,
      ).toBe(true);
    }
  });

  it("rejeita forma fictícia", () => {
    expect(
      pagamentoMovimentacaoFormSchema.safeParse({
        formaPagamento: "CHEQUE",
      }).success,
    ).toBe(false);
  });

  it("rejeita campos de pagamento não suportados", () => {
    expect(
      pagamentoMovimentacaoFormSchema.safeParse({
        formaPagamento: "PIX",
        valorPago: 50,
      }).success,
    ).toBe(false);

    expect(
      pagamentoMovimentacaoFormSchema.safeParse({
        formaPagamento: "PIX",
        parcelas: 2,
      }).success,
    ).toBe(false);
  });
});
