import { z } from "zod";

import {
  createUsuarioPayloadSchema,
  updateUsuarioPayloadSchema,
  usuarioSchema,
  usuariosListParamsSchema,
  usuariosPaginationMetaSchema,
} from "@/features/usuarios/schemas/usuarios.schemas";

export const profissionalSchema = usuarioSchema.extend({
  role: z.literal("PROFISSIONAL"),
});

export const profissionaisListResponseSchema = z.object({
  data: z.array(profissionalSchema),
  meta: usuariosPaginationMetaSchema,
});

export const profissionaisListParamsSchema = usuariosListParamsSchema.omit({
  role: true,
});

export const createProfissionalPayloadSchema = createUsuarioPayloadSchema.omit({
  role: true,
});

export const updateProfissionalPayloadSchema = updateUsuarioPayloadSchema.omit({
  role: true,
});
