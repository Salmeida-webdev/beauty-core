export function formatProfissionalTelefone(value: string | null): string {
  const original = value?.trim() ?? "";

  if (!original) {
    return "\u2014";
  }

  if (original.startsWith("+") && !original.startsWith("+55")) {
    return original;
  }

  const digits = original.replace(/\D/g, "");

  const brazilianDigits =
    original.startsWith("+55") && digits.startsWith("55")
      ? digits.slice(2)
      : digits;

  if (brazilianDigits.length === 11) {
    return `(${brazilianDigits.slice(0, 2)}) ${brazilianDigits.slice(
      2,
      7,
    )}-${brazilianDigits.slice(7)}`;
  }

  if (brazilianDigits.length === 10) {
    return `(${brazilianDigits.slice(0, 2)}) ${brazilianDigits.slice(
      2,
      6,
    )}-${brazilianDigits.slice(6)}`;
  }

  return original;
}
