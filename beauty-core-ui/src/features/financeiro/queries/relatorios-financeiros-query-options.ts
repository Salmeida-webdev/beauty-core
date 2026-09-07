import { queryOptions } from "@tanstack/react-query";

import { relatoriosFinanceirosKeys } from "@/features/financeiro/queries/relatorios-financeiros-keys";
import {
  getDespesasMes,
  getFluxoCaixaFinanceiro,
  getReceitasMes,
  getResumoFinanceiro,
} from "@/features/financeiro/services/relatorios-financeiros-api";
import type { FinanceiroPeriodoQuery } from "@/features/financeiro/types/financeiro.types";

export function resumoFinanceiroQueryOptions(period: FinanceiroPeriodoQuery) {
  return queryOptions({
    queryKey: relatoriosFinanceirosKeys.resumo(period),
    queryFn: () => getResumoFinanceiro(period),
  });
}

export function fluxoCaixaFinanceiroQueryOptions(
  period: FinanceiroPeriodoQuery,
) {
  return queryOptions({
    queryKey: relatoriosFinanceirosKeys.fluxo(period),
    queryFn: () => getFluxoCaixaFinanceiro(period),
  });
}

export function receitasMesQueryOptions() {
  return queryOptions({
    queryKey: relatoriosFinanceirosKeys.receitasMes(),
    queryFn: getReceitasMes,
  });
}

export function despesasMesQueryOptions() {
  return queryOptions({
    queryKey: relatoriosFinanceirosKeys.despesasMes(),
    queryFn: getDespesasMes,
  });
}
