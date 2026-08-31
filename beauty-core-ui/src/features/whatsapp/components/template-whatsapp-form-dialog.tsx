"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type {
  TemplateWhatsappFormValues,
} from "../schemas/whatsapp.schemas";
import type {
  TemplateWhatsapp,
} from "../types/whatsapp.types";
import {
  TemplateWhatsappForm,
} from "../templates/template-whatsapp-form";

interface TemplateWhatsappFormDialogProps {
  open: boolean;
  template?: TemplateWhatsapp | null;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    values: TemplateWhatsappFormValues,
  ) => Promise<void> | void;
}

export function TemplateWhatsappFormDialog({
  open,
  template,
  isSubmitting,
  errorMessage,
  onOpenChange,
  onSubmit,
}: TemplateWhatsappFormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isSubmitting) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {template
              ? "Editar template"
              : "Novo template"}
          </DialogTitle>

          <DialogDescription>
            Configure nome, tipo, título e mensagem.
          </DialogDescription>
        </DialogHeader>

        {errorMessage && (
          <div
            className="rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm text-destructive"
            role="alert"
          >
            {errorMessage}
          </div>
        )}

        <TemplateWhatsappForm
          template={template}
          isSubmitting={isSubmitting}
          onCancel={() =>
            onOpenChange(false)
          }
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}