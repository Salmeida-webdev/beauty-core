import type {
  AgendaQueryFilters,
  AgendaUrlState,
} from "@/features/agendamentos/types/agendamentos-types";

export type AgendaOperationalFilters = Pick<
  AgendaUrlState,
  | "status"
  | "clienteId"
  | "profissionalId"
  | "servicoId"
  | "unidadeId"
>;

export function agendaUrlStateToFilters(
  state: AgendaUrlState,
): AgendaOperationalFilters {
  return {
    status: state.status,
    clienteId: state.clienteId,
    profissionalId: state.profissionalId,
    servicoId: state.servicoId,
    unidadeId: state.unidadeId,
  };
}

export function getAgendaActiveFilterCount(
  filters: AgendaOperationalFilters,
): number {
  return [
    filters.status,
    filters.clienteId,
    filters.profissionalId,
    filters.servicoId,
    filters.unidadeId,
  ].filter(Boolean).length;
}

export function hasAgendaOperationalFilters(
  filters: AgendaOperationalFilters,
): boolean {
  return getAgendaActiveFilterCount(filters) > 0;
}

export function buildAgendaOperationalQuery(
  filters: AgendaOperationalFilters,
): AgendaQueryFilters {
  return {
    ...(filters.status
      ? { status: filters.status }
      : {}),
    ...(filters.clienteId
      ? { clienteId: filters.clienteId }
      : {}),
    ...(filters.profissionalId
      ? {
          profissionalId:
            filters.profissionalId,
        }
      : {}),
    ...(filters.servicoId
      ? { servicoId: filters.servicoId }
      : {}),
    ...(filters.unidadeId
      ? { unidadeId: filters.unidadeId }
      : {}),
  };
}