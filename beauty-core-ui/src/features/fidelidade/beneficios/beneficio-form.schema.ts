import { z } from "zod";

export const beneficioFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe pelo menos 2 caracteres.")
    .max(120, "Use no máximo 120 caracteres."),

  descricao: z
    .string()
    .max(500, "Use no máximo 500 caracteres."),

  pontosNecessarios: z
    .number()
    .int("Informe uma quantidade inteira.")
    .min(1, "Informe pelo menos 1 ponto."),
});

export type BeneficioFormValues = z.infer<
  typeof beneficioFormSchema
>;

export type BeneficioPayload = {
  nome: string;
  descricao?: string;
  pontosNecessarios: number;
};

export function toBeneficioPayload(
  values: BeneficioFormValues,
): BeneficioPayload {
  const descricao = values.descricao.trim();

  return {
    nome: values.nome.trim(),
    pontosNecessarios: values.pontosNecessarios,
    ...(descricao ? { descricao } : {}),
  };
}
