"use client";

import {
  useMemo,
  useState,
} from "react";
import {
  Clock3,
  Laptop,
  LoaderCircle,
  MapPin,
  ShieldCheck,
  Smartphone,
  Trash2,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  useAdminPrivateStateCleanup,
} from "@/features/auth/hooks/use-admin-private-state-cleanup";
import {
  markPendingAdminIntentionalLogout,
} from "@/features/auth/navigation/admin-login-navigation-state";
import {
  listAdminSessions,
  revokeAdminSession,
} from "@/features/auth/services/auth-api";
import {
  clearLocalAdminSession,
} from "@/features/auth/services/auth-session";
import type {
  AdminSession,
} from "@/features/auth/types/auth.types";
import { useAuthStore } from "@/stores/auth-store";

const ADMIN_SESSIONS_QUERY_KEY = [
  "auth",
  "admin-sessions",
] as const;

function formatDateTime(
  value: string,
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "Data indisponível";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  ).format(date);
}

function getSessionDeviceLabel(
  session: AdminSession,
): string {
  return (
    session.dispositivo ??
    session.navegador ??
    "Dispositivo não identificado"
  );
}

function getSessionEnvironment(
  session: AdminSession,
): string {
  const parts = [
    session.sistemaOperacional,
    session.navegador,
  ].filter(
    (
      value,
    ): value is string =>
      Boolean(value),
  );

  if (parts.length === 0) {
    return "Ambiente não identificado";
  }

  return parts.join(" · ");
}

function getSessionIcon(
  session: AdminSession,
) {
  const device =
    session.dispositivo
      ?.toLocaleLowerCase(
        "pt-BR",
      ) ?? "";

  if (
    device.includes("mobile") ||
    device.includes("celular") ||
    device.includes("android") ||
    device.includes("iphone")
  ) {
    return Smartphone;
  }

  return Laptop;
}

