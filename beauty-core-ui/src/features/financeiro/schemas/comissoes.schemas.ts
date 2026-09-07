import { z } from "zod";

import { statusPagamentoFinanceiroSchema } from "@/features/financeiro/schemas/financeiro.schemas";

const decimalResponseSchema = z.union([
  z.number().finite(),
  z.string().regex(/^-?\d+(?:\.\d+)?$/),
]);

export const comissaoProfissionalSchema = z.object({
  id: z.string().uuid(),
  profissionalId: z.string().uuid(),
  agendamentoId: z.string().uuid(),
  valorServico: decimalResponseSchema,
  percentual: decimalResponseSchema,
  valorComissao: decimalResponseSchema,
  status: statusPagamentoFinanceiroSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const comissoesListSchema = z.array(comissaoProfissionalSchema);
