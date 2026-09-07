import {
  RefreshCw,
} from "lucide-react";

import {
  PageSection,
} from "@/components/layout/page-section";
import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Skeleton,
} from "@/components/ui/skeleton";
import type {
  ProfessionalsAnalytics,
  ServicesAnalytics,
  UnitsAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  formatCurrency,
  formatInteger,
} from "@/features/dashboard/utils/dashboard-formatters";

type DashboardRankingDisplayItem = {
  ranking: number;
  name: string;
  primary: string;
  secondary: string;
};

export type DashboardRankingState<TData> = {
  data?: TData;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void | Promise<void>;
};

type DashboardRankingPanelProps = {
  title: string;
  description: string;
  emptyMessage: string;
  items: readonly DashboardRankingDisplayItem[];
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void | Promise<void>;
};

function DashboardRankingPanel({
  title,
  description,
  emptyMessage,
  items,
  isPending,
  isError,
  isFetching,
  onRetry,
}: DashboardRankingPanelProps) {
  return (
    <Card className="min-w-0">
      <CardContent className="p-6">
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary">
            {title}
          </h3>

          <p className="mt-1 text-caption leading-5 text-text-muted">
            {description}
          </p>
        </div>

        {isPending ? (
          <div
            className="mt-6 space-y-3"
            aria-label={`Carregando ${title}`}
            aria-busy="true"
          >
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-medium border border-border-subtle p-3"
              >
                <Skeleton className="size-8 rounded-full" />

                <div className="min-w-0 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="mt-2 h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div
            className="mt-6 rounded-medium border border-destructive/30 p-4"
            role="alert"
          >
            <p className="text-body-small font-medium text-text-primary">
              Não foi possível carregar este ranking.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4"
              disabled={isFetching}
              onClick={() => {
                void onRetry();
              }}
            >
              <RefreshCw
                aria-hidden="true"
                className={
                  isFetching
                    ? "animate-spin motion-reduce:animate-none"
                    : undefined
                }
              />

              {isFetching
                ? "Tentando novamente"
                : "Tentar novamente"}
            </Button>
          </div>
        ) : items.length === 0 ? (
          <p className="mt-6 rounded-medium border border-dashed border-border-subtle p-4 text-body-small text-text-muted">
            {emptyMessage}
          </p>
        ) : (
          <ol className="mt-6 space-y-3">
            {items.map((item) => (
              <li
                key={`${item.ranking}-${item.name}`}
                className="flex min-w-0 flex-col items-start gap-3 rounded-medium border border-border-subtle bg-surface-subtle p-3 sm:flex-row sm:items-center"
              >
                <span
                  className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border-subtle bg-surface-elevated text-label font-semibold text-text-primary"
                  aria-label={`Posição ${item.ranking}`}
                >
                  {item.ranking}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-body-small font-semibold text-text-primary">
                    {item.name}
                  </p>

                  <p className="mt-1 text-caption text-text-muted">
                    {item.primary}
                  </p>
                </div>

                <p className="w-full break-words text-left text-caption font-semibold text-text-secondary sm:w-auto sm:shrink-0 sm:text-right">
                  {item.secondary}
                </p>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  );
}

type RankingsOverviewProps = {
  services: DashboardRankingState<ServicesAnalytics>;
  professionals: DashboardRankingState<ProfessionalsAnalytics>;
  units: DashboardRankingState<UnitsAnalytics>;
};

export function RankingsOverview({
  services,
  professionals,
  units,
}: RankingsOverviewProps) {
  const serviceItems =
    services.data
      ?.slice(0, 5)
      .map((item) => ({
        ranking: item.ranking,
        name: item.servico,
        primary:
          `${formatInteger(
            item.quantidade,
          )} realizações`,
        secondary:
          formatCurrency(
            item.receita,
          ),
      })) ?? [];

  const professionalItems =
    professionals.data
      ?.slice(0, 5)
      .map((item) => ({
        ranking: item.ranking,
        name: item.nome,
        primary:
          `${formatInteger(
            item.atendimentos,
          )} atendimentos`,
        secondary:
          `${formatCurrency(
            item.receita,
          )} · comissão ${formatCurrency(
            item.comissao,
          )}`,
      })) ?? [];

  const unitItems =
    units.data
      ?.slice(0, 5)
      .map((item) => ({
        ranking: item.ranking,
        name: item.unidade,
        primary:
          `${formatInteger(
            item.agendamentos,
          )} agendamentos`,
        secondary:
          formatCurrency(
            item.receita,
          ),
      })) ?? [];

  return (
    <PageSection
      className="mt-10"
      title="Desempenho"
      description="Rankings executivos limitados aos cinco primeiros resultados retornados pela API."
    >
      <div className="grid min-w-0 gap-grid md:grid-cols-2 xl:grid-cols-3">
        <DashboardRankingPanel
          title="Serviços"
          description="Mais realizados e respectiva receita."
          emptyMessage="Nenhum serviço foi encontrado no período."
          items={serviceItems}
          isPending={services.isPending}
          isError={services.isError}
          isFetching={services.isFetching}
          onRetry={services.onRetry}
        />

        <DashboardRankingPanel
          title="Profissionais"
          description="Atendimentos, receita e comissão."
          emptyMessage="Nenhum profissional possui dados no período."
          items={professionalItems}
          isPending={professionals.isPending}
          isError={professionals.isError}
          isFetching={professionals.isFetching}
          onRetry={professionals.onRetry}
        />

        <DashboardRankingPanel
          title="Unidades"
          description="Agendamentos e receita por unidade."
          emptyMessage="Nenhuma unidade possui dados no período."
          items={unitItems}
          isPending={units.isPending}
          isError={units.isError}
          isFetching={units.isFetching}
          onRetry={units.onRetry}
        />
      </div>
    </PageSection>
  );
}
