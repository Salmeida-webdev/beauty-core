export const PORTAL_APPOINTMENT_STATUS_VALUES = [
  "PENDENTE",
  "CONFIRMADO",
  "EM_ANDAMENTO",
  "CONCLUIDO",
  "CANCELADO",
  "FALTOU",
] as const;

export type PortalAppointmentStatus =
  (typeof PORTAL_APPOINTMENT_STATUS_VALUES)[number];

export const PORTAL_HISTORY_TYPE_VALUES = [
  "AGENDAMENTO",
  "PONTOS",
  "PACOTE",
  "NOTIFICACAO",
  "WHATSAPP",
] as const;

export type PortalHistoryType =
  (typeof PORTAL_HISTORY_TYPE_VALUES)[number];

export type PortalProfile = Readonly<{
  nome: string;
  telefone: string;
  email: string | null;
  foto: string | null;
  dataNascimento: string | null;
}>;

export type PortalProfileUpdateInput = Readonly<{
  nome?: string;
  email?: string;
  dataNascimento?: string;
}>;

export type PortalAppointmentSummary = Readonly<{
  dataHoraInicio: string;
  dataHoraFim: string | null;
  status: PortalAppointmentStatus;
  servicoNome: string | null;
  profissionalNome: string | null;
  profissionalFoto: string | null;
  unidadeNome: string | null;
}>;

export type PortalDashboard = Readonly<{
  perfil: PortalProfile;
  agendamentos: Readonly<{
    proximos: readonly PortalAppointmentSummary[];
    ultimo: PortalAppointmentSummary | null;
  }>;
}>;

export type PortalHistoryItem = Readonly<{
  tipo: PortalHistoryType;
  data: string;
  titulo: string;
  status: string | null;
}>;

export type PortalHistory = readonly PortalHistoryItem[];
