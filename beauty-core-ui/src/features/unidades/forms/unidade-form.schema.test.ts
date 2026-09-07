import { describe, expect, it } from "vitest";

import {
  EMPTY_UNIDADE_FORM_VALUES,
  unidadeFormSchema,
} from "@/features/unidades/forms/unidade-form.schema";

describe("unidade form schema", () => {
  it("mantém baseline seguro", () => {
    expect(EMPTY_UNIDADE_FORM_VALUES).toEqual({
      nome: "",
      telefone: "",
      email: "",
      endereco: "",
    });

    expect(() => unidadeFormSchema.parse(EMPTY_UNIDADE_FORM_VALUES)).toThrow();
  });

  it("aceita os quatro campos reais", () => {
    const values = {
      nome: "Unidade Centro",
      telefone: "(83) 99999-9999",
      email: "centro@empresa.com",
      endereco: "Rua Principal, 100",
    };

    expect(unidadeFormSchema.parse(values)).toEqual(values);
  });

  it("aceita opcionais vazios", () => {
    expect(
      unidadeFormSchema.parse({
        nome: "Centro",
        telefone: "",
        email: "",
        endereco: "",
      }).nome,
    ).toBe("Centro");
  });

  it("rejeita email inválido", () => {
    expect(() =>
      unidadeFormSchema.parse({
        nome: "Centro",
        telefone: "",
        email: "invalido",
        endereco: "",
      }),
    ).toThrow();
  });

  it("respeita limites dos DTOs", () => {
    expect(() =>
      unidadeFormSchema.parse({
        nome: "U",
        telefone: "9".repeat(21),
        email: "",
        endereco: "x".repeat(256),
      }),
    ).toThrow();
  });
});
