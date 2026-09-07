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
import { usePagarComissao } from "@/features/financeiro/hooks/use-comissoes";
import type { ComissaoProfissional } from "@/features/financeiro/types/financeiro.types";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  comissao: ComissaoProfissional | null;
};

export function ComissaoPayDialog({ open, onOpenChange, comissao }: Props) {
  const mutation = usePagarComissao();

  const [error, setError] = useState<string | null>(null);

  async function confirm() {
    if (mutation.isPending || !comissao) {
      return;
    }

    setError(null);

    try {
      await mutation.mutateAsync(comissao.id);

      toast.success("Comissão marcada como paga.");

      onOpenChange(false);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Não foi possível pagar a comissão.";

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
          <DialogTitle>Pagar comissão</DialogTitle>

          <DialogDescription>
            Confirme o pagamento da comissão. A rota não recebe valor, forma de
            pagamento ou outro payload.
          </DialogDescription>
        </DialogHeader>

        {comissao ? (
          <div className="space-y-1 rounded-lg border p-3">
            <p className="text-sm text-muted-foreground">
              Valor calculado pelo backend
            </p>

            <p className="font-semibold tabular-nums">
              {formatFinanceiroCurrency(comissao.valorComissao)}
            </p>
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
            disabled={mutation.isPending || !comissao}
            onClick={() => {
              void confirm();
            }}
          >
            {mutation.isPending ? "Pagando..." : "Confirmar pagamento"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
