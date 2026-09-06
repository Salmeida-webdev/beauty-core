"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  PortalAuthRouteOrchestrator,
} from "./portal-auth-route-orchestrator";
import { usePortalAuth } from "./portal-auth-context";
import { sanitizePortalReturnTo } from "../security/portal-safe-return-to";
import {
  PortalAccessUnavailableState,
  PortalLoadingState,
} from "../states/portal-state-views";

type PortalPrivateRouteProps = {
  children: ReactNode;
};

const PRIVATE_ROUTE_RETURN_PREFIX = "/portal?returnTo=";

export function PortalPrivateRoute({
  children,
}: PortalPrivateRouteProps) {
  const { status } = usePortalAuth();
  const pathname = usePathname() ?? "/portal";
  const router = useRouter();
  const safeReturnTo = sanitizePortalReturnTo(pathname);

  useEffect(() => {
    if (status !== "anonymous" && status !== "denied") {
      return;
    }

    router.replace(
      PRIVATE_ROUTE_RETURN_PREFIX + encodeURIComponent(safeReturnTo),
    );
  }, [router, safeReturnTo, status]);

  if (status === "unknown" || status === "restoring") {
    return (
      <div aria-live="polite" className="w-full" role="status">
        <PortalLoadingState
          description="Aguarde enquanto confirmamos sua sessao."
          title="Verificando seu acesso..."
        />
      </div>
    );
  }

  if (status === "anonymous" || status === "denied") {
    return (
      <div aria-live="assertive" className="w-full" role="alert">
        <PortalAccessUnavailableState
          description="Entre no Portal do cliente para acessar este recurso."
          title="Acesso ao Portal necessario"
        />
      </div>
    );
  }

  return (
    <PortalAuthRouteOrchestrator>
      {children}
    </PortalAuthRouteOrchestrator>
  );
}