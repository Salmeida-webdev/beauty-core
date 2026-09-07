"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FinanceiroOperacionalCards } from "@/features/financeiro/components/financeiro-operacional-cards";
import { FluxoCaixaOperacionalList } from "@/features/financeiro/components/fluxo-caixa-operacional-list";
import { useRelatoriosFinanceiros } from "@/features/financeiro/hooks/use-relatorios-financeiros";
import type { FinanceiroPeriodoQuery } from "@/features/financeiro/types/financeiro.types";
import {
  toFinanceiroPeriodQuery,
  type FinanceiroPeriodFormValues,
} from "@/features/financeiro/utils/relatorios-financeiros-periodo";
import { formatFinanceiroCurrency } from "@/features/financeiro/utils/financeiro-formatters";

const emptyPeriod: FinanceiroPeriodFormValues = {
  dataInicio: "",
  dataFim: "",
};

export function RelatoriosFinanceirosSection() {
  const [periodForm, setPeriodForm] =
    useState<FinanceiroPeriodFormValues>(emptyPeriod);

  const [period, setPeriod] = useState<FinanceiroPeriodoQuery>({});

  const { resumo, fluxo, receitasMes, despesasMes } =
    useRelatoriosFinanceiros(period);

  const allOperationalSuccess =
    resumo.isSuccess && receitasMes.isSuccess && despesasMes.isSuccess;

  const hasOperationalError =
    resumo.isError ||
    fluxo.isError ||
    receitasMes.isError ||
    despesasMes.isError;

  function applyPeriod(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setPeriod(toFinanceiroPeriodQuery(periodForm));
  }

  function clearPeriod() {
    setPeriodForm(emptyPeriod);
    setPeriod({});
  }

  async function retryAll() {
    await Promise.all([
      resumo.refetch(),
      fluxo.refetch(),
      receitasMes.refetch(),
      despesasMes.refetch(),
    ]);
  }

  return (
    <section
      className="min-w-0 space-y-6"
      aria-labelledby="relatorios-financeiros-title"
      aria-busy={
        resumo.isPending ||
        fluxo.isPending ||
        receitasMes.isPending ||
        despesasMes.isPending
      }
    >
      <header className="space-y-1">
        <h2 id="relatorios-financeiros-title" className="text-lg font-semibold">
          Visão financeira operacional
        </h2>

        <p className="text-sm text-muted-foreground">
          Gestão financeira baseada nos relatórios próprios do módulo.
          Indicadores executivos permanecem no Dashboard.
        </p>
      </header>

      <form
        className="grid gap-4 rounded-lg border p-4 md:grid-cols-[1fr_1fr_auto]"
        onSubmit={applyPeriod}
      >
        <div className="space-y-2">
          <label
            htmlFor="relatorio-data-inicio"
            className="text-sm font-medium"
          >
            Início do período
          </label>

          <Input
            id="relatorio-data-inicio"
            type="datetime-local"
            value={periodForm.dataInicio}
            onChange={(event) =>
              setPeriodForm((current) => ({
                ...current,
                dataInicio: event.target.value,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="relatorio-data-fim" className="text-sm font-medium">
            Fim do período
          </label>

          <Input
            id="relatorio-data-fim"
            type="datetime-local"
            value={periodForm.dataFim}
            onChange={(event) =>
              setPeriodForm((current) => ({
                ...current,
                dataFim: event.target.value,
              }))
            }
          />
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <Button type="submit">Aplicar período</Button>

          <Button type="button" variant="outline" onClick={clearPeriod}>
            Limpar
          </Button>
        </div>
      </form>

      {hasOperationalError ? (
        <div role="alert" className="space-y-3 rounded-lg border p-4">
          <p className="text-sm text-destructive">
            Não foi possível carregar todos os dados financeiros.
          </p>

          <Button
            type="button"
            onClick={() => {
              void retryAll();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      ) : null}

      {resumo.isPending || receitasMes.isPending || despesasMes.isPending ? (
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-muted-foreground"
        >
          Carregando indicadores financeiros...
        </p>
      ) : null}

      {allOperationalSuccess ? (
        <FinanceiroOperacionalCards
          resumo={resumo.data}
          receitasMes={receitasMes.data}
          despesasMes={despesasMes.data}
        />
      ) : null}

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Fluxo de caixa</h3>

          <p className="text-sm text-muted-foreground">
            Entradas, saídas e saldo calculados pelo backend sobre movimentações
            pagas.
          </p>
        </div>

        {fluxo.isPending ? (
          <p
            role="status"
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            Carregando fluxo de caixa...
          </p>
        ) : null}

        {fluxo.isSuccess ? (
          <>
            <div className="grid gap-3 sm:grid-cols-3">
              <article className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Entradas</p>

                <p className="mt-1 font-semibold tabular-nums">
                  {formatFinanceiroCurrency(fluxo.data.totalEntradas)}
                </p>
              </article>

              <article className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Saídas</p>

                <p className="mt-1 font-semibold tabular-nums">
                  {formatFinanceiroCurrency(fluxo.data.totalSaidas)}
                </p>
              </article>

              <article className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Saldo</p>

                <p className="mt-1 font-semibold tabular-nums">
                  {formatFinanceiroCurrency(fluxo.data.saldo)}
                </p>
              </article>
            </div>

            <FluxoCaixaOperacionalList
              movimentacoes={fluxo.data.movimentacoes}
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
