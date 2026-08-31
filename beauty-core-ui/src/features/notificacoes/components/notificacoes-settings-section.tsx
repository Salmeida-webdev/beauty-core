"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { Button } from "@/components/ui/button";

import {
  canManageNotificationSettings,
} from "../permissions/notificacoes.permissions";
import {
  notificacoesKeys,
} from "../queries/notificacoes-keys";
import {
  notificacoesQueryOptions,
} from "../queries/notificacoes-query-options";
import {
  getConfiguracaoNotificacao,
  updateConfiguracaoNotificacao,
} from "../services/notificacoes-api";
import {
  NotificacoesSettingsForm,
} from "../settings/notificacoes-settings-form";

interface NotificacoesSettingsSectionProps {
  role: string | null | undefined;
}

function getErrorMessage(
  error: unknown,
): string {
  return error instanceof Error
    ? error.message
    : "Não foi possível salvar as configurações.";
}

export function NotificacoesSettingsSection({
  role,
}: NotificacoesSettingsSectionProps) {
  const canManage =
    canManageNotificationSettings(role);

  const queryClient = useQueryClient();

  const query = useQuery(
    notificacoesQueryOptions.configuracao(
      getConfiguracaoNotificacao,
      canManage,
    ),
  );

  const updateMutation = useMutation({
    mutationFn:
      updateConfiguracaoNotificacao,
    retry: false,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey:
          notificacoesKeys.configuracao(),
      });
    },
  });

  if (!canManage) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">
          Configurações de notificações
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui permissão
          para alterar estas configurações.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold">
          Configurações de notificações
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Defina quais categorias de
          notificação ficam habilitadas
          para a empresa.
        </p>
      </div>

      {query.isPending && (
        <div
          className="rounded-lg border p-6 text-sm text-muted-foreground"
          role="status"
        >
          Carregando configurações...
        </div>
      )}

      {query.isError && (
        <div
          className="rounded-lg border border-destructive/40 p-6"
          role="alert"
        >
          <p className="font-medium">
            Não foi possível carregar
            as configurações.
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

      {updateMutation.isError && (
        <div
          className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
          role="alert"
        >
          {getErrorMessage(
            updateMutation.error,
          )}
        </div>
      )}

      {updateMutation.isSuccess && (
        <div
          className="rounded-md border p-3 text-sm"
          role="status"
          aria-live="polite"
        >
          Configurações atualizadas
          com sucesso.
        </div>
      )}

      {query.data && (
        <NotificacoesSettingsForm
          configuracao={query.data}
          isSubmitting={
            updateMutation.isPending
          }
          onSubmit={async (values) => {
            updateMutation.reset();

            try {
              await updateMutation.mutateAsync(
                values,
              );
            } catch {
              // A mutation mantém o erro para apresentação.
            }
          }}
        />
      )}
    </section>
  );
}