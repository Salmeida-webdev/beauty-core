"use client";

import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
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
import {
  Textarea,
} from "@/components/ui/textarea";
import {
  clienteFormSchema,
} from "@/features/clientes/forms/cliente-form.schema";
import type {
  ClienteFormValues,
} from "@/features/clientes/forms/cliente-form.schema";

type ClienteFormProps = {
  initialValues: ClienteFormValues;
  mode: "create" | "edit";
  pending: boolean;
  serverError?: string | null;
  onCancel: () => void;
  onSubmit: (
    values: ClienteFormValues,
  ) => void;
};

export function ClienteForm({
  initialValues,
  mode,
  pending,
  serverError,
  onCancel,
  onSubmit,
}: ClienteFormProps) {
  const form = useForm<
    ClienteFormValues
  >({
    resolver:
      zodResolver(
        clienteFormSchema,
      ),
    defaultValues:
      initialValues,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = form;

  const submitLabel =
    mode === "create"
      ? "Cadastrar cliente"
      : "Salvar alterações";

  const pendingLabel =
    mode === "create"
      ? "Cadastrando..."
      : "Salvando...";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(
        onSubmit,
      )}
      className="space-y-form"
    >
      <FormSection
        title="Dados do cliente"
        description="Informe somente os dados necessários para o cadastro administrativo."
        className="border-0 p-0 shadow-none"
      >
        {serverError && (
          <div className="rounded-medium border border-danger/25 bg-danger/10 p-3">
            <FormFieldMessage
              error={serverError}
            />
          </div>
        )}

        <FormGrid>
          <FormField
            id="cliente-nome"
            label="Nome"
            required
            error={
              errors.nome?.message
            }
          >
            <Input
              id="cliente-nome"
              autoComplete="name"
              maxLength={120}
              disabled={pending}
              aria-invalid={
                Boolean(
                  errors.nome,
                )
              }
              {...register("nome")}
            />
          </FormField>

          <FormField
            id="cliente-telefone"
            label="Telefone"
            required
            description="Informe DDD e telefone. A pontuação será removida antes do envio."
            error={
              errors.telefone
                ?.message
            }
          >
            <Input
              id="cliente-telefone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={22}
              disabled={pending}
              aria-invalid={
                Boolean(
                  errors.telefone,
                )
              }
              placeholder="(83) 99999-9999"
              {...register(
                "telefone",
              )}
            />
          </FormField>

          <FormField
            id="cliente-email"
            label="E-mail"
            error={
              errors.email?.message
            }
          >
            <Input
              id="cliente-email"
              type="email"
              autoComplete="email"
              maxLength={150}
              disabled={pending}
              aria-invalid={
                Boolean(
                  errors.email,
                )
              }
              {...register("email")}
            />
          </FormField>

          <FormField
            id="cliente-data-nascimento"
            label="Data de nascimento"
            error={
              errors.dataNascimento
                ?.message
            }
          >
            <Input
              id="cliente-data-nascimento"
              type="date"
              disabled={pending}
              aria-invalid={
                Boolean(
                  errors.dataNascimento,
                )
              }
              {...register(
                "dataNascimento",
              )}
            />
          </FormField>

          <FormField
            id="cliente-observacoes"
            label="Observações"
            description="Máximo de 500 caracteres."
            error={
              errors.observacoes
                ?.message
            }
            className="md:col-span-2"
          >
            <Textarea
              id="cliente-observacoes"
              maxLength={500}
              rows={4}
              disabled={pending}
              aria-invalid={
                Boolean(
                  errors.observacoes,
                )
              }
              {...register(
                "observacoes",
              )}
            />
          </FormField>
        </FormGrid>

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
            pendingLabel={
              pendingLabel
            }
          >
            {submitLabel}
          </FormSubmitButton>
        </FormActions>
      </FormSection>
    </form>
  );
}
