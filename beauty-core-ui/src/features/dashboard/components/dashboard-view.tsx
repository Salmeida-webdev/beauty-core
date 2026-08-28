"use client";

import {
  PageContainer,
} from "@/components/layout/page-container";
import {
  PageHeader,
} from "@/components/layout/page-header";
import {
  AppointmentsOverview,
} from "@/features/dashboard/components/appointments-overview";
import {
  ClientsOverview,
} from "@/features/dashboard/components/clients-overview";
import {
  DashboardFilters,
} from "@/features/dashboard/components/dashboard-filters";
import {
  DashboardKpiGrid,
} from "@/features/dashboard/components/dashboard-kpi-grid";
import {
  DashboardAccessState,
  DashboardKpiSkeletonGrid,
  DashboardSummaryEmpty,
  DashboardSummaryError,
} from "@/features/dashboard/components/dashboard-summary-states";
import {
  EngagementOverview,
  OperationalOverview,
} from "@/features/dashboard/components/engagement-overview";
import {
  FinancialOverview,
} from "@/features/dashboard/components/financial-overview";
import {
  RankingsOverview,
} from "@/features/dashboard/components/rankings-overview";
import {
  useDashboardAnalytics,
} from "@/features/dashboard/hooks/use-dashboard-analytics";
import {
  useDashboardPeriod,
} from "@/features/dashboard/hooks/use-dashboard-period";
import {
  useDashboardRefresh,
} from "@/features/dashboard/hooks/use-dashboard-refresh";
import {
  canAccessDashboardAnalytics,
} from "@/features/dashboard/permissions/dashboard-permissions";
import {
  isDashboardSummaryEmpty,
} from "@/features/dashboard/utils/dashboard-summary";
import {
  getDashboardPeriodLabel,
} from "@/features/dashboard/utils/dashboard-periods";
import {
  useAuthStore,
} from "@/stores/auth-store";

