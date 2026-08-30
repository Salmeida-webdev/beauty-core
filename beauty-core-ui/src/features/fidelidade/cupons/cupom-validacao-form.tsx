"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  cupomValidacaoSchema,
  type CupomValidacaoValues,
} from "./cupom-form.schema";
import {
  cupomValidationActionLabel,
  cupomValidationConsumesUsage,
} from "./cupom-validation-contract";

type Props = {
  isSubmitting: boolean;
  onSubmit: (codigo: string) => Promise<void>;
};

export function CupomValidacaoForm({
  isSubmitting,
  onSubmit,
}: Props) {
  const [confirmed, setConfirmed] =
    useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CupomValidacaoValues>({
    resolver: zodResolver(
      cupomValidacaoSchema,
    ),
    defaultValues: {
      codigo: "",
    },
  });

  return (
    <form
      className="grid gap-3 rounded-lg border bg-muted/20 p-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        if (
          cupomValidationConsumesUsage &&
          !confirmed
        ) {
          return;
        }

        await onSubmit(
          values.codigo.trim(),
        );
      })}
    >
      <div className="grid gap-2">
        <label htmlFor="cupom-validar-codigo">
          Código do cupom
        </label>

        <input
          id="cupom-validar-codigo"
          maxLength={40}
          {...register("codigo")}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {errors.codigo ? (
          <p className="text-sm text-destructive">
            {errors.codigo.message}
          </p>
        ) : null}
      </div>

      {cupomValidationConsumesUsage ? (
        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(event) => {
              setConfirmed(
                event.target.checked,
              );
            }}
            className="mt-1"
          />

          <span>
            Confirmo esta operação. O contrato atual
            registra utilização do cupom durante a
            validação.
          </span>
        </label>
      ) : null}

      <button
        type="submit"
        disabled={
          isSubmitting ||
          (
            cupomValidationConsumesUsage &&
            !confirmed
          )
        }
        className="min-h-10 w-fit rounded-md border px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting
          ? "Validando..."
          : cupomValidationActionLabel}
      </button>
    </form>
  );
}
