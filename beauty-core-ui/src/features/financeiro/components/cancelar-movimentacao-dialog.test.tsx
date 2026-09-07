import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CancelarMovimentacaoDialog } from "@/features/financeiro/components/cancelar-movimentacao-dialog";

const mutateAsync = vi.fn();

vi.mock("@/features/financeiro/hooks/use-movimentacoes-financeiras", () => ({
  useCancelarMovimentacaoFinanceira: () => ({
    mutateAsync,
    isPending: false,
  }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const movimentacao = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  categoriaId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  clienteId: null,
  agendamentoId: null,
  descricao: "Energia",
  tipo: "DESPESA" as const,
  valor: "150.00",
  formaPagamento: "PIX" as const,
  status: "PAGO" as const,
  dataMovimentacao: "2026-08-29T12:00:00.000Z",
  observacoes: null,
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("CancelarMovimentacaoDialog", () => {
  it("avisa que cancelamento de paga não é estorno externo", () => {
    render(
      <CancelarMovimentacaoDialog
        open
        movimentacao={movimentacao}
        onOpenChange={vi.fn()}
      />,
    );

    expect(
      screen.getByText(/não representa estorno externo/i),
    ).toBeInTheDocument();
  });

  it("não expõe valor editável ou motivo fictício", () => {
    render(
      <CancelarMovimentacaoDialog
        open
        movimentacao={movimentacao}
        onOpenChange={vi.fn()}
      />,
    );

    expect(screen.queryByLabelText("Valor")).not.toBeInTheDocument();

    expect(screen.queryByLabelText("Motivo")).not.toBeInTheDocument();
  });
});
