import type { StatusClientePacote } from "../types/pacotes.types";

const statusLabels: Record<StatusClientePacote, string> = {
  ATIVO: "Ativo",
  FINALIZADO: "Finalizado",
  VENCIDO: "Vencido",
  CANCELADO: "Cancelado",
};

export function formatSaldoSessoes(
  restantes: number,
  total: number,
): string {
  return `${restantes} de ${total} sessões`;
}

export function formatValidadeDias(
  validadeDias: number | null,
): string {
  if (validadeDias === null) {
    return "Sem validade definida";
  }

  return `${validadeDias} ${validadeDias === 1 ? "dia" : "dias"}`;
}

export function formatStatusClientePacote(
  status: StatusClientePacote,
): string {
  return statusLabels[status];
}
