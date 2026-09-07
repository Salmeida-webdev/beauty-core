import { z } from "zod";

import {
  formaPagamentoFinanceiroSchema,
  tipoMovimentacaoFinanceiraSchema,
} from "@/features/financeiro/schemas/financeiro.schemas";

const optionalUuidSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().uuid().safeParse(value).success,
    "Informe um UUID válido.",
  );

export const movimentacaoFinanceiraFormSchema = z
  .object({
    categoriaId: z.string().uuid("Selecione uma categoria válida."),
    clienteId: optionalUuidSchema,
    agendamentoId: optionalUuidSchema,
    descricao: z.string().trim().min(1, "Informe a descrição."),
    tipo: tipoMovimentacaoFinanceiraSchema,
    valor: z
      .string()
      .trim()
      .min(1, "Informe o valor.")
      .refine(
        (value) => /^\d+(?:[.,]\d{1,2})?$/.test(value),
        "Informe um valor monetário válido.",
      ),
    formaPagamento: formaPagamentoFinanceiroSchema,
    observacoes: z.string().trim(),
  })
  .strict();

export type MovimentacaoFinanceiraFormValues = z.infer<
  typeof movimentacaoFinanceiraFormSchema
>;
