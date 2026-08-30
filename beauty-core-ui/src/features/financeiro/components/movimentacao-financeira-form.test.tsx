import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { MovimentacaoFinanceiraForm } from "@/features/financeiro/components/movimentacao-financeira-form";

afterEach(() => {
  cleanup();
});

const categorias = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    nome: "Serviços",
    tipo: "RECEITA" as const,
    ativo: true,
    createdAt: "2026-08-29T10:00:00.000Z",
    updatedAt: "2026-08-29T10:00:00.000Z",
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    nome: "Despesas",
    tipo: "DESPESA" as const,
    ativo: true,
    createdAt: "2026-08-29T10:00:00.000Z",
    updatedAt: "2026-08-29T10:00:00.000Z",
  },
];

describe("MovimentacaoFinanceiraForm", () => {
  it("não expõe status", () => {
    render(
      <MovimentacaoFinanceiraForm
        categorias={categorias}
        submitLabel="Salvar"
        onSubmit={vi.fn()}
      />,
    );

    expect(screen.queryByLabelText("Status")).not.toBeInTheDocument();
  });

  it("expõe sete formas reais", () => {
    render(
      <MovimentacaoFinanceiraForm
        categorias={categorias}
        submitLabel="Salvar"
        onSubmit={vi.fn()}
      />,
    );

    const forma = screen.getByLabelText("Forma de pagamento");

    expect(forma.querySelectorAll("option")).toHaveLength(7);
  });

  it("não exibe relações para despesa", () => {
    render(
      <MovimentacaoFinanceiraForm
        categorias={categorias}
        defaultValues={{
          categoriaId: categorias[1].id,
          clienteId: "",
          agendamentoId: "",
          descricao: "Energia",
          tipo: "DESPESA",
          valor: "150,00",
          formaPagamento: "PIX",
          observacoes: "",
        }}
        submitLabel="Salvar"
        onSubmit={vi.fn()}
      />,
    );

    expect(
      screen.queryByLabelText("Cliente ID (opcional)"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText("Agendamento ID (opcional)"),
    ).not.toBeInTheDocument();
  });
});
