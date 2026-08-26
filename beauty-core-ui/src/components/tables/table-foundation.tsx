import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type DataTableFrameProps = {
  children: ReactNode;
  className?: string;
};

export function DataTableFrame({
  children,
  className,
}: DataTableFrameProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-large border border-border-subtle bg-surface-elevated shadow-subtle",
        className,
      )}
    >
      {children}
    </div>
  );
}

type TableToolbarProps = {
  children: ReactNode;
  className?: string;
};

export function TableToolbar({
  children,
  className,
}: TableToolbarProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-b border-border-subtle p-card sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ResponsiveTableRegionProps = {
  children: ReactNode;
  className?: string;
  label?: string;
};

export function ResponsiveTableRegion({
  children,
  className,
  label = "Tabela de dados",
}: ResponsiveTableRegionProps) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-inset",
        className,
      )}
    >
      {children}
    </div>
  );
}

type TableFooterProps = {
  children: ReactNode;
  className?: string;
};

export function TableFooter({
  children,
  className,
}: TableFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-t border-border-subtle px-card py-3 text-caption text-text-muted sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}