export function AdminSessionsPanel() {
  const router = useRouter();
  const queryClient =
    useQueryClient();

  const clearPrivateState =
    useAdminPrivateStateCleanup();

  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const [
    confirmationSessionId,
    setConfirmationSessionId,
  ] = useState<string | null>(
    null,
  );

  const sessionsQuery = useQuery({
    queryKey:
      ADMIN_SESSIONS_QUERY_KEY,
    queryFn: ({
      signal,
    }) =>
      listAdminSessions(
        signal,
      ),
    enabled:
      status === "authenticated" &&
      user !== null,
  });

  const sortedSessions =
    useMemo(() => {
      const sessions =
        sessionsQuery.data ?? [];

      return [...sessions].sort(
        (a, b) => {
          const aCurrent =
            a.id ===
            user?.sessaoId;

          const bCurrent =
            b.id ===
            user?.sessaoId;

          if (
            aCurrent !== bCurrent
          ) {
            return aCurrent
              ? -1
              : 1;
          }

          return (
            new Date(
              b.ultimaAtividade,
            ).getTime() -
            new Date(
              a.ultimaAtividade,
            ).getTime()
          );
        },
      );
    }, [
      sessionsQuery.data,
      user?.sessaoId,
    ]);

  const revokeMutation =
    useMutation({
      mutationFn: (
        sessionId: string,
      ) =>
        revokeAdminSession(
          sessionId,
        ),

      onSuccess: async (
        _response,
        sessionId,
      ) => {
        const isCurrentSession =
          sessionId ===
          user?.sessaoId;

        setConfirmationSessionId(
          null,
        );

        if (isCurrentSession) {
          markPendingAdminIntentionalLogout();

          clearLocalAdminSession();

          await clearPrivateState();

          router.replace(
            "/login",
          );

          router.refresh();

          return;
        }

        await queryClient.invalidateQueries({
          queryKey:
            ADMIN_SESSIONS_QUERY_KEY,
        });

        toast.success(
          "Sessão revogada com sucesso.",
        );
      },

      onError: () => {
        toast.error(
          "Não foi possível revogar a sessão. Tente novamente.",
        );
      },
    });

  if (
    sessionsQuery.isPending
  ) {
    return <LoadingState />;
  }

  if (sessionsQuery.isError) {
    return (
      <ErrorState
        title="Não foi possível carregar as sessões"
        description="O Beauty Core não conseguiu consultar os dispositivos conectados."
        onRetry={() => {
          void sessionsQuery.refetch();
        }}
      />
    );
  }

  if (
    sortedSessions.length === 0
  ) {
    return (
      <EmptyState
        title="Nenhuma sessão encontrada"
        description="Não há sessões administrativas ativas para exibir."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div
        role="status"
        aria-live="polite"
        className="text-body-small text-text-muted"
      >
        {sortedSessions.length}{" "}
        {sortedSessions.length === 1
          ? "sessão ativa"
          : "sessões ativas"}
      </div>

      <div className="grid gap-4">
        {sortedSessions.map(
          (session) => {
            const isCurrentSession =
              session.id ===
              user?.sessaoId;

            const SessionIcon =
              getSessionIcon(
                session,
              );

            const awaitingConfirmation =
              confirmationSessionId ===
              session.id;

            const isRevoking =
              revokeMutation.isPending &&
              revokeMutation.variables ===
                session.id;

            return (
              <Card
                key={session.id}
                data-testid={`admin-session-${session.id}`}
              >
                <CardContent className="p-5 sm:p-6">
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex items-start gap-3">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-medium bg-surface-subtle">
                          <SessionIcon
                            aria-hidden="true"
                            className="size-5 text-text-secondary"
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="text-sm font-semibold text-text-primary">
                              {getSessionDeviceLabel(
                                session,
                              )}
                            </h2>

                            {isCurrentSession && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-success/25 bg-success/10 px-2 py-0.5 text-caption font-semibold text-success">
                                <ShieldCheck
                                  aria-hidden="true"
                                  className="size-3"
                                />

                                Sessão atual
                              </span>
                            )}
                          </div>

                          <p className="mt-1 text-body-small text-text-muted">
                            {getSessionEnvironment(
                              session,
                            )}
                          </p>
                        </div>
                      </div>

                      <dl className="mt-4 grid gap-3 text-body-small text-text-muted sm:grid-cols-2 xl:grid-cols-3">
                        <div className="flex min-w-0 items-center gap-2">
                          <Clock3
                            aria-hidden="true"
                            className="size-4 shrink-0"
                          />

                          <div className="min-w-0">
                            <dt className="sr-only">
                              Última atividade
                            </dt>

                            <dd className="truncate">
                              Ativa em{" "}
                              {formatDateTime(
                                session.ultimaAtividade,
                              )}
                            </dd>
                          </div>
                        </div>

                        <div className="flex min-w-0 items-center gap-2">
                          <MapPin
                            aria-hidden="true"
                            className="size-4 shrink-0"
                          />

                          <div className="min-w-0">
                            <dt className="sr-only">
                              Endereço IP
                            </dt>

                            <dd className="truncate">
                              {session.ip ??
                                "IP não informado"}
                            </dd>
                          </div>
                        </div>

                        <div className="flex min-w-0 items-center gap-2">
                          <Clock3
                            aria-hidden="true"
                            className="size-4 shrink-0"
                          />

                          <div className="min-w-0">
                            <dt className="sr-only">
                              Expiração
                            </dt>

                            <dd className="truncate">
                              Expira em{" "}
                              {formatDateTime(
                                session.expiraEm,
                              )}
                            </dd>
                          </div>
                        </div>
                      </dl>
                    </div>

                    <div className="shrink-0">
                      <Button
                        type="button"
                        variant="outline"
                        disabled={
                          revokeMutation.isPending
                        }
                        aria-busy={
                          isRevoking
                        }
                        className={
                          awaitingConfirmation
                            ? "border-danger/40 text-danger hover:bg-danger/10 hover:text-danger"
                            : undefined
                        }
                        onClick={() => {
                          if (
                            !awaitingConfirmation
                          ) {
                            setConfirmationSessionId(
                              session.id,
                            );

                            return;
                          }

                          revokeMutation.mutate(
                            session.id,
                          );
                        }}
                      >
                        {isRevoking ? (
                          <LoaderCircle
                            aria-hidden="true"
                            className="size-4 animate-spin"
                          />
                        ) : (
                          <Trash2
                            aria-hidden="true"
                            className="size-4"
                          />
                        )}

                        <span>
                          {isRevoking
                            ? "Revogando..."
                            : awaitingConfirmation
                              ? isCurrentSession
                                ? "Confirmar saída"
                                : "Confirmar revogação"
                              : isCurrentSession
                                ? "Encerrar esta sessão"
                                : "Revogar sessão"}
                        </span>
                      </Button>

                      {awaitingConfirmation && (
                        <p className="mt-2 max-w-xs text-caption leading-5 text-text-muted">
                          {isCurrentSession
                            ? "Você será desconectado deste dispositivo."
                            : "O dispositivo perderá o acesso administrativo."}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          },
        )}
      </div>
    </div>
  );
}
