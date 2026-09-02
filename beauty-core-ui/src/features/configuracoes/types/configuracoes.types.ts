import type { z } from "zod";

import type {
  configuracoesBrandingSchema,
  corPrimariaConfiguracaoSchema,
} from "@/features/configuracoes/schemas/configuracoes.schemas";

export type ConfiguracoesBranding = z.infer<typeof configuracoesBrandingSchema>;

export type CorPrimariaConfiguracao = z.infer<
  typeof corPrimariaConfiguracaoSchema
>;
