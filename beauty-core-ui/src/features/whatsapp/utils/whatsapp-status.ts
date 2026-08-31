// Chat 54 — Bloco 05/20 — Foundations frontend

export type WhatsappStatusTone =
  | "success"
  | "warning"
  | "danger"
  | "neutral";

export function getWhatsappStatusTone(
  status: string | null | undefined,
): WhatsappStatusTone {
  const normalized = String(status ?? "").toUpperCase();

  if (
    normalized.includes("FALHA") ||
    normalized.includes("ERRO") ||
    normalized.includes("CANCEL")
  ) {
    return "danger";
  }

  if (
    normalized.includes("PENDENTE") ||
    normalized.includes("PROCESS") ||
    normalized.includes("AGEND") ||
    normalized.includes("SIMULAD")
  ) {
    return "warning";
  }

  if (
    normalized.includes("ENVIAD") ||
    normalized.includes("ENTREG") ||
    normalized.includes("CONCLUID") ||
    normalized === "ATIVO"
  ) {
    return "success";
  }

  return "neutral";
}