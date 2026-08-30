import type { MovimentacaoPontos } from "../types/fidelidade.types";
import { formatPontos } from "../utils/fidelidade-formatters";
import {
  formatMovimentacaoDate,
  formatMovimentacaoTipo,
} from "../utils/fidelidade-historico-formatters";

type FidelidadeHistoricoProps = {
  movimentacoes: MovimentacaoPontos[];
};

export function FidelidadeHistorico({
  movimentacoes,
}: FidelidadeHistoricoProps) {
  return (
    <section
      aria-labelledby="fidelidade-historico-title"
      className="rounded-xl border bg-card text-card-foreground shadow-sm"
    >
      <div className="border-b px-5 py-4">
        <h2
          id="fidelidade-historico-title"
          className="text-base font-semibold"
        >
          Histórico de pontos
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Movimentações registradas pelo backend para o cliente.
        </p>
      </div>

      {movimentacoes.length === 0 ? (
        <div
          aria-live="polite"
          className="px-5 py-10 text-center"
        >
          <p className="font-medium">
            Nenhuma movimentação registrada
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            O cliente ainda não possui histórico de pontos.
          </p>
        </div>
      ) : (
        <ul className="divide-y" aria-label="Movimentações de pontos">
          {movimentacoes.map((movimentacao) => (
            <li
              key={movimentacao.id}
              className="grid gap-3 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">
                    {formatMovimentacaoTipo(movimentacao.tipo)}
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {formatMovimentacaoDate(
                      movimentacao.createdAt,
                    )}
                  </span>
                </div>

                {movimentacao.descricao ? (
                  <p className="mt-1 break-words text-sm text-muted-foreground">
                    {movimentacao.descricao}
                  </p>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sem descrição informada.
                  </p>
                )}
              </div>

              <div className="font-semibold sm:text-right">
                {formatPontos(movimentacao.pontos)}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
