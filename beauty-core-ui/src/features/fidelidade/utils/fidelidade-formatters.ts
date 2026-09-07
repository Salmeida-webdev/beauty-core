const pontosFormatter = new Intl.NumberFormat("pt-BR");

export function formatPontos(value: number): string {
  return `${pontosFormatter.format(value)} pts`;
}

export function formatBeneficiosNivel(
  beneficios: string | null | undefined,
): string {
  const normalized = beneficios?.trim();

  return normalized ? normalized : "Não informado";
}
