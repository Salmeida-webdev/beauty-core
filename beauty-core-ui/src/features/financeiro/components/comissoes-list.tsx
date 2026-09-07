"use client";

import { Button } from "@/components/ui/button";
import type { ComissaoProfissional } from "@/features/financeiro/types/financeiro.types";
import { podePagarComissao } from "@/features/financeiro/utils/comissao-actions";
import {
  formatComissaoDateTime,
  formatComissaoPercentual,
} from "@/features/financeiro/utils/comissao-formatters";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";
import { statusPagamentoLabel } from "@/features/financeiro/utils/movimentacao-financeira-formatters";

type Props = {
  comissoes: ComissaoProfissional[];
  onPay: (comissao: ComissaoProfissional) => void;
  onSelect: (comissao: ComissaoProfissional) => void;
};

export function ComissoesList({ comissoes, onPay, onSelect }: Props) {
  return (
    <div className="grid gap-3" aria-label="Comissões">
      {comissoes.map((comissao) => (
        <article key={comissao.id} className="rounded-lg border bg-card p-4">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-xs text-muted-foreground">Profissional</p>
                <p className="break-all text-sm font-medium">
                  {comissao.profissionalId}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Agendamento</p>
                <p className="break-all text-sm">{comissao.agendamentoId}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Serviço / percentual
                </p>
                <p className="text-sm">
                  {formatFinanceiroCurrency(comissao.valorServico)} ·{" "}
                  {formatComissaoPercentual(comissao.percentual)}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Comissão</p>
                <p className="font-semibold tabular-nums">
                  {formatFinanceiroCurrency(comissao.valorComissao)}
                </p>

                <p className="text-xs text-muted-foreground">
                  {statusPagamentoLabel(comissao.status)} ·{" "}
                  {formatComissaoDateTime(comissao.createdAt)}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {podePagarComissao(comissao.status) ? (
                <Button type="button" onClick={() => onPay(comissao)}>
                  Pagar comissão
                </Button>
              ) : null}

              <Button
                type="button"
                variant="outline"
                onClick={() => onSelect(comissao)}
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
