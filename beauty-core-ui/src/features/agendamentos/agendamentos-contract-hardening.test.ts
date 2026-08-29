import {
  describe,
  expect,
  it,
} from "vitest";

import {
  agendaViewSchema,
  agendamentoStatusSchema,
} from "@/features/agendamentos/schemas/agendamentos-schemas";
import { agendamentosListParamsSchema } from "@/features/agendamentos/schemas/agendamentos-api.schemas";
import { buildAgendamentosRequestParams } from "@/features/agendamentos/services/agendamentos-api";
import {
  AGENDA_VIEWS,
  AGENDAMENTO_STATUSES,
} from "@/features/agendamentos/types/agendamentos-types";
import { getAgendamentoStatusMeta } from "@/features/agendamentos/utils/agendamentos-status";
import {
  agendamentoCreateFormSchema,
  EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
} from "@/features/agendamentos/forms/agendamento-create-form.schema";
import { toCreateAgendamentoPayload } from "@/features/agendamentos/forms/agendamento-create-payload";

const ids = {
  cliente:
    "550e8400-e29b-41d4-a716-446655440001",

  profissional:
    "550e8400-e29b-41d4-a716-446655440002",

  servico:
    "550e8400-e29b-41d4-a716-446655440003",

  unidade:
    "550e8400-e29b-41d4-a716-446655440004",
};

describe("Agendamentos contract hardening", () => {
  it("mantem exatamente seis status do backend", () => {
    expect(
      AGENDAMENTO_STATUSES,
    ).toEqual([
      "PENDENTE",
      "CONFIRMADO",
      "EM_ANDAMENTO",
      "CONCLUIDO",
      "CANCELADO",
      "FALTOU",
    ]);

    expect(
      agendamentoStatusSchema.safeParse(
        "AGENDADO",
      ).success,
    ).toBe(false);
  });

  it("mantem exatamente day/week/list", () => {
    expect(
      AGENDA_VIEWS,
    ).toEqual([
      "day",
      "week",
      "list",
    ]);

    expect(
      agendaViewSchema.safeParse(
        "month",
      ).success,
    ).toBe(false);
  });

  it("possui metadata textual e tone valido para todo status", () => {
    const validTones = [
      "neutral",
      "success",
      "warning",
      "danger",
      "info",
    ];

    const labels =
      AGENDAMENTO_STATUSES.map(
        (status) => {
          const meta =
            getAgendamentoStatusMeta(
              status,
            );

          expect(
            meta.label.length,
          ).toBeGreaterThan(0);

          expect(
            validTones,
          ).toContain(
            meta.tone,
          );

          return meta.label;
        },
      );

    expect(
      new Set(labels).size,
    ).toBe(
      AGENDAMENTO_STATUSES.length,
    );
  });

  it("normaliza defaults da listagem real", () => {
    expect(
      agendamentosListParamsSchema.parse(
        {},
      ),
    ).toMatchObject({
      page: 1,
      limit: 20,
      orderBy:
        "dataHoraInicio",
      orderDirection: "asc",
    });
  });

  it("rejeita limit acima do contrato", () => {
    expect(
      agendamentosListParamsSchema.safeParse({
        limit: 101,
      }).success,
    ).toBe(false);
  });

  it("monta request com todos os filtros server-side", () => {
    const params =
      buildAgendamentosRequestParams({
        page: 2,
        limit: 50,
        orderBy:
          "updatedAt",
        orderDirection: "desc",
        dataInicio:
          "2026-08-01T00:00:00.000Z",
        dataFim:
          "2026-08-31T23:59:59.999Z",
        status:
          "CONFIRMADO",
        clienteId:
          ids.cliente,
        profissionalId:
          ids.profissional,
        servicoId:
          ids.servico,
        unidadeId:
          ids.unidade,
      });

    expect(params).toEqual({
      page: 2,
      limit: 50,
      orderBy:
        "updatedAt",
      orderDirection: "desc",
      dataInicio:
        "2026-08-01T00:00:00.000Z",
      dataFim:
        "2026-08-31T23:59:59.999Z",
      status:
        "CONFIRMADO",
      clienteId:
        ids.cliente,
      profissionalId:
        ids.profissional,
      servicoId:
        ids.servico,
      unidadeId:
        ids.unidade,
    });
  });

  it("mantem formulario inicial invalido", () => {
    expect(
      agendamentoCreateFormSchema.safeParse(
        EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
      ).success,
    ).toBe(false);
  });

  it("create payload nunca envia status ou empresaId implicitamente", () => {
    const payload =
      toCreateAgendamentoPayload({
        related: {
          clienteId:
            ids.cliente,
          profissionalId:
            ids.profissional,
          servicoId:
            ids.servico,
          unidadeId:
            ids.unidade,
        },

        dataHoraInicio:
          "2026-08-29T12:00",

        dataHoraFim:
          "2026-08-29T12:45",

        observacoes: "",
      });

    expect(
      payload,
    ).not.toHaveProperty(
      "status",
    );

    expect(
      payload,
    ).not.toHaveProperty(
      "empresaId",
    );

    expect(
      payload,
    ).not.toHaveProperty(
      "observacoes",
    );
  });
});