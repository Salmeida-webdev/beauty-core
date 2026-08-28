import {
  useId,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type PageSectionProps = {
  children: ReactNode;
  title?: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
};

export function PageSection({
  children,
  title,
  description,
  actions,
  className,
}: PageSectionProps) {
  const titleId = useId();
  const descriptionId = useId();

  return (
    <section
      aria-labelledby={
        title
          ? titleId
          : undefined
      }
      aria-describedby={
        description
          ? descriptionId
          : undefined
      }
      className={cn(
        "min-w-0 space-y-section",
        className,
      )}
    >
      {(title || description || actions) && (
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            {title && (
              <h2
                id={titleId}
                className="text-heading-3 font-semibold text-text-primary"
              >
                {title}
              </h2>
            )}

            {description && (
              <p
                id={descriptionId}
                className="mt-1 max-w-3xl text-body-small text-text-muted"
              >
                {description}
              </p>
            )}
          </div>

          {actions && (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}

      <div className="min-w-0">
        {children}
      </div>
    </section>
  );
}

type ResponsiveGridProps = {
  children: ReactNode;
  className?: string;
};

export function ResponsiveGrid({
  children,
  className,
}: ResponsiveGridProps) {
  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-1 gap-grid sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

type ContentToolbarProps = {
  children: ReactNode;
  className?: string;
};

export function ContentToolbar({
  children,
  className,
}: ContentToolbarProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-3 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
}
