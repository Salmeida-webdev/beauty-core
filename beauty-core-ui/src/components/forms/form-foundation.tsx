import type { ReactNode } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type FormFieldProps = {
  id: string;
  label: string;
  children: ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FormField({
  id,
  label,
  children,
  description,
  error,
  required = false,
  className,
}: FormFieldProps) {
  const descriptionId = description
    ? `${id}-description`
    : undefined;

  const errorId = error
    ? `${id}-error`
    : undefined;

  return (
    <div
      className={cn(
        "space-y-2",
        className,
      )}
    >
      <Label htmlFor={id}>
        {label}

        {required && (
          <>
            <span
              aria-hidden="true"
              className="ml-1 text-danger"
            >
              *
            </span>
            <span className="sr-only">
              obrigatório
            </span>
          </>
        )}
      </Label>

      {children}

      {description && (
        <p
          id={descriptionId}
          className="text-caption text-text-muted"
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-caption font-medium text-danger"
        >
          {error}
        </p>
      )}
    </div>
  );
}

type FormSectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function FormSection({
  title,
  description,
  children,
  className,
}: FormSectionProps) {
  return (
    <section
      className={cn(
        "rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle",
        className,
      )}
    >
      <div className="border-b border-border-subtle pb-4">
        <h3 className="text-heading-4 font-semibold text-text-primary">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-body-small text-text-muted">
            {description}
          </p>
        )}
      </div>

      <div className="mt-form space-y-form">
        {children}
      </div>
    </section>
  );
}

type FormGridProps = {
  children: ReactNode;
  className?: string;
};

export function FormGrid({
  children,
  className,
}: FormGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-form md:grid-cols-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

type FormActionsProps = {
  children: ReactNode;
  className?: string;
};

export function FormActions({
  children,
  className,
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border-subtle pt-4 sm:flex-row sm:justify-end",
        className,
      )}
    >
      {children}
    </div>
  );
}