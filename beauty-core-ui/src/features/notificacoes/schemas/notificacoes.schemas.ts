// Chat 54 — Blocos 05/10 — Notificações

import { z } from "zod";

import {
  notificacaoOrderByValues,
  notificacaoOrderDirectionValues,
  statusNotificacaoValues,
  tipoNotificacaoValues,
} from "../types/notificacoes.types";

export const tipoNotificacaoSchema = z.enum(
  tipoNotificacaoValues,
);

export const statusNotificacaoSchema = z.enum(
  statusNotificacaoValues,
);

export const notificacaoResumoSchema = z
  .object({
    id: z.string().min(1),
    usuarioId: z.string().nullable().optional(),
    clienteId: z.string().nullable().optional(),
    tipo: tipoNotificacaoSchema,
    titulo: z.string(),
    mensagem: z.string(),
    status: statusNotificacaoSchema,
    dataLeitura: z.string().nullable().optional(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .strip();

export const notificacoesListParamsSchema = z
  .object({
    page: z.number().int().min(1).default(1),
    limit: z.number().int().min(1).max(100).default(20),
    search: z.string().trim().optional(),
    orderBy: z
      .enum(notificacaoOrderByValues)
      .default("createdAt"),
    orderDirection: z
      .enum(notificacaoOrderDirectionValues)
      .default("desc"),
  })
  .strict();

export const notificacoesListResponseSchema = z
  .object({
    data: z.array(notificacaoResumoSchema),
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

export const notificacoesResumoGeralSchema = z
  .object({
    total: z.number().int().nonnegative(),
    naoLidas: z.number().int().nonnegative(),
    lidas: z.number().int().nonnegative(),
    arquivadas: z.number().int().nonnegative(),
  })
  .strip();

export const notificacaoDeleteResultSchema = z
  .object({
    message: z.string().min(1),
  })
  .strip();

export const configuracaoNotificacaoSchema = z
  .object({
    id: z.string().optional(),
    notificarAgendamentos: z.boolean(),
    notificarFinanceiro: z.boolean(),
    notificarFidelidade: z.boolean(),
    notificarPacotes: z.boolean(),
    notificarClientes: z.boolean(),
    notificarMarketing: z.boolean(),
  })
  .strip();
export const configuracaoNotificacaoFormSchema = z
  .object({
    notificarAgendamentos: z.boolean(),
    notificarFinanceiro: z.boolean(),
    notificarFidelidade: z.boolean(),
    notificarPacotes: z.boolean(),
    notificarClientes: z.boolean(),
    notificarMarketing: z.boolean(),
  })
  .strict();

export type ConfiguracaoNotificacaoFormValues = z.infer<
  typeof configuracaoNotificacaoFormSchema
>;