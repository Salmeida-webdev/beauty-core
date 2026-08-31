// Chat 54 — Bloco 05/20 — Foundations frontend

const notificationDateFormatter =
  new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });

export function formatNotificacaoDateTime(
  value: string | Date | null | undefined,
): string {
  if (!value) {
    return "—";
  }

  const date = value instanceof Date
    ? value
    : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return notificationDateFormatter.format(date);
}

export function formatNotificacaoEnumLabel(
  value: string | null | undefined,
): string {
  if (value === "NAO_LIDA") {
    return "Não lida";
  }
  if (!value) {
    return "—";
  }

  const normalized = value
    .replace(/_/g, " ")
    .toLocaleLowerCase("pt-BR");

  return normalized.charAt(0).toLocaleUpperCase("pt-BR") +
    normalized.slice(1);
}