import { z } from "zod";

import { tipoCategoriaFinanceiraSchema } from "@/features/financeiro/schemas/financeiro.schemas";

export const categoriaFinanceiraFormSchema = z.object({
  nome: z.string().trim().min(1, "Informe o nome da categoria."),
  tipo: tipoCategoriaFinanceiraSchema,
});

export type CategoriaFinanceiraFormValues = z.infer<
  typeof categoriaFinanceiraFormSchema
>;
