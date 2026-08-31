"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type {
  CampanhaWhatsappFormValues,
} from "../schemas/whatsapp.schemas";
import type {
  CampanhaWhatsappResumo,
} from "../types/whatsapp.types";
import {
  CampanhaWhatsappForm,
} from "../campaigns/campanha-whatsapp-form";

interface CampanhaWhatsappFormDialogProps {
  open: boolean;
  campanha?: CampanhaWhatsappResumo | null;
  isSubmitting: boolean;
  errorMessage?: string | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    values: CampanhaWhatsappFormValues,
  ) => Promise<void> | void;
}

export function CampanhaWhatsappFormDialog({
  open,
  campanha,
  isSubmitting,
  errorMessage,
  onOpenChange,
  onSubmit,
}: CampanhaWhatsappFormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!isSubmitting) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {campanha
              ? "Editar campanha"
              : "Nova campanha"}
          </DialogTitle>

          <DialogDescription>
            Configure os dados administrativos
            da campanha de WhatsApp.
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

        <CampanhaWhatsappForm
          campanha={campanha}
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