"use client";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useInativarCategoriaFinanceira } from "@/features/financeiro/hooks/use-categorias-financeiras";
import type { CategoriaFinanceira } from "@/features/financeiro/types/financeiro.types";

type Props = {
  categoria: CategoriaFinanceira | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CategoriaFinanceiraInativarDialog({
  categoria,
  open,
  onOpenChange,
}: Props) {
  const mutation = useInativarCategoriaFinanceira();

  async function confirm() {
    if (!categoria) {
      return;
    }

    try {
      await mutation.mutateAsync(categoria.id);

      toast.success("Categoria financeira inativada.");

      onOpenChange(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível inativar a categoria financeira.",
      );
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!mutation.isPending) {
          onOpenChange(nextOpen);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inativar categoria financeira?</AlertDialogTitle>

          <AlertDialogDescription>
            {categoria
              ? `A categoria "${categoria.nome}" será inativada.`
              : "Confirme a inativação."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Voltar
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={mutation.isPending || !categoria}
            onClick={(event) => {
              event.preventDefault();
              void confirm();
            }}
          >
            {mutation.isPending ? "Inativando..." : "Inativar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
