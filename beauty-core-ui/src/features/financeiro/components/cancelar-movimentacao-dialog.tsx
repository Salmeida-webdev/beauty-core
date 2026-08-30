"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCancelarMovimentacaoFinanceira } from "@/features/financeiro/hooks/use-movimentacoes-financeiras";
import type { MovimentacaoFinanceira } from "@/features/financeiro/types/financeiro.types";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movimentacao: MovimentacaoFinanceira | null;
};

export function CancelarMovimentacaoDialog({
  open,
  onOpenChange,
  movimentacao,
}: Props) {
  const mutation = useCancelarMovimentacaoFinanceira();

  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    if (mutation.isPending || !movimentacao) {
      return;
    }

    setError(null);

    try {
      await mutation.mutateAsync(movimentacao.id);

      toast.success("Movimentação cancelada.");

      onOpenChange(false);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Não foi possível cancelar a movimentação.";

      setError(message);
      toast.error(message);
    }
  }

  const isPaid = movimentacao?.status === "PAGO";

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
          <DialogTitle>Cancelar movimentação</DialogTitle>

          <DialogDescription>
            Esta operação altera o status financeiro da movimentação para
            cancelado.
          </DialogDescription>
        </DialogHeader>

        {movimentacao ? (
          <div className="space-y-2 rounded-lg border p-3">
            <p className="font-medium">{movimentacao.descricao}</p>

            <p className="text-sm text-muted-foreground">
              {formatFinanceiroCurrency(movimentacao.valor)}
            </p>

            {isPaid ? (
              <p role="note" className="text-sm text-muted-foreground">
                Esta movimentação já está paga. O cancelamento altera o status
                financeiro, mas não representa estorno externo do meio de
                pagamento.
              </p>
            ) : null}
          </div>
        ) : null}

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={mutation.isPending}
            onClick={() => onOpenChange(false)}
          >
            Voltar
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending || !movimentacao}
            onClick={() => {
              void confirm();
            }}
          >
            {mutation.isPending ? "Cancelando..." : "Confirmar cancelamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
