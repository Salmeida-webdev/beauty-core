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
import { UnidadeForm } from "@/features/unidades/forms/unidade-form";
import { getUnidadeMutationErrorMessage } from "@/features/unidades/forms/unidade-form-error";
import {
  EMPTY_UNIDADE_FORM_VALUES,
  type UnidadeFormValues,
} from "@/features/unidades/forms/unidade-form.schema";
import {
  unidadeToFormValues,
  toCreateUnidadePayload,
  toUpdateUnidadePayload,
} from "@/features/unidades/forms/unidade-payload";
import { unidadesKeys } from "@/features/unidades/queries/unidades-keys";
import { unidadesApi } from "@/features/unidades/services/unidades-api";
import type { Unidade } from "@/features/unidades/types/unidades.types";

type UnidadeFormDialogProps = {
  mode: "create" | "edit";
  unidade?: Unidade;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function UnidadeFormDialog({
  mode,
  unidade,
  open,
  onOpenChange,
}: UnidadeFormDialogProps) {
  const queryClient = useQueryClient();
  const submitLock = useRef(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const initialValues =
    mode === "edit" && unidade
      ? unidadeToFormValues(unidade)
      : EMPTY_UNIDADE_FORM_VALUES;

  const mutation = useMutation({
    mutationFn: async (values: UnidadeFormValues) => {
      if (mode === "edit" && unidade) {
        return unidadesApi.update(unidade.id, toUpdateUnidadePayload(values));
      }

      return unidadesApi.create(toCreateUnidadePayload(values));
    },
    retry: false,
    onSuccess: async (savedUnidade) => {
      setServerError(null);
      queryClient.setQueryData(
        unidadesKeys.detail(savedUnidade.id),
        savedUnidade,
      );
      await queryClient.invalidateQueries({
        queryKey: unidadesKeys.lists(),
      });

      toast.success(
        mode === "create"
          ? "Unidade cadastrado com sucesso."
          : "Unidade atualizado com sucesso.",
      );
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

  const handleSubmit = (values: UnidadeFormValues) => {
    if (submitLock.current || mutation.isPending) {
      return;
    }

    submitLock.current = true;
    setServerError(null);
    mutation.mutate(values);
  };

  const title = mode === "create" ? "Nova unidade" : "Editar unidade";
  const description =
    mode === "create"
      ? "Adicione uma unidade ativa à empresa."
      : "Atualize os dados operacionais permitidos para esta unidade.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <UnidadeForm
          key={mode === "edit" ? (unidade?.id ?? "edit") : "create"}
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
