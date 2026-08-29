import { z } from "zod";

import { ADMIN_ROLES } from "@/constants/roles";
import type { AdminRole } from "@/constants/roles";

const empresaIdSchema = z
  .string()
  .trim()
  .refine(
    (value) => value === "" || z.string().uuid().safeParse(value).success,
    "Informe um ID de empresa válido.",
  );

const telefoneSchema = z
  .string()
  .trim()
  .max(20, "O telefone deve ter no máximo 20 caracteres.")
  .refine(
    (value) => value === "" || value.length >= 8,
    "O telefone deve ter ao menos 8 caracteres.",
  );

const senhaSchema = z
  .string()
  .max(72, "A senha deve ter no máximo 72 caracteres.")
  .refine(
    (value) => value === "" || value.length >= 8,
    "A senha deve ter ao menos 8 caracteres.",
  );

export const usuarioFormSchema = z.object({
  empresaId: empresaIdSchema,

  nome: z
    .string()
    .trim()
    .min(2, "Informe ao menos 2 caracteres.")
    .max(120, "O nome deve ter no máximo 120 caracteres."),

  email: z
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .max(120, "O e-mail deve ter no máximo 120 caracteres."),

  telefone: telefoneSchema,

  role: z.enum(ADMIN_ROLES),

  senha: senhaSchema,
});

export type UsuarioFormValues = z.infer<typeof usuarioFormSchema>;

export function createEmptyUsuarioFormValues(
  role: AdminRole,
): UsuarioFormValues {
  return {
    empresaId: "",
    nome: "",
    email: "",
    telefone: "",
    role,
    senha: "",
  };
}
