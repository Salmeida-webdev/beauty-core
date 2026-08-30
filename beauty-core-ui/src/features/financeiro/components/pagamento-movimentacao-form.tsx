"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  pagamentoMovimentacaoFormSchema,
  type PagamentoMovimentacaoFormValues,
} from "@/features/financeiro/forms/pagamento-movimentacao-form.schema";
import type { FormaPagamentoFinanceiro } from "@/features/financeiro/types/financeiro.types";

type Props = {
  defaultFormaPagamento: FormaPagamentoFinanceiro;
  pending?: boolean;
  onSubmit: (values: PagamentoMovimentacaoFormValues) => void | Promise<void>;
};

export function PagamentoMovimentacaoForm({
  defaultFormaPagamento,
  pending = false,
  onSubmit,
}: Props) {
  const { register, handleSubmit } = useForm<PagamentoMovimentacaoFormValues>({
    resolver: zodResolver(pagamentoMovimentacaoFormSchema),
    defaultValues: {
      formaPagamento: defaultFormaPagamento,
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={pending}
    >
      <div className="space-y-2">
        <label htmlFor="pagamento-forma" className="text-sm font-medium">
          Forma de pagamento
        </label>

        <select
          id="pagamento-forma"
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

      <Button type="submit" disabled={pending}>
        {pending ? "Registrando..." : "Confirmar pagamento"}
      </Button>
    </form>
  );
}
