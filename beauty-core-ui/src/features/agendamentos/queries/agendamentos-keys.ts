import type { AgendaQueryFilters } from "@/features/agendamentos/types/agendamentos-types";

export const agendamentosKeys = {
  all: ["agendamentos"] as const,

  lists: () => [...agendamentosKeys.all, "list"] as const,

  list: (filters: AgendaQueryFilters) =>
    [...agendamentosKeys.lists(), filters] as const,

  calendars: () => [...agendamentosKeys.all, "calendar"] as const,

  calendar: (
    range: Pick<AgendaQueryFilters, "dataInicio" | "dataFim">,
    filters: Omit<
      AgendaQueryFilters,
      "dataInicio" | "dataFim"
    > = {},
  ) =>
    [...agendamentosKeys.calendars(), range, filters] as const,

  details: () => [...agendamentosKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...agendamentosKeys.details(), id] as const,
};