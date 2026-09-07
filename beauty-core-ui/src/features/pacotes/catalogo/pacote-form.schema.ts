import { z } from "zod";

import { PACOTE_FORM_LIMITS } from "./pacote-form-limits";

const valorSchema = z
  .string()
  .trim()
  .min(1, "Informe o valor.")
  .refine(
    (value) =>
      Number.isFinite(Number(value)) &&
      Number(value) >=
        PACOTE_FORM_LIMITS.valorMin,
    `Informe um valor maior ou igual a ${PACOTE_FORM_LIMITS.valorMin}.`,
  );

const quantidadeSchema = z
  .string()
  .trim()
  .min(1, "Informe a quantidade.")
  .refine(
    (value) =>
      Number.isFinite(Number(value)) &&
      Number.isInteger(Number(value)) &&
      Number(value) >=
        PACOTE_FORM_LIMITS.quantidadeSessoesMin,
    `Informe um inteiro maior ou igual a ${PACOTE_FORM_LIMITS.quantidadeSessoesMin}.`,
  );

const validadeSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      (
        Number.isFinite(Number(value)) &&
        Number.isInteger(Number(value)) &&
        Number(value) >=
          PACOTE_FORM_LIMITS.validadeDiasMin
      ),
    `Informe um inteiro maior ou igual a ${PACOTE_FORM_LIMITS.validadeDiasMin}.`,
  );

export const pacoteFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(
      PACOTE_FORM_LIMITS.nomeMin,
      `Informe pelo menos ${PACOTE_FORM_LIMITS.nomeMin} caracteres.`,
    )
    .max(
      PACOTE_FORM_LIMITS.nomeMax,
      `Use no máximo ${PACOTE_FORM_LIMITS.nomeMax} caracteres.`,
    ),

  descricao: z
    .string()
    .max(
      PACOTE_FORM_LIMITS.descricaoMax,
      `Use no máximo ${PACOTE_FORM_LIMITS.descricaoMax} caracteres.`,
    ),

  valor: valorSchema,
  quantidadeSessoes: quantidadeSchema,
  validadeDias: validadeSchema,
});

export type PacoteFormValues = z.infer<
  typeof pacoteFormSchema
>;

export type PacotePayload = {
  nome: string;
  descricao?: string;
  valor: number;
  quantidadeSessoes: number;
  validadeDias?: number;
};

export function emptyPacoteFormValues(): PacoteFormValues {
  return {
    nome: "",
    descricao: "",
    valor: "",
    quantidadeSessoes: "",
    validadeDias: "",
  };
}

export function toPacotePayload(
  values: PacoteFormValues,
): PacotePayload {
  const descricao =
    values.descricao.trim();

  const validade =
    values.validadeDias.trim();

  return {
    nome: values.nome.trim(),

    ...(descricao
      ? { descricao }
      : {}),

    valor:
      Number(values.valor),

    quantidadeSessoes:
      Number(values.quantidadeSessoes),

    ...(validade
      ? {
          validadeDias:
            Number(validade),
        }
      : {}),
  };
}
