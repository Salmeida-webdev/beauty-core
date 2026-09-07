import {
  RefreshCw,
} from "lucide-react";

import {
  Button,
} from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Skeleton,
} from "@/components/ui/skeleton";

type DashboardSectionErrorProps = {
  title: string;
  isRetrying: boolean;
  onRetry: () => void | Promise<void>;
};

export function DashboardSectionError({
  title,
  isRetrying,
  onRetry,
}: DashboardSectionErrorProps) {
  return (
    <Card
      role="alert"
      className="border-destructive/30"
    >
      <CardContent className="flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary">
            {title}
          </h3>

          <p className="mt-2 text-body-small text-text-muted">
            Esta seção falhou sem interromper os demais indicadores.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={isRetrying}
          onClick={() => {
            void onRetry();
          }}
        >
          <RefreshCw
            aria-hidden="true"
            className={
              isRetrying
                ? "animate-spin motion-reduce:animate-none"
                : undefined
            }
          />

          {isRetrying
            ? "Tentando novamente"
            : "Tentar novamente"}
        </Button>
      </CardContent>
    </Card>
  );
}

type DashboardSectionSkeletonProps = {
  label: string;
};

export function DashboardSectionSkeleton({
  label,
}: DashboardSectionSkeletonProps) {
  return (
    <div
      aria-label={label}
      aria-busy="true"
      className="grid gap-grid lg:grid-cols-3"
    >
      <Card className="lg:col-span-2">
        <CardContent className="p-6">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="mt-5 h-72 w-full" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-5 p-6">
          <Skeleton className="h-5 w-36" />

          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div
              key={index}
              className="space-y-2"
            >
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-6 w-32" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

type DashboardCompactEmptyProps = {
  title: string;
  description: string;
};

export function DashboardCompactEmpty({
  title,
  description,
}: DashboardCompactEmptyProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-heading-4 font-semibold text-text-primary">
          {title}
        </h3>

        <p className="mt-2 max-w-2xl text-body-small text-text-muted">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
