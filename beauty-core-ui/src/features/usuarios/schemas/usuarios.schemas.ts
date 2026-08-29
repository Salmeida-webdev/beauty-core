import { z } from "zod";

import { ADMIN_ROLES } from "@/constants/roles";
import {
  USUARIO_ORDER_BY_VALUES,
  USUARIO_ORDER_DIRECTION_VALUES,
} from "@/features/usuarios/types/usuarios.types";

export const usuarioSchema = z.object({
  id: z.string().uuid(),
  empresaId: z.string().uuid().nullable(),
  nome: z.string(),
  email: z.string().email(),
  telefone: z.string().nullable(),
  foto: z.string().nullable(),
  role: z.enum(ADMIN_ROLES),
  ativo: z.boolean(),
  ultimoLogin: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const usuariosPaginationMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  page: z.number().int().min(1),
  limit: z.number().int().min(1).max(100),
  totalPages: z.number().int().nonnegative(),
});

export const usuariosListResponseSchema = z.object({
  data: z.array(usuarioSchema),
  meta: usuariosPaginationMetaSchema,
});

export const usuariosListParamsSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().min(1).optional(),
  orderBy: z.enum(USUARIO_ORDER_BY_VALUES).default("createdAt"),
  orderDirection: z.enum(USUARIO_ORDER_DIRECTION_VALUES).default("desc"),
  role: z.enum(ADMIN_ROLES).optional(),
});

export const createUsuarioPayloadSchema = z.object({
  empresaId: z.string().uuid().optional(),
  nome: z.string().trim().min(2).max(120),
  email: z
    .string()
    .trim()
    .email()
    .max(120)
    .transform((value) => value.toLowerCase()),
  telefone: z.string().trim().min(8).max(20).optional(),
  foto: z.string().trim().max(500).optional(),
  role: z.enum(ADMIN_ROLES),
  senha: z.string().min(8).max(72),
});

export const updateUsuarioPayloadSchema = createUsuarioPayloadSchema.partial();
