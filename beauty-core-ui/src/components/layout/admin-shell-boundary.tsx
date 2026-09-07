"use client";

import {
  useEffect,
  type ReactNode,
} from "react";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import { AdminAppShell } from "@/components/layout/admin-app-shell";
import {
  consumePendingAdminIntentionalLogout,
  consumePendingAdminLoginReason,
} from "@/features/auth/navigation/admin-login-navigation-state";
import {
  buildAdminLoginHref,
  normalizeAdminReturnTo,
} from "@/features/auth/navigation/admin-return-to";
import { useAuthStore } from "@/stores/auth-store";

type AdminShellBoundaryProps = {
  children: ReactNode;
};

const TECHNICAL_PREVIEW_ROUTES =
  new Set([
    "/design-system",
  ]);

export function AdminShellBoundary({
  children,
}: AdminShellBoundaryProps) {
  const pathname = usePathname();
  const router = useRouter();

  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const isTechnicalPreview =
    TECHNICAL_PREVIEW_ROUTES.has(
      pathname,
    );

  useEffect(() => {
    if (
      status !== "unauthenticated"
    ) {
      return;
    }

    const intentionalLogout =
      consumePendingAdminIntentionalLogout();

    if (intentionalLogout) {
      router.replace("/login");

      return;
    }

    if (isTechnicalPreview) {
      return;
    }

    const search =
      typeof window !== "undefined"
        ? window.location.search
        : "";

    const hash =
      typeof window !== "undefined"
        ? window.location.hash
        : "";

    const returnTo =
      normalizeAdminReturnTo(
        `${pathname}${search}${hash}`,
      );

    const reason =
      consumePendingAdminLoginReason();

    router.replace(
      buildAdminLoginHref(
        returnTo,
        reason,
      ),
    );
  }, [
    isTechnicalPreview,
    pathname,
    router,
    status,
  ]);

  if (
    status === "authenticated" &&
    user
  ) {
    return (
      <AdminAppShell role={user.role}>
        {children}
      </AdminAppShell>
    );
  }

  if (isTechnicalPreview) {
    return (
      <AdminAppShell
        role="SUPER_ADMIN"
        technicalPreview
      >
        {children}
      </AdminAppShell>
    );
  }

  if (
    status === "idle" ||
    status === "restoring"
  ) {
    return (
      <main
        className="flex min-h-dvh items-center justify-center bg-background p-6"
        role="status"
        aria-live="polite"
      >
        <div className="max-w-md rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-card">
          <p className="text-sm font-semibold text-text-primary">
            Restaurando sessão administrativa
          </p>

          <p className="mt-2 text-body-small text-text-muted">
            Validando o contexto de acesso ao painel.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="flex min-h-dvh items-center justify-center bg-background p-6"
      role="status"
      aria-live="polite"
    >
      <div className="max-w-md rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-card">
        <p className="text-sm font-semibold text-text-primary">
          Redirecionando para o acesso administrativo
        </p>

        <p className="mt-2 text-body-small text-text-muted">
          Aguarde enquanto direcionamos você para o login seguro.
        </p>
      </div>
    </main>
  );
}
