"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { Pacote } from "../types/pacotes.types";
import { PACOTE_FORM_LIMITS } from "./pacote-form-limits";
import {
  emptyPacoteFormValues,
  pacoteFormSchema,
  toPacotePayload,
  type PacoteFormValues,
  type PacotePayload,
} from "./pacote-form.schema";

type Props = {
  pacote?: Pacote | null;
  isSubmitting: boolean;
  onSubmit: (payload: PacotePayload) => Promise<void>;
  onCancel?: () => void;
};

function pacoteToFormValues(pacote: Pacote): PacoteFormValues {
  return {
    nome: pacote.nome,
    descricao: pacote.descricao ?? "",
    valor: String(pacote.valor),
    quantidadeSessoes: String(pacote.quantidadeSessoes),
    validadeDias:
      pacote.validadeDias == null ? "" : String(pacote.validadeDias),
  };
}

export function PacoteForm({
  pacote,
  isSubmitting,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PacoteFormValues>({
    resolver: zodResolver(pacoteFormSchema),

    defaultValues: pacote
      ? pacoteToFormValues(pacote)
      : emptyPacoteFormValues(),
  });

  return (
    <form
      className="grid gap-4 rounded-lg border bg-muted/20 p-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(toPacotePayload(values));
      })}
    >
      <fieldset disabled={isSubmitting} className="grid gap-4">
        <legend className="sr-only">Dados do pacote</legend>

        <div className="grid gap-2">
          <label htmlFor={`pacote-nome-${pacote?.id ?? "novo"}`}>Nome</label>

          <input
            id={`pacote-nome-${pacote?.id ?? "novo"}`}
            aria-invalid={Boolean(errors.nome)}
            aria-describedby={
              errors.nome
                ? `pacote-nome-${pacote?.id ?? "novo"}-error`
                : undefined
            }
            maxLength={PACOTE_FORM_LIMITS.nomeMax}
            {...register("nome")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          {errors.nome ? (
            <p
              id={`pacote-nome-${pacote?.id ?? "novo"}-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.nome.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor={`pacote-descricao-${pacote?.id ?? "novo"}`}>
            Descrição
          </label>

          <textarea
            id={`pacote-descricao-${pacote?.id ?? "novo"}`}
            aria-invalid={Boolean(errors.descricao)}
            aria-describedby={
              errors.descricao
                ? `pacote-descricao-${pacote?.id ?? "novo"}-error`
                : undefined
            }
            maxLength={PACOTE_FORM_LIMITS.descricaoMax}
            rows={3}
            {...register("descricao")}
            className="rounded-md border bg-background px-3 py-2"
          />

          {errors.descricao ? (
            <p
              id={`pacote-descricao-${pacote?.id ?? "novo"}-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.descricao.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor={`pacote-valor-${pacote?.id ?? "novo"}`}>
              Valor
            </label>

            <input
              id={`pacote-valor-${pacote?.id ?? "novo"}`}
              aria-invalid={Boolean(errors.valor)}
              aria-describedby={
                errors.valor
                  ? `pacote-valor-${pacote?.id ?? "novo"}-error`
                  : undefined
              }
              type="number"
              min={PACOTE_FORM_LIMITS.valorMin}
              step="any"
              {...register("valor")}
              className="min-h-10 rounded-md border bg-background px-3 py-2"
            />

            {errors.valor ? (
              <p
                id={`pacote-valor-${pacote?.id ?? "novo"}-error`}
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.valor.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor={`pacote-sessoes-${pacote?.id ?? "novo"}`}>
              Quantidade de sessões
            </label>

            <input
              id={`pacote-sessoes-${pacote?.id ?? "novo"}`}
              aria-invalid={Boolean(errors.quantidadeSessoes)}
              aria-describedby={
                errors.quantidadeSessoes
                  ? `pacote-sessoes-${pacote?.id ?? "novo"}-error`
                  : undefined
              }
              type="number"
              min={PACOTE_FORM_LIMITS.quantidadeSessoesMin}
              step="1"
              {...register("quantidadeSessoes")}
              className="min-h-10 rounded-md border bg-background px-3 py-2"
            />

            {errors.quantidadeSessoes ? (
              <p
                id={`pacote-sessoes-${pacote?.id ?? "novo"}-error`}
                role="alert"
                className="text-sm text-destructive"
              >
                {errors.quantidadeSessoes.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2">
          <label htmlFor={`pacote-validade-${pacote?.id ?? "novo"}`}>
            Validade em dias
          </label>

          <input
            id={`pacote-validade-${pacote?.id ?? "novo"}`}
            aria-invalid={Boolean(errors.validadeDias)}
            aria-describedby={
              errors.validadeDias
                ? `pacote-validade-${pacote?.id ?? "novo"}-error`
                : undefined
            }
            type="number"
            min={PACOTE_FORM_LIMITS.validadeDiasMin}
            step="1"
            {...register("validadeDias")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          <p className="text-xs text-muted-foreground">
            Opcional. Nenhum prazo padrão é criado pelo frontend.
          </p>

          {errors.validadeDias ? (
            <p
              id={`pacote-validade-${pacote?.id ?? "novo"}-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.validadeDias.message}
            </p>
          ) : null}
        </div>
      </fieldset>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {isSubmitting
            ? "Salvando..."
            : pacote
              ? "Salvar pacote"
              : "Criar pacote"}
        </button>

        {onCancel ? (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={onCancel}
            className="min-h-10 rounded-md border px-4 py-2 text-sm"
          >
            Cancelar
          </button>
        ) : null}
      </div>
    </form>
  );
}
