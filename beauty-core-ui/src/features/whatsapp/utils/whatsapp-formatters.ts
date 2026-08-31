// Chat 54 — Bloco 05/20 — Foundations frontend

const whatsappDateTimeFormatter = new Intl.DateTimeFormat(
  "pt-BR",
  {
    dateStyle: "short",
    timeStyle: "short",
  },
);

export function formatWhatsappDateTime(
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

  return whatsappDateTimeFormatter.format(date);
}

export function formatWhatsappPhone(
  value: string | null | undefined,
): string {
  if (!value) {
    return "—";
  }

  const digits = value.replace(/\D/g, "");

  if (digits.length === 13 && digits.startsWith("55")) {
    return (
      "+" +
      digits.slice(0, 2) +
      " (" +
      digits.slice(2, 4) +
      ") " +
      digits.slice(4, 9) +
      "-" +
      digits.slice(9)
    );
  }

  if (digits.length === 11) {
    return (
      "(" +
      digits.slice(0, 2) +
      ") " +
      digits.slice(2, 7) +
      "-" +
      digits.slice(7)
    );
  }

  return value;
}

export function formatWhatsappEnumLabel(
  value: string | null | undefined,
): string {
  if (!value) {
    return "—";
  }

  const normalized = value
    .replace(/_/g, " ")
    .toLocaleLowerCase("pt-BR");

  return normalized.charAt(0).toLocaleUpperCase("pt-BR") +
    normalized.slice(1);
}