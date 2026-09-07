"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type UseFormRegisterReturn,
} from "react-hook-form";

import type { ConfiguracaoFidelidade } from "../types/fidelidade.types";
import {
  configuracaoFidelidadeFormSchema,
  configuracaoFidelidadeToFormValues,
  emptyConfiguracaoFidelidadeFormValues,
  toConfiguracaoFidelidadePayload,
  type ConfiguracaoFidelidadeFormInput,
  type ConfiguracaoFidelidadeFormValues,
  type ConfiguracaoFidelidadePayload,
} from "./configuracao-fidelidade-form.schema";

type Props = {
  configuracao?: ConfiguracaoFidelidade | null;
  isSubmitting: boolean;
  onSubmit: (
    payload: ConfiguracaoFidelidadePayload,
  ) => Promise<void>;
};

export function ConfiguracaoFidelidadeForm({
  configuracao,
  isSubmitting,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    ConfiguracaoFidelidadeFormInput,
    unknown,
    ConfiguracaoFidelidadeFormValues
  >({
    resolver: zodResolver(
      configuracaoFidelidadeFormSchema,
    ),

    defaultValues: configuracao
      ? configuracaoFidelidadeToFormValues(
          configuracao,
        )
      : emptyConfiguracaoFidelidadeFormValues(),
  });

  return (
    <form
      className="mt-5 grid gap-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(
          toConfiguracaoFidelidadePayload(
            values,
          ),
        );
      })}
    >
      <fieldset
        disabled={isSubmitting}
        className="grid gap-4"
      >
        <legend className="sr-only">
          Configuração de fidelidade
        </legend>

        <BooleanSelect
          id="fidelidade-ativa"
          label="Fidelidade ativa"
          registration={register(
            "fidelidadeAtiva",
          )}
          error={
            errors.fidelidadeAtiva?.message
          }
        />

        <BooleanSelect
          id="pontuacao-automatica"
          label="Pontuação automática"
          registration={register(
            "pontuacaoAutomatica",
          )}
          error={
            errors.pontuacaoAutomatica
              ?.message
          }
        />

        <div className="grid gap-2">
          <label htmlFor="reais-por-ponto">
            Reais por ponto
          </label>

          <input
            id="reais-por-ponto"
            type="number"
            step="any"
            {...register("reaisPorPonto")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          {errors.reaisPorPonto ? (
            <p className="text-sm text-destructive">
              {errors.reaisPorPonto.message}
            </p>
          ) : null}
        </div>

        <BooleanSelect
          id="niveis-ativos"
          label="Níveis ativos"
          registration={register(
            "niveisAtivos",
          )}
          error={
            errors.niveisAtivos?.message
          }
        />

        <BooleanSelect
          id="beneficios-automaticos"
          label="Benefícios automáticos"
          registration={register(
            "beneficiosAutomaticos",
          )}
          error={
            errors.beneficiosAutomaticos
              ?.message
          }
        />

        <BooleanSelect
          id="bonus-aniversario-ativo"
          label="Bônus de aniversário ativo"
          registration={register(
            "bonusAniversarioAtivo",
          )}
          error={
            errors.bonusAniversarioAtivo
              ?.message
          }
        />

        <div className="grid gap-2">
          <label htmlFor="bonus-aniversario-pontos">
            Pontos do bônus de aniversário
          </label>

          <input
            id="bonus-aniversario-pontos"
            type="number"
            step="1"
            {...register(
              "bonusAniversarioPontos",
            )}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          <p className="text-xs text-muted-foreground">
            Campo opcional no contrato atual.
          </p>

          {errors.bonusAniversarioPontos ? (
            <p className="text-sm text-destructive">
              {
                errors
                  .bonusAniversarioPontos
                  .message
              }
            </p>
          ) : null}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-10 w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {isSubmitting
          ? "Salvando..."
          : configuracao
            ? "Salvar configuração"
            : "Criar configuração"}
      </button>
    </form>
  );
}

type BooleanSelectProps = {
  id: string;
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
};

function BooleanSelect({
  id,
  label,
  registration,
  error,
}: BooleanSelectProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id}>
        {label}
      </label>

      <select
        id={id}
        aria-invalid={Boolean(error)}
        {...registration}
        className="min-h-10 rounded-md border bg-background px-3 py-2"
      >
        <option value="">
          Selecione
        </option>

        <option value="true">
          Sim
        </option>

        <option value="false">
          Não
        </option>
      </select>

      {error ? (
        <p className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
