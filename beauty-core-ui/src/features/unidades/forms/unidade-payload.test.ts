import { describe, expect, it } from "vitest";

import {
  toCreateUnidadePayload,
  toUpdateUnidadePayload,
  unidadeToFormValues,
} from "@/features/unidades/forms/unidade-payload";

describe("unidade payload", () => {
  it("normaliza e omite opcionais vazios", () => {
    expect(
      toCreateUnidadePayload({
        nome: " Centro ",
        telefone: " ",
        email: " contato@empresa.com ",
        endereco: " ",
      }),
    ).toEqual({
      nome: "Centro",
      email: "contato@empresa.com",
    });
  });

  it("não inventa null no update", () => {
    expect(
      toUpdateUnidadePayload({
        nome: " Norte ",
        telefone: " ",
        email: " ",
        endereco: " Av. Brasil, 10 ",
      }),
    ).toEqual({
      nome: "Norte",
      endereco: "Av. Brasil, 10",
    });
  });

  it("converte entidade para edição", () => {
    expect(
      unidadeToFormValues({
        id: "u1",
        empresaId: "e1",
        nome: "Centro",
        telefone: null,
        email: "c@e.com",
        endereco: null,
        ativa: true,
        createdAt: "2026-08-28T10:00:00.000Z",
        updatedAt: "2026-08-28T10:00:00.000Z",
      }),
    ).toEqual({
      nome: "Centro",
      telefone: "",
      email: "c@e.com",
      endereco: "",
    });
  });
});
