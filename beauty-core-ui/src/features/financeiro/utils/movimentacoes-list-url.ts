import type { FinanceiroListQuery } from "@/features/financeiro/types/financeiro.types";

export const movimentacoesOrderByOptions = [
  "dataMovimentacao",
  "createdAt",
  "updatedAt",
  "valor",
  "status",
  "tipo",
  "descricao",
] as const;

export const movimentacoesOrderDirectionOptions = ["asc", "desc"] as const;

const tipos = ["RECEITA", "DESPESA"] as const;

const status = ["PENDENTE", "PAGO", "CANCELADO", "ESTORNADO"] as const;

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function positiveInteger(value: string | null) {
  if (!value || !/^\d+$/.test(value)) {
    return undefined;
  }

  const parsed = Number(value);

  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : undefined;
}

function uuid(value: string | null) {
  if (!value || !uuidPattern.test(value)) {
    return undefined;
  }

  return value;
}

function enumValue<const T extends readonly string[]>(
  value: string | null,
  values: T,
): T[number] | undefined {
  if (value && values.includes(value as T[number])) {
    return value as T[number];
  }

  return undefined;
}

export function parseMovimentacoesListSearchParams(
  params: URLSearchParams,
): FinanceiroListQuery {
  const page = positiveInteger(params.get("page"));

  const limit = positiveInteger(params.get("limit"));

  const categoriaId = uuid(params.get("categoriaId"));

  const clienteId = uuid(params.get("clienteId"));

  const agendamentoId = uuid(params.get("agendamentoId"));

  const tipo = enumValue(params.get("tipo"), tipos);

  const currentStatus = enumValue(params.get("status"), status);

  const orderBy = enumValue(params.get("orderBy"), movimentacoesOrderByOptions);

  const orderDirection = enumValue(
    params.get("orderDirection"),
    movimentacoesOrderDirectionOptions,
  );

  return {
    ...(page ? { page } : {}),
    ...(limit ? { limit } : {}),
    ...(categoriaId ? { categoriaId } : {}),
    ...(clienteId ? { clienteId } : {}),
    ...(agendamentoId ? { agendamentoId } : {}),
    ...(tipo ? { tipo } : {}),
    ...(currentStatus ? { status: currentStatus } : {}),
    ...(orderBy ? { orderBy } : {}),
    ...(orderDirection ? { orderDirection } : {}),
  };
}

export function buildMovimentacoesListSearchParams(query: FinanceiroListQuery) {
  const params = new URLSearchParams();

  if (query.page) {
    params.set("page", String(query.page));
  }

  if (query.limit) {
    params.set("limit", String(query.limit));
  }

  if (query.categoriaId) {
    params.set("categoriaId", query.categoriaId);
  }

  if (query.clienteId) {
    params.set("clienteId", query.clienteId);
  }

  if (query.agendamentoId) {
    params.set("agendamentoId", query.agendamentoId);
  }

  if (query.tipo) {
    params.set("tipo", query.tipo);
  }

  if (query.status) {
    params.set("status", query.status);
  }

  if (query.orderBy) {
    params.set("orderBy", query.orderBy);
  }

  if (query.orderDirection) {
    params.set("orderDirection", query.orderDirection);
  }

  return params;
}

export function mergeMovimentacoesFilters(
  current: FinanceiroListQuery,
  patch: Partial<FinanceiroListQuery>,
): FinanceiroListQuery {
  const next = {
    ...current,
    ...patch,
    page: 1,
  };

  return Object.fromEntries(
    Object.entries(next).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  ) as FinanceiroListQuery;
}
