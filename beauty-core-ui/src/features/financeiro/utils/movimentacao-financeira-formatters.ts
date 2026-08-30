import type {
  FormaPagamentoFinanceiro,
  StatusPagamentoFinanceiro,
  TipoMovimentacaoFinanceira,
} from "@/features/financeiro/types/financeiro.types";

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

export function formatMovimentacaoDateTime(value: string) {
  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? "—" : dateTimeFormatter.format(date);
}

export function tipoMovimentacaoLabel(tipo: TipoMovimentacaoFinanceira) {
  return tipo === "RECEITA" ? "Receita" : "Despesa";
}

export function statusPagamentoLabel(status: StatusPagamentoFinanceiro) {
  const labels: Record<StatusPagamentoFinanceiro, string> = {
    PENDENTE: "Pendente",
    PAGO: "Pago",
    CANCELADO: "Cancelado",
    ESTORNADO: "Estornado",
  };

  return labels[status];
}

export function formaPagamentoLabel(forma: FormaPagamentoFinanceiro) {
  const labels: Record<FormaPagamentoFinanceiro, string> = {
    DINHEIRO: "Dinheiro",
    PIX: "Pix",
    CARTAO_CREDITO: "Cartão de crédito",
    CARTAO_DEBITO: "Cartão de débito",
    TRANSFERENCIA: "Transferência",
    BOLETO: "Boleto",
    OUTRO: "Outro",
  };

  return labels[forma];
}
