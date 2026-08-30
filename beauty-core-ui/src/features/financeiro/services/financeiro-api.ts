import type { FinanceiroListQuery } from "@/features/financeiro/types/financeiro.types";

export const financeiroEndpoints = {
  movimentacoes: "/financeiro",
  movimentacao: (id: string) => `/financeiro/${encodeURIComponent(id)}`,
  cancelarMovimentacao: (id: string) =>
    `/financeiro/${encodeURIComponent(id)}/cancelar`,
  pagarMovimentacao: (id: string) =>
    `/financeiro/${encodeURIComponent(id)}/pagar`,
  resumo: "/financeiro/resumo",
  fluxoCaixa: "/financeiro/fluxo-caixa",
  receitasMes: "/financeiro/receitas-mes",
  despesasMes: "/financeiro/despesas-mes",
  categorias: "/categorias-financeiras",
  categoria: (id: string) =>
    `/categorias-financeiras/${encodeURIComponent(id)}`,
  inativarCategoria: (id: string) =>
    `/categorias-financeiras/${encodeURIComponent(id)}/inativar`,
  comissoes: "/comissoes",
  comissao: (id: string) => `/comissoes/${encodeURIComponent(id)}`,
  pagarComissao: (id: string) => `/comissoes/${encodeURIComponent(id)}/pagar`,
} as const;

export function buildFinanceiroSearchParams(query: FinanceiroListQuery) {
  const params = new URLSearchParams();

  if (query.page !== undefined) {
    params.set("page", String(query.page));
  }

  if (query.limit !== undefined) {
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
