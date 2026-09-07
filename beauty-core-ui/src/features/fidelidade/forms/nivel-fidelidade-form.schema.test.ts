import { describe, expect, it } from "vitest";

import {
  nivelFidelidadeFormSchema,
  toNivelFidelidadePayload,
} from "./nivel-fidelidade-form.schema";

describe("nivel fidelidade form", () => {
  it("mantém somente campos contratuais", () => {
    const parsed = nivelFidelidadeFormSchema.parse({
      nome: "Nível personalizado",
      pontosMinimos: 100,
      beneficios: "Benefício real",
      cor: "dourado",
      icone: "estrela",
      empresaId: "nao-enviar",
    });

    expect(parsed).toEqual({
      nome: "Nível personalizado",
      pontosMinimos: 100,
      beneficios: "Benefício real",
    });
  });

  it("omite benefício vazio", () => {
    expect(
      toNivelFidelidadePayload({
        nome: " Nível A ",
        pontosMinimos: 100,
        beneficios: " ",
      }),
    ).toEqual({
      nome: "Nível A",
      pontosMinimos: 100,
    });
  });
});
