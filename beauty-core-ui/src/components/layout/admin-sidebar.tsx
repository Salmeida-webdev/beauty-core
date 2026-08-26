"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getNavigationForRole,
  type NavigationItem,
} from "@/config/admin-navigation";
import type { AdminRole } from "@/constants/roles";
import { cn } from "@/lib/utils";
import { useTenant } from "@/providers/tenant-provider";
import { useUiStore } from "@/stores/ui-store";

type AdminSidebarProps = {
  role: AdminRole;
};

function isItemActive(
  pathname: string,
  href: string,
): boolean {
  return (
    pathname === href ||
    pathname.startsWith(`${href}/`)
  );
}

function getItemClasses(
  active: boolean,
  disabled: boolean,
): string {
  return cn(
    "group flex min-h-9 w-full items-center gap-3 rounded-medium px-3 text-sm font-medium transition-colors",
    "duration-[var(--motion-duration-fast)]",
    active
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
    disabled &&
      "cursor-not-allowed opacity-55 hover:bg-transparent hover:text-sidebar-muted",
  );
}

function SidebarItem({
  item,
  collapsed,
  pathname,
  onNavigate,
}: {
  item: NavigationItem;
  collapsed: boolean;
  pathname: string;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;
  const active = isItemActive(pathname, item.href);
  const disabled = item.state !== "available";

  const content = (
    <>
      <Icon
        aria-hidden="true"
        className="size-4 shrink-0"
      />

      {!collapsed && (
        <>
          <span className="min-w-0 flex-1 truncate text-left">
            {item.label}
          </span>

          {item.badge && (
            <span className="rounded-full border border-sidebar-border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wide text-sidebar-muted">
              {item.badge}
            </span>
          )}

          {disabled && !item.badge && (
            <span className="text-[0.625rem] font-semibold uppercase tracking-wide text-sidebar-muted">
              Dev
            </span>
          )}
        </>
      )}
    </>
  );

  const trigger = disabled ? (
    <div
      aria-disabled="true"
      className={getItemClasses(active, true)}
    >
      {content}
    </div>
  ) : (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={getItemClasses(active, false)}
      onClick={onNavigate}
    >
      {content}
    </Link>
  );

  if (!collapsed) {
    return trigger;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {item.label}
        {disabled ? " — em desenvolvimento" : ""}
      </TooltipContent>
    </Tooltip>
  );
}

export function AdminSidebar({ role }: AdminSidebarProps) {
  const pathname = usePathname();
  const { tenant } = useTenant();
  const sidebarOpen = useUiStore(
    (state) => state.sidebarOpen,
  );
  const toggleSidebar = useUiStore(
    (state) => state.toggleSidebar,
  );

  const navigation = getNavigationForRole(role);
  const collapsed = !sidebarOpen;

  return (
    <aside
      aria-label="Navegação administrativa"
      data-collapsed={collapsed}
      className={cn(
        "hidden h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:sticky lg:top-0 lg:flex",
        "transition-[width] duration-[var(--motion-duration-normal)]",
        collapsed ? "w-18" : "w-64",
      )}
    >
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-sidebar-border",
          collapsed
            ? "justify-center px-2"
            : "justify-between gap-3 px-4",
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-medium border border-sidebar-border bg-sidebar-accent shadow-subtle">
            <Building2
              aria-hidden="true"
              className="size-4"
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                {tenant.name}
              </p>
              <p className="truncate text-caption text-sidebar-muted">
                Beauty Core
              </p>
            </div>
          )}
        </div>

        {!collapsed && (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Recolher navegação"
            onClick={toggleSidebar}
          >
            <PanelLeftClose aria-hidden="true" />
          </Button>
        )}
      </div>

      {collapsed && (
        <div className="flex justify-center border-b border-sidebar-border py-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Expandir navegação"
                onClick={toggleSidebar}
              >
                <PanelLeftOpen aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              Expandir navegação
            </TooltipContent>
          </Tooltip>
        </div>
      )}

      <nav className="min-h-0 flex-1 overflow-y-auto px-2 py-4">
        <div className="space-y-5">
          {navigation.map((group) => (
            <section
              key={group.id}
              aria-label={group.label}
            >
              {!collapsed && (
                <h2 className="mb-2 px-3 text-overline font-semibold uppercase tracking-[0.14em] text-sidebar-muted">
                  {group.label}
                </h2>
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.id}
                    item={item}
                    collapsed={collapsed}
                    pathname={pathname}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </nav>

      <div
        className={cn(
          "shrink-0 border-t border-sidebar-border p-3",
          collapsed && "px-2",
        )}
      >
        {collapsed ? (
          <div
            className="mx-auto size-2 rounded-full bg-success"
            aria-label="Ambiente administrativo disponível"
          />
        ) : (
          <div className="rounded-medium bg-sidebar-accent px-3 py-2">
            <p className="text-caption font-semibold text-sidebar-foreground">
              Painel administrativo
            </p>
            <p className="mt-0.5 truncate text-caption text-sidebar-muted">
              Role: {role}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

export function AdminMobileSidebar({
  role,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const { tenant } = useTenant();
  const mobileSidebarOpen = useUiStore(
    (state) => state.mobileSidebarOpen,
  );
  const setMobileSidebarOpen = useUiStore(
    (state) => state.setMobileSidebarOpen,
  );
  const closeMobileSidebar = useUiStore(
    (state) => state.closeMobileSidebar,
  );

  const navigation = getNavigationForRole(role);

  return (
    <Sheet
      open={mobileSidebarOpen}
      onOpenChange={setMobileSidebarOpen}
    >
      <SheetContent
        side="left"
        className="w-[min(20rem,90vw)] gap-0 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="border-b border-sidebar-border px-4 py-4 text-left">
          <div className="flex items-center gap-3 pr-10">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-medium border border-sidebar-border bg-sidebar-accent shadow-subtle">
              <Building2
                aria-hidden="true"
                className="size-4"
              />
            </div>

            <div className="min-w-0">
              <SheetTitle className="truncate text-sm font-semibold text-sidebar-foreground">
                {tenant.name}
              </SheetTitle>
              <SheetDescription className="truncate text-caption text-sidebar-muted">
                Beauty Core · Painel administrativo
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <nav
          aria-label="Navegação administrativa mobile"
          className="min-h-0 flex-1 overflow-y-auto px-2 py-4"
        >
          <div className="space-y-5">
            {navigation.map((group) => (
              <section
                key={group.id}
                aria-label={group.label}
              >
                <h2 className="mb-2 px-3 text-overline font-semibold uppercase tracking-[0.14em] text-sidebar-muted">
                  {group.label}
                </h2>

                <div className="space-y-1">
                  {group.items.map((item) => (
                    <SidebarItem
                      key={item.id}
                      item={item}
                      collapsed={false}
                      pathname={pathname}
                      onNavigate={closeMobileSidebar}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </nav>

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <div className="rounded-medium bg-sidebar-accent px-3 py-2">
            <p className="text-caption font-semibold text-sidebar-foreground">
              Navegação mobile
            </p>
            <p className="mt-0.5 truncate text-caption text-sidebar-muted">
              Role: {role}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
