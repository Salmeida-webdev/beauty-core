// Chat 54 — Blocos 05/10 — Notificações

export const tipoNotificacaoValues = [
  "SISTEMA",
  "AGENDAMENTO",
  "FINANCEIRO",
  "FIDELIDADE",
  "PACOTE",
  "CLIENTE",
  "MARKETING",
] as const;

export const statusNotificacaoValues = [
  "NAO_LIDA",
  "LIDA",
  "ARQUIVADA",
] as const;

export const notificacaoOrderByValues = [
  "createdAt",
  "updatedAt",
  "dataLeitura",
  "status",
  "tipo",
  "titulo",
] as const;

export const notificacaoOrderDirectionValues = [
  "asc",
  "desc",
] as const;

export type TipoNotificacao =
  (typeof tipoNotificacaoValues)[number];

export type StatusNotificacao =
  (typeof statusNotificacaoValues)[number];

export type NotificacaoOrderBy =
  (typeof notificacaoOrderByValues)[number];

export type NotificacaoOrderDirection =
  (typeof notificacaoOrderDirectionValues)[number];

export interface NotificacaoResumo {
  id: string;
  usuarioId?: string | null;
  clienteId?: string | null;
  tipo: TipoNotificacao;
  titulo: string;
  mensagem: string;
  status: StatusNotificacao;
  dataLeitura?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface NotificacoesListParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: NotificacaoOrderBy;
  orderDirection?: NotificacaoOrderDirection;
}

export interface NotificacoesListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface NotificacoesListResponse {
  data: NotificacaoResumo[];
  meta: NotificacoesListMeta;
}

export interface NotificacoesResumoGeral {
  total: number;
  naoLidas: number;
  lidas: number;
  arquivadas: number;
}

export interface NotificacaoDeleteResult {
  message: string;
}

export interface ConfiguracaoNotificacao {
  id?: string;
  notificarAgendamentos: boolean;
  notificarFinanceiro: boolean;
  notificarFidelidade: boolean;
  notificarPacotes: boolean;
  notificarClientes: boolean;
  notificarMarketing: boolean;
}