import { describe, expect, it } from "vitest";

import {
  beneficioFormSchema,
  toBeneficioPayload,
} from "./beneficio-form.schema";

describe("beneficioFormSchema", () => {
  it("aceita somente os campos reais", () => {
    const parsed = beneficioFormSchema.parse({
      nome: "Benefício personalizado",
      descricao: "Descrição válida",
      pontosNecessarios: 100,
      ativo: false,
      empresaId: "nao-enviar",
      valor: 20,
    });

    expect(parsed).toEqual({
      nome: "Benefício personalizado",
      descricao: "Descrição válida",
      pontosNecessarios: 100,
    });
  });

  it("omite descrição vazia do payload", () => {
    expect(
      toBeneficioPayload({
        nome: " Benefício A ",
        descricao: "   ",
        pontosNecessarios: 50,
      }),
    ).toEqual({
      nome: "Benefício A",
      pontosNecessarios: 50,
    });
  });

  it("respeita limites contratuais", () => {
    expect(
      beneficioFormSchema.safeParse({
        nome: "A",
        descricao: "",
        pontosNecessarios: 0,
      }).success,
    ).toBe(false);

    expect(
      beneficioFormSchema.safeParse({
        nome: "Benefício válido",
        descricao: "",
        pontosNecessarios: 1,
      }).success,
    ).toBe(true);
  });
});
