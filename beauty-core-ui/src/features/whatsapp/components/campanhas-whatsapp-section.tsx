"use client";

import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

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

import {
  canManageCampaigns,
} from "../permissions/whatsapp.permissions";
import {
  whatsappKeys,
} from "../queries/whatsapp-keys";
import {
  whatsappQueryOptions,
} from "../queries/whatsapp-query-options";
import type {
  CampanhaWhatsappFormValues,
} from "../schemas/whatsapp.schemas";
import {
  cancelWhatsappCampaign,
  createWhatsappCampaign,
  listWhatsappCampaigns,
  updateWhatsappCampaign,
} from "../services/whatsapp-api";
import type {
  CampanhaWhatsappCreateResult,
  CampanhaWhatsappResumo,
} from "../types/whatsapp.types";
import {
  CampanhaWhatsappFormDialog,
} from "./campanha-whatsapp-form-dialog";
import {
  CampanhasWhatsappList,
} from "./campanhas-whatsapp-list";

interface CampanhasWhatsappSectionProps {
  role: string | null | undefined;
}

function getErrorMessage(
  error: unknown,
): string | null {
  return error instanceof Error
    ? error.message
    : null;
}

export function CampanhasWhatsappSection({
  role,
}: CampanhasWhatsappSectionProps) {
  const queryClient = useQueryClient();

  const canManage =
    canManageCampaigns(role);

  const [formOpen, setFormOpen] =
    useState(false);

  const [
    editingCampaign,
    setEditingCampaign,
  ] = useState<CampanhaWhatsappResumo | null>(
    null,
  );

  const [
    cancelTarget,
    setCancelTarget,
  ] = useState<CampanhaWhatsappResumo | null>(
    null,
  );

  const [
    lastCreateResult,
    setLastCreateResult,
  ] = useState<CampanhaWhatsappCreateResult | null>(
    null,
  );

  const query = useQuery(
    whatsappQueryOptions.campanhas(
      listWhatsappCampaigns,
      canManage,
    ),
  );

  async function invalidateCampaigns() {
    await queryClient.invalidateQueries({
      queryKey:
        whatsappKeys.campanhas(),
    });
  }

  const createMutation = useMutation({
    retry: false,
    mutationFn: createWhatsappCampaign,

    onSuccess: async (result) => {
      setLastCreateResult(result);
      await invalidateCampaigns();
      setFormOpen(false);
      setEditingCampaign(null);
    },
  });

  const updateMutation = useMutation({
    retry: false,
    mutationFn: ({
      id,
      values,
    }: {
      id: string;
      values: CampanhaWhatsappFormValues;
    }) =>
      updateWhatsappCampaign(
        id,
        values,
      ),

    onSuccess: async () => {
      await invalidateCampaigns();
      setFormOpen(false);
      setEditingCampaign(null);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: cancelWhatsappCampaign,
    retry: false,

    onSuccess: async () => {
      await invalidateCampaigns();
      setCancelTarget(null);
    },
  });

  const isSubmitting =
    createMutation.isPending ||
    updateMutation.isPending;

  const formError =
    createMutation.error ??
    updateMutation.error;

  async function handleSubmit(
    values: CampanhaWhatsappFormValues,
  ) {
    try {
      if (editingCampaign) {
        await updateMutation.mutateAsync({
          id: editingCampaign.id,
          values,
        });

        return;
      }

      await createMutation.mutateAsync(
        values,
      );
    } catch {
      // A mutation mantém o erro para apresentação.
    }
  }

  async function handleCancelCampaign() {
    if (!cancelTarget) {
      return;
    }

    try {
      await cancelMutation.mutateAsync(
        cancelTarget.id,
      );
    } catch {
      // A mutation mantém o erro para apresentação.
    }
  }

  if (!canManage) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">
          Campanhas WhatsApp
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui permissão
          para gerenciar campanhas.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Campanhas WhatsApp
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Consulte, crie, edite e altere
            administrativamente o status das
            campanhas registradas.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => {
            setEditingCampaign(null);
            setLastCreateResult(null);
            createMutation.reset();
            updateMutation.reset();
            setFormOpen(true);
          }}
        >
          Nova campanha
        </Button>
      </div>

      {lastCreateResult && (
        <div
          className="rounded-md border p-3 text-sm"
          role="status"
          aria-live="polite"
        >
          Campanha criada e aceita para
          processamento assíncrono pelo backend.
          Isso não confirma envio a destinatários.
        </div>
      )}

      {cancelMutation.isError && (
        <div
          className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
          role="alert"
        >
          {getErrorMessage(
            cancelMutation.error,
          ) ??
            "Não foi possível cancelar a campanha."}
        </div>
      )}

      {query.isPending && (
        <div
          className="rounded-lg border p-6 text-sm text-muted-foreground"
          role="status"
        >
          Carregando campanhas...
        </div>
      )}

      {query.isError && (
        <div
          className="rounded-lg border border-destructive/40 p-6"
          role="alert"
        >
          <p className="font-medium">
            Não foi possível carregar as campanhas.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            disabled={query.isFetching}
            onClick={() => {
              void query.refetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {query.data && (
        <CampanhasWhatsappList
          campanhas={query.data}
          canManage={canManage}
          onEdit={(campanha) => {
            setLastCreateResult(null);
            createMutation.reset();
            updateMutation.reset();
            setEditingCampaign(campanha);
            setFormOpen(true);
          }}
          onCancel={(campanha) => {
            cancelMutation.reset();
            setCancelTarget(campanha);
          }}
        />
      )}

      <CampanhaWhatsappFormDialog
        open={formOpen}
        campanha={editingCampaign}
        isSubmitting={isSubmitting}
        errorMessage={
          getErrorMessage(formError)
        }
        onOpenChange={(open) => {
          if (isSubmitting) {
            return;
          }

          setFormOpen(open);

          if (!open) {
            setEditingCampaign(null);
            createMutation.reset();
            updateMutation.reset();
          }
        }}
        onSubmit={handleSubmit}
      />

      <AlertDialog
        open={Boolean(cancelTarget)}
        onOpenChange={(open) => {
          if (
            !open &&
            !cancelMutation.isPending
          ) {
            setCancelTarget(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancelar campanha?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Esta operação altera o status
              administrativo da campanha para
              Cancelada. Ela não confirma a remoção
              ou interrupção física de um job BullMQ
              que já tenha sido enfileirado.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={
                cancelMutation.isPending
              }
            >
              Voltar
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                cancelMutation.isPending
              }
              onClick={(event) => {
                event.preventDefault();

                void handleCancelCampaign();
              }}
            >
              {cancelMutation.isPending
                ? "Cancelando..."
                : "Confirmar cancelamento"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
