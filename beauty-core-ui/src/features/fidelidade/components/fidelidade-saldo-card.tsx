import { formatPontos } from "../utils/fidelidade-formatters";

type FidelidadeSaldoCardProps = {
  saldoPontos: number;
  isRefetching?: boolean;
};

export function FidelidadeSaldoCard({
  saldoPontos,
  isRefetching = false,
}: FidelidadeSaldoCardProps) {
  return (
    <section
      aria-labelledby="fidelidade-saldo-title"
      className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="fidelidade-saldo-title"
            className="text-sm font-medium text-muted-foreground"
          >
            Saldo de pontos
          </h2>

          <p className="mt-2 text-3xl font-semibold tracking-tight">
            {formatPontos(saldoPontos)}
          </p>
        </div>

        {isRefetching ? (
          <span
            aria-live="polite"
            className="text-xs text-muted-foreground"
          >
            Atualizando...
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">
        Saldo informado diretamente pelo backend.
      </p>
    </section>
  );
}
