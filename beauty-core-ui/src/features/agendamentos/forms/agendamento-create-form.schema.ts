import { z } from "zod";

const requiredUuid = (
  message: string,
) =>
  z
    .string()
    .trim()
    .min(1, message)
    .pipe(z.uuid());

const localDateTime = (
  requiredMessage: string,
) =>
  z
    .string()
    .trim()
    .min(1, requiredMessage)
    .refine(
      (value) =>
        Number.isFinite(
          new Date(value).getTime(),
        ),
      "Informe uma data e hora validas.",
    );

export const agendamentoCreateFormSchema =
  z.object({
    related: z.object({
      clienteId: requiredUuid(
        "Selecione um cliente.",
      ),
      servicoId: requiredUuid(
        "Selecione um servico.",
      ),
      profissionalId: requiredUuid(
        "Selecione um profissional.",
      ),
      unidadeId: requiredUuid(
        "Selecione uma unidade.",
      ),
    }),

    dataHoraInicio: localDateTime(
      "Informe a data e hora de inicio.",
    ),

    dataHoraFim: localDateTime(
      "Informe a data e hora de fim.",
    ),

    observacoes: z
      .string()
      .max(
        500,
        "As observacoes devem ter no maximo 500 caracteres.",
      ),
  });

export type AgendamentoCreateFormValues =
  z.infer<
    typeof agendamentoCreateFormSchema
  >;

export const EMPTY_AGENDAMENTO_CREATE_FORM_VALUES: AgendamentoCreateFormValues =
  {
    related: {
      clienteId: "",
      servicoId: "",
      profissionalId: "",
      unidadeId: "",
    },
    dataHoraInicio: "",
    dataHoraFim: "",
    observacoes: "",
  };