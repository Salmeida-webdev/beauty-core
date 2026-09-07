import type { z } from "zod";

import type {
  clientePacoteSchema,
  pacoteSchema,
  statusClientePacoteSchema,
} from "../schemas/pacotes.schemas";

export type Pacote = z.infer<typeof pacoteSchema>;
export type ClientePacote = z.infer<typeof clientePacoteSchema>;
export type StatusClientePacote = z.infer<
  typeof statusClientePacoteSchema
>;

export type PacotesRole =
  | "ADMIN"
  | "GERENTE"
  | "RECEPCAO"
  | "PROFISSIONAL";
