import { z } from "zod";

export const portalLoyaltySchema = z.object({
  saldoAtual: z.number(),
  totalPontosRecebidos: z.number(),
  totalPontosResgatados: z.number(),
  nivelAtual: z.unknown().nullable(),
  proximoNivel: z.unknown().nullable(),
  pontosParaProximoNivel: z.number(),
  beneficiosDisponiveis: z.array(z.unknown()),
}).passthrough();

export const portalPointsResponseSchema = z.object({
  data: z.array(z.unknown()),
  meta: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export const portalBenefitsSchema = z.object({
  liberados: z.array(z.unknown()),
  disponiveis: z.array(z.unknown()),
  utilizados: z.array(z.unknown()),
}).passthrough();

export type PortalLoyalty = z.infer<typeof portalLoyaltySchema>;
export type PortalPointsResponse = z.infer<typeof portalPointsResponseSchema>;
export type PortalBenefits = z.infer<typeof portalBenefitsSchema>;

export const portalPointMovementSchema = z.object({
  id: z.string().optional(),
  pontos: z.number().optional(),
  quantidade: z.number().optional(),
  tipo: z.string().optional(),
  descricao: z.string().nullable().optional(),
  motivo: z.string().nullable().optional(),
  createdAt: z.string().optional(),
  data: z.string().optional(),
  dataCriacao: z.string().optional(),
}).passthrough();

export type PortalPointMovement = z.infer<
  typeof portalPointMovementSchema
>;
