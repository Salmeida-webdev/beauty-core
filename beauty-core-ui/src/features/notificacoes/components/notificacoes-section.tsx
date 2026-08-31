"use client";

import {
  type FormEvent,
  useState,
} from "react";
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
import { Input } from "@/components/ui/input";

import {
  canAccessNotifications,
} from "../permissions/notificacoes.permissions";
import {
  notificacoesKeys,
} from "../queries/notificacoes-keys";
import {
  notificacoesQueryOptions,
} from "../queries/notificacoes-query-options";
import {
  archiveNotificacao,
  deleteNotificacao,
  getNotificacoesResumo,
  listNotificacoes,
  listNotificacoesNaoLidas,
  markNotificacaoAsRead,
} from "../services/notificacoes-api";
import type {
  NotificacaoResumo,
  NotificacoesListParams,
} from "../types/notificacoes.types";
import {
  NotificacoesList,
} from "./notificacoes-list";

interface NotificacoesSectionProps {
  role: string | null | undefined;
}

function getErrorMessage(
  error: unknown,
): string {
  return error instanceof Error
    ? error.message
    : "Não foi possível concluir a operação.";
}

export function NotificacoesSection({
  role,
}: NotificacoesSectionProps) {
  const canAccess =
    canAccessNotifications(role);

  const queryClient = useQueryClient();

  const [page, setPage] =
    useState(1);

  const [searchDraft, setSearchDraft] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [onlyUnread, setOnlyUnread] =
    useState(false);

  const [deleteTarget, setDeleteTarget] =
    useState<NotificacaoResumo | null>(
      null,
    );

  const params: NotificacoesListParams = {
    page,
    limit: 20,
    orderBy: "createdAt",
    orderDirection: "desc",
    ...(search
      ? {
          search,
        }
      : {}),
  };

  const allNotificationsQuery = useQuery(
    notificacoesQueryOptions.list(
      () =>
        listNotificacoes(
          params,
        ),
      params,
      canAccess && !onlyUnread,
    ),
  );

  const unreadNotificationsQuery = useQuery(
    notificacoesQueryOptions.naoLidas(
      () =>
        listNotificacoesNaoLidas(
          params,
        ),
      params,
      canAccess && onlyUnread,
    ),
  );

  const listQuery = onlyUnread
    ? unreadNotificationsQuery
    : allNotificationsQuery;

  const summaryQuery = useQuery(
    notificacoesQueryOptions.resumo(
      getNotificacoesResumo,
      canAccess,
    ),
  );

  async function invalidateNotifications() {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey:
          notificacoesKeys.lists(),
      }),
      queryClient.invalidateQueries({
        queryKey:
          notificacoesKeys.resumo(),
      }),
    ]);
  }

  const readMutation = useMutation({
    mutationFn: markNotificacaoAsRead,
    retry: false,
    onSuccess: invalidateNotifications,
  });

  const archiveMutation = useMutation({
    mutationFn: archiveNotificacao,
    retry: false,
    onSuccess: invalidateNotifications,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNotificacao,
    retry: false,

    onSuccess: async () => {
      await invalidateNotifications();
      setDeleteTarget(null);
    },
  });

  const isMutating =
    readMutation.isPending ||
    archiveMutation.isPending ||
    deleteMutation.isPending;

  const mutationError =
    readMutation.error ??
    archiveMutation.error ??
    deleteMutation.error;

  function handleSearch(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setPage(1);
    setSearch(
      searchDraft.trim(),
    );
  }

  if (!canAccess) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">
          Notificações
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui permissão
          para acessar as notificações.
        </p>
      </section>
    );
  }

  const meta = listQuery.data?.meta;
  const summary = summaryQuery.data;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          Notificações
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Histórico do usuário autenticado,
          com leitura e arquivamento individuais.
        </p>
      </div>

      {summaryQuery.isPending && (
        <div
          className="rounded-lg border p-4 text-sm text-muted-foreground"
          role="status"
        >
          Carregando resumo...
        </div>
      )}

      {summary && (
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Total
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {summary.total}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Não lidas
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {summary.naoLidas}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Lidas
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {summary.lidas}
            </p>
          </div>

          <div className="rounded-lg border p-4">
            <p className="text-sm text-muted-foreground">
              Arquivadas
            </p>
            <p className="mt-1 text-2xl font-semibold">
              {summary.arquivadas}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={handleSearch}
        >
          <Input
            value={searchDraft}
            onChange={(event) =>
              setSearchDraft(
                event.target.value,
              )
            }
            placeholder="Buscar por título ou mensagem"
            aria-label="Buscar notificações"
          />

          <Button
            type="submit"
            variant="outline"
          >
            Buscar
          </Button>

          {(search || searchDraft) && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setSearchDraft("");
                setSearch("");
                setPage(1);
              }}
            >
              Limpar
            </Button>
          )}
        </form>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={
              onlyUnread
                ? "default"
                : "outline"
            }
            onClick={() => {
              setOnlyUnread(
                (current) => !current,
              );
              setPage(1);
            }}
          >
            {onlyUnread
              ? "Mostrando não lidas"
              : "Somente não lidas"}
          </Button>
        </div>
      </div>

      {mutationError && (
        <div
          className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
          role="alert"
        >
          {getErrorMessage(
            mutationError,
          )}
        </div>
      )}

      {listQuery.isPending && (
        <div
          className="rounded-lg border p-6 text-sm text-muted-foreground"
          role="status"
        >
          Carregando notificações...
        </div>
      )}

      {listQuery.isError && (
        <div
          className="rounded-lg border border-destructive/40 p-6"
          role="alert"
        >
          <p className="font-medium">
            Não foi possível carregar as notificações.
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-4"
            disabled={listQuery.isFetching}
            onClick={() => {
              void listQuery.refetch();
            }}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {listQuery.data && (
        <>
          <NotificacoesList
            notificacoes={
              listQuery.data.data
            }
            isMutating={isMutating}
            onMarkRead={(notificacao) => {
              readMutation.reset();

              void readMutation.mutateAsync(
                notificacao.id,
              ).catch(() => undefined);
            }}
            onArchive={(notificacao) => {
              archiveMutation.reset();

              void archiveMutation.mutateAsync(
                notificacao.id,
              ).catch(() => undefined);
            }}
            onDelete={(notificacao) => {
              deleteMutation.reset();
              setDeleteTarget(
                notificacao,
              );
            }}
          />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Página {meta?.page ?? 1} de{" "}
              {Math.max(
                meta?.totalPages ?? 0,
                1,
              )} —{" "}
              {meta?.total ?? 0} registros
            </p>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={
                  listQuery.isFetching ||
                  !meta ||
                  meta.page <= 1
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      Math.max(
                        1,
                        current - 1,
                      ),
                  )
                }
              >
                Anterior
              </Button>

              <Button
                type="button"
                variant="outline"
                disabled={
                  listQuery.isFetching ||
                  !meta ||
                  meta.page >=
                    meta.totalPages
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      current + 1,
                  )
                }
              >
                Próxima
              </Button>
            </div>
          </div>
        </>
      )}

      <AlertDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (
            !open &&
            !deleteMutation.isPending
          ) {
            setDeleteTarget(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Excluir notificação?
            </AlertDialogTitle>

            <AlertDialogDescription>
              A exclusão remove definitivamente
              esta notificação do histórico do
              usuário autenticado.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={
                deleteMutation.isPending
              }
            >
              Voltar
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={
                deleteMutation.isPending
              }
              onClick={(event) => {
                event.preventDefault();

                if (!deleteTarget) {
                  return;
                }

                void deleteMutation
                  .mutateAsync(
                    deleteTarget.id,
                  )
                  .catch(
                    () => undefined,
                  );
              }}
            >
              {deleteMutation.isPending
                ? "Excluindo..."
                : "Confirmar exclusão"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}