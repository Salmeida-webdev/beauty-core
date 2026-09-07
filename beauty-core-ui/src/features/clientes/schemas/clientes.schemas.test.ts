import { describe, expect, it } from "vitest";

import {
  clienteSchema,
  clientesListParamsSchema,
  clientesListResponseSchema,
} from "@/features/clientes/schemas/clientes.schemas";

const clienteFixture = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  empresaId: "550e8400-e29b-41d4-a716-446655440001",
  nome: "Maria Silva",
  telefone: "83999999999",
  email: "maria@example.com",
  foto: "/uploads/clientes/maria.png",
  dataNascimento: "1990-08-20T00:00:00.000Z",
  observacoes: "Prefere atendimento à tarde.",
  ativo: true,
  ativoPortal: true,
  aceitouTermos: true,
  dataAceiteTermos: "2026-08-01T12:00:00.000Z",
  ultimoAcessoPortal: "2026-08-20T15:00:00.000Z",
  createdAt: "2026-01-01T10:00:00.000Z",
  updatedAt: "2026-08-20T15:00:00.000Z",
};

describe("clientes schemas", () => {
  it("valida um cliente retornado pelo backend", () => {
    expect(
      clienteSchema.parse(clienteFixture),
    ).toEqual(clienteFixture);
  });

  it("aceita campos opcionais persistidos como null", () => {
    expect(
      clienteSchema.parse({
        ...clienteFixture,
        email: null,
        foto: null,
        dataNascimento: null,
        observacoes: null,
        dataAceiteTermos: null,
        ultimoAcessoPortal: null,
      }),
    ).toEqual({
      ...clienteFixture,
      email: null,
      foto: null,
      dataNascimento: null,
      observacoes: null,
      dataAceiteTermos: null,
      ultimoAcessoPortal: null,
    });
  });

  it("valida resposta paginada", () => {
    expect(
      clientesListResponseSchema.parse({
        data: [clienteFixture],
        meta: {
          total: 1,
          page: 1,
          limit: 20,
          totalPages: 1,
        },
      }),
    ).toEqual({
      data: [clienteFixture],
      meta: {
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      },
    });
  });

  it("aplica defaults reais da listagem", () => {
    expect(
      clientesListParamsSchema.parse({}),
    ).toEqual({
      page: 1,
      limit: 20,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
  });

  it("converte page e limit vindos da URL", () => {
    expect(
      clientesListParamsSchema.parse({
        page: "2",
        limit: "50",
      }),
    ).toEqual({
      page: 2,
      limit: 50,
      orderBy: "createdAt",
      orderDirection: "desc",
    });
  });

  it("rejeita limit acima do contrato", () => {
    expect(() =>
      clientesListParamsSchema.parse({
        limit: 101,
      }),
    ).toThrow();
  });

  it("rejeita ordenacao inexistente no service", () => {
    expect(() =>
      clientesListParamsSchema.parse({
        orderBy: "cpf",
      }),
    ).toThrow();
  });

  it("rejeita direcao de ordenacao invalida", () => {
    expect(() =>
      clientesListParamsSchema.parse({
        orderDirection: "random",
      }),
    ).toThrow();
  });
});
