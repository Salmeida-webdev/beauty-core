import type { CategoriaFinanceiraFormValues } from "@/features/financeiro/forms/categoria-financeira-form.schema";
import type {
  CreateCategoriaFinanceiraPayload,
  UpdateCategoriaFinanceiraPayload,
} from "@/features/financeiro/types/financeiro.types";

export function toCreateCategoriaFinanceiraPayload(
  values: CategoriaFinanceiraFormValues,
): CreateCategoriaFinanceiraPayload {
  return {
    nome: values.nome.trim(),
    tipo: values.tipo,
  };
}

export function toUpdateCategoriaFinanceiraPayload(
  values: CategoriaFinanceiraFormValues,
): UpdateCategoriaFinanceiraPayload {
  return {
    nome: values.nome.trim(),
    tipo: values.tipo,
  };
}
