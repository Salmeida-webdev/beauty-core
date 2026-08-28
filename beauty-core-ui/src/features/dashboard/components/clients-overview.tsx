import {
  CakeSlice,
  CircleUserRound,
  TrendingUp,
  UserCheck,
  UserMinus,
  UserPlus,
} from "lucide-react";

import {
  KpiCard,
} from "@/components/dashboard/kpi-card";
import {
  PageSection,
  ResponsiveGrid,
} from "@/components/layout/page-section";
import {
  DashboardCompactEmpty,
  DashboardSectionError,
  DashboardSectionSkeleton,
} from "@/features/dashboard/components/dashboard-section-states";
import type {
  ClientsAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  formatInteger,
  formatSignedPercentage,
} from "@/features/dashboard/utils/dashboard-formatters";

type ClientsOverviewProps = {
  data?: ClientsAnalytics;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void | Promise<void>;
};

export function ClientsOverview({
  data,
  isPending,
  isError,
  isFetching,
  onRetry,
}: ClientsOverviewProps) {
  return (
    <PageSection
      className="mt-10"
      title="Clientes"
      description="Indicadores atuais da base e crescimento nos últimos 30 dias."
    >
      {isPending ? (
        <DashboardSectionSkeleton
          label="Carregando clientes"
        />
      ) : isError ? (
        <DashboardSectionError
          title="Não foi possível carregar os clientes"
          isRetrying={isFetching}
          onRetry={onRetry}
        />
      ) : data?.totalClientes === 0 ? (
        <DashboardCompactEmpty
          title="Nenhum cliente cadastrado"
          description="Os indicadores serão exibidos quando a empresa possuir clientes."
        />
      ) : data ? (
        <ResponsiveGrid className="xl:grid-cols-3">
          <KpiCard
            label="Total de clientes"
            value={formatInteger(
              data.totalClientes,
            )}
            description="Base atual"
            icon={CircleUserRound}
          />

          <KpiCard
            label="Clientes ativos"
            value={formatInteger(
              data.ativos,
            )}
            description="Base atual"
            icon={UserCheck}
          />

          <KpiCard
            label="Clientes inativos"
            value={formatInteger(
              data.inativos,
            )}
            description="Base atual"
            icon={UserMinus}
          />

          <KpiCard
            label="Novos clientes"
            value={formatInteger(
              data.novosUltimos30Dias,
            )}
            description="Últimos 30 dias"
            icon={UserPlus}
          />

          <KpiCard
            label="Crescimento"
            value={formatSignedPercentage(
              data.crescimentoPercentual,
            )}
            description="Cálculo fornecido pelo backend"
            icon={TrendingUp}
          />

          <KpiCard
            label="Aniversariantes"
            value={formatInteger(
              data.aniversariantesMes,
            )}
            description="No mês atual"
            icon={CakeSlice}
          />
        </ResponsiveGrid>
      ) : null}
    </PageSection>
  );
}
