import type { AgendamentoStatus } from "@/features/agendamentos/types/agendamentos-types";

export type AgendamentoStatusTone =
  | "neutral"
  | "info"
  | "warning"
  | "success"
  | "danger";

type AgendamentoStatusMeta = {
  label: string;
  tone: AgendamentoStatusTone;
};

export const AGENDAMENTO_STATUS_META: Record<
  AgendamentoStatus,
  AgendamentoStatusMeta
> = {
  PENDENTE: {
    label: "Pendente",
    tone: "neutral",
  },
  CONFIRMADO: {
    label: "Confirmado",
    tone: "info",
  },
  EM_ANDAMENTO: {
    label: "Em andamento",
    tone: "warning",
  },
  CONCLUIDO: {
    label: "Conclu\u00eddo",
    tone: "success",
  },
  CANCELADO: {
    label: "Cancelado",
    tone: "danger",
  },
  FALTOU: {
    label: "Faltou",
    tone: "warning",
  },
};

export function getAgendamentoStatusMeta(
  status: AgendamentoStatus,
): AgendamentoStatusMeta {
  return AGENDAMENTO_STATUS_META[status];
}