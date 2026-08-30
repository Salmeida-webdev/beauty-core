import { describe, expect, it } from "vitest";

import {
  comissaoProfissionalSchema,
  comissoesListSchema,
} from "@/features/financeiro/schemas/comissoes.schemas";

const comissao = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  profissionalId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  agendamentoId: "9b2c7c4f-18d6-4b7e-8f31-51f6cbec4d15",
  valorServico: "200.00",
  percentual: "10.00",
  valorComissao: "20.00",
  status: "PENDENTE",
  createdAt: "2026-08-29T12:00:00.000Z",
  updatedAt: "2026-08-29T12:00:00.000Z",
};

describe("comissões schemas", () => {
  it("aceita Decimal serializado como string", () => {
    const parsed = comissaoProfissionalSchema.parse(comissao);

    expect(parsed.valorServico).toBe("200.00");

    expect(parsed.valorComissao).toBe("20.00");
  });

  it("aceita números serializados pelo backend", () => {
    const parsed = comissaoProfissionalSchema.parse({
      ...comissao,
      valorServico: 200,
      percentual: 10,
      valorComissao: 20,
    });

    expect(parsed.valorComissao).toBe(20);
  });

  it("remove empresaId da resposta consumida", () => {
    const parsed = comissaoProfissionalSchema.parse({
      ...comissao,
      empresaId: "empresa-interna",
    });

    expect(parsed).not.toHaveProperty("empresaId");
  });

  it("parseia lista simples sem paginação fictícia", () => {
    expect(comissoesListSchema.parse([comissao])).toHaveLength(1);
  });
});
