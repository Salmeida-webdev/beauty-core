"use client";

import { useTenant } from "@/providers/tenant-provider";
import { PortalOtpRequestForm as OtpRequestComponent } from "@/features/portal/auth/portal-otp-request";
import { usePortalAuth } from "@/features/portal/auth/portal-auth-context";
import { PortalAuthRouteOrchestrator } from "@/features/portal/auth/portal-auth-route-orchestrator";
import { PortalAssetImage } from "@/features/portal/components/portal-asset-image";
import { portalAssets } from "@/features/portal/assets/portal-assets";
import {
  PortalAccessUnavailableState,
  PortalLoadingState,
} from "@/features/portal/states/portal-state-views";
import { PortalAuthenticatedSurface } from "@/features/portal/pages/portal-authenticated-surface";

function PortalOtpEntry() {
  const { tenant } = useTenant();

  return (
    <section
      aria-labelledby="portal-otp-entry-heading"
      className="mx-auto flex min-h-[calc(100dvh-9rem)] w-full max-w-6xl items-center pb-[calc(1rem+env(safe-area-inset-bottom))]"
      data-portal-auth-surface="otp"
    >
      <div className="grid w-full min-w-0 overflow-hidden rounded-3xl border border-border/80 bg-card shadow-sm lg:grid-cols-2">
        <div className="min-w-0 p-5 sm:p-8 lg:p-12">
          <div className="space-y-3">
            <p className="text-sm font-medium text-primary">
              Portal do Cliente
            </p>

            <h1
              id="portal-otp-entry-heading"
              className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Sua experiência personalizada começa aqui
            </h1>

            <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Informe seu telefone com DDD para receber um código de acesso.
            </p>

            <p className="text-xs leading-5 text-muted-foreground">
              Acesso seguro à área de {tenant.name}.
            </p>
          </div>

          <div className="mt-6 min-w-0">
            <OtpRequestComponent />
          </div>
        </div>

        <aside
          aria-label="Ilustração de acesso do Portal"
          className="relative hidden min-h-[28rem] min-w-0 overflow-hidden bg-muted/40 lg:block"
        >
          <PortalAssetImage
            alt=""
            asset={portalAssets.auth.otpIllustration}
            className="h-full w-full object-cover object-center"
            decorative
            height={1200}
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            width={1800}
          />
        </aside>
      </div>
    </section>
  );
}

function PortalAuthRestoringState() {
  return (
    <div
      aria-live="polite"
      className="w-full"
      role="status"
    >
      <PortalLoadingState
        description="Aguarde enquanto confirmamos sua sessão."
        title="Verificando seu acesso..."
      />
    </div>
  );
}

function PortalAuthDeniedState() {
  return (
    <div
      aria-live="assertive"
      className="w-full"
      role="alert"
    >
      <PortalAccessUnavailableState
        description="Não foi possível verificar o acesso neste momento."
        title="Acesso indisponível"
      />
    </div>
  );
}

export function PortalOtpRequestPage() {
  const { status } = usePortalAuth();

  if (status === "anonymous") {
    return <PortalOtpEntry />;
  }

  if (status === "unknown" || status === "restoring") {
    return <PortalAuthRestoringState />;
  }

  if (status === "denied") {
    return <PortalAuthDeniedState />;
  }

  return (
    <PortalAuthRouteOrchestrator>
      <PortalAuthenticatedSurface />
    </PortalAuthRouteOrchestrator>
  );
}