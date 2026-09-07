import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MovimentacoesFinanceirasList } from "@/features/financeiro/components/movimentacoes-financeiras-list";

afterEach(() => {
  cleanup();
});

const base = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  categoriaId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  clienteId: null,
  agendamentoId: null,
  descricao: "Energia",
  tipo: "DESPESA" as const,
  valor: "150.00",
  formaPagamento: "PIX" as const,
  dataMovimentacao: "2026-08-29T12:00:00.000Z",
  observacoes: null,
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("MovimentacoesFinanceirasList", () => {
  it("pendente oferece pagar e cancelar", () => {
    render(
      <MovimentacoesFinanceirasList
        movimentacoes={[
          {
            ...base,
            status: "PENDENTE",
          },
        ]}
        onSelect={vi.fn()}
        onPay={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Registrar pagamento",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Cancelar",
      }),
    ).toBeInTheDocument();
  });

  it("paga oferece cancelar mas não pagar novamente", () => {
    render(
      <MovimentacoesFinanceirasList
        movimentacoes={[
          {
            ...base,
            status: "PAGO",
          },
        ]}
        onSelect={vi.fn()}
        onPay={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Registrar pagamento",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Cancelar",
      }),
    ).toBeInTheDocument();
  });

  it("cancelada não oferece transição", () => {
    render(
      <MovimentacoesFinanceirasList
        movimentacoes={[
          {
            ...base,
            status: "CANCELADO",
          },
        ]}
        onSelect={vi.fn()}
        onPay={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Registrar pagamento",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Cancelar",
      }),
    ).not.toBeInTheDocument();
  });

  it("estornada não oferece transição", () => {
    render(
      <MovimentacoesFinanceirasList
        movimentacoes={[
          {
            ...base,
            status: "ESTORNADO",
          },
        ]}
        onSelect={vi.fn()}
        onPay={vi.fn()}
        onCancel={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Registrar pagamento",
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("button", {
        name: "Cancelar",
      }),
    ).not.toBeInTheDocument();
  });

  it("preserva editar e detalhes", () => {
    render(
      <MovimentacoesFinanceirasList
        movimentacoes={[
          {
            ...base,
            status: "PENDENTE",
          },
        ]}
        onSelect={vi.fn()}
        onEdit={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Editar",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Ver detalhes",
      }),
    ).toBeInTheDocument();
  });
});
