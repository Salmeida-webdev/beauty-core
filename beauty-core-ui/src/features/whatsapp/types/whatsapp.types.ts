// Chat 54 — Blocos 05–08 — WhatsApp contracts

export const canalWhatsappValues = [
  "WHATSAPP_BUSINESS_GRATUITO",
  "API_OFICIAL",
  "PROVEDOR_EXTERNO",
  "MODO_DEMONSTRACAO",
] as const;

export const tipoMensagemWhatsappValues = [
  "LEMBRETE_AGENDAMENTO",
  "CONFIRMACAO_AGENDAMENTO",
  "CANCELAMENTO_AGENDAMENTO",
  "ANIVERSARIO",
  "FIDELIDADE",
  "BENEFICIO",
  "PACOTE",
  "FINANCEIRO",
  "CAMPANHA",
  "SISTEMA",
] as const;

export const statusMensagemWhatsappValues = [
  "PENDENTE",
  "ENVIADA",
  "FALHOU",
  "CANCELADA",
  "SIMULADA",
] as const;

export const whatsappMessageOrderByValues = [
  "createdAt",
  "updatedAt",
  "dataEnvio",
  "status",
  "tipo",
  "destinatario",
] as const;

export const whatsappOrderDirectionValues = [
  "asc",
  "desc",
] as const;

export type CanalWhatsapp =
  (typeof canalWhatsappValues)[number];

export type TipoMensagemWhatsapp =
  (typeof tipoMensagemWhatsappValues)[number];

export type StatusMensagemWhatsapp =
  (typeof statusMensagemWhatsappValues)[number];

export type WhatsappMessageOrderBy =
  (typeof whatsappMessageOrderByValues)[number];

export type WhatsappOrderDirection =
  (typeof whatsappOrderDirectionValues)[number];

export interface WhatsappConfiguracaoResumo {
  id?: string;
  ativo?: boolean;
  canal?: CanalWhatsapp;
  telefone?: string | null;
  numeroWhatsApp?: string | null;
  usarModoDemonstracao?: boolean;
}

export interface TemplateWhatsapp {
  id: string;
  nome: string;
  tipo: TipoMensagemWhatsapp;
  titulo: string;
  mensagem: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WhatsappMensagemCliente {
  id: string;
  nome: string;
}

export interface WhatsappMensagemUsuario {
  id: string;
  nome: string;
  role: string;
}

export interface WhatsappMensagemTemplate {
  id: string;
  nome: string;
  tipo: TipoMensagemWhatsapp;
  titulo: string;
}

export interface WhatsappMensagemResumo {
  id: string;
  clienteId?: string | null;
  usuarioId?: string | null;
  templateId?: string | null;
  tipo: TipoMensagemWhatsapp;
  destinatario: string;
  mensagem: string;
  status: StatusMensagemWhatsapp;
  erro?: string | null;
  dataEnvio?: string | null;
  createdAt: string;
  updatedAt: string;
  cliente?: WhatsappMensagemCliente | null;
  usuario?: WhatsappMensagemUsuario | null;
  template?: WhatsappMensagemTemplate | null;
}

export interface WhatsappMessagesListParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: WhatsappMessageOrderBy;
  orderDirection?: WhatsappOrderDirection;
}

export interface WhatsappMessagesListMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface WhatsappMessagesListResponse {
  data: WhatsappMensagemResumo[];
  meta: WhatsappMessagesListMeta;
}

export interface WhatsappSendResult {
  processado: boolean;
  processamento: "assincrono";
  whatsappGerado: boolean;
  mensagemId: string;
  jobId: string;
  queue: "whatsapp";
}

export interface CampanhaWhatsappResumo {
  id: string;
  nome: string;
  descricao?: string | null;
  tipo: TipoMensagemWhatsapp;
  mensagem: string;
  status: StatusMensagemWhatsapp;
  totalDestinatarios: number;
  totalEnviadas: number;
  totalFalhas: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampanhaWhatsappCreateResult {
  campanha: CampanhaWhatsappResumo;
  processamento: "assincrono";
  jobId: string;
  queue: "campanhas";
}