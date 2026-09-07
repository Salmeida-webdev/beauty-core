"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import type { AdminRole } from "@/constants/roles";
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
import {
  usuarioFormSchema,
  type UsuarioFormValues,
} from "@/features/usuarios/forms/usuario-form.schema";
import { formatUsuarioRole } from "@/features/usuarios/utils/usuarios-formatters";

type UsuarioFormProps = {
  mode: "create" | "edit";

  actorRole: AdminRole;

  roleOptions: readonly AdminRole[];

  roleLocked: boolean;

  initialValues: UsuarioFormValues;

  pending: boolean;

  serverError?: string | null;

  onCancel: () => void;

  onSubmit: (values: UsuarioFormValues) => void;
};

export function UsuarioForm({
  mode,
  actorRole,
  roleOptions,
  roleLocked,
  initialValues,
  pending,
  serverError,
  onCancel,
  onSubmit,
}: UsuarioFormProps) {
  const form = useForm<UsuarioFormValues>({
    resolver: zodResolver(usuarioFormSchema),

    defaultValues: initialValues,

    mode: "onBlur",
  });

  const {
    register,
    handleSubmit,
    setError,
    control,

    formState: { errors },
  } = form;

  const selectedRole = useWatch({
    control,
    name: "role",
  });

  const showEmpresaId =
    actorRole === "SUPER_ADMIN" && selectedRole !== "SUPER_ADMIN";

  function submit(values: UsuarioFormValues) {
    let invalid = false;

    if (mode === "create" && values.senha.length < 8) {
      setError("senha", {
        type: "manual",

        message: "Informe uma senha com ao menos 8 caracteres.",
      });

      invalid = true;
    }

    if (showEmpresaId && !values.empresaId.trim()) {
      setError("empresaId", {
        type: "manual",

        message: "Informe a empresa para usuários que não sejam SUPER_ADMIN.",
      });

      invalid = true;
    }

    if (invalid || pending) {
      return;
    }

    onSubmit(values);
  }

  return (
    <form noValidate className="space-y-form" onSubmit={handleSubmit(submit)}>
      <FormSection
        title="Dados administrativos"
        description="Somente campos suportados pelo contrato real de usuários são enviados."
        className="border-0 p-0 shadow-none"
      >
        {serverError && (
          <div className="rounded-medium border border-danger/25 bg-danger/10 p-3">
            <FormFieldMessage error={serverError} />
          </div>
        )}

        <FormGrid>
          <FormField
            id="usuario-nome"
            label="Nome"
            required
            error={errors.nome?.message}
          >
            <Input
              id="usuario-nome"
              maxLength={120}
              disabled={pending}
              aria-invalid={Boolean(errors.nome)}
              autoComplete="name"
              {...register("nome")}
            />
          </FormField>

          <FormField
            id="usuario-email"
            label="E-mail"
            required
            error={errors.email?.message}
          >
            <Input
              id="usuario-email"
              type="email"
              maxLength={120}
              disabled={pending}
              aria-invalid={Boolean(errors.email)}
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          <FormField
            id="usuario-telefone"
            label="Telefone"
            description={
              mode === "edit"
                ? "Se ficar vazio, o telefone atual será preservado."
                : "Opcional. Entre 8 e 20 caracteres quando informado."
            }
            error={errors.telefone?.message}
          >
            <Input
              id="usuario-telefone"
              type="tel"
              maxLength={20}
              disabled={pending}
              aria-invalid={Boolean(errors.telefone)}
              {...register("telefone")}
            />
          </FormField>

          <FormField
            id="usuario-role"
            label="Perfil"
            required
            description={
              roleLocked
                ? "Sua própria role não pode ser alterada."
                : "As opções respeitam a hierarquia administrativa."
            }
            error={errors.role?.message}
          >
            {roleLocked ? (
              <>
                <input type="hidden" {...register("role")} />

                <Input
                  id="usuario-role"
                  value={formatUsuarioRole(selectedRole)}
                  disabled
                  readOnly
                />
              </>
            ) : (
              <select
                id="usuario-role"
                disabled={pending}
                aria-invalid={Boolean(errors.role)}
                className="h-10 w-full rounded-medium border border-border-subtle bg-background px-3 text-body-small text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                {...register("role")}
              >
                {roleOptions.map((role) => (
                  <option key={role} value={role}>
                    {formatUsuarioRole(role)}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          {showEmpresaId && (
            <FormField
              id="usuario-empresa"
              label="ID da empresa"
              required
              description="Campo empresaId real do backend para usuários vinculados a tenant."
              error={errors.empresaId?.message}
              className="md:col-span-2"
            >
              <Input
                id="usuario-empresa"
                placeholder="00000000-0000-0000-0000-000000000000"
                disabled={pending}
                aria-invalid={Boolean(errors.empresaId)}
                {...register("empresaId")}
              />
            </FormField>
          )}

          <FormField
            id="usuario-senha"
            label={mode === "create" ? "Senha" : "Nova senha"}
            required={mode === "create"}
            description={
              mode === "create"
                ? "Entre 8 e 72 caracteres."
                : "Deixe vazio para manter a senha atual."
            }
            error={errors.senha?.message}
            className="md:col-span-2"
          >
            <Input
              id="usuario-senha"
              type="password"
              maxLength={72}
              disabled={pending}
              aria-invalid={Boolean(errors.senha)}
              autoComplete="new-password"
              {...register("senha")}
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
            {mode === "create" ? "Cadastrar usuário" : "Salvar alterações"}
          </FormSubmitButton>
        </FormActions>
      </FormSection>
    </form>
  );
}
