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
import { getServicoMutationErrorMessage } from "@/features/servicos/forms/servico-form-error";
import { servicosKeys } from "@/features/servicos/queries/servicos-keys";
import { servicosApi } from "@/features/servicos/services/servicos-api";
import type { Servico } from "@/features/servicos/types/servicos.types";

type ServicoDeactivateDialogProps = {
  servico: Servico;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ServicoDeactivateDialog({
  servico,
  open,
  onOpenChange,
}: ServicoDeactivateDialogProps) {
  const queryClient = useQueryClient();
  const submitLock = useRef(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => servicosApi.inactivate(servico.id),
    retry: false,
    onSuccess: async (savedServico) => {
      queryClient.setQueryData(
        servicosKeys.detail(savedServico.id),
        savedServico,
      );
      await queryClient.invalidateQueries({
        queryKey: servicosKeys.lists(),
      });

      toast.success("Serviço inativado com sucesso.");
      setServerError(null);
      onOpenChange(false);
    },
    onError: (error) => {
      setServerError(getServicoMutationErrorMessage(error));
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
          <AlertDialogTitle>Inativar serviço?</AlertDialogTitle>
          <AlertDialogDescription>
            “{servico.nome}” deixará de aparecer no catálogo ativo. O histórico
            relacionado ao serviço será preservado.
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
            {mutation.isPending ? "Inativando..." : "Inativar serviço"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
