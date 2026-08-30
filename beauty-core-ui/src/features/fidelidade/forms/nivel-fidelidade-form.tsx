"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NivelFidelidade } from "../types/fidelidade.types";
import {
  nivelFidelidadeFormSchema,
  toNivelFidelidadePayload,
  type NivelFidelidadeFormValues,
  type NivelFidelidadePayload,
} from "./nivel-fidelidade-form.schema";

type Props = {
  nivel?: NivelFidelidade | null;
  isSubmitting: boolean;
  onSubmit: (
    payload: NivelFidelidadePayload,
  ) => Promise<void>;
  onCancel?: () => void;
};

export function NivelFidelidadeForm({
  nivel,
  isSubmitting,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NivelFidelidadeFormValues>({
    resolver: zodResolver(nivelFidelidadeFormSchema),
    defaultValues: {
      nome: nivel?.nome ?? "",
      pontosMinimos: nivel?.pontosMinimos ?? 0,
      beneficios: nivel?.beneficios ?? "",
    },
  });

  return (
    <form
      className="grid gap-4 rounded-lg border bg-muted/20 p-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(toNivelFidelidadePayload(values));
      })}
    >
      <div className="grid gap-2">
        <label htmlFor={`nivel-nome-${nivel?.id ?? "novo"}`}>
          Nome
        </label>

        <input
          id={`nivel-nome-${nivel?.id ?? "novo"}`}
          {...register("nome")}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {errors.nome ? (
          <p className="text-sm text-destructive">
            {errors.nome.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`nivel-pontos-${nivel?.id ?? "novo"}`}>
          Pontos mínimos
        </label>

        <input
          id={`nivel-pontos-${nivel?.id ?? "novo"}`}
          type="number"
          step="1"
          {...register("pontosMinimos", {
            valueAsNumber: true,
          })}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {errors.pontosMinimos ? (
          <p className="text-sm text-destructive">
            {errors.pontosMinimos.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`nivel-beneficios-${nivel?.id ?? "novo"}`}>
          Benefícios
        </label>

        <textarea
          id={`nivel-beneficios-${nivel?.id ?? "novo"}`}
          rows={3}
          {...register("beneficios")}
          className="rounded-md border bg-background px-3 py-2"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-10 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
        >
          {isSubmitting
            ? "Salvando..."
            : nivel
              ? "Salvar nível"
              : "Criar nível"}
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
