import { describe, expect, it } from "vitest";

import {
  canAccessSchedule,
  canCancelAppointment,
  canChangeAppointmentStatus,
  canCreateAppointment,
  canEditAppointment,
  canRescheduleAppointment,
} from "@/features/agendamentos/permissions/agendamentos-permissions";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import {
  AGENDAMENTO_STATUSES,
  AGENDA_VIEWS,
} from "@/features/agendamentos/types/agendamentos-types";
import {
  formatDuration,
  getAgendaRange,
  parseAgendaDateKey,
  shiftAgendaDate,
} from "@/features/agendamentos/utils/agendamentos-date";
import {
  buildAgendaSearchParams,
  parseAgendaUrlState,
} from "@/features/agendamentos/utils/agenda-url";
import { getAgendamentoStatusMeta } from "@/features/agendamentos/utils/agendamentos-status";

describe("fundacoes de Agendamentos", () => {
  it("preserva exatamente os seis status reais", () => {
    expect(AGENDAMENTO_STATUSES).toEqual([
      "PENDENTE",
      "CONFIRMADO",
      "EM_ANDAMENTO",
      "CONCLUIDO",
      "CANCELADO",
      "FALTOU",
    ]);
  });

  it("define day, week e list", () => {
    expect(AGENDA_VIEWS).toEqual([
      "day",
      "week",
      "list",
    ]);
  });

  it("alinha capacidades as quatro roles reais", () => {
    for (const role of [
      "ADMIN",
      "GERENTE",
      "RECEPCAO",
      "PROFISSIONAL",
    ] as const) {
      expect(canAccessSchedule(role)).toBe(true);
      expect(canCreateAppointment(role)).toBe(true);
      expect(canEditAppointment(role)).toBe(true);
      expect(canRescheduleAppointment(role)).toBe(true);
      expect(canCancelAppointment(role)).toBe(true);
      expect(canChangeAppointmentStatus(role)).toBe(true);
    }

    expect(canAccessSchedule("SUPER_ADMIN")).toBe(false);
  });

  it("mapeia status semanticamente", () => {
    expect(
      getAgendamentoStatusMeta("CONFIRMADO"),
    ).toEqual({
      label: "Confirmado",
      tone: "info",
    });

    expect(
      getAgendamentoStatusMeta("CANCELADO"),
    ).toEqual({
      label: "Cancelado",
      tone: "danger",
    });
  });

  it("rejeita date keys invalidas", () => {
    expect(
      parseAgendaDateKey("2026-08-29"),
    ).not.toBeNull();

    expect(
      parseAgendaDateKey("2026-02-31"),
    ).toBeNull();

    expect(
      parseAgendaDateKey("29/08/2026"),
    ).toBeNull();
  });

  it("navega por dia e semana", () => {
    expect(
      shiftAgendaDate(
        "2026-08-29",
        "day",
        1,
      ),
    ).toBe("2026-08-30");

    expect(
      shiftAgendaDate(
        "2026-08-29",
        "week",
        1,
      ),
    ).toBe("2026-09-05");
  });

  it("gera range semanal iniciando segunda-feira", () => {
    const range = getAgendaRange(
      "2026-08-29",
      "week",
    );

    const start = new Date(range.dataInicio);
    const end = new Date(range.dataFim);

    expect(start.getTime()).toBeLessThan(
      end.getTime(),
    );

    expect(start.getDay()).toBe(1);
  });

  it("formata duracao", () => {
    expect(formatDuration(45)).toBe("45 min");
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(90)).toBe("1h 30min");
  });

  it("normaliza URL state", () => {
    const valid = new URLSearchParams(
      "view=week&date=2026-08-29&status=CONFIRMADO",
    );

    expect(
      parseAgendaUrlState(
        valid,
        "2026-08-29",
      ),
    ).toEqual({
      view: "week",
      date: "2026-08-29",
      status: "CONFIRMADO",
      clienteId: undefined,
      profissionalId: undefined,
      servicoId: undefined,
      unidadeId: undefined,
    });

    const invalid = new URLSearchParams(
      "view=month&date=2026-02-31&status=AGENDADO",
    );

    expect(
      parseAgendaUrlState(
        invalid,
        "2026-08-29",
      ),
    ).toEqual({
      view: "week",
      date: "2026-08-29",
      status: undefined,
      clienteId: undefined,
      profissionalId: undefined,
      servicoId: undefined,
      unidadeId: undefined,
    });
  });

  it("serializa URL reproduzivel", () => {
    const params = buildAgendaSearchParams({
      view: "day",
      date: "2026-08-29",
      status: "PENDENTE",
    });

    expect(params.get("view")).toBe("day");
    expect(params.get("date")).toBe(
      "2026-08-29",
    );
    expect(params.get("status")).toBe(
      "PENDENTE",
    );
  });

  it("segmenta query keys", () => {
    expect(
      agendamentosKeys.list({
        status: "CONFIRMADO",
      }),
    ).toEqual([
      "agendamentos",
      "list",
      {
        status: "CONFIRMADO",
      },
    ]);

    expect(
      agendamentosKeys.detail("abc"),
    ).toEqual([
      "agendamentos",
      "detail",
      "abc",
    ]);
  });
});