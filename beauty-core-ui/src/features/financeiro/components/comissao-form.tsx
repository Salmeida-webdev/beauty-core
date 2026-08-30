"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  comissaoFormSchema,
  type ComissaoFormValues,
} from "@/features/financeiro/forms/comissao-form.schema";

type Props = {
  pending?: boolean;
  onSubmit: (values: ComissaoFormValues) => void | Promise<void>;
};

const defaultValues: ComissaoFormValues = {
  profissionalId: "",
  agendamentoId: "",
  valorServico: "",
  percentual: "",
};

export function ComissaoForm({ pending = false, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ComissaoFormValues>({
    resolver: zodResolver(comissaoFormSchema),
    defaultValues,
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={pending}
    >
      <div className="space-y-2">
        <label htmlFor="comissao-profissional" className="text-sm font-medium">
          ID do profissional
        </label>

        <Input
          id="comissao-profissional"
          disabled={pending}
          {...register("profissionalId")}
        />

        {errors.profissionalId ? (
          <p role="alert" className="text-sm text-destructive">
            {errors.profissionalId.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="comissao-agendamento" className="text-sm font-medium">
          ID do agendamento
        </label>

        <Input
          id="comissao-agendamento"
          disabled={pending}
          {...register("agendamentoId")}
        />

        {errors.agendamentoId ? (
          <p role="alert" className="text-sm text-destructive">
            {errors.agendamentoId.message}
          </p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="comissao-valor-servico"
            className="text-sm font-medium"
          >
            Valor do serviço
          </label>

          <Input
            id="comissao-valor-servico"
            inputMode="decimal"
            placeholder="0,00"
            disabled={pending}
            {...register("valorServico")}
          />

          {errors.valorServico ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.valorServico.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="comissao-percentual" className="text-sm font-medium">
            Percentual
          </label>

          <Input
            id="comissao-percentual"
            inputMode="decimal"
            placeholder="10"
            disabled={pending}
            {...register("percentual")}
          />

          {errors.percentual ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.percentual.message}
            </p>
          ) : null}
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        O valor da comissão será calculado pelo backend após o envio.
      </p>

      <Button type="submit" disabled={pending}>
        {pending ? "Criando..." : "Criar comissão"}
      </Button>
    </form>
  );
}
