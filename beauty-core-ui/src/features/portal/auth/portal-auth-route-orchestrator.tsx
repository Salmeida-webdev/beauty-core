"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { usePortalAuth } from "./portal-auth-context";
import { portalAuthApi } from "./portal-auth-api";
import { hasPortalSession } from "./portal-auth-session";
import {
  resolvePortalAuthRoute,
} from "./portal-auth-routing";

type PortalAuthRouteOrchestratorProps = {
  children: ReactNode;
  knownFirstAccess?: boolean | null;
};

export function PortalAuthRouteOrchestrator({
  children,
  knownFirstAccess = null,
}: PortalAuthRouteOrchestratorProps) {
  const { status } = usePortalAuth();

  if (
    (status === "unknown" || status === "restoring") &&
    hasPortalSession()
  ) {
    return (
      <div
        aria-busy="true"
        className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
        role="status"
      >
        Restaurando o acesso do cliente...
      </div>
    );
  }

  if (status !== "authenticated") {
    return <>{children}</>;
  }

  return (
    <PortalAuthenticatedRouteController
      knownFirstAccess={knownFirstAccess}
    >
      {children}
    </PortalAuthenticatedRouteController>
  );
}

type PortalAuthenticatedRouteControllerProps = {
  children: ReactNode;
  knownFirstAccess: boolean | null;
};

function PortalAuthenticatedRouteController({
  children,
  knownFirstAccess,
}: PortalAuthenticatedRouteControllerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [checking, setChecking] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const evaluateRoute = (primeiroAcesso: boolean) => {
      if (cancelled) {
        return;
      }

      const target = resolvePortalAuthRoute({
        currentPath: pathname,
        primeiroAcesso,
        returnTo: searchParams.get("returnTo"),
      });

      if (target) {
        router.replace(target);
        return;
      }

      setChecking(false);
    };

    if (typeof knownFirstAccess === "boolean") {
      evaluateRoute(knownFirstAccess);

      return () => {
        cancelled = true;
      };
    }

    queueMicrotask(() => {
      queueMicrotask(() => {
        setChecking(true);
        setError(null);
      });
    });

    void portalAuthApi
      .me()
      .then((profile) => {
        evaluateRoute(Boolean(profile.primeiroAcesso));
      })
      .catch(() => {
        if (!cancelled) {
          setChecking(false);
          setError(
            "Não foi possível verificar o requisito de acesso agora.",
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    knownFirstAccess,
    pathname,
    router,
    searchParams,
  ]);

  if (checking) {
    return (
      <div
        aria-busy="true"
        className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
        role="status"
      >
        Verificando o requisito de acesso...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex min-h-40 items-center justify-center text-sm text-destructive"
        role="alert"
      >
        {error}
      </div>
    );
  }

  return <>{children}</>;
}
