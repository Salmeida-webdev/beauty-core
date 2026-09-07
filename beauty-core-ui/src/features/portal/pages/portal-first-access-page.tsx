"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { portalAuthApi } from "../auth/portal-auth-api";
import { usePortalAuth } from "../auth/portal-auth-context";
import {
  PORTAL_FIRST_ACCESS_PATH,
  sanitizePortalFirstAccessReturnTo,
} from "../auth/portal-auth-routing";
import { PortalFirstAccessExperience } from "./portal-first-access-experience";

export function PortalFirstAccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { status } = usePortalAuth();
  const returnTo = sanitizePortalFirstAccessReturnTo(
    searchParams.get("returnTo"),
  );
  const [checking, setChecking] = useState(true);
  const [canRenderExperience, setCanRenderExperience] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    if (status === "unknown" || status === "restoring") {
      queueMicrotask(() => {
        if (!active) {
          return;
        }

        setChecking(true);
        setCanRenderExperience(false);
      });

      return () => {
        active = false;
      };
    }

    if (status === "anonymous" || status === "denied") {
      queueMicrotask(() => {
        if (!active) {
          return;
        }

        setChecking(true);
        setCanRenderExperience(false);
      });

      router.replace(
        `/portal?returnTo=${encodeURIComponent(PORTAL_FIRST_ACCESS_PATH)}`,
      );

      return () => {
        active = false;
      };
    }

    queueMicrotask(() => {
      if (!active) {
        return;
      }

      setChecking(true);
      setCanRenderExperience(false);
      setError(null);
    });

    void portalAuthApi
      .me()
      .then((profile) => {
        if (!active) {
          return;
        }

        if (!profile?.primeiroAcesso) {
          router.replace(returnTo);
          return;
        }

        setCanRenderExperience(true);
        setChecking(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setError(
          "Não foi possível verificar o acesso neste momento.",
        );
        setChecking(false);
      });

    return () => {
      active = false;
    };
  }, [returnTo, router, status]);

  const completeFirstAccess = useCallback(async () => {
    await portalAuthApi.acceptTerms({ aceitouTermos: true });
    router.replace(returnTo);
  }, [returnTo, router]);

  if (checking) {
    return (
      <p aria-live="polite" className="py-10 text-center text-sm text-muted-foreground" role="status">
        Validando o primeiro acesso...
      </p>
    );
  }

  if (error) {
    return (
      <p aria-live="assertive" className="py-10 text-center text-sm text-destructive" role="alert">
        {error}
      </p>
    );
  }

  if (!canRenderExperience) {
    return null;
  }

  return <PortalFirstAccessExperience onComplete={completeFirstAccess} />;
}
