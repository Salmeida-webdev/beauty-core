import { describe, expect, it } from "vitest";

import {
  servicoToFormValues,
  toCreateServicoPayload,
  toUpdateServicoPayload,
} from "@/features/servicos/forms/servico-payload";

describe("servico payload", () => {
  it("normaliza números e omite descrição vazia no cadastro", () => {
    expect(
      toCreateServicoPayload({
        nome: "  Limpeza de pele  ",
        descricao: "   ",
        duracaoMinutos: "90",
        preco: "150,50",
      }),
    ).toEqual({
      nome: "Limpeza de pele",
      duracaoMinutos: 90,
      preco: 150.5,
    });
  });

  it("envia descrição vazia no update para permitir limpeza do campo", () => {
    expect(
      toUpdateServicoPayload({
        nome: "Limpeza",
        descricao: "   ",
        duracaoMinutos: "60",
        preco: "100",
      }),
    ).toEqual({
      nome: "Limpeza",
      descricao: "",
      duracaoMinutos: 60,
      preco: 100,
    });
  });

  it("converte entidade para valores editáveis em português", () => {
    expect(
      servicoToFormValues({
        id: "servico-1",
        empresaId: "empresa-1",
        nome: "Massagem",
        descricao: null,
        duracaoMinutos: 45,
        preco: 89.9,
        imagem: null,
        ativo: true,
        createdAt: "2026-08-28T10:00:00.000Z",
        updatedAt: "2026-08-28T10:00:00.000Z",
      }),
    ).toEqual({
      nome: "Massagem",
      descricao: "",
      duracaoMinutos: "45",
      preco: "89,90",
    });
  });
});
