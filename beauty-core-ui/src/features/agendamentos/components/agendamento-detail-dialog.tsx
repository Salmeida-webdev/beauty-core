"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Pencil } from "lucide-react";

import {
  ErrorState,
  LoadingState,
} from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";
import { AgendaStatusBadge } from "@/features/agendamentos/components/agenda-status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AgendamentoStatusActions } from "@/features/agendamentos/components/agendamento-status-actions";
import { AgendamentoEditForm } from "@/features/agendamentos/forms/agendamento-edit-form";
import {
  agendamentoToEditFormValues,
  toUpdateAgendamentoPayload,
  type AgendamentoEditFormValues,
} from "@/features/agendamentos/forms/agendamento-edit-payload";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosQueryOptions } from "@/features/agendamentos/queries/agendamentos-query-options";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
import { normalizeApiError } from "@/services/api/normalize-api-error";

type AgendamentoDetailDialogProps = {
  agendamentoId: string | null;
  canEdit: boolean;
  canChangeStatus: boolean;
  canCancel: boolean;
  onClose: () => void;
};

const detailDateFormatter =
  new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  );

function DetailField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3">
      <p className="text-xs text-text-muted">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-text-primary">
        {value}
      </p>
    </div>
  );
}

function buildInitialOptions(
  detail: AgendamentoDetail,
) {
  return {
    clienteId: {
      value: detail.cliente.id,
      label: detail.cliente.nome,
      description:
        detail.cliente.telefone ??
        detail.cliente.email ??
        undefined,
    },

    profissionalId: {
      value:
        detail.profissional.id,
      label:
        detail.profissional.nome,
      description:
        detail.profissional.email ??
        undefined,
    },

    servicoId: {
      value: detail.servico.id,
      label: detail.servico.nome,
      description: `${detail.servico.duracaoMinutos} min`,
    },

    unidadeId: {
      value: detail.unidade.id,
      label: detail.unidade.nome,
    },
  };
}

export function AgendamentoDetailDialog({
  agendamentoId,
  canEdit,
  canChangeStatus,
  canCancel,
  onClose,
}: AgendamentoDetailDialogProps) {
  const [
    editing,
    setEditing,
  ] = useState(false);

  const [
    serverError,
    setServerError,
  ] = useState<
    string | null
  >(null);

  const queryClient =
    useQueryClient();

  const detailQuery = useQuery(
    agendamentosQueryOptions.detail(
      agendamentoId ?? "",
      Boolean(agendamentoId),
    ),
  );

  const mutation = useMutation({
    mutationFn: (
      values: AgendamentoEditFormValues,
    ) => {
      if (!agendamentoId) {
        throw new Error(
          "Agendamento sem identificador.",
        );
      }

      return agendamentosApi.update(
        agendamentoId,
        toUpdateAgendamentoPayload(
          values,
        ),
      );
    },

    retry: false,

    onSuccess: async (
      updated,
    ) => {
      setServerError(null);
      setEditing(false);

      queryClient.setQueryData(
        agendamentosKeys.detail(
          updated.id,
        ),
        updated,
      );

      await queryClient.invalidateQueries({
        queryKey:
          agendamentosKeys.all,
      });
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

  const detail =
    detailQuery.data;

  const initialValues =
    useMemo(
      () =>
        detail
          ? agendamentoToEditFormValues(
              detail,
            )
          : null,
      [detail],
    );

  const initialOptions =
    useMemo(
      () =>
        detail
          ? buildInitialOptions(
              detail,
            )
          : {},
      [detail],
    );

  function handleClose() {
    mutation.reset();
    setServerError(null);
    setEditing(false);
    onClose();
  }

  const normalizedDetailError =
    detailQuery.error
      ? normalizeApiError(
          detailQuery.error,
        )
      : null;

  return (
    <Dialog
      open={Boolean(
        agendamentoId,
      )}
      onOpenChange={(open) => {
        if (!open) {
          handleClose();
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {editing
              ? "Editar agendamento"
              : "Detalhes do agendamento"}
          </DialogTitle>

          <DialogDescription>
            {editing
              ? "Atualize os campos suportados pelo backend."
              : "Dados atuais carregados diretamente do agendamento."}
          </DialogDescription>
        </DialogHeader>

        {detailQuery.isPending ? (
          <div className="min-h-56">
            <LoadingState />
          </div>
        ) : detailQuery.isError &&
          !detail ? (
          <ErrorState
            title={
              normalizedDetailError
                ?.statusCode === 404
                ? "Agendamento nao encontrado"
                : "Nao foi possivel carregar o agendamento"
            }
            description={
              normalizedDetailError
                ?.statusCode === 404
                ? "O registro pode ter sido removido ou nao pertence mais ao escopo atual."
                : "Tente carregar os detalhes novamente."
            }
            onRetry={() => {
              void detailQuery.refetch();
            }}
          />
        ) : detail &&
          initialValues ? (
          editing ? (
            <AgendamentoEditForm
              key={`${detail.id}-${detail.updatedAt}`}
              initialValues={
                initialValues
              }
              initialOptions={
                initialOptions
              }
              pending={
                mutation.isPending
              }
              serverError={
                serverError
              }
              onCancel={() => {
                mutation.reset();
                setServerError(null);
                setEditing(false);
              }}
              onSubmit={(values) => {
                mutation.mutate(
                  values,
                );
              }}
            />
          ) : (
            <div className="space-y-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <DetailField
                  label="Cliente"
                  value={
                    detail.cliente.nome
                  }
                />

                <DetailField
                  label="Profissional"
                  value={
                    detail.profissional
                      .nome
                  }
                />

                <DetailField
                  label="Servico"
                  value={
                    detail.servico.nome
                  }
                />

                <DetailField
                  label="Unidade"
                  value={
                    detail.unidade.nome
                  }
                />

                <DetailField
                  label="Inicio"
                  value={detailDateFormatter.format(
                    new Date(
                      detail.dataHoraInicio,
                    ),
                  )}
                />

                <DetailField
                  label="Fim"
                  value={detailDateFormatter.format(
                    new Date(
                      detail.dataHoraFim,
                    ),
                  )}
                />

                <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3">
                  <p className="text-xs text-text-muted">
                    Status
                  </p>

                  <div className="mt-2">
                    <AgendaStatusBadge
                      status={
                        detail.status
                      }
                    />
                  </div>
                </div>

                <DetailField
                  label="Telefone do cliente"
                  value={
                    detail.cliente
                      .telefone ??
                    "Nao informado"
                  }
                />
              </div>

              <div className="rounded-xl border border-border-subtle bg-surface-subtle p-4">
                <p className="text-xs text-text-muted">
                  Observacoes
                </p>

                <p className="mt-1 whitespace-pre-wrap text-sm text-text-primary">
                  {detail.observacoes?.trim() ||
                    "Nenhuma observacao registrada."}
                </p>
              </div>

              <AgendamentoStatusActions
                detail={detail}
                canChangeStatus={
                  canChangeStatus
                }
                canCancel={
                  canCancel
                }
              />

              <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={
                    handleClose
                  }
                >
                  Fechar
                </Button>

                {canEdit ? (
                  <Button
                    type="button"
                    onClick={() => {
                      setServerError(null);
                      setEditing(true);
                    }}
                  >
                    <Pencil
                      aria-hidden="true"
                      className="mr-2 size-4"
                    />

                    Editar agendamento
                  </Button>
                ) : null}
              </div>
            </div>
          )
        ) : null}
      </DialogContent>
    </Dialog>
  );
}