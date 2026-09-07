import {
  describe,
  expect,
  it,
} from "vitest";

import {
  buildAgendaOperationalQuery,
  getAgendaActiveFilterCount,
  hasAgendaOperationalFilters,
} from "@/features/agendamentos/utils/agenda-filters";
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

describe("agenda filters e URL state", () => {
  it("conta somente filtros ativos", () => {
    expect(
      getAgendaActiveFilterCount({
        status: "CONFIRMADO",
        clienteId: undefined,
        profissionalId:
          ids.profissional,
        servicoId: undefined,
        unidadeId: undefined,
      }),
    ).toBe(2);
  });

  it("detecta ausencia de filtros", () => {
    expect(
      hasAgendaOperationalFilters({
        status: undefined,
        clienteId: undefined,
        profissionalId:
          undefined,
        servicoId: undefined,
        unidadeId: undefined,
      }),
    ).toBe(false);
  });

  it("monta somente filtros suportados", () => {
    const result =
      buildAgendaOperationalQuery({
        status: "PENDENTE",
        clienteId: ids.cliente,
        profissionalId:
          undefined,
        servicoId:
          ids.servico,
        unidadeId:
          undefined,
      });

    expect(result).toEqual({
      status: "PENDENTE",
      clienteId: ids.cliente,
      servicoId: ids.servico,
    });

    expect(result).not.toHaveProperty(
      "empresaId",
    );
  });

  it("serializa e restaura URL completa", () => {
    const params =
      buildAgendaSearchParams({
        view: "list",
        date: "2026-08-29",
        status: "CONFIRMADO",
        clienteId: ids.cliente,
        profissionalId:
          ids.profissional,
        servicoId: ids.servico,
        unidadeId: ids.unidade,
      });

    expect(
      parseAgendaUrlState(
        params,
        "2026-08-29",
      ),
    ).toEqual({
      view: "list",
      date: "2026-08-29",
      status: "CONFIRMADO",
      clienteId: ids.cliente,
      profissionalId:
        ids.profissional,
      servicoId: ids.servico,
      unidadeId: ids.unidade,
    });
  });
});