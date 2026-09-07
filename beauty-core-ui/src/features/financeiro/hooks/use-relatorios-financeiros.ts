"use client";

import { useQuery } from "@tanstack/react-query";

import {
  despesasMesQueryOptions,
  fluxoCaixaFinanceiroQueryOptions,
  receitasMesQueryOptions,
  resumoFinanceiroQueryOptions,
} from "@/features/financeiro/queries/relatorios-financeiros-query-options";
import type { FinanceiroPeriodoQuery } from "@/features/financeiro/types/financeiro.types";

export function useRelatoriosFinanceiros(period: FinanceiroPeriodoQuery) {
  const resumo = useQuery(resumoFinanceiroQueryOptions(period));

  const fluxo = useQuery(fluxoCaixaFinanceiroQueryOptions(period));

  const receitasMes = useQuery(receitasMesQueryOptions());

  const despesasMes = useQuery(despesasMesQueryOptions());

  return {
    resumo,
    fluxo,
    receitasMes,
    despesasMes,
  };
}
