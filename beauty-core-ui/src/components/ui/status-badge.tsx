import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export type StatusTone =
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info";

type StatusBadgeProps = {
  children: ReactNode;
  tone?: StatusTone;
  className?: string;
};

const TONE_CLASSES: Record<StatusTone, string> = {
  neutral:
    "border-border-subtle bg-surface-subtle text-text-secondary",
  success:
    "border-success/25 bg-success/10 text-success-foreground",
  warning:
    "border-warning/25 bg-warning/10 text-warning-foreground",
  danger:
    "border-danger/25 bg-danger/10 text-danger-foreground",
  info:
    "border-info/25 bg-info/10 text-info-foreground",
};

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: StatusBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "font-semibold",
        TONE_CLASSES[tone],
        className,
      )}
    >
      {children}
    </Badge>
  );
}