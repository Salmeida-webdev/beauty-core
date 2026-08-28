"use client";

import dynamic from "next/dynamic";

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
  AppointmentsAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  formatInteger,
  formatPercentage,
} from "@/features/dashboard/utils/dashboard-formatters";

const AppointmentsChart = dynamic(
  () =>
    import(
      "@/features/dashboard/components/charts/appointments-chart"
    ).then(
      (module) =>
        module.AppointmentsChart,
    ),
  {
    ssr: false,
    loading:
      DashboardChartLoading,
  },
);

type AppointmentsOverviewProps = {
  data?: AppointmentsAnalytics;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void | Promise<void>;
};

export function AppointmentsOverview({
  data,
  isPending,
  isError,
  isFetching,
  onRetry,
}: AppointmentsOverviewProps) {
  return (
    <PageSection
      className="mt-10"
      title="Agendamentos"
      description="Distribuição e taxas operacionais no período selecionado."
    >
      {isPending ? (
        <DashboardSectionSkeleton
          label="Carregando agendamentos"
        />
      ) : isError ? (
        <DashboardSectionError
          title="Não foi possível carregar os agendamentos"
          isRetrying={isFetching}
          onRetry={onRetry}
        />
      ) : data?.total === 0 ? (
        <DashboardCompactEmpty
          title="Sem agendamentos no período"
          description="Altere o período para consultar outros registros."
        />
      ) : data ? (
        <div className="grid min-w-0 gap-grid lg:grid-cols-3">
          <Card className="min-w-0 lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="text-heading-4 font-semibold text-text-primary">
                Distribuição por status
              </h3>

              <p className="mt-1 text-caption text-text-muted">
                Cada barra possui rótulo e valor acessível.
              </p>

              <div className="mt-5 min-w-0">
                <AppointmentsChart
                  data={data}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-heading-4 font-semibold text-text-primary">
                Eficiência operacional
              </h3>

              <dl className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-1">
                <div>
                  <dt className="text-caption text-text-muted">
                    Total
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatInteger(
                      data.total,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-caption text-text-muted">
                    Taxa de conclusão
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatPercentage(
                      data.taxaConclusao,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-caption text-text-muted">
                    Taxa de cancelamento
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatPercentage(
                      data.taxaCancelamento,
                    )}
                  </dd>
                </div>

                <div>
                  <dt className="text-caption text-text-muted">
                    Pendentes
                  </dt>
                  <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
                    {formatInteger(
                      data.pendentes,
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
