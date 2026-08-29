"use client";

import {
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Ban } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { agendamentosKeys } from "@/features/agendamentos/queries/agendamentos-keys";
import { agendamentosApi } from "@/features/agendamentos/services/agendamentos-api";
import type { AgendamentoDetail } from "@/features/agendamentos/types/agendamentos-api.types";
import {
  AGENDAMENTO_STATUSES,
  type AgendamentoStatus,
} from "@/features/agendamentos/types/agendamentos-types";
import { formatAgendaStatusLabel } from "@/features/agendamentos/utils/agenda-calendar";
import { normalizeApiError } from "@/services/api/normalize-api-error";

export const STATUS_CHANGE_OPTIONS =
  AGENDAMENTO_STATUSES.filter(
    (
      status,
    ): status is Exclude<
      AgendamentoStatus,
      "CANCELADO"
    > =>
      status !== "CANCELADO",
  );

type AgendamentoStatusActionsProps = {
  detail: AgendamentoDetail;
  canChangeStatus: boolean;
  canCancel: boolean;
};

export function AgendamentoStatusActions({
  detail,
  canChangeStatus,
  canCancel,
}: AgendamentoStatusActionsProps) {
  const queryClient =
    useQueryClient();

  const [
    pendingStatus,
    setPendingStatus,
  ] = useState<
    AgendamentoStatus | null
  >(null);

  const [
    cancelOpen,
    setCancelOpen,
  ] = useState(false);

  const [
    feedback,
    setFeedback,
  ] = useState<
    string | null
  >(null);

  const [
    actionError,
    setActionError,
  ] = useState<
    string | null
  >(null);

  async function refreshCaches(
    updated: AgendamentoDetail,
  ) {
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
  }

  const statusMutation =
    useMutation({
      mutationFn: (
        status: AgendamentoStatus,
      ) =>
        agendamentosApi.changeStatus(
          detail.id,
          status,
        ),

      retry: false,

      onSuccess: async (
        updated,
      ) => {
        setActionError(null);
        setPendingStatus(null);

        await refreshCaches(
          updated,
        );

        setFeedback(
          `Status alterado para ${formatAgendaStatusLabel(
            updated.status,
          )}.`,
        );
      },

      onError: (error) => {
        const normalized =
          normalizeApiError(
            error,
          );

        setFeedback(null);
        setActionError(
          normalized.message,
        );
      },
    });

  const cancelMutation =
    useMutation({
      mutationFn: () =>
        agendamentosApi.cancel(
          detail.id,
        ),

      retry: false,

      onSuccess: async (
        updated,
      ) => {
        setActionError(null);
        setCancelOpen(false);

        await refreshCaches(
          updated,
        );

        setFeedback(
          "Agendamento cancelado.",
        );
      },

      onError: (error) => {
        const normalized =
          normalizeApiError(
            error,
          );

        setFeedback(null);
        setActionError(
          normalized.message,
        );
      },
    });

  if (
    !canChangeStatus &&
    !canCancel
  ) {
    return null;
  }

  const pending =
    statusMutation.isPending ||
    cancelMutation.isPending;

  return (
    <section
      aria-labelledby="agendamento-status-actions-title"
      className="space-y-4 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle"
    >
      <div>
        <h3
          id="agendamento-status-actions-title"
          className="font-semibold text-text-primary"
        >
          Status do agendamento
        </h3>

        <p className="mt-1 text-sm text-text-muted">
          Status atual:{" "}
          <strong className="font-medium text-text-primary">
            {formatAgendaStatusLabel(
              detail.status,
            )}
          </strong>
        </p>
      </div>

      {feedback ? (
        <p
          role="status"
          className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-text-primary"
        >
          {feedback}
        </p>
      ) : null}

      {actionError ? (
        <p
          role="alert"
          className="rounded-lg border border-danger/25 bg-danger/10 p-3 text-sm text-danger"
        >
          {actionError}
        </p>
      ) : null}

      {canChangeStatus ? (
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">
            Alterar status
          </p>

          <div className="flex flex-wrap gap-2">
            {STATUS_CHANGE_OPTIONS.map(
              (status) => {
                const current =
                  detail.status ===
                  status;

                return (
                  <Button
                    key={status}
                    type="button"
                    size="sm"
                    variant={
                      current
                        ? "secondary"
                        : "outline"
                    }
                    aria-pressed={
                      current
                    }
                    disabled={
                      current ||
                      pending
                    }
                    onClick={() => {
                      setFeedback(null);
                      setActionError(
                        null,
                      );
                      setPendingStatus(
                        status,
                      );
                    }}
                  >
                    {formatAgendaStatusLabel(
                      status,
                    )}
                  </Button>
                );
              },
            )}
          </div>

          <p className="text-xs text-text-muted">
            O frontend nao aplica uma matriz de transicoes. A API continua sendo a autoridade sobre o status aceito.
          </p>
        </div>
      ) : null}

      {canCancel ? (
        <div className="border-t border-border-subtle pt-4">
          <Button
            type="button"
            variant="destructive"
            disabled={
              pending ||
              detail.status ===
                "CANCELADO"
            }
            onClick={() => {
              setFeedback(null);
              setActionError(null);
              setCancelOpen(true);
            }}
          >
            <Ban
              aria-hidden="true"
              className="mr-2 size-4"
            />

            {detail.status ===
            "CANCELADO"
              ? "Agendamento cancelado"
              : "Cancelar agendamento"}
          </Button>

          <p className="mt-2 text-xs text-text-muted">
            O cancelamento preserva o registro e utiliza a rota dedicada do backend.
          </p>
        </div>
      ) : null}

      <AlertDialog
        open={
          pendingStatus !==
          null
        }
        onOpenChange={(
          open,
        ) => {
          if (!open) {
            setPendingStatus(
              null,
            );
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmar alteracao de status
            </AlertDialogTitle>

            <AlertDialogDescription>
              {pendingStatus
                ? `O status sera alterado de ${formatAgendaStatusLabel(
                    detail.status,
                  )} para ${formatAgendaStatusLabel(
                    pendingStatus,
                  )}.`
                : "Confirme a alteracao de status."}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Voltar
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                statusMutation.isPending
              }
              onClick={() => {
                if (
                  pendingStatus
                ) {
                  statusMutation.mutate(
                    pendingStatus,
                  );
                }
              }}
            >
              Confirmar status
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={cancelOpen}
        onOpenChange={
          setCancelOpen
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Confirmar cancelamento
            </AlertDialogTitle>

            <AlertDialogDescription>
              O agendamento sera marcado como cancelado, mas o registro permanecera preservado para historico, auditoria e rastreabilidade.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Manter agendamento
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                cancelMutation.isPending
              }
              onClick={() => {
                cancelMutation.mutate();
              }}
            >
              Confirmar cancelamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}