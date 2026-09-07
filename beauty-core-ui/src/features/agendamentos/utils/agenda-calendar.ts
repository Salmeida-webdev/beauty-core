import {
  addDays,
  addWeeks,
  format,
  parseISO,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import type { AgendamentoListItem } from "@/features/agendamentos/types/agendamentos-api.types";

export type AgendaCalendarMode =
  | "day"
  | "week";

export const AGENDA_CALENDAR_MODES = [
  "day",
  "week",
] as const satisfies readonly AgendaCalendarMode[];

export function agendaDateKey(
  date: Date,
): string {
  return format(
    date,
    "yyyy-MM-dd",
  );
}

export function parseAgendaCalendarDate(
  dateKey: string,
): Date {
  return parseISO(dateKey);
}

export function getAgendaCalendarDays(
  dateKey: string,
  mode: AgendaCalendarMode,
): Date[] {
  const reference =
    parseAgendaCalendarDate(dateKey);

  if (mode === "day") {
    return [
      reference,
    ];
  }

  const start = startOfWeek(
    reference,
    {
      weekStartsOn: 1,
    },
  );

  return Array.from(
    {
      length: 7,
    },
    (_, index) =>
      addDays(
        start,
        index,
      ),
  );
}

export function shiftAgendaCalendarDate(
  dateKey: string,
  mode: AgendaCalendarMode,
  direction: -1 | 1,
): string {
  const reference =
    parseAgendaCalendarDate(dateKey);

  const shifted =
    mode === "day"
      ? addDays(
          reference,
          direction,
        )
      : addWeeks(
          reference,
          direction,
        );

  return agendaDateKey(shifted);
}

export function formatAgendaPeriodLabel(
  dateKey: string,
  mode: AgendaCalendarMode,
): string {
  const days =
    getAgendaCalendarDays(
      dateKey,
      mode,
    );

  if (mode === "day") {
    return format(
      days[0],
      "EEEE, d 'de' MMMM 'de' yyyy",
      {
        locale: ptBR,
      },
    );
  }

  const first =
    days[0];

  const last =
    days[days.length - 1];

  if (
    first.getMonth() ===
      last.getMonth() &&
    first.getFullYear() ===
      last.getFullYear()
  ) {
    return `${format(
      first,
      "d",
      {
        locale: ptBR,
      },
    )} a ${format(
      last,
      "d 'de' MMMM 'de' yyyy",
      {
        locale: ptBR,
      },
    )}`;
  }

  return `${format(
    first,
    "d 'de' MMM",
    {
      locale: ptBR,
    },
  )} a ${format(
    last,
    "d 'de' MMM 'de' yyyy",
    {
      locale: ptBR,
    },
  )}`;
}

export function formatAgendaDayHeading(
  date: Date,
): string {
  return format(
    date,
    "EEE, dd/MM",
    {
      locale: ptBR,
    },
  );
}

export function formatAgendaEventTime(
  isoDate: string,
): string {
  return format(
    new Date(isoDate),
    "HH:mm",
  );
}

export function agendaEventDateKey(
  item: AgendamentoListItem,
): string {
  return agendaDateKey(
    new Date(
      item.dataHoraInicio,
    ),
  );
}

export function sortAgendaEvents(
  items: readonly AgendamentoListItem[],
): AgendamentoListItem[] {
  return [
    ...items,
  ].sort(
    (
      left,
      right,
    ) =>
      new Date(
        left.dataHoraInicio,
      ).getTime() -
      new Date(
        right.dataHoraInicio,
      ).getTime(),
  );
}

export function groupAgendaEventsByDate(
  items: readonly AgendamentoListItem[],
): ReadonlyMap<
  string,
  AgendamentoListItem[]
> {
  const grouped =
    new Map<
      string,
      AgendamentoListItem[]
    >();

  for (const item of sortAgendaEvents(items)) {
    const key =
      agendaEventDateKey(
        item,
      );

    const current =
      grouped.get(key) ?? [];

    current.push(item);

    grouped.set(
      key,
      current,
    );
  }

  return grouped;
}

export function formatAgendaStatusLabel(
  status: AgendamentoListItem["status"],
): string {
  switch (status) {
    case "PENDENTE":
      return "Pendente";
    case "CONFIRMADO":
      return "Confirmado";
    case "EM_ANDAMENTO":
      return "Em andamento";
    case "CONCLUIDO":
      return "Concluido";
    case "CANCELADO":
      return "Cancelado";
    case "FALTOU":
      return "Faltou";
  }
}

export function buildAgendaEventAccessibleName(
  item: AgendamentoListItem,
): string {
  const start =
    formatAgendaEventTime(
      item.dataHoraInicio,
    );

  const end =
    formatAgendaEventTime(
      item.dataHoraFim,
    );

  return [
    `${start} a ${end}`,
    item.cliente.nome,
    item.servico.nome,
    item.profissional.nome,
    item.unidade.nome,
    formatAgendaStatusLabel(
      item.status,
    ),
  ].join(", ");
}