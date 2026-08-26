"use client";

import type { ReactNode } from "react";

import {
  AdminMobileSidebar,
  AdminSidebar,
} from "@/components/layout/admin-sidebar";
import { AdminTopbar } from "@/components/layout/admin-topbar";
import type { AdminRole } from "@/constants/roles";

type AdminAppShellProps = {
  children: ReactNode;
  role: AdminRole;
  technicalPreview?: boolean;
};

export function AdminAppShell({
  children,
  role,
  technicalPreview = false,
}: AdminAppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[100] rounded-medium bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-focus focus:not-sr-only"
      >
        Pular para o conteúdo
      </a>

      <div className="flex min-h-dvh">
        <AdminSidebar role={role} />
        <AdminMobileSidebar role={role} />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminTopbar role={role} />

          {technicalPreview && (
            <div
              role="status"
              className="border-b border-border-subtle bg-info/10 px-4 py-2 text-caption text-info-foreground sm:px-6"
            >
              Demonstração técnica do Design System. Nenhuma sessão ou
              permissão está sendo simulada no auth-store.
            </div>
          )}

          <main
            id="main-content"
            className="min-w-0 flex-1 bg-surface"
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}