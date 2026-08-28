import type {
  z,
} from "zod";

import type {
  clientePacoteSchema,
  fidelidadeBeneficioSchema,
  fidelidadeHistoricoSchema,
  fidelidadeNivelAtualSchema,
  fidelidadeSaldoSchema,
  nivelFidelidadeSchema,
  statusClientePacoteSchema,
} from "@/features/clientes/schemas/cliente-profile-extras.schemas";

export type FidelidadeSaldo =
  z.infer<
    typeof fidelidadeSaldoSchema
  >;

export type FidelidadeHistorico =
  z.infer<
    typeof fidelidadeHistoricoSchema
  >;

export type FidelidadeBeneficio =
  z.infer<
    typeof fidelidadeBeneficioSchema
  >;

export type NivelFidelidade =
  z.infer<
    typeof nivelFidelidadeSchema
  >;

export type FidelidadeNivelAtual =
  z.infer<
    typeof fidelidadeNivelAtualSchema
  >;

export type StatusClientePacote =
  z.infer<
    typeof statusClientePacoteSchema
  >;

export type ClientePacote =
  z.infer<
    typeof clientePacoteSchema
  >;
