"use client";

import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  Controller,
  useForm,
} from "react-hook-form";

import {
  FormActions,
  FormField,
  FormGrid,
  FormSection,
} from "@/components/forms/form-foundation";
import {
  FormFieldMessage,
} from "@/components/forms/form-field-message";
import {
  FormSubmitButton,
} from "@/components/forms/form-submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AgendaRelatedSelectors } from "@/features/agendamentos/components/agenda-related-selectors";
import {
  agendamentoCreateFormSchema,
  type AgendamentoCreateFormValues,
} from "@/features/agendamentos/forms/agendamento-create-form.schema";

type AgendamentoCreateFormProps = {
  initialValues: AgendamentoCreateFormValues;
  pending: boolean;
  serverError?: string | null;
  onCancel: () => void;
  onSubmit: (
    values: AgendamentoCreateFormValues,
  ) => void;
};

export function AgendamentoCreateForm({
  initialValues,
  pending,
  serverError,
  onCancel,
  onSubmit,
}: AgendamentoCreateFormProps) {
  const form =
    useForm<AgendamentoCreateFormValues>(
      {
        resolver: zodResolver(
          agendamentoCreateFormSchema,
        ),
        defaultValues:
          initialValues,
        mode: "onBlur",
      },
    );

  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = form;

  const relatedError =
    errors.related?.clienteId ||
    errors.related?.servicoId ||
    errors.related?.profissionalId ||
    errors.related?.unidadeId
      ? "Selecione cliente, servico, profissional e unidade."
      : null;

  return (
    <form
      noValidate
      className="space-y-form"
      onSubmit={handleSubmit(
        (values) => {
          if (!pending) {
            onSubmit(values);
          }
        },
      )}
    >
      <FormSection
        title="Dados do agendamento"
        description="Informe os dados exigidos pelo contrato real de Agendamentos."
        className="border-0 p-0 shadow-none"
      >
        {serverError ? (
          <div className="rounded-medium border border-danger/25 bg-danger/10 p-3">
            <FormFieldMessage
              error={serverError}
            />
          </div>
        ) : null}

        <div className="space-y-3">
          <Controller
            name="related"
            control={control}
            render={({ field }) => (
              <AgendaRelatedSelectors
                values={
                  field.value
                }
                disabled={pending}
                onChange={(
                  relatedField,
                  value,
                ) => {
                  field.onChange({
                    ...field.value,
                    [relatedField]:
                      value,
                  });
                }}
              />
            )}
          />

          {relatedError ? (
            <FormFieldMessage
              error={
                relatedError
              }
            />
          ) : null}
        </div>

        <FormGrid>
          <FormField
            id="agendamento-inicio"
            label="Inicio"
            required
            description="Data e hora local informadas pelo operador."
            error={
              errors.dataHoraInicio
                ?.message
            }
          >
            <Input
              id="agendamento-inicio"
              type="datetime-local"
              disabled={pending}
              aria-invalid={Boolean(
                errors.dataHoraInicio,
              )}
              {...register(
                "dataHoraInicio",
              )}
            />
          </FormField>

          <FormField
            id="agendamento-fim"
            label="Fim"
            required
            description="Informe explicitamente o horario final."
            error={
              errors.dataHoraFim
                ?.message
            }
          >
            <Input
              id="agendamento-fim"
              type="datetime-local"
              disabled={pending}
              aria-invalid={Boolean(
                errors.dataHoraFim,
              )}
              {...register(
                "dataHoraFim",
              )}
            />
          </FormField>

          <FormField
            id="agendamento-observacoes"
            label="Observacoes"
            description="Opcional. Maximo de 500 caracteres."
            error={
              errors.observacoes
                ?.message
            }
            className="md:col-span-2"
          >
            <Textarea
              id="agendamento-observacoes"
              rows={4}
              maxLength={500}
              disabled={pending}
              aria-invalid={Boolean(
                errors.observacoes,
              )}
              {...register(
                "observacoes",
              )}
            />
          </FormField>
        </FormGrid>

        <div className="rounded-medium border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
          O status inicial nao e definido por este formulario. O backend permanece responsavel pelo valor padrao. Nenhuma disponibilidade ou conflito e calculado no navegador.
        </div>

        <FormActions>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={onCancel}
          >
            Cancelar
          </Button>

          <FormSubmitButton
            pending={pending}
            pendingLabel="Criando..."
          >
            Criar agendamento
          </FormSubmitButton>
        </FormActions>
      </FormSection>
    </form>
  );
}