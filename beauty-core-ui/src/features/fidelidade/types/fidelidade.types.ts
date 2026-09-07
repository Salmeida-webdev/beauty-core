import type { z } from "zod";

import type {
  beneficioDisponivelSchema,
  beneficioSchema,
  configuracaoFidelidadeSchema,
  cupomSchema,
  fidelidadeSchema,
  movimentacaoPontosSchema,
  nivelAtualSchema,
  nivelFidelidadeSchema,
} from "../schemas/fidelidade.schemas";

export type Fidelidade = z.infer<typeof fidelidadeSchema>;
export type MovimentacaoPontos = z.infer<typeof movimentacaoPontosSchema>;
export type ConfiguracaoFidelidade = z.infer<
  typeof configuracaoFidelidadeSchema
>;
export type NivelFidelidade = z.infer<typeof nivelFidelidadeSchema>;
export type Beneficio = z.infer<typeof beneficioSchema>;
export type Cupom = z.infer<typeof cupomSchema>;
export type NivelAtual = z.infer<typeof nivelAtualSchema>;
export type BeneficioDisponivel = z.infer<
  typeof beneficioDisponivelSchema
>;

export type FidelidadeRole =
  | "ADMIN"
  | "GERENTE"
  | "RECEPCAO"
  | "PROFISSIONAL";
