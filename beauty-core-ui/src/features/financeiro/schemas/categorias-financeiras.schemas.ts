import { z } from "zod";

import { tipoCategoriaFinanceiraSchema } from "@/features/financeiro/schemas/financeiro.schemas";

export const categoriaFinanceiraSchema = z.object({
  id: z.string().uuid(),
  nome: z.string(),
  tipo: tipoCategoriaFinanceiraSchema,
  ativo: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const categoriasFinanceirasSchema = z.array(categoriaFinanceiraSchema);
