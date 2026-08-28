import type {
  DashboardFilters,
} from "@/features/dashboard/types/dashboard.types";

export const DASHBOARD_LOCALE = "pt-BR";
export const DEFAULT_DASHBOARD_CURRENCY = "BRL";

const integerFormatter = new Intl.NumberFormat(
  DASHBOARD_LOCALE,
  {
    maximumFractionDigits: 0,
  },
);

const decimalFormatter = new Intl.NumberFormat(
  DASHBOARD_LOCALE,
  {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
);

const shortDateFormatter = new Intl.DateTimeFormat(
  DASHBOARD_LOCALE,
  {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  },
);

const dateTimeFormatter = new Intl.DateTimeFormat(
  DASHBOARD_LOCALE,
  {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  },
);

const currencyFormatters =
  new Map<string, Intl.NumberFormat>();

function getCurrencyFormatter(
  currency: string,
): Intl.NumberFormat {
  const existing =
    currencyFormatters.get(currency);

  if (existing) {
    return existing;
  }

  const formatter = new Intl.NumberFormat(
    DASHBOARD_LOCALE,
    {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  currencyFormatters.set(currency, formatter);

  return formatter;
}

function toValidDate(
  value: string | Date,
): Date | null {
  const date =
    value instanceof Date
      ? value
      : new Date(value);

  return Number.isNaN(date.getTime())
    ? null
    : date;
}

export function formatCurrency(
  value: number,
  currency = DEFAULT_DASHBOARD_CURRENCY,
): string {
  return getCurrencyFormatter(currency).format(
    value,
  );
}

export function formatInteger(
  value: number,
): string {
  return integerFormatter.format(value);
}

export function formatDecimal(
  value: number,
): string {
  return decimalFormatter.format(value);
}

export function formatPercentage(
  value: number,
): string {
  return `${formatDecimal(value)}%`;
}

export function formatSignedPercentage(
  value: number,
): string {
  const prefix = value > 0 ? "+" : "";

  return `${prefix}${formatDecimal(value)}%`;
}

export function formatDashboardDate(
  value: string | Date,
): string {
  const date = toValidDate(value);

  return date
    ? shortDateFormatter.format(date)
    : "Data inválida";
}

export function formatDashboardDateTime(
  value: string | Date,
): string {
  const date = toValidDate(value);

  return date
    ? dateTimeFormatter.format(date)
    : "Data inválida";
}

export function formatDashboardPeriod(
  filters: DashboardFilters,
): string {
  if (
    !filters.dataInicio ||
    !filters.dataFim
  ) {
    return "Período não informado";
  }

  return [
    formatDashboardDate(filters.dataInicio),
    formatDashboardDate(filters.dataFim),
  ].join(" – ");
}
