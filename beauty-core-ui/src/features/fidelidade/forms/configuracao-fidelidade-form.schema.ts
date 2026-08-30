import { z } from "zod";

import type { ConfiguracaoFidelidade } from "../types/fidelidade.types";

const booleanChoiceSchema = z
  .string()
  .refine(
    (value) => value === "true" || value === "false",
    "Selecione Sim ou Não.",
  );

const numberStringSchema = z
  .string()
  .trim()
  .min(1, "Informe um valor.")
  .refine(
    (value) => Number.isFinite(Number(value)),
    "Informe um número válido.",
  );

const optionalIntegerStringSchema = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      (Number.isFinite(Number(value)) &&
        Number.isInteger(Number(value))),
    "Informe um número inteiro.",
  );

export const configuracaoFidelidadeFormSchema = z.object({
  fidelidadeAtiva: booleanChoiceSchema,
  pontuacaoAutomatica: booleanChoiceSchema,
  reaisPorPonto: numberStringSchema,
  niveisAtivos: booleanChoiceSchema,
  beneficiosAutomaticos: booleanChoiceSchema,
  bonusAniversarioAtivo: booleanChoiceSchema,
  bonusAniversarioPontos: optionalIntegerStringSchema,
});

export type ConfiguracaoFidelidadeFormInput = z.input<
  typeof configuracaoFidelidadeFormSchema
>;

export type ConfiguracaoFidelidadeFormValues = z.output<
  typeof configuracaoFidelidadeFormSchema
>;

export type ConfiguracaoFidelidadePayload = {
  fidelidadeAtiva: boolean;
  pontuacaoAutomatica: boolean;
  reaisPorPonto: number;
  niveisAtivos: boolean;
  beneficiosAutomaticos: boolean;
  bonusAniversarioAtivo: boolean;
  bonusAniversarioPontos?: number;
};

export function emptyConfiguracaoFidelidadeFormValues(): ConfiguracaoFidelidadeFormInput {
  return {
    fidelidadeAtiva: "",
    pontuacaoAutomatica: "",
    reaisPorPonto: "",
    niveisAtivos: "",
    beneficiosAutomaticos: "",
    bonusAniversarioAtivo: "",
    bonusAniversarioPontos: "",
  };
}

export function configuracaoFidelidadeToFormValues(
  configuracao: ConfiguracaoFidelidade,
): ConfiguracaoFidelidadeFormInput {
  return {
    fidelidadeAtiva: configuracao.fidelidadeAtiva
      ? "true"
      : "false",

    pontuacaoAutomatica:
      configuracao.pontuacaoAutomatica
        ? "true"
        : "false",

    reaisPorPonto: String(
      configuracao.reaisPorPonto,
    ),

    niveisAtivos: configuracao.niveisAtivos
      ? "true"
      : "false",

    beneficiosAutomaticos:
      configuracao.beneficiosAutomaticos
        ? "true"
        : "false",

    bonusAniversarioAtivo:
      configuracao.bonusAniversarioAtivo
        ? "true"
        : "false",

    bonusAniversarioPontos: String(
      configuracao.bonusAniversarioPontos,
    ),
  };
}

export function toConfiguracaoFidelidadePayload(
  values: ConfiguracaoFidelidadeFormValues,
): ConfiguracaoFidelidadePayload {
  const bonus =
    values.bonusAniversarioPontos.trim();

  return {
    fidelidadeAtiva:
      values.fidelidadeAtiva === "true",

    pontuacaoAutomatica:
      values.pontuacaoAutomatica === "true",

    reaisPorPonto:
      Number(values.reaisPorPonto),

    niveisAtivos:
      values.niveisAtivos === "true",

    beneficiosAutomaticos:
      values.beneficiosAutomaticos === "true",

    bonusAniversarioAtivo:
      values.bonusAniversarioAtivo === "true",

    ...(bonus
      ? {
          bonusAniversarioPontos:
            Number(bonus),
        }
      : {}),
  };
}
