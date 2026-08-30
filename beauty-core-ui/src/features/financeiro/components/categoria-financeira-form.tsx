"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  categoriaFinanceiraFormSchema,
  type CategoriaFinanceiraFormValues,
} from "@/features/financeiro/forms/categoria-financeira-form.schema";

type CategoriaFinanceiraFormProps = {
  defaultValues?: CategoriaFinanceiraFormValues;
  pending?: boolean;
  submitLabel: string;
  onSubmit: (values: CategoriaFinanceiraFormValues) => void | Promise<void>;
};

const defaultFormValues: CategoriaFinanceiraFormValues = {
  nome: "",
  tipo: "RECEITA",
};

export function CategoriaFinanceiraForm({
  defaultValues = defaultFormValues,
  pending = false,
  submitLabel,
  onSubmit,
}: CategoriaFinanceiraFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoriaFinanceiraFormValues>({
    resolver: zodResolver(categoriaFinanceiraFormSchema),
    defaultValues,
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={pending}
    >
      <div className="space-y-2">
        <label
          htmlFor="categoria-financeira-nome"
          className="text-sm font-medium"
        >
          Nome
        </label>

        <Input
          id="categoria-financeira-nome"
          autoComplete="off"
          disabled={pending}
          {...register("nome")}
        />

        {errors.nome ? (
          <p role="alert" className="text-sm text-destructive">
            {errors.nome.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="categoria-financeira-tipo"
          className="text-sm font-medium"
        >
          Tipo
        </label>

        <select
          id="categoria-financeira-tipo"
          disabled={pending}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50"
          {...register("tipo")}
        >
          <option value="RECEITA">Receita</option>
          <option value="DESPESA">Despesa</option>
        </select>

        {errors.tipo ? (
          <p role="alert" className="text-sm text-destructive">
            {errors.tipo.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
