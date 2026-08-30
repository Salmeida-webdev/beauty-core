import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MovimentacoesFinanceirasFilters } from "@/features/financeiro/components/movimentacoes-financeiras-filters";

afterEach(() => {
  cleanup();
});

const categoria = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  nome: "Serviços",
  tipo: "RECEITA" as const,
  ativo: true,
  createdAt: "2026-08-29T10:00:00.000Z",
  updatedAt: "2026-08-29T10:00:00.000Z",
};

describe("MovimentacoesFinanceirasFilters", () => {
  it("expõe apenas filtros visuais suportados", () => {
    render(
      <MovimentacoesFinanceirasFilters
        query={{}}
        categorias={[categoria]}
        onChange={vi.fn()}
        onClear={vi.fn()}
      />,
    );

    expect(screen.getByLabelText("Categoria")).toBeInTheDocument();

    expect(screen.getByLabelText("Tipo")).toBeInTheDocument();

    expect(screen.getByLabelText("Status")).toBeInTheDocument();

    expect(screen.queryByLabelText("Período")).not.toBeInTheDocument();

    expect(screen.getByText(/Período não é suportado/i)).toBeInTheDocument();
  });

  it("altera tipo via contrato controlado", () => {
    const onChange = vi.fn();

    render(
      <MovimentacoesFinanceirasFilters
        query={{}}
        categorias={[categoria]}
        onChange={onChange}
        onClear={vi.fn()}
      />,
    );

    fireEvent.change(screen.getByLabelText("Tipo"), {
      target: {
        value: "RECEITA",
      },
    });

    expect(onChange).toHaveBeenCalledWith({
      tipo: "RECEITA",
    });
  });

  it("permite remover filtro profundo de cliente", () => {
    const onChange = vi.fn();

    render(
      <MovimentacoesFinanceirasFilters
        query={{
          clienteId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        }}
        categorias={[categoria]}
        onChange={onChange}
        onClear={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Remover cliente",
      }),
    );

    expect(onChange).toHaveBeenCalledWith({
      clienteId: undefined,
    });
  });
});
