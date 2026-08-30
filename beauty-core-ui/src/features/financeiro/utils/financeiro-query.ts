import { financeiroListQuerySchema } from "@/features/financeiro/schemas/financeiro.schemas";
import type { FinanceiroListQuery } from "@/features/financeiro/types/financeiro.types";

export function sanitizeFinanceiroListQuery(
  query: unknown,
): FinanceiroListQuery {
  const parsed = financeiroListQuerySchema.parse(query);

  return {
    ...(parsed.page !== undefined ? { page: parsed.page } : {}),
    ...(parsed.limit !== undefined ? { limit: parsed.limit } : {}),
    ...(parsed.categoriaId ? { categoriaId: parsed.categoriaId } : {}),
    ...(parsed.clienteId ? { clienteId: parsed.clienteId } : {}),
    ...(parsed.agendamentoId ? { agendamentoId: parsed.agendamentoId } : {}),
    ...(parsed.tipo ? { tipo: parsed.tipo } : {}),
    ...(parsed.status ? { status: parsed.status } : {}),
    ...(parsed.orderBy ? { orderBy: parsed.orderBy } : {}),
    ...(parsed.orderDirection
      ? {
          orderDirection: parsed.orderDirection,
        }
      : {}),
  };
}
