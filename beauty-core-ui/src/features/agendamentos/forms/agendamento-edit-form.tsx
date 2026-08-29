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
import { FormFieldMessage } from "@/components/forms/form-field-message";
import { FormSubmitButton } from "@/components/forms/form-submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AgendamentoEditRelatedSelectors } from "@/features/agendamentos/components/agendamento-edit-related-selectors";
import { agendamentoCreateFormSchema } from "@/features/agendamentos/forms/agendamento-create-form.schema";
import type { AgendamentoEditFormValues } from "@/features/agendamentos/forms/agendamento-edit-payload";
import type {
  AgendaOption,
  AgendaRelatedField,
} from "@/features/agendamentos/types/agendamentos-options.types";

type InitialOptions = Partial<
  Record<
    AgendaRelatedField,
    AgendaOption
  >
>;

type AgendamentoEditFormProps = {
  initialValues: AgendamentoEditFormValues;
  initialOptions: InitialOptions;
  pending: boolean;
  serverError?: string | null;
  onCancel: () => void;
  onSubmit: (
    values: AgendamentoEditFormValues,
  ) => void;
};

export function AgendamentoEditForm({
  initialValues,
  initialOptions,
  pending,
  serverError,
  onCancel,
  onSubmit,
}: AgendamentoEditFormProps) {
  const form =
    useForm<AgendamentoEditFormValues>({
      resolver: zodResolver(
        agendamentoCreateFormSchema,
      ),

      defaultValues:
        initialValues,

      mode: "onBlur",
    });

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
        title="Editar agendamento"
        description="Altere somente os campos suportados pelo endpoint real de atualizacao."
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
              <AgendamentoEditRelatedSelectors
                values={field.value}
                initialOptions={
                  initialOptions
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
              error={relatedError}
            />
          ) : null}
        </div>

        <FormGrid>
          <FormField
            id="edit-agendamento-inicio"
            label="Inicio"
            required
            error={
              errors.dataHoraInicio
                ?.message
            }
          >
            <Input
              id="edit-agendamento-inicio"
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
            id="edit-agendamento-fim"
            label="Fim"
            required
            error={
              errors.dataHoraFim
                ?.message
            }
          >
            <Input
              id="edit-agendamento-fim"
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
            id="edit-agendamento-observacoes"
            label="Observacoes"
            description="Opcional. Maximo de 500 caracteres."
            error={
              errors.observacoes
                ?.message
            }
            className="md:col-span-2"
          >
            <Textarea
              id="edit-agendamento-observacoes"
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
          A alteracao de status e o cancelamento nao fazem parte desta edicao geral e serao tratados por acoes proprias.
        </div>

        <FormActions>
          <Button
            type="button"
            variant="outline"
            disabled={pending}
            onClick={onCancel}
          >
            Voltar
          </Button>

          <FormSubmitButton
            pending={pending}
            pendingLabel="Salvando..."
          >
            Salvar alteracoes
          </FormSubmitButton>
        </FormActions>
      </FormSection>
    </form>
  );
}