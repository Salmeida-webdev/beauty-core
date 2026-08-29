"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
  unidadeFormSchema,
  type UnidadeFormValues,
} from "@/features/unidades/forms/unidade-form.schema";

type UnidadeFormProps = {
  initialValues: UnidadeFormValues;
  mode: "create" | "edit";
  pending: boolean;
  serverError?: string | null;
  onCancel: () => void;
  onSubmit: (values: UnidadeFormValues) => void;
};

export function UnidadeForm({
  initialValues,
  mode,
  pending,
  serverError,
  onCancel,
  onSubmit,
}: UnidadeFormProps) {
  const form = useForm<UnidadeFormValues>({
    resolver: zodResolver(unidadeFormSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      noValidate
      className="space-y-form"
      onSubmit={handleSubmit((values) => {
        if (!pending) {
          onSubmit(values);
        }
      })}
    >
      <FormSection
        title="Dados da unidade"
        description="Informe somente os dados suportados pelo cadastro de unidades."
        className="border-0 p-0 shadow-none"
      >
        {serverError && (
          <div className="rounded-medium border border-danger/25 bg-danger/10 p-3">
            <FormFieldMessage error={serverError} />
          </div>
        )}

        <FormGrid>
          <FormField
            id="unidade-nome"
            label="Nome"
            required
            error={errors.nome?.message}
            className="md:col-span-2"
          >
            <Input
              id="unidade-nome"
              maxLength={120}
              disabled={pending}
              aria-invalid={Boolean(errors.nome)}
              {...register("nome")}
            />
          </FormField>

          <FormField
            id="unidade-telefone"
            label="Telefone"
            error={errors.telefone?.message}
          >
            <Input
              id="unidade-telefone"
              type="tel"
              maxLength={20}
              disabled={pending}
              aria-invalid={Boolean(errors.telefone)}
              {...register("telefone")}
            />
          </FormField>

          <FormField
            id="unidade-email"
            label="Email"
            error={errors.email?.message}
          >
            <Input
              id="unidade-email"
              type="email"
              maxLength={150}
              disabled={pending}
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />
          </FormField>

          <FormField
            id="unidade-endereco"
            label="Endereço"
            error={errors.endereco?.message}
            className="md:col-span-2"
          >
            <Textarea
              id="unidade-endereco"
              rows={3}
              maxLength={255}
              disabled={pending}
              aria-invalid={Boolean(errors.endereco)}
              {...register("endereco")}
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
            pendingLabel={mode === "create" ? "Cadastrando..." : "Salvando..."}
          >
            {mode === "create" ? "Cadastrar unidade" : "Salvar alterações"}
          </FormSubmitButton>
        </FormActions>
      </FormSection>
    </form>
  );
}
