import { z } from "zod";

const MAX_DECIMAL_10_2 = 99_999_999.99;
const DECIMAL_INPUT_PATTERN = /^\d+(?:[.,]\d{1,2})?$/;

function parseDecimalInput(value: string): number {
  return Number(value.replace(",", "."));
}

export const servicoFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe ao menos 2 caracteres.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),

  descricao: z
    .string()
    .trim()
    .max(500, "A descrição deve ter no máximo 500 caracteres."),

  duracaoMinutos: z
    .string()
    .trim()
    .min(1, "Informe a duração do serviço.")
    .refine((value) => {
      const duration = Number(value);

      return (
        /^\d+$/.test(value) &&
        Number.isSafeInteger(duration) &&
        duration >= 1 &&
        duration <= 2_147_483_647
      );
    }, "Informe uma duração inteira de pelo menos 1 minuto."),

  preco: z
    .string()
    .trim()
    .min(1, "Informe o preço do serviço.")
    .refine(
      (value) => DECIMAL_INPUT_PATTERN.test(value),
      "Informe um preço válido com até 2 casas decimais.",
    )
    .refine((value) => {
      const price = parseDecimalInput(value);

      return Number.isFinite(price) && price <= MAX_DECIMAL_10_2;
    }, "O preço excede o limite permitido."),
});

export type ServicoFormValues = z.infer<typeof servicoFormSchema>;

export const EMPTY_SERVICO_FORM_VALUES: ServicoFormValues = {
  nome: "",
  descricao: "",
  duracaoMinutos: "",
  preco: "",
};
