const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatServicoPreco(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "—";
  }

  return currencyFormatter.format(value);
}

export function formatServicoDuracao(minutes: number): string {
  if (!Number.isInteger(minutes) || minutes < 1) {
    return "—";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} min`;
  }

  if (remainingMinutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remainingMinutes}min`;
}
