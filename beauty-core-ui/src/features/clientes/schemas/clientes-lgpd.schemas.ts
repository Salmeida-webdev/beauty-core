import { z } from "zod";

export const lgpdClienteExportResponseSchema = z
  .object({
    exportadoEm: z.string(),
    clienteId: z.string(),
    empresaId: z.string(),
    perfil: z.record(z.string(), z.unknown()),
    agendamentos: z.array(z.unknown()),
    pontos: z.record(z.string(), z.unknown()),
    pacotes: z.record(z.string(), z.unknown()),
    notificacoes: z.array(z.unknown()),
    mensagensWhatsApp: z.array(z.unknown()),
  })
  .passthrough();

export const lgpdAnonimizacaoResponseSchema = z
  .object({
    success: z.boolean(),
    clienteId: z.string(),
    empresaId: z.string(),
    anonimizadoEm: z.string(),
    camposAnonimizados: z.array(z.string()),
    observacao: z.string(),
  })
  .passthrough();

export type LgpdClienteExportResponse = z.infer<
  typeof lgpdClienteExportResponseSchema
>;

export type LgpdAnonimizacaoResponse = z.infer<
  typeof lgpdAnonimizacaoResponseSchema
>;
