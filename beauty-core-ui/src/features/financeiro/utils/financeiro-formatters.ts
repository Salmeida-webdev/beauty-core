import type { FinanceiroDisplayNumber } from "@/features/financeiro/types/financeiro.types";

const brlFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const percentualFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function toDisplayNumber(value: FinanceiroDisplayNumber) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(value);

  return Number.isFinite(numericValue) ? numericValue : null;
}

export function formatFinanceiroCurrency(value: FinanceiroDisplayNumber) {
  const numericValue = toDisplayNumber(value);

  return numericValue === null ? "—" : brlFormatter.format(numericValue);
}

export function formatFinanceiroPercentual(value: FinanceiroDisplayNumber) {
  const numericValue = toDisplayNumber(value);

  return numericValue === null
    ? "—"
    : `${percentualFormatter.format(numericValue)}%`;
}
