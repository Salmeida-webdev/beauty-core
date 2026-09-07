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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  canSendWhatsAppMessage,
} from "../permissions/whatsapp.permissions";
import {
  whatsappKeys,
} from "../queries/whatsapp-keys";
import {
  whatsappQueryOptions,
} from "../queries/whatsapp-query-options";
import type {
  WhatsappMensagemSendFormValues,
} from "../schemas/whatsapp.schemas";
import {
  listWhatsappMessages,
  sendWhatsappMessage,
} from "../services/whatsapp-api";
import type {
  WhatsappMessagesListParams,
  WhatsappSendResult,
} from "../types/whatsapp.types";
import {
  MensagemWhatsappForm,
} from "../messages/mensagem-whatsapp-form";
import {
  MensagensWhatsappList,
} from "./mensagens-whatsapp-list";

interface MensagensWhatsappSectionProps {
  role: string | null | undefined;
}

function getErrorMessage(
  error: unknown,
): string {
  return error instanceof Error
    ? error.message
    : "Não foi possível concluir a operação.";
}

export function MensagensWhatsappSection({
  role,
}: MensagensWhatsappSectionProps) {
  const canAccess =
    canSendWhatsAppMessage(role);

  const queryClient = useQueryClient();

  const [page, setPage] =
    useState(1);

  const [searchDraft, setSearchDraft] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [formVersion, setFormVersion] =
    useState(0);

  const [lastSend, setLastSend] =
    useState<WhatsappSendResult | null>(
      null,
    );

  const params: WhatsappMessagesListParams = {
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

  const query = useQuery(
    whatsappQueryOptions.mensagensList(
      params,
      () =>
        listWhatsappMessages(
          params,
        ),
      canAccess,
    ),
  );

  const sendMutation = useMutation({
    retry: false,
    mutationFn: sendWhatsappMessage,

    onSuccess: async (result) => {
      setLastSend(result);
      setFormVersion(
        (current) => current + 1,
      );

      setPage(1);

      await queryClient.invalidateQueries({
        queryKey:
          whatsappKeys.mensagens(),
      });
    },
  });

  async function handleSend(
    values: WhatsappMensagemSendFormValues,
  ) {
    setLastSend(null);

    try {
      await sendMutation.mutateAsync(
        values,
      );
    } catch {
      // O estado da mutation mantém o erro.
    }
  }

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
          Mensagens WhatsApp
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui permissão
          para acessar este histórico.
        </p>
      </section>
    );
  }

  const meta = query.data?.meta;

  return (
    <section className="space-y-8">
      <div className="space-y-4 rounded-lg border p-5">
        <div>
          <h2 className="text-lg font-semibold">
            Enviar mensagem
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            O envio é registrado pelo backend
            e processado de forma assíncrona.
          </p>
        </div>

        {sendMutation.isError && (
          <div
            className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
            role="alert"
          >
            {getErrorMessage(
              sendMutation.error,
            )}
          </div>
        )}

        {lastSend && (
          <div
            className="rounded-md border p-3 text-sm"
            role="status"
            aria-live="polite"
          >
            Mensagem registrada para
            processamento assíncrono.
          </div>
        )}

        <MensagemWhatsappForm
          key={formVersion}
          isSubmitting={
            sendMutation.isPending
          }
          onSubmit={handleSend}
        />
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">
            Histórico
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Consulte mensagens registradas
            pela empresa autenticada.
          </p>
        </div>

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
            placeholder="Buscar por destinatário, mensagem ou cliente"
            aria-label="Buscar mensagens"
          />

          <Button
            type="submit"
            variant="outline"
          >
            Buscar
          </Button>

          {(search ||
            searchDraft) && (
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

        {query.isPending && (
          <div
            className="rounded-lg border p-6 text-sm text-muted-foreground"
            role="status"
          >
            Carregando histórico...
          </div>
        )}

        {query.isError && (
          <div
            className="rounded-lg border border-destructive/40 p-6"
            role="alert"
          >
            <p className="font-medium">
              Não foi possível carregar o
              histórico.
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
          <>
            <MensagensWhatsappList
              mensagens={
                query.data.data
              }
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
                    query.isFetching ||
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
                    query.isFetching ||
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
      </div>
    </section>
  );
}
