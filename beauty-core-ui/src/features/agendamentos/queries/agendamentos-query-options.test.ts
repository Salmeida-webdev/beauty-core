import {
  describe,
  expect,
  it,
} from "vitest";

import {
  AGENDAMENTOS_STALE_TIME,
  agendamentosQueryOptions,
} from "@/features/agendamentos/queries/agendamentos-query-options";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";

describe("agendamentos query options", () => {
  it("configura listagem operacional", () => {
    const filters = {
      status: "CONFIRMADO",
    } as const;

    const options =
      agendamentosQueryOptions.list(
        filters,
        true,
      );

    expect(options.queryKey).toEqual(
      agendamentosKeys.list(filters),
    );

    expect(options.enabled).toBe(true);
    expect(options.retry).toBe(false);

    expect(options.staleTime).toBe(
      AGENDAMENTOS_STALE_TIME.list,
    );
  });

  it("isola calendario por range e filtros", () => {
    const range = {
      dataInicio:
        "2026-08-24T00:00:00.000Z",
      dataFim:
        "2026-08-30T23:59:59.999Z",
    };

    const filters = {
      profissionalId:
        "550e8400-e29b-41d4-a716-446655440002",
    };

    const options =
      agendamentosQueryOptions.calendar(
        range,
        filters,
        true,
      );

    expect(options.queryKey).toEqual(
      agendamentosKeys.calendar(
        range,
        filters,
      ),
    );

    expect(options.enabled).toBe(true);
    expect(options.retry).toBe(false);

    expect(options.staleTime).toBe(
      AGENDAMENTOS_STALE_TIME.calendar,
    );
  });

  it("desabilita detalhe sem id", () => {
    const options =
      agendamentosQueryOptions.detail(
        "",
        true,
      );

    expect(options.enabled).toBe(
      false,
    );

    expect(options.retry).toBe(
      false,
    );

    expect(options.staleTime).toBe(
      AGENDAMENTOS_STALE_TIME.detail,
    );
  });
});