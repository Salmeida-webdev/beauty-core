"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PagamentoMovimentacaoForm } from "@/features/financeiro/components/pagamento-movimentacao-form";
import type { PagamentoMovimentacaoFormValues } from "@/features/financeiro/forms/pagamento-movimentacao-form.schema";
import { usePagarMovimentacaoFinanceira } from "@/features/financeiro/hooks/use-movimentacoes-financeiras";
import type { MovimentacaoFinanceira } from "@/features/financeiro/types/financeiro.types";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movimentacao: MovimentacaoFinanceira | null;
};

export function PagamentoMovimentacaoDialog({
  open,
  onOpenChange,
  movimentacao,
}: Props) {
  const mutation = usePagarMovimentacaoFinanceira();

  const [error, setError] = useState<string | null>(null);

  async function submit(values: PagamentoMovimentacaoFormValues) {
    if (mutation.isPending || !movimentacao) {
      return;
    }

    setError(null);

    try {
      await mutation.mutateAsync({
        id: movimentacao.id,
        payload: {
          formaPagamento: values.formaPagamento,
        },
      });

      toast.success("Pagamento registrado.");

      onOpenChange(false);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Não foi possível registrar o pagamento.";

      setError(message);
      toast.error(message);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!mutation.isPending) {
          setError(null);
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar pagamento</DialogTitle>

          <DialogDescription>
            Confirme a forma de pagamento. O backend registrará a movimentação
            como paga.
          </DialogDescription>
        </DialogHeader>

        {movimentacao ? (
          <div className="rounded-lg border p-3">
            <p className="font-medium">{movimentacao.descricao}</p>

            <p className="text-sm text-muted-foreground">
              {formatFinanceiroCurrency(movimentacao.valor)}
            </p>
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        {movimentacao ? (
          <PagamentoMovimentacaoForm
            key={movimentacao.id}
            defaultFormaPagamento={movimentacao.formaPagamento}
            pending={mutation.isPending}
            onSubmit={submit}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
