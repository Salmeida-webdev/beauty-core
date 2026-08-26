"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { AdminAppShell } from "@/components/layout/admin-app-shell";
import { useAuthStore } from "@/stores/auth-store";

type AdminShellBoundaryProps = {
  children: ReactNode;
};

const TECHNICAL_PREVIEW_ROUTES = new Set([
  "/design-system",
]);

export function AdminShellBoundary({
  children,
}: AdminShellBoundaryProps) {
  const pathname = usePathname();
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  if (status === "authenticated" && user) {
    return (
      <AdminAppShell role={user.role}>
        {children}
      </AdminAppShell>
    );
  }

  if (TECHNICAL_PREVIEW_ROUTES.has(pathname)) {
    return (
      <AdminAppShell
        role="SUPER_ADMIN"
        technicalPreview
      >
        {children}
      </AdminAppShell>
    );
  }

  if (status === "idle" || status === "restoring") {
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
      role="alert"
    >
      <div className="max-w-md rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-card">
        <p className="text-sm font-semibold text-text-primary">
          Autenticação administrativa necessária
        </p>
        <p className="mt-2 text-body-small text-text-muted">
          O fluxo completo de autenticação será conectado na fase
          específica de autenticação do frontend.
        </p>
      </div>
    </main>
  );
}