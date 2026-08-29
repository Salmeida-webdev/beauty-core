import { queryOptions } from "@tanstack/react-query";

import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import {
  getAgendaClienteOptions,
  getAgendaProfissionalOptions,
  getAgendaServicoOptions,
  getAgendaUnidadeOptions,
} from "@/features/agendamentos/services/agendamentos-options-api";

export const AGENDA_OPTIONS_STALE_TIME =
  60_000;

export const agendamentosOptionsQueryOptions = {
  clientes: (search: string) =>
    queryOptions({
      queryKey: [
        ...agendamentosKeys.all,
        "options",
        "clientes",
        search,
      ] as const,
      queryFn: () =>
        getAgendaClienteOptions(search),
      staleTime: AGENDA_OPTIONS_STALE_TIME,
    }),

  servicos: () =>
    queryOptions({
      queryKey: [
        ...agendamentosKeys.all,
        "options",
        "servicos",
      ] as const,
      queryFn: getAgendaServicoOptions,
      staleTime: AGENDA_OPTIONS_STALE_TIME,
    }),

  profissionais: (search: string) =>
    queryOptions({
      queryKey: [
        ...agendamentosKeys.all,
        "options",
        "profissionais",
        search,
      ] as const,
      queryFn: () =>
        getAgendaProfissionalOptions(search),
      staleTime: AGENDA_OPTIONS_STALE_TIME,
    }),

  unidades: (search: string) =>
    queryOptions({
      queryKey: [
        ...agendamentosKeys.all,
        "options",
        "unidades",
        search,
      ] as const,
      queryFn: () =>
        getAgendaUnidadeOptions(search),
      staleTime: AGENDA_OPTIONS_STALE_TIME,
    }),
};