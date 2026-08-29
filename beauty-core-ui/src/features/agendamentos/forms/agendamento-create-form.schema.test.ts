import {
  describe,
  expect,
  it,
} from "vitest";

import {
  agendamentoCreateFormSchema,
  EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
} from "@/features/agendamentos/forms/agendamento-create-form.schema";

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

function validValues() {
  return {
    related: {
      clienteId: ids.cliente,
      profissionalId:
        ids.profissional,
      servicoId: ids.servico,
      unidadeId: ids.unidade,
    },
    dataHoraInicio:
      "2026-08-29T12:00",
    dataHoraFim:
      "2026-08-29T12:45",
    observacoes:
      "Preferencia registrada.",
  };
}

describe("agendamento create form schema", () => {
  it("mantem estado inicial invalido ate preencher obrigatorios", () => {
    expect(
      agendamentoCreateFormSchema.safeParse(
        EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
      ).success,
    ).toBe(false);
  });

  it("aceita todos os campos reais", () => {
    expect(
      agendamentoCreateFormSchema.parse(
        validValues(),
      ),
    ).toEqual(
      validValues(),
    );
  });

  it("rejeita observacoes acima de 500 caracteres", () => {
    expect(
      agendamentoCreateFormSchema.safeParse({
        ...validValues(),
        observacoes:
          "x".repeat(501),
      }).success,
    ).toBe(false);
  });

  it("nao inventa regra de ordenacao temporal no frontend", () => {
    expect(
      agendamentoCreateFormSchema.safeParse({
        ...validValues(),
        dataHoraInicio:
          "2026-08-29T15:00",
        dataHoraFim:
          "2026-08-29T14:00",
      }).success,
    ).toBe(true);
  });
});