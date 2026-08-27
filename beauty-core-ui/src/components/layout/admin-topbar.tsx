"use client";

import {
  Building2,
  Menu,
  ShieldCheck,
} from "lucide-react";

import {
  AdminUserMenu,
} from "@/features/auth/components/admin-user-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";
import type { AdminRole } from "@/constants/roles";
import {
  getAdminRoleLabel,
} from "@/features/auth/presentation/admin-role-label";
import { useTenant } from "@/providers/tenant-provider";
import { useAuthStore } from "@/stores/auth-store";
import { useUiStore } from "@/stores/ui-store";

type AdminTopbarProps = {
  role: AdminRole;
};

export function AdminTopbar({
  role,
}: AdminTopbarProps) {
  const { tenant } = useTenant();

  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const setMobileSidebarOpen =
    useUiStore(
      (state) =>
        state.setMobileSidebarOpen,
    );

  const hasAuthenticatedUser =
    status === "authenticated" &&
    user !== null;

  const displayedRole =
    hasAuthenticatedUser
      ? user.role
      : role;

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
            setMobileSidebarOpen(
              true,
            );
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
              {getAdminRoleLabel(
                displayedRole,
              )}
            </span>
          </div>

          <ThemeToggle />

          <AdminUserMenu />
        </div>
      </div>
    </header>
  );
}
