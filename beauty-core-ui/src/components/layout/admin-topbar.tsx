"use client";

import {
  Building2,
  CircleUserRound,
  Menu,
  ShieldCheck,
} from "lucide-react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import type { AdminRole } from "@/constants/roles";
import { useTenant } from "@/providers/tenant-provider";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";

type AdminTopbarProps = {
  role: AdminRole;
};

const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Administrador",
  GERENTE: "Gerente",
  RECEPCAO: "Recepção",
  PROFISSIONAL: "Profissional",
};

export function AdminTopbar({ role }: AdminTopbarProps) {
  const { tenant } = useTenant();
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);
  const setMobileSidebarOpen = useUiStore(
    (state) => state.setMobileSidebarOpen,
  );

  const hasAuthenticatedUser =
    status === "authenticated" && user !== null;

  const displayedRole = hasAuthenticatedUser
    ? user.role
    : role;

  const displayName = hasAuthenticatedUser
    ? user.nome ?? user.email
    : "Modo técnico";

  const secondaryText = (() => {
    if (hasAuthenticatedUser) {
      return user.email;
    }

    if (status === "restoring") {
      return "Restaurando sessão";
    }

    if (status === "idle") {
      return "Inicializando sessão";
    }

    return "Sessão não autenticada";
  })();

  return (
    <header
      aria-label="Barra superior administrativa"
      className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="flex w-full min-w-0 items-center gap-3 px-4 sm:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Abrir navegação"
          className="lg:hidden"
          onClick={() => {
            setMobileSidebarOpen(true);
          }}
        >
          <Menu aria-hidden="true" />
        </Button>

        <div className="hidden min-w-0 items-center gap-2 sm:flex">
          <Building2
            aria-hidden="true"
            className="size-4 shrink-0 text-text-muted"
          />
          <span className="truncate text-sm font-medium text-text-secondary">
            {tenant.name}
          </span>
        </div>

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-border-subtle bg-surface-subtle px-3 py-1.5 lg:flex">
            <ShieldCheck
              aria-hidden="true"
              className="size-3.5 text-text-muted"
            />
            <span className="text-caption font-semibold text-text-secondary">
              {ROLE_LABELS[displayedRole]}
            </span>
          </div>

          <ThemeToggle />

          <div
            aria-label="Contexto da sessão administrativa"
            className="flex min-w-0 items-center gap-2 border-l border-border-subtle pl-3"
          >
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle">
              <CircleUserRound
                aria-hidden="true"
                className="size-4 text-text-secondary"
              />
            </div>

            <div className="hidden min-w-0 sm:block">
              <p className="max-w-48 truncate text-sm font-semibold text-text-primary">
                {displayName}
              </p>
              <p className="max-w-48 truncate text-caption text-text-muted">
                {secondaryText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
