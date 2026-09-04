"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { portalAuthApi } from "../auth/portal-auth-api";
import { usePortalAuth } from "../auth/portal-auth-context";
import { clearPortalPrivateQueries } from "../auth/portal-auth-cache";
import { PortalBranding } from "../components/portal-branding";
import { PortalPageContainer } from "../components/portal-page-container";

type PortalLogoutAction = "current" | "all";

export function PortalAuthenticatedSurface() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { clearSession, logoutSession } = usePortalAuth();

  const activeActionRef = useRef<PortalLogoutAction | null>(null);
  const [activeAction, setActiveAction] =
    useState<PortalLogoutAction | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleLogout(action: PortalLogoutAction) {
    if (activeActionRef.current) {
      return;
    }

    activeActionRef.current = action;
    setActiveAction(action);
    setError(null);

    try {
      if (action === "all") {
        await portalAuthApi.logoutAll();
      } else {
        await logoutSession();
      }
    } catch {
      setError(
        action === "all"
          ? "Não foi possível confirmar o encerramento das sessões."
          : "Não foi possível confirmar o logout.",
      );
    } finally {
      clearPortalPrivateQueries(queryClient);
      clearSession();
      router.replace("/portal");
      activeActionRef.current = null;
      setActiveAction(null);
    }
  }

  return (
    <PortalPageContainer>
      <section
        aria-labelledby="portal-authenticated-heading"
        className="space-y-6"
        data-testid="portal-authenticated-surface"
      >
        <PortalBranding />

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Portal protegido
          </p>
          <h1
            className="text-3xl font-semibold tracking-tight text-foreground"
            id="portal-authenticated-heading"
          >
            Acesso autenticado
          </h1>
          <p className="text-base leading-7 text-muted-foreground">
            Sua sessão foi validada. Os recursos do Portal serão disponibilizados
            nas próximas etapas do produto.
          </p>
        </div>

        {error ? (
          <p
            aria-live="assertive"
            className="text-sm font-medium text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2">
          <button
            aria-busy={activeAction === "current"}
            className="inline-flex min-h-11 items-center justify-center rounded-lg border border-border px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            disabled={activeAction !== null}
            onClick={() => void handleLogout("current")}
            type="button"
          >
            {activeAction === "current" ? "Saindo..." : "Sair"}
          </button>

          <button
            aria-busy={activeAction === "all"}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={activeAction !== null}
            onClick={() => void handleLogout("all")}
            type="button"
          >
            {activeAction === "all"
              ? "Encerrando sessões..."
              : "Encerrar todas as sessões"}
          </button>
        </div>
      </section>
    </PortalPageContainer>
  );
}
