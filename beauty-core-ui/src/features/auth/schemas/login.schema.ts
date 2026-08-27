import { z } from "zod";

import type { LoginRequest } from "@/features/auth/types/auth.types";

export const loginSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Informe o e-mail.")
      .email("Informe um e-mail válido.")
      .max(254, "O e-mail informado é muito longo."),
    senha: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres.")
      .max(128, "A senha informada é muito longa."),
  })
  .strict();

export type LoginFormValues = z.infer<typeof loginSchema>;

export function loginFormValuesToRequest(
  values: LoginFormValues,
): LoginRequest {
  return {
    email: values.email.trim(),
    senha: values.senha,
  };
}
