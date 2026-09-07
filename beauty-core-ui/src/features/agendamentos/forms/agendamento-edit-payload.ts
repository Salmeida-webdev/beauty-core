import { format } from "date-fns";

import {
  agendamentoCreateFormSchema,
  type AgendamentoCreateFormValues,
} from "@/features/agendamentos/forms/agendamento-create-form.schema";
import type {
  AgendamentoDetail,
  UpdateAgendamentoPayload,
} from "@/features/agendamentos/types/agendamentos-api.types";

export type AgendamentoEditFormValues =
  AgendamentoCreateFormValues;

export function agendamentoToEditFormValues(
  agendamento: AgendamentoDetail,
): AgendamentoEditFormValues {
  return {
    related: {
      clienteId:
        agendamento.clienteId,
      profissionalId:
        agendamento.profissionalId,
      servicoId:
        agendamento.servicoId,
      unidadeId:
        agendamento.unidadeId,
    },

    dataHoraInicio: format(
      new Date(
        agendamento.dataHoraInicio,
      ),
      "yyyy-MM-dd'T'HH:mm",
    ),

    dataHoraFim: format(
      new Date(
        agendamento.dataHoraFim,
      ),
      "yyyy-MM-dd'T'HH:mm",
    ),

    observacoes:
      agendamento.observacoes ?? "",
  };
}

export function toUpdateAgendamentoPayload(
  values: AgendamentoEditFormValues,
): UpdateAgendamentoPayload {
  const parsed =
    agendamentoCreateFormSchema.parse(
      values,
    );

  return {
    unidadeId:
      parsed.related.unidadeId,

    clienteId:
      parsed.related.clienteId,

    servicoId:
      parsed.related.servicoId,

    profissionalId:
      parsed.related.profissionalId,

    dataHoraInicio: new Date(
      parsed.dataHoraInicio,
    ).toISOString(),

    dataHoraFim: new Date(
      parsed.dataHoraFim,
    ).toISOString(),

    observacoes:
      parsed.observacoes.trim(),
  };
}