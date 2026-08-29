import {
  describe,
  expect,
  it,
} from "vitest";

import { toCreateAgendamentoPayload } from "@/features/agendamentos/forms/agendamento-create-payload";

const values = {
  related: {
    clienteId:
      "550e8400-e29b-41d4-a716-446655440001",
    profissionalId:
      "550e8400-e29b-41d4-a716-446655440002",
    servicoId:
      "550e8400-e29b-41d4-a716-446655440003",
    unidadeId:
      "550e8400-e29b-41d4-a716-446655440004",
  },
  dataHoraInicio:
    "2026-08-29T12:00",
  dataHoraFim:
    "2026-08-29T12:45",
  observacoes:
    "  Atendimento normal.  ",
};

describe("create agendamento payload", () => {
  it("converte datas locais para ISO e remove espacos", () => {
    expect(
      toCreateAgendamentoPayload(
        values,
      ),
    ).toEqual({
      unidadeId:
        values.related.unidadeId,
      clienteId:
        values.related.clienteId,
      servicoId:
        values.related.servicoId,
      profissionalId:
        values.related.profissionalId,
      dataHoraInicio:
        new Date(
          values.dataHoraInicio,
        ).toISOString(),
      dataHoraFim:
        new Date(
          values.dataHoraFim,
        ).toISOString(),
      observacoes:
        "Atendimento normal.",
    });
  });

  it("omite observacoes vazias", () => {
    const result =
      toCreateAgendamentoPayload({
        ...values,
        observacoes: "   ",
      });

    expect(result).not.toHaveProperty(
      "observacoes",
    );
  });

  it("nao envia empresaId nem status", () => {
    const result =
      toCreateAgendamentoPayload(
        values,
      );

    expect(result).not.toHaveProperty(
      "empresaId",
    );

    expect(result).not.toHaveProperty(
      "status",
    );
  });

  it("nao calcula fim pela duracao do servico", () => {
    const result =
      toCreateAgendamentoPayload(
        values,
      );

    expect(
      result.dataHoraFim,
    ).toBe(
      new Date(
        values.dataHoraFim,
      ).toISOString(),
    );
  });
});