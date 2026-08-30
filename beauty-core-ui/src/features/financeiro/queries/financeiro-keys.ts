import type { FinanceiroListQuery } from "@/features/financeiro/types/financeiro.types";
import { sanitizeFinanceiroListQuery } from "@/features/financeiro/utils/financeiro-query";

export const financeiroKeys = {
  all: ["financeiro"] as const,

  resumo: () => [...financeiroKeys.all, "resumo"] as const,

  movimentacoes: (query: FinanceiroListQuery = {}) =>
    [
      ...financeiroKeys.all,
      "movimentacoes",
      sanitizeFinanceiroListQuery(query),
    ] as const,

  detalhe: (id: string) => [...financeiroKeys.all, "movimentacao", id] as const,

  categorias: () => [...financeiroKeys.all, "categorias"] as const,

  categoria: (id: string) => [...financeiroKeys.categorias(), id] as const,

  analytics: () => [...financeiroKeys.all, "analytics"] as const,
};

export const comissoesKeys = {
  all: ["comissoes"] as const,

  lista: () => [...comissoesKeys.all, "lista"] as const,

  detalhe: (id: string) => [...comissoesKeys.all, "detalhe", id] as const,
};
