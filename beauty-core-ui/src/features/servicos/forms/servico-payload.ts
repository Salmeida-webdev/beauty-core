import type { ServicoFormValues } from "@/features/servicos/forms/servico-form.schema";
import type {
  CreateServicoPayload,
  Servico,
  UpdateServicoPayload,
} from "@/features/servicos/types/servicos.types";

function toPrice(value: string): number {
  return Number(value.replace(",", "."));
}

function optionalTrimmed(value: string): string | undefined {
  const normalized = value.trim();

  return normalized || undefined;
}

export function toCreateServicoPayload(
  values: ServicoFormValues,
): CreateServicoPayload {
  return {
    nome: values.nome.trim(),
    ...(optionalTrimmed(values.descricao)
      ? { descricao: optionalTrimmed(values.descricao) }
      : {}),
    duracaoMinutos: Number(values.duracaoMinutos),
    preco: toPrice(values.preco),
  };
}

export function toUpdateServicoPayload(
  values: ServicoFormValues,
): UpdateServicoPayload {
  return {
    nome: values.nome.trim(),
    descricao: values.descricao.trim(),
    duracaoMinutos: Number(values.duracaoMinutos),
    preco: toPrice(values.preco),
  };
}

export function servicoToFormValues(servico: Servico): ServicoFormValues {
  return {
    nome: servico.nome,
    descricao: servico.descricao ?? "",
    duracaoMinutos: String(servico.duracaoMinutos),
    preco: servico.preco.toFixed(2).replace(".", ","),
  };
}
