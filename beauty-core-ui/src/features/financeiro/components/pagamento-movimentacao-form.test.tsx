import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PagamentoMovimentacaoForm } from "@/features/financeiro/components/pagamento-movimentacao-form";

afterEach(() => {
  cleanup();
});

describe("PagamentoMovimentacaoForm", () => {
  it("expõe exatamente sete formas reais", () => {
    render(
      <PagamentoMovimentacaoForm
        defaultFormaPagamento="PIX"
        onSubmit={vi.fn()}
      />,
    );

    const select = screen.getByLabelText("Forma de pagamento");

    expect(select.querySelectorAll("option")).toHaveLength(7);

    expect(screen.queryByLabelText("Valor pago")).not.toBeInTheDocument();

    expect(screen.queryByLabelText("Parcelas")).not.toBeInTheDocument();
  });

  it("bloqueia submit enquanto pending", () => {
    render(
      <PagamentoMovimentacaoForm
        defaultFormaPagamento="PIX"
        pending
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Registrando...",
      }),
    ).toBeDisabled();
  });
});
