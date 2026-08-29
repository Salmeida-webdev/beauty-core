import {
  describe,
  expect,
  it,
} from "vitest";

import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";
import {
  buildAgendaEventAccessibleName,
  getAgendaCalendarDays,
  groupAgendaEventsByDate,
  shiftAgendaCalendarDate,
} from "@/features/agendamentos/utils/agenda-calendar";

function appointment(
  id: string,
  start: string,
): AgendamentoListItem {
  return {
    id,
    clienteId:
      "550e8400-e29b-41d4-a716-446655440001",
    profissionalId:
      "550e8400-e29b-41d4-a716-446655440002",
    servicoId:
      "550e8400-e29b-41d4-a716-446655440003",
    unidadeId:
      "550e8400-e29b-41d4-a716-446655440004",
    dataHoraInicio: start,
    dataHoraFim:
      new Date(
        new Date(
          start,
        ).getTime() +
          45 * 60 * 1000,
      ).toISOString(),
    observacoes: null,
    status: "CONFIRMADO",
    createdAt:
      "2026-08-20T12:00:00.000Z",
    updatedAt:
      "2026-08-20T12:00:00.000Z",
    cliente: {
      id: "550e8400-e29b-41d4-a716-446655440001",
      nome: "Maria",
      telefone: "83999999999",
    },
    profissional: {
      id: "550e8400-e29b-41d4-a716-446655440002",
      nome: "Ana",
    },
    servico: {
      id: "550e8400-e29b-41d4-a716-446655440003",
      nome: "Corte",
      preco: "80.00",
      duracaoMinutos: 45,
    },
    unidade: {
      id: "550e8400-e29b-41d4-a716-446655440004",
      nome: "Centro",
    },
  };
}

describe("agenda calendar utils", () => {
  it("gera somente o dia na visao diaria", () => {
    const days =
      getAgendaCalendarDays(
        "2026-08-29",
        "day",
      );

    expect(days).toHaveLength(
      1,
    );
  });

  it("gera sete dias e inicia semana na segunda", () => {
    const days =
      getAgendaCalendarDays(
        "2026-08-29",
        "week",
      );

    expect(days).toHaveLength(
      7,
    );

    expect(
      days[0].getDay(),
    ).toBe(1);
  });

  it("navega por dia", () => {
    expect(
      shiftAgendaCalendarDate(
        "2026-08-29",
        "day",
        1,
      ),
    ).toBe(
      "2026-08-30",
    );
  });

  it("navega por semana", () => {
    expect(
      shiftAgendaCalendarDate(
        "2026-08-29",
        "week",
        1,
      ),
    ).toBe(
      "2026-09-05",
    );
  });

  it("agrupa e ordena eventos reais", () => {
    const later =
      appointment(
        "550e8400-e29b-41d4-a716-446655440010",
        "2026-08-29T15:00:00.000Z",
      );

    const earlier =
      appointment(
        "550e8400-e29b-41d4-a716-446655440011",
        "2026-08-29T12:00:00.000Z",
      );

    const grouped =
      groupAgendaEventsByDate([
        later,
        earlier,
      ]);

    const values = [
      ...grouped.values(),
    ].flat();

    expect(
      values.map(
        (item) => item.id,
      ),
    ).toEqual([
      earlier.id,
      later.id,
    ]);
  });

  it("gera nome acessivel com dados reais", () => {
    const item =
      appointment(
        "550e8400-e29b-41d4-a716-446655440012",
        "2026-08-29T12:00:00.000Z",
      );

    const name =
      buildAgendaEventAccessibleName(
        item,
      );

    expect(name).toContain(
      "Maria",
    );

    expect(name).toContain(
      "Corte",
    );

    expect(name).toContain(
      "Ana",
    );

    expect(name).toContain(
      "Centro",
    );

    expect(name).toContain(
      "Confirmado",
    );
  });
});