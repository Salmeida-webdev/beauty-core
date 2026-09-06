"use client";

import type { ReactNode } from "react";

import { usePortalAuth } from "../auth/portal-auth-context";
import { normalizePortalResourceError } from "../errors/portal-resource-errors";
import {
  isPortalDashboardEmpty,
  mapPortalDashboardToViewModel,
  type PortalDashboardViewModel,
} from "../query/portal-dashboard-data";
import { usePortalDashboardQuery } from "../query/portal-dashboard-query";
import {
  PortalAccessUnavailableState,
  PortalEmptyState,
  PortalErrorState,
  PortalLoadingState,
  PortalOfflineState,
} from "../states/portal-state-views";

type PortalDashboardDataBoundaryProps = {
  children: (dashboard: PortalDashboardViewModel) => ReactNode;
};

export function PortalDashboardDataBoundary({
  children,
}: PortalDashboardDataBoundaryProps) {
  const { status } = usePortalAuth();
  const query = usePortalDashboardQuery();

  if (status === "unknown" || status === "restoring") {
    return (
      <div aria-live="polite" className="w-full" role="status">
        <PortalLoadingState
          description="Aguarde enquanto confirmamos sua sessao."
          title="Carregando dashboard..."
        />
      </div>
    );
  }

  if (status === "anonymous" || status === "denied") {
    return (
      <div aria-live="assertive" className="w-full" role="alert">
        <PortalAccessUnavailableState
          description="Entre no Portal do cliente para acessar seu dashboard."
          title="Acesso ao Portal indisponivel"
        />
      </div>
    );
  }

  if (query.isPending) {
    return (
      <div aria-live="polite" className="w-full" role="status">
        <PortalLoadingState
          description="Aguarde enquanto seus dados sao carregados."
          title="Carregando dashboard..."
        />
      </div>
    );
  }

  if (query.isError) {
    const error = normalizePortalResourceError(query.error);

    if (
      error.kind === "unauthorized" ||
      error.kind === "forbidden"
    ) {
      return (
        <div aria-live="assertive" className="w-full" role="alert">
          <PortalAccessUnavailableState
            description="Sua sessao nao permite carregar este dashboard."
            title="Acesso ao Portal indisponivel"
          />
        </div>
      );
    }

    if (error.kind === "network") {
      return (
        <div aria-live="assertive" className="w-full" role="alert">
          <PortalOfflineState
            action={{
              label: "Tentar novamente",
              onClick: () => {
                void query.refetch();
              },
            }}
            description="Verifique sua conexao e tente novamente."
            title="Sem conexao com o Portal"
          />
        </div>
      );
    }

    return (
      <div aria-live="assertive" className="w-full" role="alert">
        <PortalErrorState
          action={{
            label: "Tentar novamente",
            onClick: () => {
              void query.refetch();
            },
          }}
          description={error.message}
          title="Nao foi possivel carregar o dashboard"
        />
      </div>
    );
  }

  if (!query.data) {
    return (
      <div aria-live="polite" className="w-full" role="status">
        <PortalLoadingState
          description="Aguarde enquanto seus dados sao carregados."
          title="Carregando dashboard..."
        />
      </div>
    );
  }

  const dashboard = mapPortalDashboardToViewModel(query.data);

  if (isPortalDashboardEmpty(dashboard)) {
    return (
      <div className="w-full">
        <PortalEmptyState
          description="Quando houver atendimentos, eles aparecerao aqui."
          title="Nenhum atendimento encontrado"
        />
      </div>
    );
  }

  return <>{children(dashboard)}</>;
}