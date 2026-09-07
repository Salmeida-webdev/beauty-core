"use client";

import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
import {
  useMarkPortalNotificationAsRead,
  usePortalNotificationsQuery,
} from "@/features/portal/query/portal-notifications-query";

export default function PortalNotificationsPage() {
  const notificationsQuery = usePortalNotificationsQuery();
  const markAsRead = useMarkPortalNotificationAsRead();

  return (
    <PortalPrivateRoutePage
      heading="Notificações"
      description="Consulte atualizações importantes relacionadas ao seu atendimento."
    >
      {notificationsQuery.isPending && (
        <div aria-live="polite" role="status">
          Carregando notificações...
        </div>
      )}

      {notificationsQuery.isError && (
        <div aria-live="assertive" role="alert">
          Não foi possível carregar suas notificações.
        </div>
      )}

      {notificationsQuery.isSuccess &&
        (notificationsQuery.data.data.length === 0 ? (
          <section aria-live="polite">
            <h2>Nenhuma notificação</h2>
            <p>Você não possui notificações no momento.</p>
          </section>
        ) : (
          <section
            aria-label="Lista de notificações"
            className="space-y-4"
          >
            {notificationsQuery.data.data.map((notification) => {
              const isRead =
                notification.lida === true ||
                Boolean(notification.readAt);

              return (
                <article
                  key={notification.id}
                  aria-label={
                    isRead
                      ? "Notificação lida"
                      : "Notificação não lida"
                  }
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="space-y-2">
                    <h2 className="font-semibold text-foreground">
                      {notification.titulo ??
                        notification.title ??
                        "Notificação"}
                    </h2>

                    <p className="text-sm leading-6 text-muted-foreground">
                      {notification.mensagem ??
                        notification.message ??
                        "Atualização disponível."}
                    </p>

                    <time
                      className="text-xs text-muted-foreground"
                      dateTime={notification.createdAt}
                    >
                      {new Date(
                        notification.createdAt,
                      ).toLocaleString("pt-BR")}
                    </time>

                    {!isRead && (
                      <button
                        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                        type="button"
                        disabled={markAsRead.isPending}
                        onClick={() =>
                          markAsRead.mutate(notification.id)
                        }
                      >
                        Marcar como lida
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </section>
        ))}
    </PortalPrivateRoutePage>
  );
}
