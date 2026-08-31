// Chat 54 — Bloco 05/20 — Foundations frontend

export type AutomacaoStatusTone =
  | "success"
  | "danger"
  | "neutral";

export function getAutomacaoActivationTone(
  ativa: boolean | null | undefined,
): AutomacaoStatusTone {
  if (ativa === true) {
    return "success";
  }

  if (ativa === false) {
    return "danger";
  }

  return "neutral";
}