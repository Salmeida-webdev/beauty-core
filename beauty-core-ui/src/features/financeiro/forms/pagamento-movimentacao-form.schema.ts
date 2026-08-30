import { z } from "zod";

import { formaPagamentoFinanceiroSchema } from "@/features/financeiro/schemas/financeiro.schemas";

export const pagamentoMovimentacaoFormSchema = z
  .object({
    formaPagamento: formaPagamentoFinanceiroSchema,
  })
  .strict();

export type PagamentoMovimentacaoFormValues = z.infer<
  typeof pagamentoMovimentacaoFormSchema
>;
