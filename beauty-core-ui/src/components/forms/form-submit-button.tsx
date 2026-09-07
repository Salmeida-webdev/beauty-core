"use client";

import { LoaderCircle } from "lucide-react";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type FormSubmitButtonProps = ComponentProps<typeof Button> & {
  pending?: boolean;
  pendingLabel?: string;
};

export function FormSubmitButton({
  children,
  pending = false,
  pendingLabel = "Processando...",
  ...props
}: FormSubmitButtonProps) {
  const disabled = pending || props.disabled;

  return (
    <Button
      {...props}
      type={props.type ?? "submit"}
      disabled={disabled}
      aria-busy={pending}
    >
      {pending ? (
        <>
          <LoaderCircle
            aria-hidden="true"
            className="animate-spin"
          />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  );
}
