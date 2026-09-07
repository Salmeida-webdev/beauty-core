"use client";

import { useMemo } from "react";

import { PortalPrivateRoute } from "@/features/portal/auth/portal-private-route";
import { PortalPageContainer } from "@/features/portal/components/portal-page-container";
import {
  PortalEmptyState,
  PortalErrorState,
  PortalLoadingState,
  PortalOfflineState,
} from "@/features/portal/states/portal-state-views";
import { usePortalWhatsappMessagesQuery } from "@/features/portal/query/portal-messages-query";
import { usePortalOnlineStatus } from "@/features/portal/pwa/portal-online-status";

function formatMessageDate(value: string | null | undefined) {
  if (!value) {
    return "Data nÃƒÂ£o informada";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Data nÃƒÂ£o informada";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function maskRecipient(value: string) {
  const trimmed = value.trim();

  if (trimmed.length <= 4) {
    return "Contato protegido";
  }

  return `${trimmed.slice(0, 2)}Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢${trimmed.slice(-2)}`;
}

function PortalMessagesContent() {
  const query = usePortalWhatsappMessagesQuery({
    page: 1,
    limit: 20,
  });

  const isOnline = usePortalOnlineStatus();
  const isOffline =
    !isOnline;

  const messages = useMemo(
    () => query.data?.data ?? [],
    [query.data?.data],
  );

  if (isOffline && !query.data) {
    return (
      <PortalOfflineState
        action={{
          label: "Tentar novamente",
          onClick: () => {
            void query.refetch();
          },
        }}
        description="Verifique sua conexÃƒÂ£o e tente novamente para consultar seu histÃƒÂ³rico."
        title="VocÃƒÂª estÃƒÂ¡ offline"
      />
    );
  }

  if (query.isPending) {
    return (
      <PortalLoadingState
        description="Estamos carregando seu histÃƒÂ³rico de mensagens."
        title="Carregando mensagens"
      />
    );
  }

  if (query.isError) {
    return (
      <PortalErrorState
        action={{
          label: "Tentar novamente",
          onClick: () => {
            void query.refetch();
          },
        }}
        description="NÃƒÂ£o foi possÃƒÂ­vel carregar seu histÃƒÂ³rico de WhatsApp."
        title="Falha ao carregar mensagens"
      />
    );
  }

  if (messages.length === 0) {
    return (
      <PortalEmptyState
        description="Quando houver comunicaÃƒÂ§ÃƒÂµes registradas, elas aparecerÃƒÂ£o nesta ÃƒÂ¡rea."
        title="Nenhuma mensagem encontrada"
      />
    );
  }

  return (
    <section
      aria-labelledby="portal-messages-title"
      className="space-y-6"
    >
      <header className="space-y-2">
        <p className="text-sm font-medium text-primary">
          ComunicaÃƒÂ§ÃƒÂ£o da empresa
        </p>

        <h1
          className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
          id="portal-messages-title"
        >Histórico de WhatsApp</h1>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
          Consulte as mensagens registradas pela empresa. Esta ÃƒÂ¡rea ÃƒÂ© somente
          para leitura.
        </p>
      </header>

      <ol
        aria-label="HistÃƒÂ³rico de mensagens de WhatsApp"
        className="space-y-3"
      >
        {messages.map((message) => (
          <li
            className="rounded-xl border border-border/80 bg-background/70 p-4 shadow-sm sm:p-5"
            key={message.id}
          >
            <article className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    {message.tipo}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Destinatário: {maskRecipient(message.destinatario)}
                  </p>
                </div>

                <span className="inline-flex w-fit rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {message.status}
                </span>
              </div>

              <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
                {message.mensagem}
              </p>

              <time
                className="block text-xs text-muted-foreground"
                dateTime={message.dataEnvio ?? message.createdAt}
              >
                {formatMessageDate(message.dataEnvio ?? message.createdAt)}
              </time>

              {message.erro ? (
                <p className="text-xs text-destructive" role="alert">
                  Registro de falha: {message.erro}
                </p>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function PortalMessagesPage() {
  return (
    <PortalPrivateRoute>
      <PortalPageContainer>
        <PortalMessagesContent />
      </PortalPageContainer>
    </PortalPrivateRoute>
  );
}
