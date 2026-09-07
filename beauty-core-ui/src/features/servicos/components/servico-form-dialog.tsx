"use client";

import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ServicoForm } from "@/features/servicos/forms/servico-form";
import { getServicoMutationErrorMessage } from "@/features/servicos/forms/servico-form-error";
import {
  EMPTY_SERVICO_FORM_VALUES,
  type ServicoFormValues,
} from "@/features/servicos/forms/servico-form.schema";
import {
  servicoToFormValues,
  toCreateServicoPayload,
  toUpdateServicoPayload,
} from "@/features/servicos/forms/servico-payload";
import { servicosKeys } from "@/features/servicos/queries/servicos-keys";
import { servicosApi } from "@/features/servicos/services/servicos-api";
import type { Servico } from "@/features/servicos/types/servicos.types";

type ServicoFormDialogProps = {
  mode: "create" | "edit";
  servico?: Servico;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ServicoFormDialog({
  mode,
  servico,
  open,
  onOpenChange,
}: ServicoFormDialogProps) {
  const queryClient = useQueryClient();
  const submitLock = useRef(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const initialValues =
    mode === "edit" && servico
      ? servicoToFormValues(servico)
      : EMPTY_SERVICO_FORM_VALUES;

  const mutation = useMutation({
    mutationFn: async (values: ServicoFormValues) => {
      if (mode === "edit" && servico) {
        return servicosApi.update(servico.id, toUpdateServicoPayload(values));
      }

      return servicosApi.create(toCreateServicoPayload(values));
    },
    retry: false,
    onSuccess: async (savedServico) => {
      setServerError(null);
      queryClient.setQueryData(
        servicosKeys.detail(savedServico.id),
        savedServico,
      );
      await queryClient.invalidateQueries({
        queryKey: servicosKeys.lists(),
      });

      toast.success(
        mode === "create"
          ? "Serviço cadastrado com sucesso."
          : "Serviço atualizado com sucesso.",
      );
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

  const handleSubmit = (values: ServicoFormValues) => {
    if (submitLock.current || mutation.isPending) {
      return;
    }

    submitLock.current = true;
    setServerError(null);
    mutation.mutate(values);
  };

  const title = mode === "create" ? "Novo serviço" : "Editar serviço";
  const description =
    mode === "create"
      ? "Adicione um serviço ao catálogo ativo da empresa."
      : "Atualize os dados operacionais permitidos para este serviço.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <ServicoForm
          key={mode === "edit" ? (servico?.id ?? "edit") : "create"}
          mode={mode}
          initialValues={initialValues}
          pending={mutation.isPending}
          serverError={serverError}
          onCancel={() => handleOpenChange(false)}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
