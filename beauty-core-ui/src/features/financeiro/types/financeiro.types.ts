export const tiposMovimentacaoFinanceira = ["RECEITA", "DESPESA"] as const;

export type TipoMovimentacaoFinanceira =
  (typeof tiposMovimentacaoFinanceira)[number];

export const formasPagamentoFinanceiro = [
  "DINHEIRO",
  "PIX",
  "CARTAO_CREDITO",
  "CARTAO_DEBITO",
  "TRANSFERENCIA",
  "BOLETO",
  "OUTRO",
] as const;

export type FormaPagamentoFinanceiro =
  (typeof formasPagamentoFinanceiro)[number];

export const statusPagamentoFinanceiro = [
  "PENDENTE",
  "PAGO",
  "CANCELADO",
  "ESTORNADO",
] as const;

export type StatusPagamentoFinanceiro =
  (typeof statusPagamentoFinanceiro)[number];

export const tiposCategoriaFinanceira = ["RECEITA", "DESPESA"] as const;

export type TipoCategoriaFinanceira = (typeof tiposCategoriaFinanceira)[number];

export type FinanceiroAdminRole =
  "ADMIN" | "GERENTE" | "RECEPCAO" | "PROFISSIONAL" | "SUPER_ADMIN" | "CLIENTE";

export type MovimentacaoFinanceiraOrderBy =
  | "dataMovimentacao"
  | "createdAt"
  | "updatedAt"
  | "valor"
  | "status"
  | "tipo"
  | "descricao";

export type FinanceiroOrderDirection = "asc" | "desc";

export type FinanceiroListQuery = {
  page?: number;
  limit?: number;
  categoriaId?: string;
  clienteId?: string;
  agendamentoId?: string;
  tipo?: TipoMovimentacaoFinanceira;
  status?: StatusPagamentoFinanceiro;
  orderBy?: MovimentacaoFinanceiraOrderBy;
  orderDirection?: FinanceiroOrderDirection;
};

export type FinanceiroPeriodoQuery = {
  dataInicio?: string;
  dataFim?: string;
};

export type FinanceiroResumo = {
  receitas: number;
  despesas: number;
  saldo: number;
};

export type FinanceiroDisplayNumber = number | string | null | undefined;

export type CategoriaFinanceira = {
  id: string;
  nome: string;
  tipo: TipoCategoriaFinanceira;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCategoriaFinanceiraPayload = {
  nome: string;
  tipo: TipoCategoriaFinanceira;
};

export type UpdateCategoriaFinanceiraPayload =
  Partial<CreateCategoriaFinanceiraPayload>;

export type MovimentacaoFinanceiraCategoria = {
  id: string;
  nome: string;
  tipo: TipoCategoriaFinanceira;
  ativo?: boolean;
};

export type MovimentacaoFinanceiraCliente = {
  id: string;
  nome: string;
};

export type MovimentacaoFinanceiraAgendamento = {
  id: string;
};

export type MovimentacaoFinanceira = {
  id: string;
  categoriaId: string;
  clienteId?: string | null;
  agendamentoId?: string | null;
  descricao: string;
  tipo: TipoMovimentacaoFinanceira;
  valor: number | string;
  formaPagamento: FormaPagamentoFinanceiro;
  status: StatusPagamentoFinanceiro;
  dataMovimentacao: string;
  observacoes?: string | null;
  createdAt: string;
  updatedAt: string;
  categoria?: MovimentacaoFinanceiraCategoria | null;
  cliente?: MovimentacaoFinanceiraCliente | null;
  agendamento?: MovimentacaoFinanceiraAgendamento | null;
};

export type MovimentacoesFinanceirasPage = {
  data: MovimentacaoFinanceira[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
};

export type CreateMovimentacaoFinanceiraPayload = {
  categoriaId: string;
  clienteId?: string;
  agendamentoId?: string;
  descricao: string;
  tipo: TipoMovimentacaoFinanceira;
  valor: number;
  formaPagamento: FormaPagamentoFinanceiro;
  observacoes?: string;
};

export type UpdateMovimentacaoFinanceiraPayload =
  Partial<CreateMovimentacaoFinanceiraPayload>;

export type PagarMovimentacaoFinanceiraPayload = {
  formaPagamento: FormaPagamentoFinanceiro;
};

export type ComissaoProfissional = {
  id: string;
  profissionalId: string;
  agendamentoId: string;
  valorServico: number | string;
  percentual: number | string;
  valorComissao: number | string;
  status: StatusPagamentoFinanceiro;
  createdAt: string;
  updatedAt: string;
};

export type CreateComissaoProfissionalPayload = {
  profissionalId: string;
  agendamentoId: string;
  valorServico: number;
  percentual: number;
};
