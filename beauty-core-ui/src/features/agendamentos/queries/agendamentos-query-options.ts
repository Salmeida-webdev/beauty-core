import {
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import type {
  AgendaQueryFilters,
} from "@/features/agendamentos/types/agendamentos-types";

export const AGENDAMENTOS_STALE_TIME = {
  list: 30_000,
  calendar: 30_000,
  detail: 60_000,
} as const;

type CalendarRange = Pick<
  AgendaQueryFilters,
  "dataInicio" | "dataFim"
>;

type CalendarFilters = Omit<
  AgendaQueryFilters,
  "dataInicio" | "dataFim"
>;

export const agendamentosQueryOptions = {
  list: (
    filters: AgendaQueryFilters,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        agendamentosKeys.list(filters),
      queryFn: () =>
        agendamentosApi.list(filters),
      enabled,
      staleTime:
        AGENDAMENTOS_STALE_TIME.list,
      retry: false,
      placeholderData: keepPreviousData,
    }),

  calendar: (
    range: CalendarRange,
    filters: CalendarFilters,
    enabled: boolean,
  ) => {
    const requestFilters: AgendaQueryFilters = {
      page: 1,
      limit: 100,
      orderBy: "dataHoraInicio",
      orderDirection: "asc",
      ...filters,
      ...range,
    };

    return queryOptions({
      queryKey:
        agendamentosKeys.calendar(
          range,
          filters,
        ),
      queryFn: () =>
        agendamentosApi.list(
          requestFilters,
        ),
      enabled,
      staleTime:
        AGENDAMENTOS_STALE_TIME.calendar,
      retry: false,
      placeholderData: keepPreviousData,
    });
  },

  detail: (
    agendamentoId: string,
    enabled: boolean,
  ) =>
    queryOptions({
      queryKey:
        agendamentosKeys.detail(
          agendamentoId,
        ),
      queryFn: () =>
        agendamentosApi.detail(
          agendamentoId,
        ),
      enabled:
        enabled &&
        agendamentoId.length > 0,
      staleTime:
        AGENDAMENTOS_STALE_TIME.detail,
      retry: false,
    }),
} as const;