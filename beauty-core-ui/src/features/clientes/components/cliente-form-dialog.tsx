"use client";

import {
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ClienteForm,
} from "@/features/clientes/forms/cliente-form";
import {
  getClienteMutationError,
} from "@/features/clientes/forms/cliente-form-error";
import {
  EMPTY_CLIENTE_FORM_VALUES,
} from "@/features/clientes/forms/cliente-form.schema";
import type {
  ClienteFormValues,
} from "@/features/clientes/forms/cliente-form.schema";
import {
  clienteToFormValues,
  toCreateClientePayload,
  toUpdateClientePayload,
} from "@/features/clientes/forms/cliente-payload";
import {
  clientesKeys,
} from "@/features/clientes/queries/clientes-keys";
import {
  clientesApi,
} from "@/features/clientes/services/clientes-api";
import type {
  Cliente,
} from "@/features/clientes/types/clientes.types";

type ClienteFormDialogProps = {
  mode: "create" | "edit";
  cliente?: Cliente;
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
};

export function ClienteFormDialog({
  mode,
  cliente,
  open,
  onOpenChange,
}: ClienteFormDialogProps) {
  const queryClient =
    useQueryClient();

  const [
    serverError,
    setServerError,
  ] = useState<
    string | null
  >(null);

  const initialValues =
    mode === "edit" && cliente
      ? clienteToFormValues(
          cliente,
        )
      : EMPTY_CLIENTE_FORM_VALUES;

  const mutation = useMutation({
    mutationFn: async (
      values: ClienteFormValues,
    ) => {
      if (
        mode === "edit" &&
        cliente
      ) {
        return clientesApi.update(
          cliente.id,
          toUpdateClientePayload(
            values,
          ),
        );
      }

      return clientesApi.create(
        toCreateClientePayload(
          values,
        ),
      );
    },

    retry: false,

    onSuccess: async (
      savedCliente,
    ) => {
      setServerError(null);

      queryClient.setQueryData(
        clientesKeys.detail(
          savedCliente.id,
        ),
        savedCliente,
      );

      await queryClient.invalidateQueries({
        queryKey:
          clientesKeys.lists(),
      });

      onOpenChange(false);
    },

    onError: (error) => {
      const normalized =
        getClienteMutationError(
          error,
        );

      setServerError(
        normalized.message,
      );
    },
  });

  const handleOpenChange = (
    nextOpen: boolean,
  ) => {
    if (!nextOpen) {
      mutation.reset();
      setServerError(null);
    }

    onOpenChange(
      nextOpen,
    );
  };

  const title =
    mode === "create"
      ? "Novo cliente"
      : "Editar cliente";

  const description =
    mode === "create"
      ? "Cadastre um cliente usando os campos administrativos disponíveis."
      : "Atualize os dados administrativos permitidos pelo cadastro de clientes.";

  return (
    <Dialog
      open={open}
      onOpenChange={
        handleOpenChange
      }
    >
      <DialogContent
        className="max-h-[90vh] overflow-y-auto sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>

          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <ClienteForm
          key={
            mode === "edit"
              ? cliente?.id ??
                "edit"
              : "create"
          }
          mode={mode}
          initialValues={
            initialValues
          }
          pending={
            mutation.isPending
          }
          serverError={
            serverError
          }
          onCancel={() => {
            handleOpenChange(
              false,
            );
          }}
          onSubmit={(values) => {
            setServerError(null);

            mutation.mutate(
              values,
            );
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
