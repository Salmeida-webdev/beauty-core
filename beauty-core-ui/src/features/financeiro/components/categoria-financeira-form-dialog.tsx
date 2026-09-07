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
import { CategoriaFinanceiraForm } from "@/features/financeiro/components/categoria-financeira-form";
import {
  toCreateCategoriaFinanceiraPayload,
  toUpdateCategoriaFinanceiraPayload,
} from "@/features/financeiro/forms/categoria-financeira-payload";
import type { CategoriaFinanceiraFormValues } from "@/features/financeiro/forms/categoria-financeira-form.schema";
import {
  useAtualizarCategoriaFinanceira,
  useCriarCategoriaFinanceira,
} from "@/features/financeiro/hooks/use-categorias-financeiras";
import type { CategoriaFinanceira } from "@/features/financeiro/types/financeiro.types";

type CategoriaFinanceiraFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoria?: CategoriaFinanceira | null;
};

export function CategoriaFinanceiraFormDialog({
  open,
  onOpenChange,
  categoria = null,
}: CategoriaFinanceiraFormDialogProps) {
  const createMutation = useCriarCategoriaFinanceira();

  const updateMutation = useAtualizarCategoriaFinanceira();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pending = createMutation.isPending || updateMutation.isPending;

  async function submit(values: CategoriaFinanceiraFormValues) {
    setErrorMessage(null);

    try {
      if (categoria) {
        await updateMutation.mutateAsync({
          id: categoria.id,
          payload: toUpdateCategoriaFinanceiraPayload(values),
        });

        toast.success("Categoria financeira atualizada.");
      } else {
        await createMutation.mutateAsync(
          toCreateCategoriaFinanceiraPayload(values),
        );

        toast.success("Categoria financeira criada.");
      }

      onOpenChange(false);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Não foi possível salvar a categoria financeira.";

      setErrorMessage(message);
      toast.error(message);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!pending) {
          setErrorMessage(null);
          onOpenChange(nextOpen);
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {categoria
              ? "Editar categoria financeira"
              : "Nova categoria financeira"}
          </DialogTitle>

          <DialogDescription>
            Informe o nome e o tipo da categoria.
          </DialogDescription>
        </DialogHeader>

        {errorMessage ? (
          <p role="alert" className="text-sm text-destructive">
            {errorMessage}
          </p>
        ) : null}

        <CategoriaFinanceiraForm
          key={categoria?.id ?? "nova"}
          defaultValues={
            categoria
              ? {
                  nome: categoria.nome,
                  tipo: categoria.tipo,
                }
              : undefined
          }
          pending={pending}
          submitLabel={categoria ? "Salvar alterações" : "Criar categoria"}
          onSubmit={submit}
        />
      </DialogContent>
    </Dialog>
  );
}
