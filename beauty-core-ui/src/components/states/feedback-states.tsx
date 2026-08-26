import type { ReactNode } from "react";
import {
  CircleAlert,
  Inbox,
  LockKeyhole,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type StateFrameProps = {
  children: ReactNode;
  className?: string;
};

function StateFrame({
  children,
  className,
}: StateFrameProps) {
  return (
    <div
      className={cn(
        "flex min-h-56 flex-col items-center justify-center rounded-large border border-border-subtle bg-surface-elevated p-modal text-center shadow-subtle",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LoadingState() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Carregando conteúdo"
      className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-medium" />

        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-4/5" />
      </div>

      <span className="sr-only">
        Carregando conteúdo
      </span>
    </div>
  );
}

type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({
  title = "Nenhum registro encontrado",
  description = "Quando houver dados disponíveis, eles aparecerão aqui.",
  action,
}: EmptyStateProps) {
  return (
    <StateFrame>
      <div className="flex size-11 items-center justify-center rounded-full bg-surface-subtle">
        <Inbox
          aria-hidden="true"
          className="size-5 text-text-muted"
        />
      </div>

      <h3 className="mt-4 text-heading-4 font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-body-small text-text-muted">
        {description}
      </p>

      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </StateFrame>
  );
}

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title = "Não foi possível carregar",
  description = "Ocorreu uma falha ao buscar os dados. Tente novamente.",
  onRetry,
}: ErrorStateProps) {
  return (
    <StateFrame
      className="border-danger/25"
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-danger/10">
        <CircleAlert
          aria-hidden="true"
          className="size-5 text-danger"
        />
      </div>

      <h3 className="mt-4 text-heading-4 font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-body-small text-text-muted">
        {description}
      </p>

      {onRetry && (
        <Button
          type="button"
          variant="outline"
          className="mt-5"
          onClick={onRetry}
        >
          Tentar novamente
        </Button>
      )}
    </StateFrame>
  );
}

type PermissionStateProps = {
  title?: string;
  description?: string;
};

export function PermissionState({
  title = "Acesso não permitido",
  description = "Seu perfil não possui permissão para visualizar este conteúdo.",
}: PermissionStateProps) {
  return (
    <StateFrame
      className="border-warning/25"
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-warning/10">
        <LockKeyhole
          aria-hidden="true"
          className="size-5 text-warning"
        />
      </div>

      <h3 className="mt-4 text-heading-4 font-semibold text-text-primary">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-body-small text-text-muted">
        {description}
      </p>
    </StateFrame>
  );
}