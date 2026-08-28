import {
  describe,
  expect,
  it,
} from "vitest";

import {
  clienteToFormValues,
  toCreateClientePayload,
  toUpdateClientePayload,
} from "@/features/clientes/forms/cliente-payload";

describe("cliente payload", () => {
  it("normaliza telefone e remove espaços", () => {
    expect(
      toCreateClientePayload({
        nome: "  Maria Silva  ",
        telefone:
          "(83) 99999-9999",
        email:
          "  maria@example.com  ",
        dataNascimento:
          "1990-08-20",
        observacoes:
          "  Cliente VIP  ",
      }),
    ).toEqual({
      nome: "Maria Silva",
      telefone:
        "83999999999",
      email:
        "maria@example.com",
      dataNascimento:
        "1990-08-20",
      observacoes:
        "Cliente VIP",
    });
  });

  it("omite campos opcionais vazios", () => {
    expect(
      toCreateClientePayload({
        nome: "Maria",
        telefone:
          "83999999999",
        email: "   ",
        dataNascimento: "",
        observacoes: "",
      }),
    ).toEqual({
      nome: "Maria",
      telefone:
        "83999999999",
    });
  });

  it("não cria empresaId, cpf ou foto no payload", () => {
    const payload =
      toCreateClientePayload({
        nome: "Maria",
        telefone:
          "83999999999",
        email: "",
        dataNascimento: "",
        observacoes: "",
      });

    expect(payload).not.toHaveProperty(
      "empresaId",
    );

    expect(payload).not.toHaveProperty(
      "cpf",
    );

    expect(payload).not.toHaveProperty(
      "foto",
    );
  });

  it("usa a mesma normalização no PATCH", () => {
    expect(
      toUpdateClientePayload({
        nome: "Maria",
        telefone:
          "(83) 99999-9999",
        email: "",
        dataNascimento: "",
        observacoes: "",
      }),
    ).toEqual({
      nome: "Maria",
      telefone:
        "83999999999",
    });
  });

  it("converte cliente em valores de edição", () => {
    expect(
      clienteToFormValues({
        id: "550e8400-e29b-41d4-a716-446655440000",
        empresaId:
          "550e8400-e29b-41d4-a716-446655440001",
        nome: "Maria Silva",
        telefone:
          "83999999999",
        email:
          "maria@example.com",
        foto: null,
        dataNascimento:
          "1990-08-20T00:00:00.000Z",
        observacoes:
          "Cliente VIP",
        ativo: true,
        ativoPortal: true,
        aceitouTermos: true,
        dataAceiteTermos:
          "2026-08-01T12:00:00.000Z",
        ultimoAcessoPortal: null,
        createdAt:
          "2026-01-01T10:00:00.000Z",
        updatedAt:
          "2026-08-20T15:00:00.000Z",
      }),
    ).toEqual({
      nome: "Maria Silva",
      telefone:
        "83999999999",
      email:
        "maria@example.com",
      dataNascimento:
        "1990-08-20",
      observacoes:
        "Cliente VIP",
    });
  });
});
