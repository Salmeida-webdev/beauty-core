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
import { MovimentacaoFinanceiraForm } from "@/features/financeiro/components/movimentacao-financeira-form";
import type { MovimentacaoFinanceiraFormValues } from "@/features/financeiro/forms/movimentacao-financeira-form.schema";
import {
  toCreateMovimentacaoFinanceiraPayload,
  toUpdateMovimentacaoFinanceiraPayload,
} from "@/features/financeiro/forms/movimentacao-financeira-payload";
import {
  useAtualizarMovimentacaoFinanceira,
  useCriarMovimentacaoFinanceira,
} from "@/features/financeiro/hooks/use-movimentacoes-financeiras";
import type {
  CategoriaFinanceira,
  MovimentacaoFinanceira,
} from "@/features/financeiro/types/financeiro.types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorias: CategoriaFinanceira[];
  movimentacao?: MovimentacaoFinanceira | null;
};

export function MovimentacaoFinanceiraFormDialog({
  open,
  onOpenChange,
  categorias,
  movimentacao = null,
}: Props) {
  const createMutation = useCriarMovimentacaoFinanceira();

  const updateMutation = useAtualizarMovimentacaoFinanceira();

  const [error, setError] = useState<string | null>(null);

  const pending = createMutation.isPending || updateMutation.isPending;

  async function submit(values: MovimentacaoFinanceiraFormValues) {
    if (pending) {
      return;
    }

    setError(null);

    try {
      if (movimentacao) {
        await updateMutation.mutateAsync({
          id: movimentacao.id,
          payload: toUpdateMovimentacaoFinanceiraPayload(values),
        });

        toast.success("Movimentação atualizada.");
      } else {
        await createMutation.mutateAsync(
          toCreateMovimentacaoFinanceiraPayload(values),
        );

        toast.success("Movimentação criada.");
      }

      onOpenChange(false);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Não foi possível salvar a movimentação.";

      setError(message);
      toast.error(message);
    }
  }

  const lockType = Boolean(
    movimentacao && (movimentacao.clienteId || movimentacao.agendamentoId),
  );

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!pending) {
          setError(null);
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {movimentacao ? "Editar movimentação" : "Nova movimentação"}
          </DialogTitle>

          <DialogDescription>
            O status financeiro é controlado pelas operações próprias de
            pagamento e cancelamento.
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <MovimentacaoFinanceiraForm
          key={movimentacao?.id ?? "nova"}
          categorias={categorias}
          pending={pending}
          lockType={lockType}
          submitLabel={
            movimentacao ? "Salvar alterações" : "Criar movimentação"
          }
          defaultValues={
            movimentacao
              ? {
                  categoriaId: movimentacao.categoriaId,
                  clienteId: movimentacao.clienteId ?? "",
                  agendamentoId: movimentacao.agendamentoId ?? "",
                  descricao: movimentacao.descricao,
                  tipo: movimentacao.tipo,
                  valor: String(movimentacao.valor).replace(".", ","),
                  formaPagamento: movimentacao.formaPagamento,
                  observacoes: movimentacao.observacoes ?? "",
                }
              : undefined
          }
          onSubmit={submit}
        />
      </DialogContent>
    </Dialog>
  );
}
