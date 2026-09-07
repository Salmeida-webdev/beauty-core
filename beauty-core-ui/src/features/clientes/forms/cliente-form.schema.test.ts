import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clienteFormSchema,
  EMPTY_CLIENTE_FORM_VALUES,
} from "@/features/clientes/forms/cliente-form.schema";

describe("cliente form schema", () => {
  it("mantém valores vazios iniciais válidos somente após preenchimento obrigatório", () => {
    expect(
      EMPTY_CLIENTE_FORM_VALUES,
    ).toEqual({
      nome: "",
      telefone: "",
      email: "",
      dataNascimento: "",
      observacoes: "",
    });

    expect(() =>
      clienteFormSchema.parse(
        EMPTY_CLIENTE_FORM_VALUES,
      ),
    ).toThrow();
  });

  it("valida os campos reais do DTO", () => {
    const payload = {
      nome: "Maria Silva",
      telefone: "(83) 99999-9999",
      email:
        "maria@example.com",
      dataNascimento:
        "1990-08-20",
      observacoes:
        "Prefere atendimento à tarde.",
    };

    expect(
      clienteFormSchema.parse(
        payload,
      ),
    ).toEqual(payload);
  });

  it("aceita opcionais vazios", () => {
    expect(
      clienteFormSchema.parse({
        nome: "Maria",
        telefone:
          "83999999999",
        email: "",
        dataNascimento: "",
        observacoes: "",
      }),
    ).toEqual({
      nome: "Maria",
      telefone:
        "83999999999",
      email: "",
      dataNascimento: "",
      observacoes: "",
    });
  });

  it("rejeita telefone fora de 10 a 15 dígitos", () => {
    expect(() =>
      clienteFormSchema.parse({
        nome: "Maria",
        telefone: "123",
        email: "",
        dataNascimento: "",
        observacoes: "",
      }),
    ).toThrow();
  });

  it("rejeita e-mail inválido", () => {
    expect(() =>
      clienteFormSchema.parse({
        nome: "Maria",
        telefone:
          "83999999999",
        email: "invalido",
        dataNascimento: "",
        observacoes: "",
      }),
    ).toThrow();
  });

  it("rejeita data impossível", () => {
    expect(() =>
      clienteFormSchema.parse({
        nome: "Maria",
        telefone:
          "83999999999",
        email: "",
        dataNascimento:
          "2026-02-31",
        observacoes: "",
      }),
    ).toThrow();
  });

  it("respeita o máximo de 500 caracteres nas observações", () => {
    expect(() =>
      clienteFormSchema.parse({
        nome: "Maria",
        telefone:
          "83999999999",
        email: "",
        dataNascimento: "",
        observacoes:
          "x".repeat(501),
      }),
    ).toThrow();
  });
});
