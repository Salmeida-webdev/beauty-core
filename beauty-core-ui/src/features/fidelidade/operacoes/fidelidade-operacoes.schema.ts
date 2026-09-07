import { z } from "zod";

import { FIDELIDADE_OPERACAO_LIMITS } from "./fidelidade-operacao-limits";

function integerStringSchema(
  min: number,
) {
  return z
    .string()
    .trim()
    .min(1, "Informe a quantidade.")
    .refine(
      (value) =>
        Number.isFinite(Number(value)) &&
        Number.isInteger(Number(value)),
      "Informe um número inteiro.",
    )
    .refine(
      (value) => Number(value) >= min,
      `Informe um valor maior ou igual a ${min}.`,
    );
}

function numberStringSchema(
  min: number,
) {
  return z
    .string()
    .trim()
    .min(1, "Informe o valor.")
    .refine(
      (value) =>
        Number.isFinite(Number(value)),
      "Informe um número válido.",
    )
    .refine(
      (value) => Number(value) >= min,
      `Informe um valor maior ou igual a ${min}.`,
    );
}

function descricaoSchema(
  max: number,
) {
  return z
    .string()
    .trim()
    .min(1, "Informe a descrição ou motivo.")
    .max(
      max,
      `Use no máximo ${max} caracteres.`,
    );
}

export const adicionarPontosFormSchema =
  z.object({
    pontos: integerStringSchema(
      FIDELIDADE_OPERACAO_LIMITS
        .adicionarPontosMin,
    ),

    descricao: descricaoSchema(
      FIDELIDADE_OPERACAO_LIMITS
        .adicionarDescricaoMax,
    ),
  });

export const resgatarPontosFormSchema =
  z.object({
    pontos: integerStringSchema(
      FIDELIDADE_OPERACAO_LIMITS
        .resgatarPontosMin,
    ),

    descricao: descricaoSchema(
      FIDELIDADE_OPERACAO_LIMITS
        .resgatarDescricaoMax,
    ),
  });

export const pontuarPorValorFormSchema =
  z.object({
    valorGasto: numberStringSchema(
      FIDELIDADE_OPERACAO_LIMITS
        .pontuarValorMin,
    ),

    descricao: descricaoSchema(
      FIDELIDADE_OPERACAO_LIMITS
        .pontuarDescricaoMax,
    ),
  });

export type AdicionarPontosFormValues =
  z.infer<
    typeof adicionarPontosFormSchema
  >;

export type ResgatarPontosFormValues =
  z.infer<
    typeof resgatarPontosFormSchema
  >;

export type PontuarPorValorFormValues =
  z.infer<
    typeof pontuarPorValorFormSchema
  >;

export type AdicionarPontosPayload = {
  clienteId: string;
  pontos: number;
  descricao: string;
};

export type ResgatarPontosPayload = {
  clienteId: string;
  pontos: number;
  descricao: string;
};

export type PontuarPorValorPayload = {
  clienteId: string;
  valorGasto: number;
  descricao: string;
};

export function toAdicionarPontosPayload(
  clienteId: string,
  values: AdicionarPontosFormValues,
): AdicionarPontosPayload {
  return {
    clienteId,
    pontos: Number(values.pontos),
    descricao: values.descricao.trim(),
  };
}

export function toResgatarPontosPayload(
  clienteId: string,
  values: ResgatarPontosFormValues,
): ResgatarPontosPayload {
  return {
    clienteId,
    pontos: Number(values.pontos),
    descricao: values.descricao.trim(),
  };
}

export function toPontuarPorValorPayload(
  clienteId: string,
  values: PontuarPorValorFormValues,
): PontuarPorValorPayload {
  return {
    clienteId,
    valorGasto: Number(values.valorGasto),
    descricao: values.descricao.trim(),
  };
}
