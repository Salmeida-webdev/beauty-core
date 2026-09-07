// Chat 54 — Blocos 05–08 — WhatsApp runtime schemas

import { z } from "zod";

import {
  canalWhatsappValues,
  statusMensagemWhatsappValues,
  tipoMensagemWhatsappValues,
  whatsappMessageOrderByValues,
  whatsappOrderDirectionValues,
} from "../types/whatsapp.types";

export const canalWhatsappSchema = z.enum(
  canalWhatsappValues,
);

export const tipoMensagemWhatsappSchema = z.enum(
  tipoMensagemWhatsappValues,
);

export const statusMensagemWhatsappSchema = z.enum(
  statusMensagemWhatsappValues,
);

export const whatsappTelefoneSchema = z
  .string()
  .trim()
  .min(
    10,
    "O destinatário deve ter no mínimo 10 caracteres.",
  )
  .max(
    15,
    "O destinatário deve ter no máximo 15 caracteres.",
  );

export const templateWhatsappSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
    tipo: tipoMensagemWhatsappSchema,
    titulo: z.string(),
    mensagem: z.string(),
    ativo: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strip();

export const templatesWhatsappSchema = z.array(
  templateWhatsappSchema,
);

export const templateWhatsappFormSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(
        2,
        "O nome deve ter no mínimo 2 caracteres.",
      )
      .max(
        120,
        "O nome deve ter no máximo 120 caracteres.",
      ),

    tipo: tipoMensagemWhatsappSchema,

    titulo: z
      .string()
      .trim()
      .min(
        2,
        "O título deve ter no mínimo 2 caracteres.",
      )
      .max(
        150,
        "O título deve ter no máximo 150 caracteres.",
      ),

    mensagem: z
      .string()
      .trim()
      .min(
        1,
        "Informe a mensagem do template.",
      )
      .max(
        1000,
        "A mensagem deve ter no máximo 1000 caracteres.",
      ),
  })
  .strict();

export type TemplateWhatsappFormValues = z.infer<
  typeof templateWhatsappFormSchema
>;

const whatsappMensagemClienteSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
  })
  .strip();

const whatsappMensagemUsuarioSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
    role: z.string(),
  })
  .strip();

const whatsappMensagemTemplateSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
    tipo: tipoMensagemWhatsappSchema,
    titulo: z.string(),
  })
  .strip();

export const whatsappMensagemSchema = z
  .object({
    id: z.string().min(1),
    clienteId: z.string().nullable().optional(),
    usuarioId: z.string().nullable().optional(),
    templateId: z.string().nullable().optional(),
    tipo: tipoMensagemWhatsappSchema,
    destinatario: z.string(),
    mensagem: z.string(),
    status: statusMensagemWhatsappSchema,
    erro: z.string().nullable().optional(),
    dataEnvio: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
    cliente:
      whatsappMensagemClienteSchema.nullable().optional(),
    usuario:
      whatsappMensagemUsuarioSchema.nullable().optional(),
    template:
      whatsappMensagemTemplateSchema.nullable().optional(),
  })
  .strip();

export const whatsappMensagemPayloadSchema = z
  .object({
    clienteId: z.string().uuid().optional(),
    usuarioId: z.string().uuid().optional(),
    templateId: z.string().uuid().optional(),
    tipo: tipoMensagemWhatsappSchema,
    destinatario: whatsappTelefoneSchema,
    mensagem: z
      .string()
      .trim()
      .min(
        1,
        "Informe a mensagem.",
      )
      .max(
        1000,
        "A mensagem deve ter no máximo 1000 caracteres.",
      ),
  })
  .strict();

export type WhatsappMensagemPayload = z.infer<
  typeof whatsappMensagemPayloadSchema
>;

export const whatsappMensagemSendFormSchema =
  whatsappMensagemPayloadSchema
    .pick({
      tipo: true,
      destinatario: true,
      mensagem: true,
    })
    .strict();

export type WhatsappMensagemSendFormValues = z.infer<
  typeof whatsappMensagemSendFormSchema
>;

export const whatsappMessagesListParamsSchema = z
  .object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    search: z.string().trim().optional(),
    orderBy: z
      .enum(whatsappMessageOrderByValues)
      .default("createdAt"),
    orderDirection: z
      .enum(whatsappOrderDirectionValues)
      .default("desc"),
  })
  .strict();

export const whatsappMessagesListResponseSchema = z
  .object({
    data: z.array(whatsappMensagemSchema),
    meta: z
      .object({
        page: z.number().int().min(1),
        limit: z.number().int().min(1),
        total: z.number().int().nonnegative(),
        totalPages: z.number().int().nonnegative(),
      })
      .strip(),
  })
  .strip();

export const whatsappSendResultSchema = z
  .object({
    processado: z.boolean(),
    processamento: z.literal("assincrono"),
    whatsappGerado: z.boolean(),
    mensagemId: z.string().min(1),
    jobId: z.string().min(1),
    queue: z.literal("whatsapp"),
  })
  .strip();

export const campanhaWhatsappResumoSchema = z
  .object({
    id: z.string().min(1),
    nome: z.string(),
    descricao: z.string().nullable().optional(),
    tipo: tipoMensagemWhatsappSchema,
    mensagem: z.string(),
    status: statusMensagemWhatsappSchema,
    totalDestinatarios: z.number().int(),
    totalEnviadas: z.number().int(),
    totalFalhas: z.number().int(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strip();

export const campanhasWhatsappSchema = z.array(
  campanhaWhatsappResumoSchema,
);

export const campanhaWhatsappFormSchema = z
  .object({
    nome: z
      .string()
      .trim()
      .min(
        1,
        "Informe o nome da campanha.",
      ),

    descricao: z
      .string()
      .trim()
      .optional(),

    tipo: tipoMensagemWhatsappSchema,

    mensagem: z
      .string()
      .trim()
      .min(
        1,
        "Informe a mensagem da campanha.",
      ),

    totalDestinatarios: z
      .number()
      .int(
        "O total de destinatários deve ser inteiro.",
      )
      .nonnegative(
        "O total de destinatários não pode ser negativo.",
      ),
  })
  .strict();

export type CampanhaWhatsappFormValues = z.infer<
  typeof campanhaWhatsappFormSchema
>;

export const campanhaWhatsappUpdateSchema =
  campanhaWhatsappFormSchema
    .partial()
    .strict();

export type CampanhaWhatsappUpdateValues = z.infer<
  typeof campanhaWhatsappUpdateSchema
>;

export const campanhaWhatsappCreateResultSchema = z
  .object({
    campanha: campanhaWhatsappResumoSchema,
    processamento: z.literal("assincrono"),
    jobId: z
      .union([
        z.string(),
        z.number(),
      ])
      .transform((value) => String(value)),
    queue: z.literal("campanhas"),
  })
  .strip();