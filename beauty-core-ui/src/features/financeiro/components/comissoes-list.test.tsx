import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ComissoesList } from "@/features/financeiro/components/comissoes-list";

afterEach(() => {
  cleanup();
});

const base = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
  valorServico: "200.00",
  percentual: "10.00",
  valorComissao: "20.00",
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("ComissoesList", () => {
  it("exibe valor calculado recebido da API", () => {
    render(
      <ComissoesList
        comissoes={[
          {
            ...base,
            status: "PENDENTE",
          },
        ]}
        onPay={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(screen.getByText("R$ 20,00")).toBeInTheDocument();

    expect(screen.getByText(/10%/)).toBeInTheDocument();
  });

  it("oferece pagamento somente para pendente", () => {
    render(
      <ComissoesList
        comissoes={[
          {
            ...base,
            status: "PENDENTE",
          },
        ]}
        onPay={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", {
        name: "Pagar comissão",
      }),
    ).toBeInTheDocument();
  });

  it("não oferece pagamento para paga", () => {
    render(
      <ComissoesList
        comissoes={[
          {
            ...base,
            status: "PAGO",
          },
        ]}
        onPay={vi.fn()}
        onSelect={vi.fn()}
      />,
    );

    expect(
      screen.queryByRole("button", {
        name: "Pagar comissão",
      }),
    ).not.toBeInTheDocument();
  });
});
