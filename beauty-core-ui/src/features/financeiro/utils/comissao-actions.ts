import type { StatusPagamentoFinanceiro } from "@/features/financeiro/types/financeiro.types";

export function podePagarComissao(status: StatusPagamentoFinanceiro) {
  return status === "PENDENTE";
}
