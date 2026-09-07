import { z } from "zod";

export const nivelFidelidadeFormSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome."),
  pontosMinimos: z
    .number()
    .int("Informe uma quantidade inteira."),
  beneficios: z.string(),
});

export type NivelFidelidadeFormValues = z.infer<
  typeof nivelFidelidadeFormSchema
>;

export type NivelFidelidadePayload = {
  nome: string;
  pontosMinimos: number;
  beneficios?: string;
};

export function toNivelFidelidadePayload(
  values: NivelFidelidadeFormValues,
): NivelFidelidadePayload {
  const beneficios = values.beneficios.trim();

  return {
    nome: values.nome.trim(),
    pontosMinimos: values.pontosMinimos,
    ...(beneficios ? { beneficios } : {}),
  };
}
