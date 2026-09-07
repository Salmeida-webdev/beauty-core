import type { UnidadeFormValues } from "@/features/unidades/forms/unidade-form.schema";
import type {
  CreateUnidadePayload,
  Unidade,
  UpdateUnidadePayload,
} from "@/features/unidades/types/unidades.types";

const optionalValue = (value: string): string | undefined =>
  value.trim() || undefined;

export function toCreateUnidadePayload(
  values: UnidadeFormValues,
): CreateUnidadePayload {
  const telefone = optionalValue(values.telefone);
  const email = optionalValue(values.email);
  const endereco = optionalValue(values.endereco);

  return {
    nome: values.nome.trim(),
    ...(telefone ? { telefone } : {}),
    ...(email ? { email } : {}),
    ...(endereco ? { endereco } : {}),
  };
}

export function toUpdateUnidadePayload(
  values: UnidadeFormValues,
): UpdateUnidadePayload {
  return toCreateUnidadePayload(values);
}

export function unidadeToFormValues(unidade: Unidade): UnidadeFormValues {
  return {
    nome: unidade.nome,
    telefone: unidade.telefone ?? "",
    email: unidade.email ?? "",
    endereco: unidade.endereco ?? "",
  };
}
