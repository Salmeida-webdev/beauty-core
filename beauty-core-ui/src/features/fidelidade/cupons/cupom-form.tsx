"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  cupomFormSchema,
  cupomToFormValues,
  emptyCupomFormValues,
  toCupomPayload,
  type CupomFormInput,
  type CupomFormValues,
  type CupomPayload,
} from "./cupom-form.schema";
import { cupomTipoValues } from "./cupom-tipos";
import type { Cupom } from "./cupom.types";

type Props = {
  cupom?: Cupom | null;
  isSubmitting: boolean;
  onSubmit: (
    payload: CupomPayload,
  ) => Promise<void>;
  onCancel?: () => void;
};

export function CupomForm({
  cupom,
  isSubmitting,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<
    CupomFormInput,
    unknown,
    CupomFormValues
  >({
    resolver: zodResolver(cupomFormSchema),
    defaultValues: cupom
      ? cupomToFormValues(cupom)
      : emptyCupomFormValues(),
  });

  return (
    <form
      className="grid gap-4 rounded-lg border bg-muted/20 p-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(
          toCupomPayload(values),
        );
      })}
    >
      <div className="grid gap-2">
        <label htmlFor={`cupom-codigo-${cupom?.id ?? "novo"}`}>
          Código
        </label>

        <input
          id={`cupom-codigo-${cupom?.id ?? "novo"}`}
          maxLength={40}
          autoCapitalize="characters"
          {...register("codigo")}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {errors.codigo ? (
          <p className="text-sm text-destructive">
            {errors.codigo.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label htmlFor={`cupom-nome-${cupom?.id ?? "novo"}`}>
          Nome
        </label>

        <input
          id={`cupom-nome-${cupom?.id ?? "novo"}`}
          maxLength={120}
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
        <label htmlFor={`cupom-descricao-${cupom?.id ?? "novo"}`}>
          Descrição
        </label>

        <textarea
          id={`cupom-descricao-${cupom?.id ?? "novo"}`}
          maxLength={500}
          rows={3}
          {...register("descricao")}
          className="rounded-md border bg-background px-3 py-2"
        />

        {errors.descricao ? (
          <p className="text-sm text-destructive">
            {errors.descricao.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`cupom-tipo-${cupom?.id ?? "novo"}`}>
            Tipo
          </label>

          <select
            id={`cupom-tipo-${cupom?.id ?? "novo"}`}
            {...register("tipo")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          >
            <option value="">
              Selecione
            </option>

            {cupomTipoValues.map((tipo) => (
              <option
                key={tipo}
                value={tipo}
              >
                {tipo}
              </option>
            ))}
          </select>

          {errors.tipo ? (
            <p className="text-sm text-destructive">
              {errors.tipo.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor={`cupom-valor-${cupom?.id ?? "novo"}`}>
            Valor
          </label>

          <input
            id={`cupom-valor-${cupom?.id ?? "novo"}`}
            type="number"
            min="0"
            step="any"
            {...register("valor")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          <p className="text-xs text-muted-foreground">
            A interpretação do valor depende do tipo definido pelo backend.
          </p>

          {errors.valor ? (
            <p className="text-sm text-destructive">
              {errors.valor.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor={`cupom-inicio-${cupom?.id ?? "novo"}`}>
            Início da validade
          </label>

          <input
            id={`cupom-inicio-${cupom?.id ?? "novo"}`}
            type="datetime-local"
            {...register("dataInicio")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          {errors.dataInicio ? (
            <p className="text-sm text-destructive">
              {errors.dataInicio.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <label htmlFor={`cupom-fim-${cupom?.id ?? "novo"}`}>
            Fim da validade
          </label>

          <input
            id={`cupom-fim-${cupom?.id ?? "novo"}`}
            type="datetime-local"
            {...register("dataFim")}
            className="min-h-10 rounded-md border bg-background px-3 py-2"
          />

          {errors.dataFim ? (
            <p className="text-sm text-destructive">
              {errors.dataFim.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor={`cupom-limite-${cupom?.id ?? "novo"}`}>
          Quantidade máxima
        </label>

        <input
          id={`cupom-limite-${cupom?.id ?? "novo"}`}
          type="number"
          min="1"
          step="1"
          {...register("quantidadeMaxima")}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        <p className="text-xs text-muted-foreground">
          Opcional no contrato atual.
        </p>

        {errors.quantidadeMaxima ? (
          <p className="text-sm text-destructive">
            {errors.quantidadeMaxima.message}
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
            : cupom
              ? "Salvar cupom"
              : "Criar cupom"}
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
