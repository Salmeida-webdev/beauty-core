import { z } from "zod";

import { agendamentoStatusSchema } from "@/features/agendamentos/schemas/agendamentos-schemas";

const agendaOrderBySchema = z.enum([
  "dataHoraInicio",
  "dataHoraFim",
  "status",
  "createdAt",
  "updatedAt",
]);

const agendaOrderDirectionSchema = z.enum([
  "asc",
  "desc",
]);

export const agendamentosListParamsSchema =
  z.object({
    page: z
      .number()
      .int()
      .min(1)
      .default(1),

    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .default(20),

    orderBy:
      agendaOrderBySchema.default(
        "dataHoraInicio",
      ),

    orderDirection:
      agendaOrderDirectionSchema.default(
        "asc",
      ),

    dataInicio: z
      .string()
      .datetime()
      .optional(),

    dataFim: z
      .string()
      .datetime()
      .optional(),

    status:
      agendamentoStatusSchema.optional(),

    clienteId: z.uuid().optional(),

    profissionalId:
      z.uuid().optional(),

    servicoId: z.uuid().optional(),

    unidadeId: z.uuid().optional(),
  });

export const agendamentoListClienteSchema =
  z.object({
    id: z.uuid(),
    nome: z.string(),
    telefone: z
      .string()
      .nullable(),
  });

export const agendamentoListProfissionalSchema =
  z.object({
    id: z.uuid(),
    nome: z.string(),
  });

export const agendamentoListServicoSchema =
  z.object({
    id: z.uuid(),
    nome: z.string(),
    preco: z
      .union([
        z.string(),
        z.number(),
      ])
      .nullable(),
    duracaoMinutos: z.number(),
  });

export const agendamentoListUnidadeSchema =
  z.object({
    id: z.uuid(),
    nome: z.string(),
  });

export const agendamentoListItemSchema =
  z.object({
    id: z.uuid(),
    clienteId: z.uuid(),
    profissionalId: z.uuid(),
    servicoId: z.uuid(),
    unidadeId: z.uuid(),
    dataHoraInicio: z
      .string()
      .datetime(),
    dataHoraFim: z
      .string()
      .datetime(),
    observacoes: z
      .string()
      .nullable(),
    status:
      agendamentoStatusSchema,
    createdAt: z
      .string()
      .datetime(),
    updatedAt: z
      .string()
      .datetime(),
    cliente:
      agendamentoListClienteSchema,
    profissional:
      agendamentoListProfissionalSchema,
    servico:
      agendamentoListServicoSchema,
    unidade:
      agendamentoListUnidadeSchema,
  });

export const agendamentoDetailSchema =
  agendamentoListItemSchema.extend({
    cliente:
      agendamentoListClienteSchema.extend(
        {
          email: z
            .string()
            .nullable(),
        },
      ),

    profissional:
      agendamentoListProfissionalSchema.extend(
        {
          email: z
            .string()
            .nullable(),
        },
      ),
  });

export const agendamentosPaginationMetaSchema =
  z.object({
    page: z
      .number()
      .int()
      .min(1),

    limit: z
      .number()
      .int()
      .min(1),

    total: z
      .number()
      .int()
      .min(0),

    totalPages: z
      .number()
      .int()
      .min(0),
  });

export const agendamentosListResponseSchema =
  z.object({
    data: z.array(
      agendamentoListItemSchema,
    ),
    meta:
      agendamentosPaginationMetaSchema,
  });

export const agendamentoMutationResultSchema =
  z.object({
    id: z.uuid(),
    unidadeId: z.uuid(),
    clienteId: z.uuid(),
    servicoId: z.uuid(),
    profissionalId: z.uuid(),
    dataHoraInicio: z
      .string()
      .datetime(),
    dataHoraFim: z
      .string()
      .datetime(),
    observacoes: z
      .string()
      .nullable(),
    status:
      agendamentoStatusSchema,
    createdAt: z
      .string()
      .datetime(),
    updatedAt: z
      .string()
      .datetime(),
  });