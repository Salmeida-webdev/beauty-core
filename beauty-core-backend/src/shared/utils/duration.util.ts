export function durationToSeconds(value: string): number {
  const match = value.match(/^(\d+)(s|m|h|d)$/);

  if (!match) {
    throw new Error(`Formato de duração inválido: ${value}`);
  }

  const amount = Number(match[1]);
  const unit = match[2];

  switch (unit) {
    case 's':
      return amount;
    case 'm':
      return amount * 60;
    case 'h':
      return amount * 60 * 60;
    case 'd':
      return amount * 24 * 60 * 60;
    default:
      throw new Error(`Unidade de duração inválida: ${unit}`);
  }
}

export function durationToDate(value: string): Date {
  const seconds = durationToSeconds(value);

  return new Date(Date.now() + seconds * 1000);
}
