"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { Pacote } from "../types/pacotes.types";
import {
  clientePacoteFormSchema,
  toCreateClientePacotePayload,
  type ClientePacoteFormValues,
  type CreateClientePacotePayload,
} from "./cliente-pacote-form.schema";

type Props = {
  clienteId: string;
  pacotes: Pacote[];
  isLoadingPacotes: boolean;
  isSubmitting: boolean;
  onSubmit: (payload: CreateClientePacotePayload) => Promise<void>;
};

export function ClientePacoteForm({
  clienteId,
  pacotes,
  isLoadingPacotes,
  isSubmitting,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientePacoteFormValues>({
    resolver: zodResolver(clientePacoteFormSchema),

    defaultValues: {
      clienteId,
      pacoteId: "",
    },
  });

  return (
    <form
      className="grid gap-4 rounded-lg border bg-muted/20 p-4"
      noValidate
      onSubmit={handleSubmit(async (values) => {
        await onSubmit(toCreateClientePacotePayload(values));
      })}
    >
      <input type="hidden" {...register("clienteId")} />

      <div className="grid gap-2">
        <label htmlFor="cliente-pacote-pacote">Pacote</label>

        <select
          id="cliente-pacote-pacote"
          aria-invalid={Boolean(errors.pacoteId)}
          aria-describedby={
            errors.pacoteId ? "cliente-pacote-pacote-error" : undefined
          }
          disabled={isLoadingPacotes || isSubmitting}
          {...register("pacoteId")}
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        >
          <option value="">Selecione</option>

          {pacotes.map((pacote) => (
            <option key={pacote.id} value={pacote.id} disabled={!pacote.ativo}>
              {pacote.nome}
              {pacote.ativo ? "" : " — inativo"}
            </option>
          ))}
        </select>

        {errors.pacoteId ? (
          <p
            id="cliente-pacote-pacote-error"
            role="alert"
            className="text-sm text-destructive"
          >
            {errors.pacoteId.message}
          </p>
        ) : null}
      </div>

      {errors.clienteId ? (
        <p role="alert" className="text-sm text-destructive">
          {errors.clienteId.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isLoadingPacotes || isSubmitting}
        className="min-h-10 w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Atribuindo..." : "Atribuir pacote"}
      </button>
    </form>
  );
}
