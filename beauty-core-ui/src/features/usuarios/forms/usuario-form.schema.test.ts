import { describe, expect, it } from "vitest";

import {
  createEmptyUsuarioFormValues,
  usuarioFormSchema,
} from "@/features/usuarios/forms/usuario-form.schema";

describe("usuario form schema", () => {
  it("cria baseline para a role informada", () => {
    expect(createEmptyUsuarioFormValues("GERENTE")).toEqual({
      empresaId: "",
      nome: "",
      email: "",
      telefone: "",
      role: "GERENTE",
      senha: "",
    });
  });

  it("aceita dados validos", () => {
    expect(
      usuarioFormSchema.parse({
        empresaId: "550e8400-e29b-41d4-a716-446655440001",
        nome: "Maria Silva",
        email: "maria@example.com",
        telefone: "83999999999",
        role: "GERENTE",
        senha: "Senha123",
      }),
    ).toEqual({
      empresaId: "550e8400-e29b-41d4-a716-446655440001",
      nome: "Maria Silva",
      email: "maria@example.com",
      telefone: "83999999999",
      role: "GERENTE",
      senha: "Senha123",
    });
  });

  it("permite opcionais vazios em edicao", () => {
    expect(
      usuarioFormSchema.parse({
        empresaId: "",
        nome: "Maria",
        email: "maria@example.com",
        telefone: "",
        role: "ADMIN",
        senha: "",
      }),
    ).toMatchObject({
      telefone: "",
      senha: "",
    });
  });

  it("rejeita empresaId invalido", () => {
    expect(() =>
      usuarioFormSchema.parse({
        empresaId: "empresa-invalida",
        nome: "Maria",
        email: "maria@example.com",
        telefone: "",
        role: "ADMIN",
        senha: "",
      }),
    ).toThrow();
  });

  it("rejeita senha curta quando preenchida", () => {
    expect(() =>
      usuarioFormSchema.parse({
        empresaId: "",
        nome: "Maria",
        email: "maria@example.com",
        telefone: "",
        role: "ADMIN",
        senha: "1234567",
      }),
    ).toThrow();
  });
});
