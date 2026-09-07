export function parsePtBrDecimalInput(input: string): number | null {
  const value = input.trim();

  if (!value) {
    return null;
  }

  const ptBrWithComma = /^(?:\d{1,3}(?:\.\d{3})*|\d+)(?:,\d+)?$/;

  const dotDecimal = /^\d+(?:\.\d+)?$/;

  let normalized: string;

  if (value.includes(",")) {
    if (!ptBrWithComma.test(value)) {
      return null;
    }

    normalized = value.replace(/\./g, "").replace(",", ".");
  } else if (/^\d{1,3}(?:\.\d{3})+$/.test(value)) {
    normalized = value.replace(/\./g, "");
  } else {
    if (!dotDecimal.test(value)) {
      return null;
    }

    normalized = value;
  }

  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : null;
}
