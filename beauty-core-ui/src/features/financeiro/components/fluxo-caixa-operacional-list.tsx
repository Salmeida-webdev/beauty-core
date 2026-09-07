import type { MovimentacaoFinanceira } from "@/features/financeiro/types/financeiro.types";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";
import {
  formatMovimentacaoDateTime,
  tipoMovimentacaoLabel,
} from "@/features/financeiro/utils/movimentacao-financeira-formatters";

type Props = {
  movimentacoes: MovimentacaoFinanceira[];
};

export function FluxoCaixaOperacionalList({ movimentacoes }: Props) {
  if (movimentacoes.length === 0) {
    return (
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        Nenhuma movimentação paga encontrada para o período.
      </div>
    );
  }

  return (
    <div
      className="overflow-x-auto rounded-lg border"
      aria-label="Fluxo de caixa"
    >
      <table className="w-full min-w-[680px] text-sm">
        <thead className="border-b bg-muted/40">
          <tr>
            <th scope="col" className="px-4 py-3 text-left font-medium">
              Data
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium">
              Descrição
            </th>
            <th scope="col" className="px-4 py-3 text-left font-medium">
              Tipo
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium">
              Valor
            </th>
          </tr>
        </thead>

        <tbody>
          {movimentacoes.map((movimentacao) => (
            <tr key={movimentacao.id} className="border-b last:border-b-0">
              <td className="px-4 py-3">
                {formatMovimentacaoDateTime(movimentacao.dataMovimentacao)}
              </td>

              <td className="px-4 py-3">{movimentacao.descricao}</td>

              <td className="px-4 py-3">
                {tipoMovimentacaoLabel(movimentacao.tipo)}
              </td>

              <td className="px-4 py-3 text-right font-medium tabular-nums">
                {formatFinanceiroCurrency(movimentacao.valor)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
