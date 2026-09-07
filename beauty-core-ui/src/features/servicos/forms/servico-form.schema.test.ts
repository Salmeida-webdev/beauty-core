import { describe, expect, it } from "vitest";

import {
  EMPTY_SERVICO_FORM_VALUES,
  servicoFormSchema,
} from "@/features/servicos/forms/servico-form.schema";

describe("servico form schema", () => {
  it("mantém valores iniciais seguros e inválidos até o preenchimento", () => {
    expect(EMPTY_SERVICO_FORM_VALUES).toEqual({
      nome: "",
      descricao: "",
      duracaoMinutos: "",
      preco: "",
    });

    expect(() => servicoFormSchema.parse(EMPTY_SERVICO_FORM_VALUES)).toThrow();
  });

  it("aceita os quatro campos reais do contrato", () => {
    const values = {
      nome: "Limpeza de pele",
      descricao: "Procedimento facial completo.",
      duracaoMinutos: "90",
      preco: "150,00",
    };

    expect(servicoFormSchema.parse(values)).toEqual(values);
  });

  it("rejeita duração fracionária ou igual a zero", () => {
    for (const duration of ["0", "1.5", "abc"]) {
      expect(() =>
        servicoFormSchema.parse({
          nome: "Serviço válido",
          descricao: "",
          duracaoMinutos: duration,
          preco: "10",
        }),
      ).toThrow();
    }
  });

  it("aceita preço zero e limita a duas casas decimais", () => {
    expect(
      servicoFormSchema.parse({
        nome: "Avaliação",
        descricao: "",
        duracaoMinutos: "30",
        preco: "0",
      }).preco,
    ).toBe("0");

    expect(() =>
      servicoFormSchema.parse({
        nome: "Serviço válido",
        descricao: "",
        duracaoMinutos: "30",
        preco: "10,999",
      }),
    ).toThrow();
  });

  it("respeita os limites de nome e descrição do update DTO", () => {
    expect(() =>
      servicoFormSchema.parse({
        nome: "S",
        descricao: "x".repeat(501),
        duracaoMinutos: "30",
        preco: "10",
      }),
    ).toThrow();
  });
});
