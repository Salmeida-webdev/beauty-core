import type { FinanceiroPeriodoQuery } from "@/features/financeiro/types/financeiro.types";

export type FinanceiroPeriodFormValues = {
  dataInicio: string;
  dataFim: string;
};

function localDateTimeToIso(value: string): string | undefined {
  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const date = new Date(trimmed);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

export function toFinanceiroPeriodQuery(
  values: FinanceiroPeriodFormValues,
): FinanceiroPeriodoQuery {
  const dataInicio = localDateTimeToIso(values.dataInicio);

  const dataFim = localDateTimeToIso(values.dataFim);

  return {
    ...(dataInicio ? { dataInicio } : {}),
    ...(dataFim ? { dataFim } : {}),
  };
}
