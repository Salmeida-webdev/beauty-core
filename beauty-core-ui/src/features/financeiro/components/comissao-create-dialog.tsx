"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ComissaoForm } from "@/features/financeiro/components/comissao-form";
import type { ComissaoFormValues } from "@/features/financeiro/forms/comissao-form.schema";
import { toCreateComissaoPayload } from "@/features/financeiro/forms/comissao-payload";
import { useCriarComissao } from "@/features/financeiro/hooks/use-comissoes";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ComissaoCreateDialog({ open, onOpenChange }: Props) {
  const mutation = useCriarComissao();

  const [error, setError] = useState<string | null>(null);

  async function submit(values: ComissaoFormValues) {
    if (mutation.isPending) {
      return;
    }

    setError(null);

    try {
      await mutation.mutateAsync(toCreateComissaoPayload(values));

      toast.success("Comissão criada.");

      onOpenChange(false);
    } catch (caught) {
      const message =
        caught instanceof Error
          ? caught.message
          : "Não foi possível criar a comissão.";

      setError(message);
      toast.error(message);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!mutation.isPending) {
          setError(null);
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Nova comissão</DialogTitle>

          <DialogDescription>
            Informe os dados aceitos pelo backend. O profissional deve ser o
            mesmo vinculado ao agendamento.
          </DialogDescription>
        </DialogHeader>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <ComissaoForm pending={mutation.isPending} onSubmit={submit} />
      </DialogContent>
    </Dialog>
  );
}
