import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
  meta?: ReactNode;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  meta,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 border-b border-border-subtle pb-6 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="min-w-0 max-w-3xl">
        {eyebrow && (
          <p className="mb-2 text-overline font-semibold uppercase tracking-[0.16em] text-text-muted">
            {eyebrow}
          </p>
        )}

        <h1 className="text-heading-1 font-semibold tracking-tight text-text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-body text-text-secondary">
            {description}
          </p>
        )}

        {meta && (
          <div className="mt-3 text-body-small text-text-muted">
            {meta}
          </div>
        )}
      </div>

      {actions && (
        <div
          aria-label="Ações da página"
          className="flex shrink-0 flex-wrap items-center gap-2"
        >
          {actions}
        </div>
      )}
    </header>
  );
}