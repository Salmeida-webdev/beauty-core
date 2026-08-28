import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type KpiCardProps = {
  label: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  badge?: ReactNode;
};

export function KpiCard({
  label,
  value,
  description,
  icon: Icon,
  badge,
}: KpiCardProps) {
  return (
    <Card className="gap-0 border-border-subtle bg-surface-elevated py-0 shadow-card">
      <CardContent className="p-card">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-label font-semibold text-text-secondary">
              {label}
            </p>

            <p className="mt-3 max-w-full text-kpi font-semibold tracking-tight text-text-primary [overflow-wrap:anywhere]">
              {value}
            </p>
          </div>

          <div className="flex size-10 shrink-0 items-center justify-center rounded-medium border border-border-subtle bg-surface-subtle">
            <Icon
              aria-hidden="true"
              className="size-4 text-text-secondary"
            />
          </div>
        </div>

        {(description || badge) && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {badge}

            {description && (
              <p className="text-caption text-text-muted">
                {description}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}