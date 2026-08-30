const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export function formatMovimentacaoDate(value: string): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data indisponível";
  }

  return dateTimeFormatter.format(date);
}

export function formatMovimentacaoTipo(tipo: string): string {
  const normalized = tipo.trim();

  if (!normalized) {
    return "Movimentação";
  }

  return normalized
    .toLocaleLowerCase("pt-BR")
    .split("_")
    .filter(Boolean)
    .map(
      (word) =>
        word.charAt(0).toLocaleUpperCase("pt-BR") +
        word.slice(1),
    )
    .join(" ");
}
