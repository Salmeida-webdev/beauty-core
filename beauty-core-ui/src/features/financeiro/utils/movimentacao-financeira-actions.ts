import type { StatusPagamentoFinanceiro } from "@/features/financeiro/types/financeiro.types";

export function podeRegistrarPagamento(status: StatusPagamentoFinanceiro) {
  return status === "PENDENTE";
}

export function podeOferecerCancelamento(status: StatusPagamentoFinanceiro) {
  return status === "PENDENTE" || status === "PAGO";
}
