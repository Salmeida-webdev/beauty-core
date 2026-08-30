"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  movimentacaoFinanceiraFormSchema,
  type MovimentacaoFinanceiraFormValues,
} from "@/features/financeiro/forms/movimentacao-financeira-form.schema";
import type { CategoriaFinanceira } from "@/features/financeiro/types/financeiro.types";

type Props = {
  categorias: CategoriaFinanceira[];
  defaultValues?: MovimentacaoFinanceiraFormValues;
  pending?: boolean;
  lockType?: boolean;
  submitLabel: string;
  onSubmit: (values: MovimentacaoFinanceiraFormValues) => void | Promise<void>;
};

const emptyValues: MovimentacaoFinanceiraFormValues = {
  categoriaId: "",
  clienteId: "",
  agendamentoId: "",
  descricao: "",
  tipo: "RECEITA",
  valor: "",
  formaPagamento: "PIX",
  observacoes: "",
};

export function MovimentacaoFinanceiraForm({
  categorias,
  defaultValues = emptyValues,
  pending = false,
  lockType = false,
  submitLabel,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<MovimentacaoFinanceiraFormValues>({
    resolver: zodResolver(movimentacaoFinanceiraFormSchema),
    defaultValues,
  });

  const tipo = useWatch({ control, name: "tipo" });

  const categoriasCompativeis = categorias.filter(
    (categoria) =>
      categoria.tipo === tipo &&
      (categoria.ativo || categoria.id === defaultValues.categoriaId),
  );

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={pending}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="movimentacao-tipo" className="text-sm font-medium">
            Tipo
          </label>

          <select
            id="movimentacao-tipo"
            disabled={pending || lockType}
            {...register("tipo")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground disabled:opacity-50"
          >
            <option value="RECEITA">Receita</option>
            <option value="DESPESA">Despesa</option>
          </select>

          {lockType ? (
            <p className="text-xs text-muted-foreground">
              O tipo não pode ser alterado enquanto a movimentação possui
              cliente ou agendamento vinculado.
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="movimentacao-categoria"
            className="text-sm font-medium"
          >
            Categoria
          </label>

          <select
            id="movimentacao-categoria"
            disabled={pending}
            {...register("categoriaId")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground disabled:opacity-50"
          >
            <option value="">Selecione</option>

            {categoriasCompativeis.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>

          {errors.categoriaId ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.categoriaId.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="movimentacao-descricao"
            className="text-sm font-medium"
          >
            Descrição
          </label>

          <Input
            id="movimentacao-descricao"
            disabled={pending}
            {...register("descricao")}
          />

          {errors.descricao ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.descricao.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="movimentacao-valor" className="text-sm font-medium">
            Valor
          </label>

          <Input
            id="movimentacao-valor"
            inputMode="decimal"
            placeholder="0,00"
            disabled={pending}
            {...register("valor")}
          />

          {errors.valor ? (
            <p role="alert" className="text-sm text-destructive">
              {errors.valor.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="movimentacao-forma" className="text-sm font-medium">
            Forma de pagamento
          </label>

          <select
            id="movimentacao-forma"
            disabled={pending}
            {...register("formaPagamento")}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground disabled:opacity-50"
          >
            <option value="DINHEIRO">Dinheiro</option>
            <option value="PIX">Pix</option>
            <option value="CARTAO_CREDITO">Cartão de crédito</option>
            <option value="CARTAO_DEBITO">Cartão de débito</option>
            <option value="TRANSFERENCIA">Transferência</option>
            <option value="BOLETO">Boleto</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        {tipo === "RECEITA" ? (
          <>
            <div className="space-y-2">
              <label
                htmlFor="movimentacao-cliente"
                className="text-sm font-medium"
              >
                Cliente ID (opcional)
              </label>

              <Input
                id="movimentacao-cliente"
                disabled={pending}
                {...register("clienteId")}
              />

              {errors.clienteId ? (
                <p role="alert" className="text-sm text-destructive">
                  {errors.clienteId.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="movimentacao-agendamento"
                className="text-sm font-medium"
              >
                Agendamento ID (opcional)
              </label>

              <Input
                id="movimentacao-agendamento"
                disabled={pending}
                {...register("agendamentoId")}
              />

              {errors.agendamentoId ? (
                <p role="alert" className="text-sm text-destructive">
                  {errors.agendamentoId.message}
                </p>
              ) : null}
            </div>
          </>
        ) : null}

        <div className="space-y-2 sm:col-span-2">
          <label
            htmlFor="movimentacao-observacoes"
            className="text-sm font-medium"
          >
            Observações
          </label>

          <textarea
            id="movimentacao-observacoes"
            rows={3}
            disabled={pending}
            {...register("observacoes")}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground disabled:opacity-50"
          />
        </div>
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}