export function DashboardView() {
  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const {
    period,
    filters,
    setPeriod,
  } = useDashboardPeriod();

  const canAccess =
    status === "authenticated" &&
    user !== null &&
    canAccessDashboardAnalytics(
      user.role,
    );

  const analytics =
    useDashboardAnalytics({
      filters,
      enabled: canAccess,
    });

  const {
    refresh,
    isRefreshing,
  } = useDashboardRefresh();

  const lastUpdatedAt = Math.max(
    analytics.summary.dataUpdatedAt,
    analytics.clients.dataUpdatedAt,
    analytics.appointments.dataUpdatedAt,
    analytics.financial.dataUpdatedAt,
    analytics.services.dataUpdatedAt,
    analytics.professionals.dataUpdatedAt,
    analytics.units.dataUpdatedAt,
    analytics.loyalty.dataUpdatedAt,
    analytics.packages.dataUpdatedAt,
    analytics.whatsapp.dataUpdatedAt,
    analytics.notifications.dataUpdatedAt,
    analytics.events.dataUpdatedAt,
  );

  const isRestoring =
    status === "idle" ||
    status === "restoring";

  const summaryIsEmpty =
    analytics.summary.data
      ? isDashboardSummaryEmpty(
          analytics.summary.data,
        )
      : false;

  return (
    <PageContainer
      size="wide"
      data-testid="dashboard-page"
    >
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Dashboard Executivo"
        description="Visão geral do desempenho e da operação da empresa."
        meta={
          canAccess
            ? getDashboardPeriodLabel(
                period,
              )
            : "Acesso conforme o perfil administrativo"
        }
      />

      {isRestoring || user === null ? (
        <DashboardKpiSkeletonGrid />
      ) : canAccess ? (
        <>
          <DashboardFilters
            period={period}
            filters={filters}
            isRefreshing={isRefreshing}
            lastUpdatedAt={
              lastUpdatedAt > 0
                ? lastUpdatedAt
                : undefined
            }
            onPeriodChange={setPeriod}
            onRefresh={refresh}
          />

          {analytics.summary.isPending ? (
            <DashboardKpiSkeletonGrid />
          ) : analytics.summary.isError ? (
            <DashboardSummaryError
              error={
                analytics.summary.error
              }
              isRetrying={
                analytics.summary
                  .isFetching
              }
              onRetry={() => {
                void analytics.summary.refetch();
              }}
            />
          ) : summaryIsEmpty ? (
            <DashboardSummaryEmpty />
          ) : analytics.summary.data ? (
            <DashboardKpiGrid
              summary={
                analytics.summary.data
              }
            />
          ) : null}

          {!summaryIsEmpty && (
            <>
              <FinancialOverview
                data={
                  analytics.financial.data
                }
                isPending={
                  analytics.financial
                    .isPending
                }
                isError={
                  analytics.financial
                    .isError
                }
                isFetching={
                  analytics.financial
                    .isFetching
                }
                onRetry={() => {
                  void analytics.financial.refetch();
                }}
              />

              <AppointmentsOverview
                data={
                  analytics.appointments
                    .data
                }
                isPending={
                  analytics.appointments
                    .isPending
                }
                isError={
                  analytics.appointments
                    .isError
                }
                isFetching={
                  analytics.appointments
                    .isFetching
                }
                onRetry={() => {
                  void analytics.appointments.refetch();
                }}
              />

              <ClientsOverview
                data={
                  analytics.clients.data
                }
                isPending={
                  analytics.clients
                    .isPending
                }
                isError={
                  analytics.clients
                    .isError
                }
                isFetching={
                  analytics.clients
                    .isFetching
                }
                onRetry={() => {
                  void analytics.clients.refetch();
                }}
              />

              <RankingsOverview
                services={{
                  data:
                    analytics.services.data,
                  isPending:
                    analytics.services.isPending,
                  isError:
                    analytics.services.isError,
                  isFetching:
                    analytics.services.isFetching,
                  onRetry: () => {
                    void analytics.services.refetch();
                  },
                }}
                professionals={{
                  data:
                    analytics.professionals.data,
                  isPending:
                    analytics.professionals.isPending,
                  isError:
                    analytics.professionals.isError,
                  isFetching:
                    analytics.professionals.isFetching,
                  onRetry: () => {
                    void analytics.professionals.refetch();
                  },
                }}
                units={{
                  data:
                    analytics.units.data,
                  isPending:
                    analytics.units.isPending,
                  isError:
                    analytics.units.isError,
                  isFetching:
                    analytics.units.isFetching,
                  onRetry: () => {
                    void analytics.units.refetch();
                  },
                }}
              />
              <EngagementOverview
                loyalty={{
                  data:
                    analytics.loyalty.data,
                  isPending:
                    analytics.loyalty.isPending,
                  isError:
                    analytics.loyalty.isError,
                  isFetching:
                    analytics.loyalty.isFetching,
                  onRetry: () => {
                    void analytics.loyalty.refetch();
                  },
                }}
                packages={{
                  data:
                    analytics.packages.data,
                  isPending:
                    analytics.packages.isPending,
                  isError:
                    analytics.packages.isError,
                  isFetching:
                    analytics.packages.isFetching,
                  onRetry: () => {
                    void analytics.packages.refetch();
                  },
                }}
              />

              <OperationalOverview
                whatsapp={{
                  data:
                    analytics.whatsapp.data,
                  isPending:
                    analytics.whatsapp.isPending,
                  isError:
                    analytics.whatsapp.isError,
                  isFetching:
                    analytics.whatsapp.isFetching,
                  onRetry: () => {
                    void analytics.whatsapp.refetch();
                  },
                }}
                notifications={{
                  data:
                    analytics.notifications.data,
                  isPending:
                    analytics.notifications.isPending,
                  isError:
                    analytics.notifications.isError,
                  isFetching:
                    analytics.notifications.isFetching,
                  onRetry: () => {
                    void analytics.notifications.refetch();
                  },
                }}
                events={{
                  data:
                    analytics.events.data,
                  isPending:
                    analytics.events.isPending,
                  isError:
                    analytics.events.isError,
                  isFetching:
                    analytics.events.isFetching,
                  onRetry: () => {
                    void analytics.events.refetch();
                  },
                }}
              />
            </>
          )}
        </>
      ) : (
        <DashboardAccessState
          role={user.role}
        />
      )}
    </PageContainer>
  );
}
