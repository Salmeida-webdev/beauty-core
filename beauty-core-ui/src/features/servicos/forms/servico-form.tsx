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
  servicoFormSchema,
  type ServicoFormValues,
} from "@/features/servicos/forms/servico-form.schema";

type ServicoFormProps = {
  initialValues: ServicoFormValues;
  mode: "create" | "edit";
  pending: boolean;
  serverError?: string | null;
  onCancel: () => void;
  onSubmit: (values: ServicoFormValues) => void;
};

export function ServicoForm({
  initialValues,
  mode,
  pending,
  serverError,
  onCancel,
  onSubmit,
}: ServicoFormProps) {
  const form = useForm<ServicoFormValues>({
    resolver: zodResolver(servicoFormSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const submitLabel =
    mode === "create" ? "Cadastrar serviço" : "Salvar alterações";

  const pendingLabel = mode === "create" ? "Cadastrando..." : "Salvando...";

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
        title="Dados do serviço"
        description="Cadastre somente os dados suportados pelo catálogo operacional."
        className="border-0 p-0 shadow-none"
      >
        {serverError && (
          <div className="rounded-medium border border-danger/25 bg-danger/10 p-3">
            <FormFieldMessage error={serverError} />
          </div>
        )}

        <FormGrid>
          <FormField
            id="servico-nome"
            label="Nome"
            required
            error={errors.nome?.message}
            className="md:col-span-2"
          >
            <Input
              id="servico-nome"
              autoComplete="off"
              maxLength={120}
              disabled={pending}
              aria-invalid={Boolean(errors.nome)}
              {...register("nome")}
            />
          </FormField>

          <FormField
            id="servico-duracao"
            label="Duração em minutos"
            required
            description="Informe um número inteiro, como 30, 60 ou 90."
            error={errors.duracaoMinutos?.message}
          >
            <Input
              id="servico-duracao"
              type="number"
              inputMode="numeric"
              min={1}
              max={2_147_483_647}
              step={1}
              disabled={pending}
              aria-invalid={Boolean(errors.duracaoMinutos)}
              {...register("duracaoMinutos")}
            />
          </FormField>

          <FormField
            id="servico-preco"
            label="Preço"
            required
            description="Use vírgula ou ponto e no máximo duas casas decimais."
            error={errors.preco?.message}
          >
            <Input
              id="servico-preco"
              type="text"
              inputMode="decimal"
              placeholder="150,00"
              maxLength={12}
              disabled={pending}
              aria-invalid={Boolean(errors.preco)}
              {...register("preco")}
            />
          </FormField>

          <FormField
            id="servico-descricao"
            label="Descrição"
            description="Opcional. Máximo de 500 caracteres."
            error={errors.descricao?.message}
            className="md:col-span-2"
          >
            <Textarea
              id="servico-descricao"
              rows={4}
              maxLength={500}
              disabled={pending}
              aria-invalid={Boolean(errors.descricao)}
              {...register("descricao")}
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

          <FormSubmitButton pending={pending} pendingLabel={pendingLabel}>
            {submitLabel}
          </FormSubmitButton>
        </FormActions>
      </FormSection>
    </form>
  );
}
