"use client";

import { Button } from "@/components/ui/button";
import type { MovimentacaoFinanceira } from "@/features/financeiro/types/financeiro.types";
import {
  podeOferecerCancelamento,
  podeRegistrarPagamento,
} from "@/features/financeiro/utils/movimentacao-financeira-actions";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";
import {
  formaPagamentoLabel,
  formatMovimentacaoDateTime,
  statusPagamentoLabel,
  tipoMovimentacaoLabel,
} from "@/features/financeiro/utils/movimentacao-financeira-formatters";

type MovimentacoesFinanceirasListProps = {
  movimentacoes: MovimentacaoFinanceira[];
  onCancel?: (movimentacao: MovimentacaoFinanceira) => void;
  onEdit?: (movimentacao: MovimentacaoFinanceira) => void;
  onPay?: (movimentacao: MovimentacaoFinanceira) => void;
  onSelect: (movimentacao: MovimentacaoFinanceira) => void;
};

export function MovimentacoesFinanceirasList({
  movimentacoes,
  onCancel,
  onEdit,
  onPay,
  onSelect,
}: MovimentacoesFinanceirasListProps) {
  return (
    <div className="grid gap-3" aria-label="Movimentações financeiras">
      {movimentacoes.map((movimentacao) => (
        <article
          key={movimentacao.id}
          className="rounded-lg border bg-card p-4"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 space-y-1">
              <h3 className="font-medium text-card-foreground">
                {movimentacao.descricao}
              </h3>

              <p className="text-sm text-muted-foreground">
                {movimentacao.categoria?.nome ?? "Categoria financeira"}
              </p>

              <p className="text-sm text-muted-foreground">
                {formatMovimentacaoDateTime(movimentacao.dataMovimentacao)}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
              <div>
                <dt className="text-muted-foreground">Tipo</dt>
                <dd className="font-medium">
                  {tipoMovimentacaoLabel(movimentacao.tipo)}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground">Valor</dt>
                <dd className="font-medium tabular-nums">
                  {formatFinanceiroCurrency(movimentacao.valor)}
                </dd>
              </div>

              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd>{statusPagamentoLabel(movimentacao.status)}</dd>
              </div>

              <div>
                <dt className="text-muted-foreground">Pagamento</dt>
                <dd>{formaPagamentoLabel(movimentacao.formaPagamento)}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-2">
              {onPay && podeRegistrarPagamento(movimentacao.status) ? (
                <Button type="button" onClick={() => onPay(movimentacao)}>
                  Registrar pagamento
                </Button>
              ) : null}

              {onCancel && podeOferecerCancelamento(movimentacao.status) ? (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => onCancel(movimentacao)}
                >
                  Cancelar
                </Button>
              ) : null}

              {onEdit ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onEdit(movimentacao)}
                >
                  Editar
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                onClick={() => onSelect(movimentacao)}
              >
                Ver detalhes
              </Button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
