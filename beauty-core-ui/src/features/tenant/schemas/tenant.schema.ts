import { z } from "zod";

import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

const hexadecimalColorSchema = z.string().regex(
  /^#[0-9a-fA-F]{6}$/,
  "A cor deve utilizar o formato hexadecimal #RRGGBB.",
);

const relativeAssetPathSchema = z.string().regex(
  /^\/(?!\/).+/,
  "O caminho relativo deve começar com uma única barra.",
);

const publicAssetUrlSchema = z
  .union([
    z.string().url(),
    relativeAssetPathSchema,
  ])
  .nullable();

export const tenantPublicConfigSchema = z
  .object({
    id: z.string().trim().min(1).nullable(),
    name: z.string().trim().min(2).max(120),
    slug: z
      .string()
      .trim()
      .min(2)
      .max(80)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "O slug deve conter apenas letras minúsculas, números e hífens.",
      ),
    domain: z.string().trim().min(1).max(253).nullable(),
    locale: z.literal("pt-BR"),
    branding: z.object({
      logoUrl: publicAssetUrlSchema,
      faviconUrl: publicAssetUrlSchema,
      primaryColor: hexadecimalColorSchema,
      secondaryColor: hexadecimalColorSchema,
      accentColor: hexadecimalColorSchema,
    }),
    settings: z.object({
      allowDarkMode: z.boolean(),
      showPoweredByBeautyCore: z.boolean(),
    }),
  })
  .strict();

export function parseTenantPublicConfig(
  value: unknown,
): TenantPublicConfig {
  return tenantPublicConfigSchema.parse(value);
}
