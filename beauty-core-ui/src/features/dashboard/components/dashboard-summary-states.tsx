import Image from "next/image";
import {
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

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
import {
  getDashboardErrorReference,
} from "@/features/dashboard/utils/dashboard-error-reference";
import type {
  AdminRole,
} from "@/constants/roles";

export function DashboardKpiSkeletonGrid() {
  return (
    <section
      className="mt-8"
      aria-label="Carregando indicadores principais"
      aria-busy="true"
    >
      <Skeleton className="h-7 w-56" />
      <Skeleton className="mt-2 h-4 w-full max-w-xl" />

      <div className="mt-6 grid grid-cols-1 gap-grid sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <Card
            key={index}
            className="gap-0 py-0"
          >
            <CardContent className="p-card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-4 h-9 w-36" />
                </div>

                <Skeleton className="size-10 rounded-medium" />
              </div>

              <Skeleton className="mt-4 h-3.5 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

type DashboardSummaryErrorProps = {
  error?: unknown;
  isRetrying: boolean;
  onRetry: () => void | Promise<void>;
};

export function DashboardSummaryError({
  error,
  isRetrying,
  onRetry,
}: DashboardSummaryErrorProps) {
  const supportReference =
    getDashboardErrorReference(error);

  return (
    <Card
      className="mt-8 border-destructive/30"
      role="alert"
      data-testid="dashboard-summary-error"
    >
      <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-heading-4 font-semibold text-text-primary">
            Não foi possível carregar os indicadores
          </h2>

          <p className="mt-2 max-w-2xl text-body-small text-text-muted">
            As outras áreas do Dashboard continuarão independentes. Tente carregar novamente esta seção.
          </p>

          {supportReference && (
            <p className="mt-2 text-caption text-text-muted">
              Código de suporte:{" "}
              <code className="font-mono text-text-secondary">
                {supportReference}
              </code>
            </p>
          )}
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isRetrying}
          onClick={() => {
            void onRetry();
          }}
        >
          <RefreshCw
            aria-hidden="true"
            className={
              isRetrying
                ? "animate-spin motion-reduce:animate-none"
                : undefined
            }
          />

          {isRetrying
            ? "Tentando novamente"
            : "Tentar novamente"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function DashboardSummaryEmpty() {
  return (
    <Card
      className="mt-8 overflow-hidden"
      data-testid="dashboard-empty-state"
    >
      <CardContent className="grid items-center gap-6 p-6 md:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <h2 className="text-heading-3 font-semibold text-text-primary">
            Ainda não há dados neste período
          </h2>

          <p className="mt-2 max-w-2xl text-body-small leading-6 text-text-muted">
            Altere o período selecionado para consultar outro intervalo. Valores iguais a zero foram recebidos corretamente e não representam uma falha.
          </p>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-72">
          <Image
            src="/images/empty-states/beauty-core-dashboard-empty.webp"
            alt="Painel do Beauty Core aguardando dados da operação"
            fill
            sizes="(max-width: 768px) 80vw, 288px"
            className="object-contain"
          />
        </div>
      </CardContent>
    </Card>
  );
}

type DashboardAccessStateProps = {
  role: AdminRole;
};

export function DashboardAccessState({
  role,
}: DashboardAccessStateProps) {
  const isGlobalAdministrator =
    role === "SUPER_ADMIN";

  return (
    <Card
      className="mt-8"
      data-testid="dashboard-access-state"
    >
      <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-medium bg-surface-subtle">
          <ShieldAlert
            aria-hidden="true"
            className="size-5 text-text-secondary"
          />
        </div>

        <div>
          <h2 className="text-heading-4 font-semibold text-text-primary">
            {isGlobalAdministrator
              ? "Selecione um contexto empresarial"
              : "Indicadores executivos restritos"}
          </h2>

          <p className="mt-2 max-w-2xl text-body-small leading-6 text-text-muted">
            {isGlobalAdministrator
              ? "O perfil global não possui uma empresa ativa compatível com os endpoints atuais de Analytics."
              : "Seu perfil não possui autorização para consultar os indicadores executivos desta empresa."}
          </p>

          <p className="mt-3 text-caption text-text-muted">
            Nenhuma consulta de Analytics foi enviada.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
