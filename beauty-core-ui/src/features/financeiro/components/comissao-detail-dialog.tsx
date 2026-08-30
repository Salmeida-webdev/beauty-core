"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useComissao } from "@/features/financeiro/hooks/use-comissoes";
import { formatComissaoDateTime } from "@/features/financeiro/utils/comissao-formatters";
import { formatComissaoPercentual } from "@/features/financeiro/utils/comissao-formatters";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";
import { statusPagamentoLabel } from "@/features/financeiro/utils/movimentacao-financeira-formatters";

type Props = {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ComissaoDetailDialog({ id, open, onOpenChange }: Props) {
  const query = useComissao(id ?? "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Detalhes da comissão</DialogTitle>

          <DialogDescription>
            Dados persistidos e calculados pelo backend.
          </DialogDescription>
        </DialogHeader>

        {query.isPending ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            Carregando comissão...
          </p>
        ) : null}

        {query.isError ? (
          <div role="alert" className="space-y-3">
            <p className="text-sm text-destructive">
              Não foi possível carregar a comissão.
            </p>

            <Button
              type="button"
              onClick={() => {
                void query.refetch();
              }}
            >
              Tentar novamente
            </Button>
          </div>
        ) : null}

        {query.isSuccess ? (
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-muted-foreground">Profissional</dt>
              <dd className="break-all text-sm">{query.data.profissionalId}</dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Agendamento</dt>
              <dd className="break-all text-sm">{query.data.agendamentoId}</dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Valor do serviço
              </dt>
              <dd className="font-medium tabular-nums">
                {formatFinanceiroCurrency(query.data.valorServico)}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Percentual</dt>
              <dd className="font-medium">
                {formatComissaoPercentual(query.data.percentual)}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">
                Valor da comissão
              </dt>
              <dd className="font-semibold tabular-nums">
                {formatFinanceiroCurrency(query.data.valorComissao)}
              </dd>
            </div>

            <div>
              <dt className="text-sm text-muted-foreground">Status</dt>
              <dd>{statusPagamentoLabel(query.data.status)}</dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm text-muted-foreground">Criada em</dt>
              <dd>{formatComissaoDateTime(query.data.createdAt)}</dd>
            </div>
          </dl>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
