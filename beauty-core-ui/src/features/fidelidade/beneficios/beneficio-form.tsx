"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { Beneficio } from "./beneficio.types";
import {
  beneficioFormSchema,
  toBeneficioPayload,
  type BeneficioFormValues,
  type BeneficioPayload,
} from "./beneficio-form.schema";

type Props = {
  beneficio?: Beneficio | null;
  isSubmitting: boolean;
  onSubmit: (payload: BeneficioPayload) => Promise<void>;
  onCancel?: () => void;
};

export function BeneficioForm({
  beneficio,
  isSubmitting,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BeneficioFormValues>({
    resolver: zodResolver(beneficioFormSchema),
    defaultValues: {
      nome: beneficio?.nome ?? "",
      descricao: beneficio?.descricao ?? "",
      pontosNecessarios: beneficio?.pontosNecessarios ?? 1,
    },
  });

  return (
    <form
      className="grid gap-4 rounded-lg border bg-muted/20 p-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(toBeneficioPayload(values));
      })}
    >
      <div className="grid gap-2">
        <label htmlFor={`beneficio-nome-${beneficio?.id ?? "novo"}`}>
          Nome
        </label>

        <input
          id={`beneficio-nome-${beneficio?.id ?? "novo"}`}
          aria-invalid={Boolean(errors.nome)}
          aria-describedby={
            errors.nome
              ? `beneficio-nome-${beneficio?.id ?? "novo"}-error`
              : undefined
          }
          maxLength={120}
          {...register("nome")}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {errors.nome ? (
          <p
            id={`beneficio-nome-${beneficio?.id ?? "novo"}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.nome.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`beneficio-descricao-${beneficio?.id ?? "novo"}`}>
          Descrição
        </label>

        <textarea
          id={`beneficio-descricao-${beneficio?.id ?? "novo"}`}
          aria-invalid={Boolean(errors.descricao)}
          aria-describedby={
            errors.descricao
              ? `beneficio-descricao-${beneficio?.id ?? "novo"}-error`
              : undefined
          }
          maxLength={500}
          rows={3}
          {...register("descricao")}
          className="rounded-md border bg-background px-3 py-2"
        />

        {errors.descricao ? (
          <p
            id={`beneficio-descricao-${beneficio?.id ?? "novo"}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.descricao.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`beneficio-pontos-${beneficio?.id ?? "novo"}`}>
          Pontos necessários
        </label>

        <input
          id={`beneficio-pontos-${beneficio?.id ?? "novo"}`}
          aria-invalid={Boolean(errors.pontosNecessarios)}
          aria-describedby={
            errors.pontosNecessarios
              ? `beneficio-pontos-${beneficio?.id ?? "novo"}-error`
              : undefined
          }
          type="number"
          min="1"
          step="1"
          {...register("pontosNecessarios", {
            valueAsNumber: true,
          })}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {errors.pontosNecessarios ? (
          <p
            id={`beneficio-pontos-${beneficio?.id ?? "novo"}-error`}
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.pontosNecessarios.message}
          </p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Salvando..."
            : beneficio
              ? "Salvar benefício"
              : "Criar benefício"}
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
