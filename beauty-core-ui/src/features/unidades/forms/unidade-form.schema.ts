import { z } from "zod";

const email = z
  .string()
  .trim()
  .max(150, "O email deve ter no máximo 150 caracteres.")
  .refine(
    (value) => value === "" || z.string().email().safeParse(value).success,
    "Informe um email válido.",
  );

export const unidadeFormSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Informe ao menos 2 caracteres.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),
  telefone: z
    .string()
    .trim()
    .max(20, "O telefone deve ter no máximo 20 caracteres."),
  email,
  endereco: z
    .string()
    .trim()
    .max(255, "O endereço deve ter no máximo 255 caracteres."),
});

export type UnidadeFormValues = z.infer<typeof unidadeFormSchema>;

export const EMPTY_UNIDADE_FORM_VALUES: UnidadeFormValues = {
  nome: "",
  telefone: "",
  email: "",
  endereco: "",
};
