import type { FinanceiroPeriodoQuery } from "@/features/financeiro/types/financeiro.types";

function periodKey(period: FinanceiroPeriodoQuery) {
  return {
    dataInicio: period.dataInicio ?? null,
    dataFim: period.dataFim ?? null,
  };
}

export const relatoriosFinanceirosKeys = {
  all: ["financeiro", "relatorios"] as const,

  resumo: (period: FinanceiroPeriodoQuery) =>
    [...relatoriosFinanceirosKeys.all, "resumo", periodKey(period)] as const,

  fluxo: (period: FinanceiroPeriodoQuery) =>
    [...relatoriosFinanceirosKeys.all, "fluxo", periodKey(period)] as const,

  receitasMes: () =>
    [...relatoriosFinanceirosKeys.all, "receitas-mes"] as const,

  despesasMes: () =>
    [...relatoriosFinanceirosKeys.all, "despesas-mes"] as const,
};
