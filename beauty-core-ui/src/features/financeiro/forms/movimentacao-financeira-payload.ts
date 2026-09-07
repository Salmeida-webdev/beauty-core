import type { MovimentacaoFinanceiraFormValues } from "@/features/financeiro/forms/movimentacao-financeira-form.schema";
import type {
  CreateMovimentacaoFinanceiraPayload,
  UpdateMovimentacaoFinanceiraPayload,
} from "@/features/financeiro/types/financeiro.types";

function optionalText(value: string): string | undefined {
  const normalized = value.trim();

  return normalized || undefined;
}

function monetaryNumber(value: string): number {
  return Number(value.replace(",", "."));
}

export function toCreateMovimentacaoFinanceiraPayload(
  values: MovimentacaoFinanceiraFormValues,
): CreateMovimentacaoFinanceiraPayload {
  const clienteId =
    values.tipo === "RECEITA" ? optionalText(values.clienteId) : undefined;

  const agendamentoId =
    values.tipo === "RECEITA" ? optionalText(values.agendamentoId) : undefined;

  const observacoes = optionalText(values.observacoes);

  return {
    categoriaId: values.categoriaId,
    ...(clienteId ? { clienteId } : {}),
    ...(agendamentoId ? { agendamentoId } : {}),
    descricao: values.descricao.trim(),
    tipo: values.tipo,
    valor: monetaryNumber(values.valor),
    formaPagamento: values.formaPagamento,
    ...(observacoes ? { observacoes } : {}),
  };
}

export function toUpdateMovimentacaoFinanceiraPayload(
  values: MovimentacaoFinanceiraFormValues,
): UpdateMovimentacaoFinanceiraPayload {
  return toCreateMovimentacaoFinanceiraPayload(values);
}
