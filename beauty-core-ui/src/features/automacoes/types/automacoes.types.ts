// Chat 54 — Blocos 05/12/13 — Automações

export const tipoEventoSistemaValues = [
  "AGENDAMENTO_CRIADO",
  "AGENDAMENTO_CONFIRMADO",
  "AGENDAMENTO_CANCELADO",
  "AGENDAMENTO_CONCLUIDO",
  "PONTOS_ADICIONADOS",
  "PONTOS_RESGATADOS",
  "BENEFICIO_LIBERADO",
  "NIVEL_ALTERADO",
  "PACOTE_CRIADO",
  "PACOTE_FINALIZADO",
  "PACOTE_VENCIDO",
  "MOVIMENTACAO_FINANCEIRA",
  "COMISSAO_GERADA",
  "COMISSAO_PAGA",
  "CLIENTE_ANIVERSARIANTE",
  "CLIENTE_CADASTRADO",
  "SERVICO_CADASTRADO",
] as const;

export type TipoEventoSistema =
  (typeof tipoEventoSistemaValues)[number];

export interface ProcessarEventoInput {
  tipo: TipoEventoSistema;
  modulo: string;
  titulo?: string;
  mensagem?: string;
  usuarioId?: string;
  referenciaId?: string;
  dados?: Record<string, unknown>;
}

export interface AutomacaoEventoFormValues {
  tipo: TipoEventoSistema;
  modulo: string;
}

export interface AutomacaoEventoResumo {
  tipo: TipoEventoSistema;
  modulo: string;
  titulo?: string;
  mensagem?: string;
}

export interface AutomacoesEventosResumo {
  total: number;
  porTipo: Record<string, number>;
  porModulo: Record<string, number>;
  eventos: AutomacaoEventoResumo[];
}

export interface ProcessarEventoResultado {
  processado: true;
  processamento: "assincrono";
  notificacaoGerada: boolean;
  motivo?: string;
  jobId?: string;
  queue?: "notificacoes";
}

export type AutomacaoTesteQueue =
  | "aniversarios"
  | "relatorios";

export interface AutomacaoTesteResultado {
  processado: true;
  processamento: "assincrono";
  queue: AutomacaoTesteQueue;
  jobId?: string;
}