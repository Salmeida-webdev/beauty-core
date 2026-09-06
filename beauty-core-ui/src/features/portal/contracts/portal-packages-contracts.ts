import { z } from "zod";

export const portalPackageSchema = z.object({
  id: z.string().optional(),
  nome: z.string().optional(),
  titulo: z.string().optional(),
  descricao: z.string().nullable().optional(),
  status: z.string().optional(),
  sessoesTotais: z.number().optional(),
  sessoesUtilizadas: z.number().optional(),
  sessoesRestantes: z.number().optional(),
  saldoSessoes: z.number().optional(),
  validade: z.string().nullable().optional(),
  dataValidade: z.string().nullable().optional(),
  expiresAt: z.string().nullable().optional(),
}).passthrough();

export const portalPackagesResponseSchema = z.unknown();

export type PortalPackage = z.infer<typeof portalPackageSchema>;
