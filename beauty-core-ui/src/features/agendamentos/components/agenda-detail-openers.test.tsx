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

import { AgendaCalendarEvent } from "@/features/agendamentos/components/agenda-calendar-event";
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
    "2026-08-29T15:00:00.000Z",
  dataHoraFim:
    "2026-08-29T15:45:00.000Z",
  observacoes: null,
  status: "CONFIRMADO",
  createdAt:
    "2026-08-20T12:00:00.000Z",
  updatedAt:
    "2026-08-29T14:00:00.000Z",

  cliente: {
    id:
      "550e8400-e29b-41d4-a716-446655440001",
    nome: "Maria",
    telefone:
      "83999999999",
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

describe("agenda detail openers", () => {
  it("abre detalhes pelo evento do calendario", () => {
    const onSelect =
      vi.fn();

    render(
      <AgendaCalendarEvent
        item={item}
        onSelect={onSelect}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name:
            "Ver detalhes do agendamento de Maria",
        },
      ),
    );

    expect(
      onSelect,
    ).toHaveBeenCalledWith(
      item,
    );
  });

  it("abre detalhes pela lista", () => {
    const onSelect =
      vi.fn();

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
        onSelect={onSelect}
      />,
    );

    fireEvent.click(
      screen.getByRole(
        "button",
        {
          name: "Ver detalhes",
        },
      ),
    );

    expect(
      onSelect,
    ).toHaveBeenCalledWith(
      item,
    );
  });
});