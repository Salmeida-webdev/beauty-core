// Chat 54 — Bloco 05/20 — Foundations frontend

export type NotificacaoStatusTone =
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export function getNotificacaoStatusTone(
  status: string | null | undefined,
): NotificacaoStatusTone {
  const normalized = String(status ?? "").toUpperCase();

  if (
    normalized.includes("FALHA") ||
    normalized.includes("ERRO")
  ) {
    return "danger";
  }

  if (
    normalized.includes("NAO_LIDA") ||
    normalized.includes("PENDENTE")
  ) {
    return "warning";
  }

  if (
    normalized.includes("LIDA") ||
    normalized.includes("ENVIAD") ||
    normalized.includes("CONCLUID")
  ) {
    return "success";
  }

  return "neutral";
}