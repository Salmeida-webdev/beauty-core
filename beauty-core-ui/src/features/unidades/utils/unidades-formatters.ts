export function formatUnidadeTelefone(
  telefone: string | null | undefined,
): string {
  if (!telefone) {
    return "\u2014";
  }

  const original = telefone.trim();

  if (!original) {
    return "\u2014";
  }

  if (original.startsWith("+") && !original.startsWith("+55")) {
    return original;
  }

  const rawDigits = original.replace(/\D/g, "");

  const digits =
    original.startsWith("+55") && rawDigits.startsWith("55")
      ? rawDigits.slice(2)
      : rawDigits;

  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return original;
}

export function formatUnidadeOptionalText(
  value: string | null | undefined,
): string {
  return value?.trim() || "\u2014";
}
