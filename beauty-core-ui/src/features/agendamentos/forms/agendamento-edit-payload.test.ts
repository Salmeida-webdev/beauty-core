import { format } from "date-fns";
import {
  describe,
  expect,
  it,
} from "vitest";

import {
  agendamentoToEditFormValues,
  toUpdateAgendamentoPayload,
} from "@/features/agendamentos/forms/agendamento-edit-payload";
import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";

const detail: AgendamentoDetail = {
  id:
    "550e8400-e29b-41d4-a716-446655440000",
  clienteId:
    "550e8400-e29b-41d4-a716-446655440001",
  profissionalId:
    "550e8400-e29b-41d4-a716-446655440002",
  servicoId:
    "550e8400-e29b-41d4-a716-446655440003",
  unidadeId:
    "550e8400-e29b-41d4-a716-446655440004",
  dataHoraInicio:
    "2026-08-29T15:00:00.000Z",
  dataHoraFim:
    "2026-08-29T15:45:00.000Z",
  observacoes:
    "Observacao atual.",
  status: "CONFIRMADO",
  createdAt:
    "2026-08-20T12:00:00.000Z",
  updatedAt:
    "2026-08-29T14:00:00.000Z",

  cliente: {
    id:
      "550e8400-e29b-41d4-a716-446655440001",
    nome: "Maria",
    telefone: "83999999999",
    email:
      "maria@example.com",
  },

  profissional: {
    id:
      "550e8400-e29b-41d4-a716-446655440002",
    nome: "Ana",
    email:
      "ana@example.com",
  },

  servico: {
    id:
      "550e8400-e29b-41d4-a716-446655440003",
    nome: "Corte",
    preco: "80.00",
    duracaoMinutos: 45,
  },

  unidade: {
    id:
      "550e8400-e29b-41d4-a716-446655440004",
    nome: "Centro",
  },
};

describe("agendamento edit payload", () => {
  it("converte detalhe em valores locais do formulario", () => {
    const values =
      agendamentoToEditFormValues(
        detail,
      );

    expect(
      values.dataHoraInicio,
    ).toBe(
      format(
        new Date(
          detail.dataHoraInicio,
        ),
        "yyyy-MM-dd'T'HH:mm",
      ),
    );

    expect(
      values.related.clienteId,
    ).toBe(
      detail.clienteId,
    );
  });

  it("gera PATCH com os campos reais de edicao", () => {
    const values =
      agendamentoToEditFormValues(
        detail,
      );

    const payload =
      toUpdateAgendamentoPayload(
        values,
      );

    expect(payload).toEqual({
      unidadeId:
        detail.unidadeId,
      clienteId:
        detail.clienteId,
      servicoId:
        detail.servicoId,
      profissionalId:
        detail.profissionalId,
      dataHoraInicio:
        new Date(
          values.dataHoraInicio,
        ).toISOString(),
      dataHoraFim:
        new Date(
          values.dataHoraFim,
        ).toISOString(),
      observacoes:
        "Observacao atual.",
    });
  });

  it("permite limpar observacoes enviando string vazia", () => {
    const values =
      agendamentoToEditFormValues(
        detail,
      );

    const payload =
      toUpdateAgendamentoPayload({
        ...values,
        observacoes: "   ",
      });

    expect(
      payload.observacoes,
    ).toBe("");
  });

  it("nao envia status nem empresaId", () => {
    const payload =
      toUpdateAgendamentoPayload(
        agendamentoToEditFormValues(
          detail,
        ),
      );

    expect(payload).not.toHaveProperty(
      "status",
    );

    expect(payload).not.toHaveProperty(
      "empresaId",
    );
  });
});