import {
  addDays,
  addWeeks,
  endOfDay,
  endOfWeek,
  format,
  isValid,
  parse,
  parseISO,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { ptBR } from "date-fns/locale";

import type { AgendaView } from "@/features/agendamentos/types/agendamentos-types";

const DATE_KEY_FORMAT = "yyyy-MM-dd";

export function formatAgendaDateKey(date: Date): string {
  return format(date, DATE_KEY_FORMAT);
}

export function parseAgendaDateKey(value: string): Date | null {
  const parsed = parse(
    value,
    DATE_KEY_FORMAT,
    new Date(),
  );

  if (!isValid(parsed)) {
    return null;
  }

  if (formatAgendaDateKey(parsed) !== value) {
    return null;
  }

  return parsed;
}

export function formatAppointmentDate(value: string): string {
  return format(
    parseISO(value),
    "dd 'de' MMMM 'de' yyyy",
    {
      locale: ptBR,
    },
  );
}

export function formatAppointmentTime(value: string): string {
  return format(parseISO(value), "HH:mm");
}

export function formatAppointmentRange(
  start: string,
  end: string,
): string {
  return `${formatAppointmentTime(start)}-${formatAppointmentTime(end)}`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}

export function getAgendaRange(
  dateKey: string,
  view: AgendaView,
): {
  dataInicio: string;
  dataFim: string;
} {
  const selectedDate = parseAgendaDateKey(dateKey);

  if (!selectedDate) {
    throw new Error("Data da agenda inv\u00e1lida.");
  }

  if (view === "week") {
    return {
      dataInicio: startOfWeek(selectedDate, {
        weekStartsOn: 1,
      }).toISOString(),

      dataFim: endOfWeek(selectedDate, {
        weekStartsOn: 1,
      }).toISOString(),
    };
  }

  return {
    dataInicio: startOfDay(selectedDate).toISOString(),
    dataFim: endOfDay(selectedDate).toISOString(),
  };
}

export function shiftAgendaDate(
  dateKey: string,
  view: AgendaView,
  direction: -1 | 1,
): string {
  const selectedDate = parseAgendaDateKey(dateKey);

  if (!selectedDate) {
    throw new Error("Data da agenda inv\u00e1lida.");
  }

  const shifted =
    view === "week"
      ? addWeeks(selectedDate, direction)
      : addDays(selectedDate, direction);

  return formatAgendaDateKey(shifted);
}