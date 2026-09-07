export const CLIENTE_ORDER_BY_VALUES = [
  "nome",
  "telefone",
  "email",
  "createdAt",
  "updatedAt",
  "ultimoAcessoPortal",
] as const;

export const CLIENTE_ORDER_DIRECTION_VALUES = [
  "asc",
  "desc",
] as const;

export type ClienteOrderBy =
  (typeof CLIENTE_ORDER_BY_VALUES)[number];

export type ClienteOrderDirection =
  (typeof CLIENTE_ORDER_DIRECTION_VALUES)[number];

export type Cliente = {
  id: string;
  empresaId: string;
  nome: string;
  telefone: string;
  email: string | null;
  foto: string | null;
  dataNascimento: string | null;
  observacoes: string | null;
  ativo: boolean;
  ativoPortal: boolean;
  aceitouTermos: boolean;
  dataAceiteTermos: string | null;
  ultimoAcessoPortal: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ClientesPaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type ClientesListResponse = {
  data: Cliente[];
  meta: ClientesPaginationMeta;
};

export type ClientesListParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: ClienteOrderBy;
  orderDirection?: ClienteOrderDirection;
};
