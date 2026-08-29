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

import { AgendaCalendar } from "@/features/agendamentos/components/agenda-calendar";
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

describe("AgendaCalendar", () => {
  it("renderiza evento real", () => {
    render(
      <AgendaCalendar
        dateKey="2026-08-29"
        mode="day"
        items={[
          item,
        ]}
        total={1}
        isFetching={false}
        onModeChange={vi.fn()}
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByText(
        "Maria",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Corte",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Confirmado",
      ),
    ).toBeInTheDocument();
  });

  it("permite trocar a visualizacao", () => {
    const onModeChange =
      vi.fn();

    render(
      <AgendaCalendar
        dateKey="2026-08-29"
        mode="week"
        items={[
          item,
        ]}
        total={1}
        isFetching={false}
        onModeChange={
          onModeChange
        }
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Dia",
        },
      ),
    );

    expect(
      onModeChange,
    ).toHaveBeenCalledWith(
      "day",
    );
  });

  it("executa navegacao temporal", () => {
    const previous =
      vi.fn();

    const today =
      vi.fn();

    const next =
      vi.fn();

    render(
      <AgendaCalendar
        dateKey="2026-08-29"
        mode="week"
        items={[
          item,
        ]}
        total={1}
        isFetching={false}
        onModeChange={vi.fn()}
        onPrevious={
          previous
        }
        onToday={
          today
        }
        onNext={
          next
        }
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Semana anterior",
        },
      ),
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Hoje",
        },
      ),
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Proxima semana",
        },
      ),
    );

    expect(previous).toHaveBeenCalledTimes(
      1,
    );

    expect(today).toHaveBeenCalledTimes(
      1,
    );

    expect(next).toHaveBeenCalledTimes(
      1,
    );
  });

  it("mostra empty state oficial", () => {
    render(
      <AgendaCalendar
        dateKey="2026-08-29"
        mode="day"
        items={[]}
        total={0}
        isFetching={false}
        onModeChange={vi.fn()}
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByTestId(
        "agenda-calendar-empty",
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Nenhum agendamento neste periodo",
      ),
    ).toBeInTheDocument();
  });

  it("avisa quando o contrato paginado truncou o periodo", () => {
    render(
      <AgendaCalendar
        dateKey="2026-08-29"
        mode="day"
        items={[
          item,
        ]}
        total={101}
        isFetching={false}
        onModeChange={vi.fn()}
        onPrevious={vi.fn()}
        onToday={vi.fn()}
        onNext={vi.fn()}
      />,
    );

    expect(
      screen.getByRole(
        "status",
      ),
    ).toHaveTextContent(
      "101 agendamentos",
    );
  });
});