import type {
  ReactNode,
} from "react";
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
  EventsAnalytics,
  LoyaltyAnalytics,
  NotificationsAnalytics,
  PackagesAnalytics,
  WhatsappAnalytics,
} from "@/features/dashboard/types/dashboard.types";
import {
  buildDistributionRanking,
} from "@/features/dashboard/utils/dashboard-distributions";
import {
  formatCurrency,
  formatInteger,
} from "@/features/dashboard/utils/dashboard-formatters";

export type DashboardPanelState<TData> = {
  data?: TData;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  onRetry: () => void | Promise<void>;
};

type DashboardDataPanelProps = {
  title: string;
  description: string;
  emptyMessage: string;
  isPending: boolean;
  isError: boolean;
  isFetching: boolean;
  isEmpty: boolean;
  onRetry: () => void | Promise<void>;
  children: ReactNode;
  className?: string;
};

function DashboardDataPanel({
  title,
  description,
  emptyMessage,
  isPending,
  isError,
  isFetching,
  isEmpty,
  onRetry,
  children,
  className,
}: DashboardDataPanelProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <h3 className="text-heading-4 font-semibold text-text-primary">
          {title}
        </h3>

        <p className="mt-1 text-caption leading-5 text-text-muted">
          {description}
        </p>

        {isPending ? (
          <div
            className="mt-6 space-y-4"
            aria-label={`Carregando ${title}`}
            aria-busy="true"
          >
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="space-y-2"
              >
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        ) : isError ? (
          <div
            role="alert"
            className="mt-6 rounded-medium border border-destructive/30 p-4"
          >
            <p className="text-body-small font-medium text-text-primary">
              Não foi possível carregar esta seção.
            </p>

            <Button
              type="button"
              variant="outline"
              className="mt-4"
              disabled={isFetching}
              aria-label={`Tentar novamente ${title}`}
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
        ) : isEmpty ? (
          <p className="mt-6 rounded-medium border border-dashed border-border-subtle p-4 text-body-small text-text-muted">
            {emptyMessage}
          </p>
        ) : (
          <div className="mt-6">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

type MetricItem = {
  label: string;
  value: string;
};

function MetricsGrid({
  items,
}: {
  items: readonly MetricItem[];
}) {
  return (
    <dl className="grid grid-cols-2 gap-5">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="text-caption text-text-muted">
            {item.label}
          </dt>

          <dd className="mt-1 text-heading-4 font-semibold text-text-primary">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

type EngagementOverviewProps = {
  loyalty: DashboardPanelState<LoyaltyAnalytics>;
  packages: DashboardPanelState<PackagesAnalytics>;
};

export function EngagementOverview({
  loyalty,
  packages,
}: EngagementOverviewProps) {
  const loyaltyEmpty =
    loyalty.data !== undefined &&
    loyalty.data.clientesComPontos === 0 &&
    loyalty.data.pontosDistribuidos === 0 &&
    loyalty.data.pontosResgatados === 0 &&
    loyalty.data.beneficiosLiberados === 0 &&
    loyalty.data.topClientes.length === 0;

  const packagesEmpty =
    packages.data !== undefined &&
    packages.data.pacotesVendidos === 0 &&
    packages.data.pacotesAtivos === 0 &&
    packages.data.pacotesFinalizados === 0 &&
    packages.data.pacotesVencidos === 0 &&
    packages.data.receitaGerada === 0;

  return (
    <PageSection
      className="mt-10"
      title="Fidelidade e pacotes"
      description="Indicadores atuais da estratégia de recorrência da empresa."
    >
      <div className="grid min-w-0 gap-grid lg:grid-cols-2">
        <DashboardDataPanel
          title="Programa de fidelidade"
          description="Pontos, benefícios e clientes participantes."
          emptyMessage="O programa de fidelidade ainda não possui movimentações."
          isPending={loyalty.isPending}
          isError={loyalty.isError}
          isFetching={loyalty.isFetching}
          isEmpty={loyaltyEmpty}
          onRetry={loyalty.onRetry}
        >
          {loyalty.data && (
            <>
              <MetricsGrid
                items={[
                  {
                    label:
                      "Clientes com pontos",
                    value:
                      formatInteger(
                        loyalty.data
                          .clientesComPontos,
                      ),
                  },
                  {
                    label:
                      "Pontos distribuídos",
                    value:
                      formatInteger(
                        loyalty.data
                          .pontosDistribuidos,
                      ),
                  },
                  {
                    label:
                      "Pontos resgatados",
                    value:
                      formatInteger(
                        loyalty.data
                          .pontosResgatados,
                      ),
                  },
                  {
                    label:
                      "Benefícios liberados",
                    value:
                      formatInteger(
                        loyalty.data
                          .beneficiosLiberados,
                      ),
                  },
                ]}
              />

              {loyalty.data.topClientes
                .length > 0 && (
                <div className="mt-7">
                  <h4 className="text-label font-semibold text-text-secondary">
                    Clientes com mais pontos
                  </h4>

                  <ol className="mt-3 space-y-2">
                    {loyalty.data.topClientes
                      .slice(0, 5)
                      .map((client) => (
                        <li
                          key={`${client.ranking}-${client.nome}`}
                          className="flex items-center justify-between gap-3 rounded-medium border border-border-subtle bg-surface-subtle p-3"
                        >
                          <div className="min-w-0">
                            <p className="truncate text-body-small font-semibold text-text-primary">
                              {client.ranking}.{" "}
                              {client.nome}
                            </p>
                          </div>

                          <p className="shrink-0 text-caption font-semibold text-text-secondary">
                            {formatInteger(
                              client.pontos,
                            )}{" "}
                            pontos
                          </p>
                        </li>
                      ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </DashboardDataPanel>

        <DashboardDataPanel
          title="Pacotes"
          description="Vendas, utilização e receita relacionada."
          emptyMessage="Nenhum pacote possui movimentação registrada."
          isPending={packages.isPending}
          isError={packages.isError}
          isFetching={packages.isFetching}
          isEmpty={packagesEmpty}
          onRetry={packages.onRetry}
        >
          {packages.data && (
            <MetricsGrid
              items={[
                {
                  label:
                    "Pacotes vendidos",
                  value:
                    formatInteger(
                      packages.data
                        .pacotesVendidos,
                    ),
                },
                {
                  label:
                    "Pacotes ativos",
                  value:
                    formatInteger(
                      packages.data
                        .pacotesAtivos,
                    ),
                },
                {
                  label:
                    "Finalizados",
                  value:
                    formatInteger(
                      packages.data
                        .pacotesFinalizados,
                    ),
                },
                {
                  label:
                    "Vencidos",
                  value:
                    formatInteger(
                      packages.data
                        .pacotesVencidos,
                    ),
                },
                {
                  label:
                    "Receita relacionada",
                  value:
                    formatCurrency(
                      packages.data
                        .receitaGerada,
                    ),
                },
              ]}
            />
          )}
        </DashboardDataPanel>
      </div>
    </PageSection>
  );
}

type OperationalOverviewProps = {
  whatsapp: DashboardPanelState<WhatsappAnalytics>;
  notifications: DashboardPanelState<NotificationsAnalytics>;
  events: DashboardPanelState<EventsAnalytics>;
};

export function OperationalOverview({
  whatsapp,
  notifications,
  events,
}: OperationalOverviewProps) {
  const whatsappEmpty =
    whatsapp.data !== undefined &&
    whatsapp.data.mensagensCriadas === 0 &&
    whatsapp.data.mensagensSimuladas === 0 &&
    whatsapp.data.mensagensEnviadas === 0 &&
    whatsapp.data.campanhasCriadas === 0 &&
    whatsapp.data.templatesAtivos === 0;

  const notificationsEmpty =
    notifications.data !== undefined &&
    notifications.data.totalNotificacoes === 0;

  const eventsEmpty =
    events.data !== undefined &&
    events.data.totalEventos === 0;

  const eventsByType =
    events.data
      ? buildDistributionRanking(
          events.data.porTipo,
        )
      : [];

  const eventsByModule =
    events.data
      ? buildDistributionRanking(
          events.data.porModulo,
        )
      : [];

  return (
    <PageSection
      className="mt-10"
      title="Engajamento e atividade operacional"
      description="Comunicação, notificações e eventos registrados no período."
    >
      <div className="grid min-w-0 gap-grid md:grid-cols-2 xl:grid-cols-3">
        <DashboardDataPanel
          title="WhatsApp"
          description="Atividade registrada pelo backend."
          emptyMessage="Nenhuma atividade de WhatsApp foi registrada no período."
          isPending={whatsapp.isPending}
          isError={whatsapp.isError}
          isFetching={whatsapp.isFetching}
          isEmpty={whatsappEmpty}
          onRetry={whatsapp.onRetry}
        >
          {whatsapp.data && (
            <>
              <MetricsGrid
                items={[
                  {
                    label:
                      "Mensagens criadas",
                    value:
                      formatInteger(
                        whatsapp.data
                          .mensagensCriadas,
                      ),
                  },
                  {
                    label:
                      "Mensagens simuladas",
                    value:
                      formatInteger(
                        whatsapp.data
                          .mensagensSimuladas,
                      ),
                  },
                  {
                    label:
                      "Mensagens enviadas",
                    value:
                      formatInteger(
                        whatsapp.data
                          .mensagensEnviadas,
                      ),
                  },
                  {
                    label:
                      "Campanhas criadas",
                    value:
                      formatInteger(
                        whatsapp.data
                          .campanhasCriadas,
                      ),
                  },
                  {
                    label:
                      "Templates ativos",
                    value:
                      formatInteger(
                        whatsapp.data
                          .templatesAtivos,
                      ),
                  },
                ]}
              />

              <p
                role="note"
                className="mt-6 rounded-medium border border-border-subtle bg-surface-subtle p-3 text-caption leading-5 text-text-muted"
              >
                Estes números refletem registros e simulações do backend; não confirmam uma conexão ativa com o WhatsApp.
              </p>
            </>
          )}
        </DashboardDataPanel>

        <DashboardDataPanel
          title="Notificações"
          description="Leitura e arquivamento no período."
          emptyMessage="Nenhuma notificação foi registrada no período."
          isPending={notifications.isPending}
          isError={notifications.isError}
          isFetching={notifications.isFetching}
          isEmpty={notificationsEmpty}
          onRetry={notifications.onRetry}
        >
          {notifications.data && (
            <MetricsGrid
              items={[
                {
                  label:
                    "Total",
                  value:
                    formatInteger(
                      notifications.data
                        .totalNotificacoes,
                    ),
                },
                {
                  label:
                    "Lidas",
                  value:
                    formatInteger(
                      notifications.data
                        .lidas,
                    ),
                },
                {
                  label:
                    "Não lidas",
                  value:
                    formatInteger(
                      notifications.data
                        .naoLidas,
                    ),
                },
                {
                  label:
                    "Arquivadas",
                  value:
                    formatInteger(
                      notifications.data
                        .arquivadas,
                    ),
                },
              ]}
            />
          )}
        </DashboardDataPanel>

        <DashboardDataPanel
          title="Eventos"
          description="Distribuição dos eventos analíticos."
          emptyMessage="Nenhum evento foi registrado no período."
          isPending={events.isPending}
          isError={events.isError}
          isFetching={events.isFetching}
          isEmpty={eventsEmpty}
          onRetry={events.onRetry}
        >
          {events.data && (
            <>
              <MetricsGrid
                items={[
                  {
                    label:
                      "Total de eventos",
                    value:
                      formatInteger(
                        events.data
                          .totalEventos,
                      ),
                  },
                ]}
              />

              {eventsByType.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-label font-semibold text-text-secondary">
                    Principais tipos
                  </h4>

                  <ol className="mt-3 space-y-2">
                    {eventsByType.map(
                      (item) => (
                        <li
                          key={item.label}
                          className="flex items-center justify-between gap-3 text-caption"
                        >
                          <span className="truncate text-text-muted">
                            {item.label}
                          </span>

                          <span className="font-semibold text-text-primary">
                            {formatInteger(
                              item.total,
                            )}
                          </span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              )}

              {eventsByModule.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-label font-semibold text-text-secondary">
                    Principais módulos
                  </h4>

                  <ol className="mt-3 space-y-2">
                    {eventsByModule.map(
                      (item) => (
                        <li
                          key={item.label}
                          className="flex items-center justify-between gap-3 text-caption"
                        >
                          <span className="truncate text-text-muted">
                            {item.label}
                          </span>

                          <span className="font-semibold text-text-primary">
                            {formatInteger(
                              item.total,
                            )}
                          </span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>
              )}
            </>
          )}
        </DashboardDataPanel>
      </div>
    </PageSection>
  );
}
