"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getUnidadeMutationErrorMessage } from "@/features/unidades/forms/unidade-form-error";
import { unidadesKeys } from "@/features/unidades/queries/unidades-keys";
import { unidadesApi } from "@/features/unidades/services/unidades-api";
import type { Unidade } from "@/features/unidades/types/unidades.types";

type UnidadeDeactivateDialogProps = {
  unidade: Unidade;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UnidadeDeactivateDialog({
  unidade,
  open,
  onOpenChange,
}: UnidadeDeactivateDialogProps) {
  const queryClient = useQueryClient();
  const submitLock = useRef(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => unidadesApi.inactivate(unidade.id),
    retry: false,
    onSuccess: async (savedUnidade) => {
      queryClient.setQueryData(
        unidadesKeys.detail(savedUnidade.id),
        savedUnidade,
      );
      await queryClient.invalidateQueries({
        queryKey: unidadesKeys.lists(),
      });

      toast.success("Unidade inativado com sucesso.");
      setServerError(null);
      onOpenChange(false);
    },
    onError: (error) => {
      setServerError(getUnidadeMutationErrorMessage(error));
    },
    onSettled: () => {
      submitLock.current = false;
    },
  });

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && mutation.isPending) {
      return;
    }

    if (!nextOpen) {
      mutation.reset();
      submitLock.current = false;
      setServerError(null);
    }

    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    if (submitLock.current || mutation.isPending) {
      return;
    }

    submitLock.current = true;
    setServerError(null);
    mutation.mutate();
  };

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Inativar unidade?</AlertDialogTitle>
          <AlertDialogDescription>
            “{unidade.nome}” deixará de aparecer no catálogo ativo. O histórico
            relacionado à unidade será preservado.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {serverError && (
          <p
            role="alert"
            aria-live="polite"
            className="rounded-medium border border-danger/25 bg-danger/10 p-3 text-body-small font-medium text-danger"
          >
            {serverError}
          </p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.isPending}>
            Cancelar
          </AlertDialogCancel>

          <Button
            type="button"
            variant="destructive"
            disabled={mutation.isPending}
            onClick={handleConfirm}
          >
            {mutation.isPending ? "Inativando..." : "Inativar unidade"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
