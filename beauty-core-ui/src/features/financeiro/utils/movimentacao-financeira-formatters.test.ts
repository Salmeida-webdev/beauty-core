import { describe, expect, it } from "vitest";

import {
  formaPagamentoLabel,
  formatMovimentacaoDateTime,
  statusPagamentoLabel,
  tipoMovimentacaoLabel,
} from "@/features/financeiro/utils/movimentacao-financeira-formatters";

describe("movimentação financeira formatters", () => {
  it("mantém Receita e Despesa sem trocar sinal", () => {
    expect(tipoMovimentacaoLabel("RECEITA")).toBe("Receita");

    expect(tipoMovimentacaoLabel("DESPESA")).toBe("Despesa");
  });

  it("traduz os quatro status reais", () => {
    expect(statusPagamentoLabel("PENDENTE")).toBe("Pendente");

    expect(statusPagamentoLabel("PAGO")).toBe("Pago");

    expect(statusPagamentoLabel("CANCELADO")).toBe("Cancelado");

    expect(statusPagamentoLabel("ESTORNADO")).toBe("Estornado");
  });

  it("traduz formas reais de pagamento", () => {
    expect(formaPagamentoLabel("CARTAO_CREDITO")).toBe("Cartão de crédito");

    expect(formaPagamentoLabel("PIX")).toBe("Pix");
  });

  it("usa fallback para data inválida", () => {
    expect(formatMovimentacaoDateTime("invalida")).toBe("—");
  });
});
