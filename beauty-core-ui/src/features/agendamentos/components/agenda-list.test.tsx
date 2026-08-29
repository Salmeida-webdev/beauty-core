import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { AgendaList } from "@/features/agendamentos/components/agenda-list";
import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";

const item: AgendamentoListItem = {
  id:
    "550e8400-e29b-41d4-a716-446655440000",
  clienteId:
    "550e8400-e29b-41d4-a716-446655440001",
  profissionalId:
    "550e8400-e29b-41d4-a716-446655440002",
  servicoId:
    "550e8400-e29b-41d4-a716-446655440003",
  unidadeId:
    "550e8400-e29b-41d4-a716-446655440004",
  dataHoraInicio:
    "2026-08-29T12:00:00.000Z",
  dataHoraFim:
    "2026-08-29T12:45:00.000Z",
  observacoes: null,
  status: "CONFIRMADO",
  createdAt:
    "2026-08-20T12:00:00.000Z",
  updatedAt:
    "2026-08-20T12:00:00.000Z",
  cliente: {
    id:
      "550e8400-e29b-41d4-a716-446655440001",
    nome: "Maria",
    telefone: "83999999999",
  },
  profissional: {
    id:
      "550e8400-e29b-41d4-a716-446655440002",
    nome: "Ana",
  },
  servico: {
    id:
      "550e8400-e29b-41d4-a716-446655440003",
    nome: "Corte",
    preco: "80.00",
    duracaoMinutos: 45,
  },
  unidade: {
    id:
      "550e8400-e29b-41d4-a716-446655440004",
    nome: "Centro",
  },
};

afterEach(() => {
  cleanup();
});

describe("AgendaList", () => {
  it("renderiza dados reais", () => {
    render(
      <AgendaList
        items={[item]}
        meta={{
          page: 1,
          limit: 20,
          total: 1,
          totalPages: 1,
        }}
        isFetching={false}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />,
    );

    expect(
      screen.getByText("Maria"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Corte"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Ana"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Centro"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Confirmado"),
    ).toBeInTheDocument();
  });

  it("pagina para frente", () => {
    const next = vi.fn();

    render(
      <AgendaList
        items={[item]}
        meta={{
          page: 1,
          limit: 20,
          total: 30,
          totalPages: 2,
        }}
        isFetching={false}
        onPreviousPage={vi.fn()}
        onNextPage={next}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Proxima",
        },
      ),
    );

    expect(next).toHaveBeenCalledTimes(
      1,
    );
  });

  it("desabilita anterior na primeira pagina", () => {
    render(
      <AgendaList
        items={[item]}
        meta={{
          page: 1,
          limit: 20,
          total: 30,
          totalPages: 2,
        }}
        isFetching={false}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "button",
        {
          name: "Anterior",
        },
      ),
    ).toBeDisabled();
  });

  it("renderiza estado vazio", () => {
    render(
      <AgendaList
        items={[]}
        meta={{
          page: 1,
          limit: 20,
          total: 0,
          totalPages: 0,
        }}
        isFetching={false}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Nenhum agendamento na lista",
      ),
    ).toBeInTheDocument();
  });
});