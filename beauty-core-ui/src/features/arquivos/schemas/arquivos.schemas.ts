import { z } from "zod";

export const ARQUIVO_TIPOS = [
  "LOGO_EMPRESA",
  "FOTO_CLIENTE",
  "FOTO_USUARIO",
  "FOTO_PROFISSIONAL",
  "IMAGEM_SERVICO",
  "GALERIA_EMPRESA",
  "DOCUMENTO",
  "OUTRO",
] as const;

export const arquivoTipoSchema = z.enum(ARQUIVO_TIPOS);

export const arquivoStatusSchema = z.enum(["ATIVO", "INATIVO", "EXCLUIDO"]);

export const arquivoVisibilidadeSchema = z.enum(["PUBLICO", "PRIVADO"]);

export const arquivoSchema = z
  .object({
    id: z.uuid(),
    empresaId: z.uuid(),
    clienteId: z.uuid().nullable().optional(),
    usuarioId: z.uuid().nullable().optional(),
    servicoId: z.uuid().nullable().optional(),
    unidadeId: z.uuid().nullable().optional(),
    tipo: arquivoTipoSchema,
    nomeOriginal: z.string().min(1),
    nomeArquivo: z.string().min(1).optional(),
    mimeType: z.string().min(1),
    tamanhoBytes: z.number().int().nonnegative(),
    caminho: z.string().min(1).optional(),
    url: z.string().min(1).nullable().optional(),
    status: arquivoStatusSchema.optional(),
    visibilidade: arquivoVisibilidadeSchema.optional(),
    createdAt: z.string().datetime().optional(),
    updatedAt: z.string().datetime().optional(),
  })
  .passthrough();

export const arquivosPageSchema = z
  .object({
    data: z.array(arquivoSchema),
    meta: z
      .object({
        page: z.number().int().positive(),
        limit: z.number().int().positive(),
        total: z.number().int().nonnegative(),
        totalPages: z.number().int().nonnegative().optional(),
      })
      .passthrough(),
  })
  .passthrough();

export const arquivosGaleriaUploadSchema = z.array(arquivoSchema);

export const arquivoMutationMessageSchema = z
  .object({
    message: z.string().min(1),
  })
  .passthrough();
