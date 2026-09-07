import type {
  AgendaQueryFilters,
  AgendamentoStatus,
} from "@/features/agendamentos/types/agendamentos-types";

export type AgendamentoListCliente = {
  id: string;
  nome: string;
  telefone: string | null;
};

export type AgendamentoListProfissional = {
  id: string;
  nome: string;
};

export type AgendamentoListServico = {
  id: string;
  nome: string;
  preco: string | number | null;
  duracaoMinutos: number;
};

export type AgendamentoListUnidade = {
  id: string;
  nome: string;
};

export type AgendamentoListItem = {
  id: string;
  clienteId: string;
  profissionalId: string;
  servicoId: string;
  unidadeId: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  observacoes: string | null;
  status: AgendamentoStatus;
  createdAt: string;
  updatedAt: string;
  cliente: AgendamentoListCliente;
  profissional: AgendamentoListProfissional;
  servico: AgendamentoListServico;
  unidade: AgendamentoListUnidade;
};

export type AgendamentoDetail = Omit<
  AgendamentoListItem,
  "cliente" | "profissional"
> & {
  cliente: AgendamentoListCliente & {
    email: string | null;
  };

  profissional: AgendamentoListProfissional & {
    email: string | null;
  };
};

export type AgendamentosPaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type AgendamentosListResponse = {
  data: AgendamentoListItem[];
  meta: AgendamentosPaginationMeta;
};

export type AgendamentosListParams =
  AgendaQueryFilters;

export type CreateAgendamentoPayload = {
  unidadeId: string;
  clienteId: string;
  servicoId: string;
  profissionalId: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  observacoes?: string;
  status?: AgendamentoStatus;
};

export type UpdateAgendamentoPayload =
  Partial<CreateAgendamentoPayload>;

export type AgendamentoMutationResult = {
  id: string;
  unidadeId: string;
  clienteId: string;
  servicoId: string;
  profissionalId: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  observacoes: string | null;
  status: AgendamentoStatus;
  createdAt: string;
  updatedAt: string;
};