"use client";

import {
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AgendamentoCreateForm } from "@/features/agendamentos/forms/agendamento-create-form";
import {
  EMPTY_AGENDAMENTO_CREATE_FORM_VALUES,
  type AgendamentoCreateFormValues,
} from "@/features/agendamentos/forms/agendamento-create-form.schema";
import { toCreateAgendamentoPayload } from "@/features/agendamentos/forms/agendamento-create-payload";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import { normalizeApiError } from "@/services/api/normalize-api-error";

export function AgendamentoCreateDialog() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    serverError,
    setServerError,
  ] = useState<
    string | null
  >(null);

  const queryClient =
    useQueryClient();

  const mutation = useMutation({
    mutationFn: (
      values: AgendamentoCreateFormValues,
    ) =>
      agendamentosApi.create(
        toCreateAgendamentoPayload(
          values,
        ),
      ),

    retry: false,

    onSuccess: async () => {
      setServerError(null);

      await queryClient.invalidateQueries({
        queryKey:
          agendamentosKeys.all,
      });

      setOpen(false);
    },

    onError: (error) => {
      const normalized =
        normalizeApiError(error);

      const validationMessage =
        normalized.statusCode === 422
          ? normalized.messages
              .filter(
                (message) =>
                  message.trim()
                    .length > 0,
              )
              .join(" ")
          : "";

      setServerError(
        validationMessage ||
          normalized.message,
      );
    },
  });

  function handleOpenChange(
    nextOpen: boolean,
  ) {
    if (!nextOpen) {
      mutation.reset();
      setServerError(null);
    }

    setOpen(nextOpen);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={
        handleOpenChange
      }
    >
      <DialogTrigger asChild>
        <Button type="button">
          <Plus
            aria-hidden="true"
            className="mr-2 size-4"
          />

          Novo agendamento
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Novo agendamento
          </DialogTitle>

          <DialogDescription>
            Cadastre um agendamento usando somente os campos suportados pelo backend.
          </DialogDescription>
        </DialogHeader>

        <AgendamentoCreateForm
          key={
            open
              ? "create-open"
              : "create-closed"
          }
          initialValues={
            EMPTY_AGENDAMENTO_CREATE_FORM_VALUES
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
          onSubmit={(
            values,
          ) => {
            mutation.mutate(
              values,
            );
          }}
        />
      </DialogContent>
    </Dialog>
  );
}