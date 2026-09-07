import { describe, expect, it } from "vitest";

import {
  loginFormValuesToRequest,
  loginSchema,
} from "@/features/auth/schemas/login.schema";

describe("loginSchema", () => {
  it("aceita credenciais válidas", () => {
    const result = loginSchema.safeParse({
      email: "admin@beautycore.com.br",
      senha: "senha-segura",
    });

    expect(result.success).toBe(true);
  });

  it("normaliza o e-mail sem alterar a senha", () => {
    const request = loginFormValuesToRequest({
      email: "  admin@beautycore.com.br  ",
      senha: "  senha-com-espacos  ",
    });

    expect(request).toEqual({
      email: "admin@beautycore.com.br",
      senha: "  senha-com-espacos  ",
    });
  });

  it("rejeita e-mail inválido", () => {
    expect(
      loginSchema.safeParse({
        email: "email-invalido",
        senha: "senha",
      }).success,
    ).toBe(false);
  });

  it("rejeita senha vazia e campos desconhecidos", () => {
    expect(
      loginSchema.safeParse({
        email: "admin@beautycore.com.br",
        senha: "",
      }).success,
    ).toBe(false);

    expect(
      loginSchema.safeParse({
        email: "admin@beautycore.com.br",
        senha: "senha",
        rememberMe: true,
      }).success,
    ).toBe(false);
  });
});
