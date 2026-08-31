"use client";

import {
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Button,
} from "@/components/ui/button";

import {
  AutomacaoEventoForm,
} from "../forms/automacao-evento-form";
import {
  canOperateAutomations,
  canViewAutomationEvents,
} from "../permissions/automacoes.permissions";
import {
  automacoesKeys,
} from "../queries/automacoes-keys";
import {
  automacoesQueryOptions,
} from "../queries/automacoes-query-options";
import {
  listarAutomacaoEventos,
  processarAutomacaoEvento,
  testarAutomacaoAniversario,
  testarAutomacaoRelatorio,
} from "../services/automacoes-api";
import type {
  AutomacaoEventoFormValues,
  AutomacaoTesteResultado,
  ProcessarEventoResultado,
} from "../types/automacoes.types";
import {
  formatAutomacaoEnumLabel,
} from "../utils/automacoes-formatters";

interface AutomacoesOperacionaisSectionProps {
  role: string | null | undefined;
}

type Feedback = {
  kind: "success" | "info";
  message: string;
};

function getProcessFeedback(
  result: ProcessarEventoResultado,
): Feedback {
  if (result.notificacaoGerada) {
    return {
      kind: "success",
      message:
        "Evento processado e notificação enfileirada.",
    };
  }

  return {
    kind: "info",
    message:
      result.motivo ??
      "Evento processado sem geração de notificação.",
  };
}

function getTestFeedback(
  result: AutomacaoTesteResultado,
  label: string,
): Feedback {
  return {
    kind: "success",
    message:
      `${label} enfileirado com sucesso na fila ${result.queue}.`,
  };
}

function OperationError({
  error,
}: {
  error: unknown;
}) {
  return (
    <div
      className="rounded-md border border-destructive/40 p-3 text-sm text-destructive"
      role="alert"
    >
      {error instanceof Error
        ? error.message
        : "Não foi possível executar a operação."}
    </div>
  );
}

