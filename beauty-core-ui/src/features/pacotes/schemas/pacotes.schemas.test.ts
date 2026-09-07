import { describe, expect, it } from "vitest";

import {
  clientePacoteSchema,
  pacoteSchema,
} from "./pacotes.schemas";

const id = "550e8400-e29b-41d4-a716-446655440000";

describe("pacotes schemas", () => {
  it("parseia pacote sem inventar relação com serviço", () => {
    const parsed = pacoteSchema.parse({
      id,
      empresaId: "empresa-interna",
      nome: "Pacote real",
      descricao: null,
      valor: "150.00",
      quantidadeSessoes: 5,
      validadeDias: 30,
      ativo: true,
      createdAt: "2026-08-30T12:00:00.000Z",
      updatedAt: "2026-08-30T12:00:00.000Z",
    });

    expect(parsed.valor).toBe(150);
    expect(parsed).not.toHaveProperty("empresaId");
    expect(parsed).not.toHaveProperty("servicos");
    expect(parsed).not.toHaveProperty("servicoId");
  });

  it("usa saldo de sessões retornado pelo backend", () => {
    const parsed = clientePacoteSchema.parse({
      id,
      empresaId: "empresa-interna",
      clienteId: id,
      pacoteId: id,
      sessoesTotal: 10,
      sessoesUsadas: 4,
      sessoesRestantes: 6,
      dataCompra: "2026-08-30T12:00:00.000Z",
      dataValidade: null,
      status: "ATIVO",
      createdAt: "2026-08-30T12:00:00.000Z",
      updatedAt: "2026-08-30T12:00:00.000Z",
    });

    expect(parsed.sessoesRestantes).toBe(6);
    expect(parsed).not.toHaveProperty("empresaId");
    expect(parsed).not.toHaveProperty("origem");
    expect(parsed).not.toHaveProperty("valorPago");
    expect(parsed).not.toHaveProperty("agendamentoId");
  });

  it.each([
    "ATIVO",
    "FINALIZADO",
    "VENCIDO",
    "CANCELADO",
  ])("aceita status backend %s", (status) => {
    expect(
      clientePacoteSchema.safeParse({
        id,
        clienteId: id,
        pacoteId: id,
        sessoesTotal: 1,
        sessoesUsadas: status === "ATIVO" ? 0 : 1,
        sessoesRestantes: status === "ATIVO" ? 1 : 0,
        dataCompra: "2026-08-30T12:00:00.000Z",
        dataValidade: null,
        status,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      }).success,
    ).toBe(true);
  });
});
