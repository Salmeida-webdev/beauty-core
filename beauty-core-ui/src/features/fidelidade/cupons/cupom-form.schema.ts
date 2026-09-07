import { z } from "zod";

import {
  isCupomTipo,
  type CupomTipo,
} from "./cupom-tipos";
import type { Cupom } from "./cupom.types";

const optionalDateSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      !Number.isNaN(Date.parse(value)),
    "Informe uma data e hora válidas.",
  );

const optionalQuantidadeSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      (
        Number.isFinite(Number(value)) &&
        Number.isInteger(Number(value)) &&
        Number(value) >= 1
      ),
    "Informe um inteiro maior ou igual a 1.",
  );

export const cupomFormSchema = z.object({
  codigo: z
    .string()
    .trim()
    .min(2, "Informe pelo menos 2 caracteres.")
    .max(40, "Use no máximo 40 caracteres."),

  nome: z
    .string()
    .trim()
    .min(2, "Informe pelo menos 2 caracteres.")
    .max(120, "Use no máximo 120 caracteres."),

  descricao: z
    .string()
    .max(500, "Use no máximo 500 caracteres."),

  tipo: z
    .string()
    .refine(
      isCupomTipo,
      "Selecione um tipo válido.",
    ),

  valor: z
    .string()
    .trim()
    .min(1, "Informe o valor.")
    .refine(
      (value) =>
        Number.isFinite(Number(value)) &&
        Number(value) >= 0,
      "Informe um número maior ou igual a zero.",
    ),

  dataInicio: optionalDateSchema,
  dataFim: optionalDateSchema,
  quantidadeMaxima: optionalQuantidadeSchema,
});

export const cupomValidacaoSchema = z.object({
  codigo: z
    .string()
    .trim()
    .min(2, "Informe pelo menos 2 caracteres.")
    .max(40, "Use no máximo 40 caracteres."),
});

export type CupomFormInput = z.input<
  typeof cupomFormSchema
>;

export type CupomFormValues = z.output<
  typeof cupomFormSchema
>;

export type CupomValidacaoValues = z.infer<
  typeof cupomValidacaoSchema
>;

export type CupomPayload = {
  codigo: string;
  nome: string;
  descricao?: string;
  tipo: CupomTipo;
  valor: number;
  dataInicio?: string;
  dataFim?: string;
  quantidadeMaxima?: number;
};

function toOptionalIso(
  value: string,
): string | undefined {
  const normalized = value.trim();

  if (!normalized) {
    return undefined;
  }

  return new Date(normalized).toISOString();
}

function toDateTimeLocal(
  value: unknown,
): string {
  if (
    typeof value !== "string" &&
    !(value instanceof Date)
  ) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const local = new Date(
    date.getTime() -
      date.getTimezoneOffset() * 60_000,
  );

  return local
    .toISOString()
    .slice(0, 16);
}

export function cupomToFormValues(
  cupom: Cupom,
): CupomFormInput {
  return {
    codigo: cupom.codigo,
    nome: cupom.nome,
    descricao: cupom.descricao ?? "",
    tipo: String(cupom.tipo),
    valor: String(cupom.valor),
    dataInicio: toDateTimeLocal(
      cupom.dataInicio,
    ),
    dataFim: toDateTimeLocal(
      cupom.dataFim,
    ),
    quantidadeMaxima:
      cupom.quantidadeMaxima == null
        ? ""
        : String(cupom.quantidadeMaxima),
  };
}

export function emptyCupomFormValues(): CupomFormInput {
  return {
    codigo: "",
    nome: "",
    descricao: "",
    tipo: "",
    valor: "",
    dataInicio: "",
    dataFim: "",
    quantidadeMaxima: "",
  };
}

export function toCupomPayload(
  values: CupomFormValues,
): CupomPayload {
  if (!isCupomTipo(values.tipo)) {
    throw new Error(
      "Tipo de cupom não pertence ao contrato atual.",
    );
  }

  const descricao = values.descricao.trim();
  const dataInicio =
    toOptionalIso(values.dataInicio);
  const dataFim =
    toOptionalIso(values.dataFim);
  const quantidade =
    values.quantidadeMaxima.trim();

  return {
    codigo: values.codigo.trim(),
    nome: values.nome.trim(),
    ...(descricao
      ? { descricao }
      : {}),
    tipo: values.tipo,
    valor: Number(values.valor),
    ...(dataInicio
      ? { dataInicio }
      : {}),
    ...(dataFim
      ? { dataFim }
      : {}),
    ...(quantidade
      ? {
          quantidadeMaxima:
            Number(quantidade),
        }
      : {}),
  };
}