export function AutomacoesOperacionaisSection({
  role,
}: AutomacoesOperacionaisSectionProps) {
  const canOperate =
    canOperateAutomations(role);

  const canViewEvents =
    canViewAutomationEvents(role);

  const queryClient = useQueryClient();

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  const eventsQuery = useQuery(
    automacoesQueryOptions.eventos(
      listarAutomacaoEventos,
      canViewEvents,
    ),
  );

  const processMutation = useMutation({
    mutationFn:
      processarAutomacaoEvento,
    retry: false,

    onSuccess: async (result) => {
      setFeedback(
        getProcessFeedback(result),
      );

      await queryClient.invalidateQueries({
        queryKey:
          automacoesKeys.eventos(),
      });
    },
  });

  const birthdayMutation = useMutation({
    mutationFn:
      testarAutomacaoAniversario,
    retry: false,

    onSuccess: (result) => {
      setFeedback(
        getTestFeedback(
          result,
          "Teste de aniversário",
        ),
      );
    },
  });

  const reportMutation = useMutation({
    mutationFn:
      testarAutomacaoRelatorio,
    retry: false,

    onSuccess: (result) => {
      setFeedback(
        getTestFeedback(
          result,
          "Teste de relatório",
        ),
      );
    },
  });

  const anyOperationPending =
    processMutation.isPending ||
    birthdayMutation.isPending ||
    reportMutation.isPending;

  if (!canOperate && !canViewEvents) {
    return (
      <section className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">
          Automações operacionais
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui permissão
          para acessar estas operações.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">
          Automações operacionais
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Ferramentas administrativas
          expostas pelo backend para
          processamento e diagnóstico.
        </p>
      </div>

      {feedback && (
        <div
          className="rounded-md border p-3 text-sm"
          role="status"
          aria-live="polite"
        >
          {feedback.message}
        </div>
      )}

      {(
        processMutation.isError ||
        birthdayMutation.isError ||
        reportMutation.isError
      ) && (
        <OperationError
          error={
            processMutation.error ??
            birthdayMutation.error ??
            reportMutation.error
          }
        />
      )}

      {canOperate && (
        <div className="space-y-6">
          <div className="rounded-lg border p-5">
            <h3 className="font-semibold">
              Processar evento
            </h3>

            <p className="mb-4 mt-1 text-sm text-muted-foreground">
              Processa manualmente um
              evento interno real.
            </p>

            <AutomacaoEventoForm
              isSubmitting={
                processMutation.isPending
              }
              onSubmit={async (
                values:
                  AutomacaoEventoFormValues,
              ) => {
                setFeedback(null);
                processMutation.reset();

                await processMutation.mutateAsync(
                  values,
                );
              }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border p-5">
              <h3 className="font-semibold">
                Teste de aniversário
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Enfileira a rotina
                administrativa de teste
                de aniversário.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    disabled={anyOperationPending}
                  >
                    Executar teste
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Executar teste de aniversário?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      O backend criará um job
                      real na fila de aniversários.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={(event) => {
                        event.preventDefault();
                        setFeedback(null);
                        birthdayMutation.reset();

                        void birthdayMutation.mutateAsync();
                      }}
                    >
                      Confirmar teste
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>

            <div className="rounded-lg border p-5">
              <h3 className="font-semibold">
                Teste de relatório
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Enfileira o teste real do
                relatório financeiro.
              </p>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="mt-4"
                    disabled={anyOperationPending}
                  >
                    Executar teste
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Executar teste de relatório?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      O backend criará um job
                      real na fila de relatórios.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancelar
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={(event) => {
                        event.preventDefault();
                        setFeedback(null);
                        reportMutation.reset();

                        void reportMutation.mutateAsync();
                      }}
                    >
                      Confirmar teste
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      )}

      {canViewEvents && (
        <div className="space-y-4 rounded-lg border p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h3 className="font-semibold">
                Eventos recentes
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Monitoramento efêmero da
                instância atual. Não é
                histórico persistido e pode
                ser perdido em reinicializações
                ou deploys.
              </p>
            </div>

            <Button
              type="button"
              variant="outline"
              disabled={eventsQuery.isFetching}
              onClick={() => {
                void eventsQuery.refetch();
              }}
            >
              {eventsQuery.isFetching
                ? "Atualizando..."
                : "Atualizar"}
            </Button>
          </div>

          {eventsQuery.isPending && (
            <div
              className="rounded-md border p-4 text-sm text-muted-foreground"
              role="status"
            >
              Carregando eventos...
            </div>
          )}

          {eventsQuery.isError && (
            <div
              className="rounded-md border border-destructive/40 p-4"
              role="alert"
            >
              <p className="text-sm">
                Não foi possível carregar
                os eventos recentes.
              </p>
            </div>
          )}

          {eventsQuery.data && (
            <>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">
                    Eventos
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    {eventsQuery.data.total}
                  </p>
                </div>

                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">
                    Tipos
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    {
                      Object.keys(
                        eventsQuery.data.porTipo,
                      ).length
                    }
                  </p>
                </div>

                <div className="rounded-md border p-3">
                  <p className="text-xs text-muted-foreground">
                    Módulos
                  </p>

                  <p className="mt-1 text-xl font-semibold">
                    {
                      Object.keys(
                        eventsQuery.data.porModulo,
                      ).length
                    }
                  </p>
                </div>
              </div>

              {eventsQuery.data.eventos.length ===
              0 ? (
                <div className="rounded-md border p-5 text-sm text-muted-foreground">
                  Nenhum evento registrado
                  nesta instância.
                </div>
              ) : (
                <div className="grid gap-3">
                  {eventsQuery.data.eventos.map(
                    (evento, index) => (
                      <article
                        key={`${evento.tipo}-${evento.modulo}-${index}`}
                        className="rounded-md border p-4"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">
                            {formatAutomacaoEnumLabel(
                              evento.tipo,
                            )}
                          </span>

                          <span className="rounded-full border px-2 py-0.5 text-xs">
                            {evento.modulo}
                          </span>
                        </div>

                        {evento.titulo && (
                          <p className="mt-2 text-sm font-medium">
                            {evento.titulo}
                          </p>
                        )}

                        {evento.mensagem && (
                          <p className="mt-1 text-sm text-muted-foreground">
                            {evento.mensagem}
                          </p>
                        )}
                      </article>
                    ),
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}