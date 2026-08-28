import { z } from "zod";

const uuidSchema = z.string().uuid();

const dateTimeSchema =
  z.string().datetime({
    offset: true,
  });

export const fidelidadeSaldoSchema =
  z.object({
    clienteId: uuidSchema,
    saldoPontos: z
      .number()
      .int(),
  });

export const movimentacaoPontosSchema =
  z.object({
    id: uuidSchema,
    clienteId: uuidSchema,
    tipo: z.string().min(1),
    pontos: z.number().int(),
    descricao: z
      .string()
      .nullable()
      .optional(),
    createdAt:
      dateTimeSchema,
  });

export const fidelidadeHistoricoSchema =
  z.array(
    movimentacaoPontosSchema,
  );

export const fidelidadeBeneficioSchema =
  z.object({
    clienteId: uuidSchema,
    saldoPontos: z
      .number()
      .int(),
    pontosParaResgate: z
      .number()
      .int(),
    valorPorResgate:
      z.number(),
    quantidadeResgates: z
      .number()
      .int(),
    valorDisponivel:
      z.number(),
  });

export const nivelFidelidadeSchema =
  z.object({
    id: uuidSchema,
    nome: z.string().min(1),
    pontosMinimos: z
      .number()
      .int(),
    beneficios: z
      .string()
      .nullable(),
  });

export const fidelidadeNivelAtualSchema =
  z.object({
    clienteId: uuidSchema,
    saldoPontos: z
      .number()
      .int(),
    nivelAtual:
      nivelFidelidadeSchema.nullable(),
  });

export const statusClientePacoteSchema =
  z.enum([
    "ATIVO",
    "VENCIDO",
    "FINALIZADO",
    "CANCELADO",
  ]);

export const pacoteResumoSchema =
  z.object({
    id: uuidSchema,
    nome: z.string().min(1),
    descricao: z
      .string()
      .nullable(),
    quantidadeSessoes: z
      .number()
      .int(),
    validadeDias: z
      .number()
      .int()
      .nullable(),
    ativo: z.boolean(),
  });

export const clientePacoteSchema =
  z.object({
    id: uuidSchema,
    clienteId: uuidSchema,
    pacoteId: uuidSchema,
    sessoesTotal: z
      .number()
      .int(),
    sessoesUsadas: z
      .number()
      .int(),
    sessoesRestantes: z
      .number()
      .int(),
    dataCompra:
      dateTimeSchema,
    dataValidade:
      dateTimeSchema.nullable(),
    status:
      statusClientePacoteSchema,
    createdAt:
      dateTimeSchema,
    updatedAt:
      dateTimeSchema,
    pacote:
      pacoteResumoSchema,
  });

export const clientesPacotesSchema =
  z.array(
    clientePacoteSchema,
  );
