import type { FieldError } from "react-hook-form";

import { cn } from "@/lib/utils";

type FormFieldMessageProps = {
  error?: FieldError | string | null;
  id?: string;
  className?: string;
};

function getErrorMessage(
  error: FormFieldMessageProps["error"],
): string | null {
  if (!error) {
    return null;
  }

  if (typeof error === "string") {
    return error;
  }

  return typeof error.message === "string"
    ? error.message
    : null;
}

export function FormFieldMessage({
  error,
  id,
  className,
}: FormFieldMessageProps) {
  const message = getErrorMessage(error);

  if (!message) {
    return null;
  }

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className={cn(
        "text-sm font-medium text-destructive",
        className,
      )}
    >
      {message}
    </p>
  );
}
