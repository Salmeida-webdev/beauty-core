import {
  endOfDay,
  endOfMonth,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";

import type {
  DashboardFilters,
} from "@/features/dashboard/types/dashboard.types";

export const DASHBOARD_PERIOD_PRESETS = [
  "today",
  "7d",
  "30d",
  "current-month",
  "previous-month",
] as const;

export type DashboardPeriodPreset =
  (typeof DASHBOARD_PERIOD_PRESETS)[number];

export type DashboardPeriodOption = {
  value: DashboardPeriodPreset;
  label: string;
};

export const DEFAULT_DASHBOARD_PERIOD:
  DashboardPeriodPreset = "30d";

export const DASHBOARD_PERIOD_OPTIONS = [
  {
    value: "today",
    label: "Hoje",
  },
  {
    value: "7d",
    label: "Últimos 7 dias",
  },
  {
    value: "30d",
    label: "Últimos 30 dias",
  },
  {
    value: "current-month",
    label: "Este mês",
  },
  {
    value: "previous-month",
    label: "Mês anterior",
  },
] as const satisfies readonly DashboardPeriodOption[];

const periodPresetSet = new Set<string>(
  DASHBOARD_PERIOD_PRESETS,
);

export function isDashboardPeriodPreset(
  value: string | null | undefined,
): value is DashboardPeriodPreset {
  return (
    typeof value === "string" &&
    periodPresetSet.has(value)
  );
}

export function parseDashboardPeriodPreset(
  value: string | null | undefined,
): DashboardPeriodPreset {
  return isDashboardPeriodPreset(value)
    ? value
    : DEFAULT_DASHBOARD_PERIOD;
}

export function getDashboardPeriodLabel(
  preset: DashboardPeriodPreset,
): string {
  return (
    DASHBOARD_PERIOD_OPTIONS.find(
      (option) => option.value === preset,
    )?.label ?? "Período selecionado"
  );
}

export function resolveDashboardPeriod(
  preset: DashboardPeriodPreset,
  referenceDate = new Date(),
): DashboardFilters {
  let dataInicio: Date;
  let dataFim: Date;

  switch (preset) {
    case "today":
      dataInicio = startOfDay(referenceDate);
      dataFim = endOfDay(referenceDate);
      break;

    case "7d":
      dataInicio = startOfDay(
        subDays(referenceDate, 6),
      );
      dataFim = endOfDay(referenceDate);
      break;

    case "current-month":
      dataInicio = startOfMonth(referenceDate);
      dataFim = endOfMonth(referenceDate);
      break;

    case "previous-month": {
      const previousMonth =
        subMonths(referenceDate, 1);

      dataInicio = startOfMonth(previousMonth);
      dataFim = endOfMonth(previousMonth);
      break;
    }

    case "30d":
    default:
      dataInicio = startOfDay(
        subDays(referenceDate, 29),
      );
      dataFim = endOfDay(referenceDate);
      break;
  }

  return {
    dataInicio: dataInicio.toISOString(),
    dataFim: dataFim.toISOString(),
  };
}
