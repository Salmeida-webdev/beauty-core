import type { ComissaoFormValues } from "@/features/financeiro/forms/comissao-form.schema";
import type { CreateComissaoProfissionalPayload } from "@/features/financeiro/types/financeiro.types";
import { parsePtBrDecimalInput } from "@/features/financeiro/utils/comissao-input";

function requiredNumber(value: string) {
  const parsed = parsePtBrDecimalInput(value);

  if (parsed === null) {
    throw new Error("Valor numérico inválido.");
  }

  return parsed;
}

export function toCreateComissaoPayload(
  values: ComissaoFormValues,
): CreateComissaoProfissionalPayload {
  return {
    profissionalId: values.profissionalId,
    agendamentoId: values.agendamentoId,
    valorServico: requiredNumber(values.valorServico),
    percentual: requiredNumber(values.percentual),
  };
}
