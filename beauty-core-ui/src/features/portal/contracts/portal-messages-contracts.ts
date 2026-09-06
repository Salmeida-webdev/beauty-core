import { z } from "zod";

const portalWhatsappMessageTypeSchema = z.string().min(1);
const portalWhatsappMessageStatusSchema = z.string().min(1);

const portalWhatsappRelatedClientSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
  })
  .strip();

const portalWhatsappRelatedUserSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
    role: z.string(),
  })
  .strip();

const portalWhatsappRelatedTemplateSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
    tipo: z.string().min(1),
    titulo: z.string(),
  })
  .strip();

export const portalWhatsappMessageSchema = z
  .object({
    id: z.string().min(1),
    clienteId: z.string().nullable().optional(),
    usuarioId: z.string().nullable().optional(),
    templateId: z.string().nullable().optional(),
    tipo: portalWhatsappMessageTypeSchema,
    destinatario: z.string(),
    mensagem: z.string(),
    status: portalWhatsappMessageStatusSchema,
    erro: z.string().nullable().optional(),
    dataEnvio: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    cliente: portalWhatsappRelatedClientSchema.nullable().optional(),
    usuario: portalWhatsappRelatedUserSchema.nullable().optional(),
    template: portalWhatsappRelatedTemplateSchema.nullable().optional(),
  })
  .strip();

export const portalWhatsappMessagesResponseSchema = z
  .object({
    data: z.array(portalWhatsappMessageSchema),
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().nonnegative(),
    orderBy: z.string().optional(),
    orderDirection: z.enum(["asc", "desc"]).optional(),
  })
  .strip();

export const portalWhatsappMessagesParamsSchema = z
  .object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
  })
  .strict();

export type PortalWhatsappMessage = z.infer<
  typeof portalWhatsappMessageSchema
>;

export type PortalWhatsappMessagesResponse = z.infer<
  typeof portalWhatsappMessagesResponseSchema
>;

export type PortalWhatsappMessagesParams = z.input<
  typeof portalWhatsappMessagesParamsSchema
>;
