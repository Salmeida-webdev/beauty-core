import {
  agendamentoCreateFormSchema,
  type AgendamentoCreateFormValues,
} from "@/features/agendamentos/forms/agendamento-create-form.schema";
import type { CreateAgendamentoPayload } from "@/features/agendamentos/types/agendamentos-api.types";

export function toCreateAgendamentoPayload(
  values: AgendamentoCreateFormValues,
): CreateAgendamentoPayload {
  const parsed =
    agendamentoCreateFormSchema.parse(
      values,
    );

  const observacoes =
    parsed.observacoes.trim();

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
    ...(observacoes
      ? {
          observacoes,
        }
      : {}),
  };
}