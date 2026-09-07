import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildAgendaSearchParams,
  parseAgendaUrlState,
} from "@/features/agendamentos/utils/agenda-url";

const ids = {
  cliente:
    "550e8400-e29b-41d4-a716-446655440001",

  profissional:
    "550e8400-e29b-41d4-a716-446655440002",

  servico:
    "550e8400-e29b-41d4-a716-446655440003",

  unidade:
    "550e8400-e29b-41d4-a716-446655440004",
};

describe("Agenda URL hardening", () => {
  it("faz round-trip de todos os filtros suportados", () => {
    const state = {
      view: "list" as const,
      date: "2026-08-29",
      status:
        "EM_ANDAMENTO" as const,
      clienteId:
        ids.cliente,
      profissionalId:
        ids.profissional,
      servicoId:
        ids.servico,
      unidadeId:
        ids.unidade,
    };

    const params =
      buildAgendaSearchParams(
        state,
      );

    expect(
      parseAgendaUrlState(
        params,
        "2026-01-01",
      ),
    ).toEqual(
      state,
    );
  });

  it("remove UUIDs invalidos sem contaminar estado", () => {
    const params =
      new URLSearchParams({
        view: "day",
        date: "2026-08-29",
        clienteId: "cliente-1",
        profissionalId:
          "profissional-1",
        servicoId: "servico-1",
        unidadeId: "unidade-1",
      });

    expect(
      parseAgendaUrlState(
        params,
        "2026-01-01",
      ),
    ).toEqual({
      view: "day",
      date: "2026-08-29",
      status: undefined,
      clienteId: undefined,
      profissionalId:
        undefined,
      servicoId: undefined,
      unidadeId: undefined,
    });
  });

  it("normaliza view, data e status invalidos", () => {
    const params =
      new URLSearchParams({
        view: "month",
        date: "2026-02-31",
        status: "AGENDADO",
      });

    expect(
      parseAgendaUrlState(
        params,
        "2026-01-15",
      ),
    ).toEqual({
      view: "week",
      date: "2026-01-15",
      status: undefined,
      clienteId: undefined,
      profissionalId:
        undefined,
      servicoId: undefined,
      unidadeId: undefined,
    });
  });

  it("nao serializa filtros indefinidos", () => {
    const params =
      buildAgendaSearchParams({
        view: "week",
        date: "2026-08-29",
      });

    expect(
      params.get("view"),
    ).toBe("week");

    expect(
      params.get("date"),
    ).toBe("2026-08-29");

    expect(
      params.has("status"),
    ).toBe(false);

    expect(
      params.has("clienteId"),
    ).toBe(false);

    expect(
      params.has(
        "profissionalId",
      ),
    ).toBe(false);

    expect(
      params.has("servicoId"),
    ).toBe(false);

    expect(
      params.has("unidadeId"),
    ).toBe(false);
  });
});