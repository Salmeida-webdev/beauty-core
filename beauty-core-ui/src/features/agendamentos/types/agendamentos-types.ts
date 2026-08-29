export const AGENDAMENTO_STATUSES = [
  "PENDENTE",
  "CONFIRMADO",
  "EM_ANDAMENTO",
  "CONCLUIDO",
  "CANCELADO",
  "FALTOU",
] as const;

export type AgendamentoStatus = (typeof AGENDAMENTO_STATUSES)[number];

export const AGENDA_VIEWS = ["day", "week", "list"] as const;

export type AgendaView = (typeof AGENDA_VIEWS)[number];

export type AgendaOrderBy =
  | "dataHoraInicio"
  | "dataHoraFim"
  | "status"
  | "createdAt"
  | "updatedAt";

export type AgendaOrderDirection = "asc" | "desc";

export type AgendaQueryFilters = {
  page?: number;
  limit?: number;
  orderBy?: AgendaOrderBy;
  orderDirection?: AgendaOrderDirection;
  dataInicio?: string;
  dataFim?: string;
  status?: AgendamentoStatus;
  clienteId?: string;
  profissionalId?: string;
  servicoId?: string;
  unidadeId?: string;
};

export type AgendaUrlState = {
  view: AgendaView;
  date: string;
  status?: AgendamentoStatus;
  clienteId?: string;
  profissionalId?: string;
  servicoId?: string;
  unidadeId?: string;
};

export type AgendamentoResumo = {
  id: string;
  clienteId: string;
  profissionalId: string;
  servicoId: string;
  unidadeId: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  status: AgendamentoStatus;
  observacoes?: string | null;
  createdAt: string;
  updatedAt?: string;
};

export type AgendamentoCliente = {
  id: string;
  nome: string;
  telefone?: string | null;
  email?: string | null;
};

export type AgendamentoProfissional = {
  id: string;
  nome: string;
  email?: string | null;
};

export type AgendamentoServico = {
  id: string;
  nome: string;
  preco?: string | number | null;
  duracaoMinutos?: number | null;
};

export type AgendamentoUnidade = {
  id: string;
  nome: string;
};

export type AgendamentoDetalhe = AgendamentoResumo & {
  cliente?: AgendamentoCliente | null;
  profissional?: AgendamentoProfissional | null;
  servico?: AgendamentoServico | null;
  unidade?: AgendamentoUnidade | null;
};