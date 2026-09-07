import { z } from "zod";

const isoDateSchema = z.string().datetime();

const decimalSchema = z
  .union([
    z.number(),
    z.string().regex(/^\d+(?:\.\d+)?$/),
  ])
  .transform((value) => Number(value))
  .pipe(z.number().finite().nonnegative());

export const fidelidadeSchema = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  saldoPontos: z.number().int().nonnegative(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const movimentacaoPontosSchema = z.object({
  id: z.string().uuid(),
  clienteId: z.string().uuid(),
  tipo: z.string().min(1),
  pontos: z.number().int().positive(),
  descricao: z.string().nullable().optional(),
  createdAt: isoDateSchema,
});

export const historicoPontosSchema = z.array(movimentacaoPontosSchema);

export const configuracaoFidelidadeSchema = z.object({
  id: z.string().uuid(),
  fidelidadeAtiva: z.boolean(),
  pontuacaoAutomatica: z.boolean(),
  pontosPorReal: z.number().finite().nonnegative(),
  reaisPorPonto: z.number().finite().nonnegative(),
  pontosParaResgate: z.number().int().positive(),
  valorResgate: z.number().finite().nonnegative(),
  niveisAtivos: z.boolean(),
  beneficiosAutomaticos: z.boolean(),
  cupomAniversarioAtivo: z.boolean(),
  cupomAniversarioCodigo: z.string().nullable(),
  cupomAniversarioValor: z.number().finite().nonnegative().nullable(),
  bonusAniversarioAtivo: z.boolean(),
  bonusAniversarioPontos: z.number().int().nonnegative(),
  automacoesAtivas: z.boolean(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const nivelFidelidadeSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  pontosMinimos: z.number().int().nonnegative(),
  beneficios: z.string().nullable().optional(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const niveisFidelidadeSchema = z.array(nivelFidelidadeSchema);

export const beneficioSchema = z.object({
  id: z.string().uuid(),
  nome: z.string().min(1),
  descricao: z.string().nullable().optional(),
  pontosNecessarios: z.number().int().positive(),
  ativo: z.boolean(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const beneficiosSchema = z.array(beneficioSchema);

export const cupomSchema = z.object({
  id: z.string().uuid(),
  codigo: z.string().min(1),
  nome: z.string().min(1),
  descricao: z.string().nullable().optional(),
  tipo: z.string().min(1),
  valor: decimalSchema,
  dataInicio: isoDateSchema.nullable(),
  dataFim: isoDateSchema.nullable(),
  quantidadeMaxima: z.number().int().positive().nullable(),
  quantidadeUtilizada: z.number().int().nonnegative(),
  ativo: z.boolean(),
  createdAt: isoDateSchema,
  updatedAt: isoDateSchema,
});

export const cuponsSchema = z.array(cupomSchema);

export const nivelAtualSchema = z.object({
  clienteId: z.string().uuid(),
  saldoPontos: z.number().int().nonnegative(),
  nivelAtual: nivelFidelidadeSchema.nullable(),
});

export const beneficioDisponivelSchema = z.object({
  clienteId: z.string().uuid(),
  saldoPontos: z.number().int().nonnegative(),
  pontosParaResgate: z.number().int().positive(),
  valorPorResgate: decimalSchema,
  quantidadeResgates: z.number().int().nonnegative(),
  valorDisponivel: decimalSchema,
});
