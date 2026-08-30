"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { MovimentacaoFinanceira } from "@/features/financeiro/types/financeiro.types";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";
import {
  formaPagamentoLabel,
  formatMovimentacaoDateTime,
  statusPagamentoLabel,
  tipoMovimentacaoLabel,
} from "@/features/financeiro/utils/movimentacao-financeira-formatters";

type MovimentacaoFinanceiraDetailDialogProps = {
  movimentacao: MovimentacaoFinanceira | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MovimentacaoFinanceiraDetailDialog({
  movimentacao,
  open,
  onOpenChange,
}: MovimentacaoFinanceiraDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes da movimentação</DialogTitle>

          <DialogDescription>
            Informações registradas pelo backend financeiro.
          </DialogDescription>
        </DialogHeader>

        {movimentacao ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Descrição</dt>
              <dd className="font-medium">{movimentacao.descricao}</dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Categoria</dt>
              <dd className="font-medium">
                {movimentacao.categoria?.nome ?? movimentacao.categoriaId}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Tipo</dt>
              <dd>{tipoMovimentacaoLabel(movimentacao.tipo)}</dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Valor</dt>
              <dd className="font-medium tabular-nums">
                {formatFinanceiroCurrency(movimentacao.valor)}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd>{statusPagamentoLabel(movimentacao.status)}</dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Forma de pagamento
              </dt>
              <dd>{formaPagamentoLabel(movimentacao.formaPagamento)}</dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Data</dt>
              <dd>
                {formatMovimentacaoDateTime(movimentacao.dataMovimentacao)}
              </dd>
            </div>

            {movimentacao.observacoes ? (
              <div className="sm:col-span-2">
                <dt className="text-sm text-muted-foreground">Observações</dt>
                <dd className="whitespace-pre-wrap">
                  {movimentacao.observacoes}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
