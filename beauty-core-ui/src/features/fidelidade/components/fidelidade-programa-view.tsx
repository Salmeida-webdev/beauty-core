"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/auth-store";

import { ConfiguracaoFidelidadeForm } from "../forms/configuracao-fidelidade-form";
import { NivelFidelidadeForm } from "../forms/nivel-fidelidade-form";
import type { NivelFidelidadePayload } from "../forms/nivel-fidelidade-form.schema";
import { useFidelidadePrograma } from "../hooks/use-fidelidade-programa";
import {
  canAccessLoyalty,
  canManageLevels,
  canManageLoyaltySettings,
  canReadLoyaltySettings,
} from "../permissions/fidelidade-permissions";
import type { NivelFidelidade } from "../types/fidelidade.types";
import { formatPontos } from "../utils/fidelidade-formatters";

function getHttpStatus(error: unknown): number | null {
  if (
    typeof error !== "object" ||
    error === null ||
    !("response" in error)
  ) {
    return null;
  }

  const response = Reflect.get(error, "response");

  if (
    typeof response !== "object" ||
    response === null ||
    !("status" in response)
  ) {
    return null;
  }

  const status = Reflect.get(response, "status");

  return typeof status === "number" ? status : null;
}

export function FidelidadeProgramaView() {
  const role = useAuthStore(
    (state) => state.user?.role ?? null,
  );

  const readConfiguracao =
    canReadLoyaltySettings(role);

  const manageConfiguracao =
    canManageLoyaltySettings(role);

  const readNiveis =
    canAccessLoyalty(role);

  const manageNiveis =
    canManageLevels(role);

  const [editingNivel, setEditingNivel] =
    useState<NivelFidelidade | null>(null);

  const [removeId, setRemoveId] =
    useState<string | null>(null);

  const {
    configuracaoQuery,
    niveisQuery,
    createConfiguracaoMutation,
    updateConfiguracaoMutation,
    createNivelMutation,
    updateNivelMutation,
    removeNivelMutation,
  } = useFidelidadePrograma({
    readConfiguracao,
    readNiveis,
  });

  const configuracaoAusente =
    configuracaoQuery.isError &&
    getHttpStatus(configuracaoQuery.error) === 404;

  return (
    <div className="grid gap-6">
      {readConfiguracao ? (
        <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold">
            Configuração do programa
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            O backend permanece autoridade das regras.
          </p>

          {configuracaoQuery.isPending ? (
            <div
              aria-busy="true"
              className="mt-5 h-32 animate-pulse rounded-lg bg-muted/40"
            />
          ) : null}

          {configuracaoAusente ? (
            <div className="mt-5">
              <p className="font-medium">
                Configuração ainda não cadastrada
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Escolha explicitamente os valores obrigatórios.
              </p>

              {manageConfiguracao ? (
                <ConfiguracaoFidelidadeForm
                  isSubmitting={
                    createConfiguracaoMutation.isPending
                  }
                  onSubmit={async (payload) => {
                    await createConfiguracaoMutation.mutateAsync(
                      payload,
                    );
                  }}
                />
              ) : null}
            </div>
          ) : null}

          {configuracaoQuery.isError &&
          !configuracaoAusente ? (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-destructive/30 p-4"
            >
              <p>
                Não foi possível carregar a configuração.
              </p>

              <button
                type="button"
                onClick={() => {
                  void configuracaoQuery.refetch();
                }}
                className="mt-3 min-h-10 rounded-md border px-4 py-2 text-sm"
              >
                Tentar novamente
              </button>
            </div>
          ) : null}

          {configuracaoQuery.data ? (
            <>
              <dl className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border p-3">
                  <dt className="text-xs text-muted-foreground">
                    Pontos por real
                  </dt>
                  <dd className="mt-1 font-medium">
                    {configuracaoQuery.data.pontosPorReal}
                  </dd>
                </div>

                <div className="rounded-lg border p-3">
                  <dt className="text-xs text-muted-foreground">
                    Pontos para resgate
                  </dt>
                  <dd className="mt-1 font-medium">
                    {formatPontos(
                      configuracaoQuery.data
                        .pontosParaResgate,
                    )}
                  </dd>
                </div>

                <div className="rounded-lg border p-3">
                  <dt className="text-xs text-muted-foreground">
                    Valor de resgate
                  </dt>
                  <dd className="mt-1 font-medium">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(
                      configuracaoQuery.data.valorResgate,
                    )}
                  </dd>
                </div>
              </dl>

              <p className="mt-3 text-xs text-muted-foreground">
                Estes campos são somente leitura porque não
                pertencem ao DTO atual de configuração.
              </p>

              {manageConfiguracao ? (
                <ConfiguracaoFidelidadeForm
                  key={configuracaoQuery.data.updatedAt}
                  configuracao={configuracaoQuery.data}
                  isSubmitting={
                    updateConfiguracaoMutation.isPending
                  }
                  onSubmit={async (payload) => {
                    await updateConfiguracaoMutation.mutateAsync(
                      payload,
                    );
                  }}
                />
              ) : (
                <p className="mt-5 text-sm text-muted-foreground">
                  Seu perfil possui acesso somente de leitura à
                  configuração.
                </p>
              )}
            </>
          ) : null}

          {createConfiguracaoMutation.isError ||
          updateConfiguracaoMutation.isError ? (
            <p
              role="alert"
              className="mt-4 text-sm text-destructive"
            >
              Não foi possível salvar a configuração.
            </p>
          ) : null}
        </section>
      ) : null}

      {readNiveis ? (
        <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold">
            Níveis de fidelidade
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Nenhum nível padrão é criado pelo frontend.
          </p>

          {manageNiveis && !editingNivel ? (
            <div className="mt-5">
              <h3 className="mb-3 font-medium">
                Novo nível
              </h3>

              <NivelFidelidadeForm
                isSubmitting={
                  createNivelMutation.isPending
                }
                onSubmit={async (
                  payload: NivelFidelidadePayload,
                ) => {
                  await createNivelMutation.mutateAsync(
                    payload,
                  );
                }}
              />
            </div>
          ) : null}

          {editingNivel ? (
            <div className="mt-5">
              <h3 className="mb-3 font-medium">
                Editar nível
              </h3>

              <NivelFidelidadeForm
                key={editingNivel.id}
                nivel={editingNivel}
                isSubmitting={
                  updateNivelMutation.isPending
                }
                onSubmit={async (
                  payload: NivelFidelidadePayload,
                ) => {
                  await updateNivelMutation.mutateAsync({
                    id: editingNivel.id,
                    payload,
                  });

                  setEditingNivel(null);
                }}
                onCancel={() => {
                  setEditingNivel(null);
                }}
              />
            </div>
          ) : null}

          {niveisQuery.isPending ? (
            <div
              aria-busy="true"
              className="mt-5 h-32 animate-pulse rounded-lg bg-muted/40"
            />
          ) : null}

          {niveisQuery.isError ? (
            <div
              role="alert"
              className="mt-5 rounded-lg border border-destructive/30 p-4"
            >
              <p>
                Não foi possível carregar os níveis.
              </p>

              <button
                type="button"
                onClick={() => {
                  void niveisQuery.refetch();
                }}
                className="mt-3 min-h-10 rounded-md border px-4 py-2 text-sm"
              >
                Tentar novamente
              </button>
            </div>
          ) : null}

          {niveisQuery.data?.length === 0 ? (
            <div className="mt-5 rounded-lg border p-5 text-center">
              <p className="font-medium">
                Nenhum nível cadastrado
              </p>
            </div>
          ) : null}

          {niveisQuery.data &&
          niveisQuery.data.length > 0 ? (
            <ul
              className="mt-5 grid gap-3"
              aria-label="Níveis de fidelidade"
            >
              {niveisQuery.data.map((nivel) => (
                <li
                  key={nivel.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold">
                        {nivel.nome}
                      </h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        A partir de{" "}
                        {formatPontos(nivel.pontosMinimos)}
                      </p>

                      <p className="mt-2 text-sm">
                        {nivel.beneficios?.trim() ||
                          "Sem benefícios informados."}
                      </p>
                    </div>

                    {manageNiveis ? (
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingNivel(nivel);
                          }}
                          className="min-h-10 rounded-md border px-3 py-2 text-sm"
                        >
                          Editar
                        </button>

                        {removeId === nivel.id ? (
                          <>
                            <button
                              type="button"
                              disabled={
                                removeNivelMutation.isPending
                              }
                              onClick={() => {
                                void removeNivelMutation
                                  .mutateAsync(nivel.id)
                                  .then(() => {
                                    setRemoveId(null);
                                  });
                              }}
                              className="min-h-10 rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground disabled:opacity-60"
                            >
                              Confirmar remoção
                            </button>

                            <button
                              type="button"
                              disabled={
                                removeNivelMutation.isPending
                              }
                              onClick={() => {
                                setRemoveId(null);
                              }}
                              className="min-h-10 rounded-md border px-3 py-2 text-sm"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setRemoveId(nivel.id);
                            }}
                            className="min-h-10 rounded-md border px-3 py-2 text-sm"
                          >
                            Remover
                          </button>
                        )}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {createNivelMutation.isError ||
          updateNivelMutation.isError ||
          removeNivelMutation.isError ? (
            <p
              role="alert"
              className="mt-4 text-sm text-destructive"
            >
              Não foi possível concluir a operação do nível.
            </p>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
