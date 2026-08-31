// Chat 54 — Blocos 05/12/13 — Automações

import { z } from "zod";

import {
  tipoEventoSistemaValues,
} from "../types/automacoes.types";

export const tipoEventoSistemaSchema = z.enum(
  tipoEventoSistemaValues,
);

export const processarEventoInputSchema = z
  .object({
    tipo: tipoEventoSistemaSchema,
    modulo: z.string().trim().min(1).max(80),
    titulo: z.string().trim().min(1).max(150).optional(),
    mensagem: z.string().trim().min(1).max(500).optional(),
    usuarioId: z.string().uuid().optional(),
    referenciaId: z.string().uuid().optional(),
    dados: z
      .record(z.string(), z.unknown())
      .optional(),
  })
  .strict();

export const automacaoEventoFormSchema =
  processarEventoInputSchema.pick({
    tipo: true,
    modulo: true,
  });

export const automacaoEventoResumoSchema = z
  .object({
    tipo: tipoEventoSistemaSchema,
    modulo: z.string().trim().min(1).max(80),
    titulo: z.string().optional(),
    mensagem: z.string().optional(),
  })
  .strip();

export const automacoesEventosResumoSchema = z
  .object({
    total: z.number().int().nonnegative(),
    porTipo: z.record(
      z.string(),
      z.number().int().nonnegative(),
    ),
    porModulo: z.record(
      z.string(),
      z.number().int().nonnegative(),
    ),
    eventos: z.array(
      automacaoEventoResumoSchema,
    ),
  })
  .strip();

export const processarEventoResultadoSchema = z
  .object({
    processado: z.literal(true),
    processamento: z.literal("assincrono"),
    notificacaoGerada: z.boolean(),
    motivo: z.string().optional(),
    jobId: z.string().min(1).optional(),
    queue: z.literal("notificacoes").optional(),
  })
  .strip();

export const automacaoTesteResultadoSchema = z
  .object({
    processado: z.literal(true),
    processamento: z.literal("assincrono"),
    queue: z.enum([
      "aniversarios",
      "relatorios",
    ]),
    jobId: z.string().min(1).optional(),
  })
  .strip();