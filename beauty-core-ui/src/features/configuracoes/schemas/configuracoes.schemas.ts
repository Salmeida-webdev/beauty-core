import { z } from "zod";

export const corPrimariaConfiguracaoSchema = z
  .string()
  .regex(
    /^#[0-9a-fA-F]{6}$/,
    "Informe uma cor hexadecimal no formato #RRGGBB.",
  );

export const configuracoesBrandingSchema = z.object({
  logo: z.string().min(1).nullable(),
  corPrimaria: corPrimariaConfiguracaoSchema.nullable(),
});
