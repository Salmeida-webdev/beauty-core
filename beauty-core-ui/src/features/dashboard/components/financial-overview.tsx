"use client";

import dynamic from "next/dynamic";

import {
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from "lucide-react";

import {
  PageSection,
} from "@/components/layout/page-section";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  DashboardChartLoading,
} from "@/features/dashboard/components/charts/dashboard-chart-loading";
import {
  DashboardCompactEmpty,
  DashboardSectionError,
  DashboardSectionSkeleton,
} from "@/features/dashboard/components/dashboard-section-states";
import type {
  FinancialAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  formatCurrency,
  formatSignedPercentage,
} from "@/features/dashboard/utils/dashboard-formatters";

const FinancialChart = dynamic(
  () =>
    import(
      "@/features/dashboard/components/charts/financial-chart"
    ).then(
      (module) =>
        module.FinancialChart,
    ),
  {
    ssr: false,
    loading:
      DashboardChartLoading,
  },
);

type FinancialOverviewProps = {
  data?: FinancialAnalytics;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void | Promise<void>;
};

export function FinancialOverview({
  data,
  isPending,
  isError,
  isFetching,
  onRetry,
}: FinancialOverviewProps) {
  const isEmpty =
    data !== undefined &&
    data.receitas === 0 &&
    data.despesas === 0 &&
    data.receitasMes === 0 &&
    data.despesasMes === 0;

  const TrendIcon =
    !data ||
    data.crescimentoFinanceiro === 0
      ? Minus
      : data.crescimentoFinanceiro > 0
        ? ArrowUpRight
        : ArrowDownRight;

  return (
    <PageSection
      className="mt-10"
      title="Visão financeira"
      description="Receitas, despesas e resultado calculados pelo backend."
    >
      {isPending ? (
        <DashboardSectionSkeleton
          label="Carregando visão financeira"
        />
      ) : isError ? (
        <DashboardSectionError
          title="Não foi possível carregar o financeiro"
          isRetrying={isFetching}
          onRetry={onRetry}
        />
      ) : isEmpty ? (
        <DashboardCompactEmpty
          title="Sem movimentações financeiras"
          description="Nenhuma receita ou despesa foi encontrada no período selecionado."
        />
      ) : data ? (
        <div className="grid min-w-0 gap-grid lg:grid-cols-3">
          <Card className="min-w-0 lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-heading-4 font-semibold text-text-primary">
                Resultado do período
              </h3>

              <p className="mt-1 text-caption text-text-muted">
                Comparação direta entre os valores agregados disponíveis.
              </p>

              <div className="mt-5 min-w-0">
                <FinancialChart
                  data={data}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-heading-4 font-semibold text-text-primary">
                Contexto financeiro
              </h3>

              <dl className="mt-6 space-y-5">
                <div>
                  <dt className="text-caption text-text-muted">
                    Receitas no mês atual
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatCurrency(
                      data.receitasMes,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-caption text-text-muted">
                    Despesas no mês atual
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatCurrency(
                      data.despesasMes,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-caption text-text-muted">
                    Variação financeira
                  </dt>
                  <dd className="mt-1 flex items-center gap-2 text-heading-4 font-semibold text-text-primary">
                    <TrendIcon
                      aria-hidden="true"
                      className="size-4"
                    />

                    {formatSignedPercentage(
                      data.crescimentoFinanceiro,
                    )}
                  </dd>

                  <p className="mt-1 text-caption text-text-muted">
                    Comparação fornecida pelo backend
                  </p>
                </div>

                <div>
                  <dt className="text-caption text-text-muted">
                    Ticket médio
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatCurrency(
                      data.ticketMedio,
                    )}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </PageSection>
  );
}
