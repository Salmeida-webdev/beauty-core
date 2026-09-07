"use client";

import { Button } from "@/components/ui/button";

import type {
  NotificacaoResumo,
} from "../types/notificacoes.types";
import {
  formatNotificacaoDateTime,
  formatNotificacaoEnumLabel,
} from "../utils/notificacoes-formatters";

interface NotificacoesListProps {
  notificacoes: readonly NotificacaoResumo[];
  isMutating: boolean;
  onMarkRead: (
    notificacao: NotificacaoResumo,
  ) => void;
  onArchive: (
    notificacao: NotificacaoResumo,
  ) => void;
  onDelete: (
    notificacao: NotificacaoResumo,
  ) => void;
}

export function NotificacoesList({
  notificacoes,
  isMutating,
  onMarkRead,
  onArchive,
  onDelete,
}: NotificacoesListProps) {
  if (notificacoes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="font-medium">
          Nenhuma notificação encontrada
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          As notificações do usuário autenticado
          aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {notificacoes.map(
        (notificacao) => (
          <article
            key={notificacao.id}
            className="rounded-lg border p-4"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium">
                    {notificacao.titulo}
                  </h3>

                  <span className="rounded-full border px-2 py-1 text-xs font-medium">
                    {formatNotificacaoEnumLabel(
                      notificacao.status,
                    )}
                  </span>

                  <span className="rounded-full bg-muted px-2 py-1 text-xs">
                    {formatNotificacaoEnumLabel(
                      notificacao.tipo,
                    )}
                  </span>
                </div>

                <p className="whitespace-pre-wrap break-words text-sm text-muted-foreground">
                  {notificacao.mensagem}
                </p>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>
                    Criada:{" "}
                    {formatNotificacaoDateTime(
                      notificacao.createdAt,
                    )}
                  </span>

                  {notificacao.dataLeitura && (
                    <span>
                      Lida:{" "}
                      {formatNotificacaoDateTime(
                        notificacao.dataLeitura,
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2 lg:justify-end">
                {notificacao.status ===
                  "NAO_LIDA" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isMutating}
                    onClick={() =>
                      onMarkRead(notificacao)
                    }
                  >
                    Marcar como lida
                  </Button>
                )}

                {notificacao.status !==
                  "ARQUIVADA" && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    disabled={isMutating}
                    onClick={() =>
                      onArchive(notificacao)
                    }
                  >
                    Arquivar
                  </Button>
                )}

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={isMutating}
                  onClick={() =>
                    onDelete(notificacao)
                  }
                >
                  Excluir
                </Button>
              </div>
            </div>
          </article>
        ),
      )}
    </div>
  );
}