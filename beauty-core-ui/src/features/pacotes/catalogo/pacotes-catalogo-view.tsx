"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/auth-store";

import {
  canAccessPackages,
  canManagePackages,
} from "../permissions/pacotes-permissions";
import { PacoteForm } from "./pacote-form";
import type { PacotePayload } from "./pacote-form.schema";
import { usePacotesCatalogo } from "./use-pacotes-catalogo";

function formatCurrency(
  value: number,
): string {
  return new Intl.NumberFormat(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL",
    },
  ).format(value);
}

export function PacotesCatalogoView() {
  const role = useAuthStore(
    (state) => state.user?.role ?? null,
  );

  const canRead =
    canAccessPackages(role);

  const canManage =
    canManagePackages(role);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [inativarId, setInativarId] =
    useState<string | null>(null);

  const {
    query,
    createMutation,
    updateMutation,
    inativarMutation,
  } = usePacotesCatalogo({
    enabled: canRead,
  });

  if (!canRead) {
    return (
      <section className="rounded-xl border bg-card p-5">
        <h1 className="text-2xl font-semibold">
          Pacotes
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Seu perfil não possui acesso ao catálogo administrativo de pacotes.
        </p>
      </section>
    );
  }

  const editing =
    query.data?.find(
      (pacote) =>
        pacote.id === editingId,
    ) ?? null;

  return (
    <div className="grid gap-6">
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          Gestão comercial
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight">
          Pacotes
        </h1>

        <p className="mt-2 max-w-3xl text-sm text-muted-foreground">
          Cadastre e mantenha o catálogo de pacotes. Atribuição a clientes e consumo de sessões serão tratados separadamente.
        </p>
      </header>

      {canManage && !editing ? (
        <section className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">
            Novo pacote
          </h2>

          <div className="mt-4">
            <PacoteForm
              isSubmitting={
                createMutation.isPending
              }
              onSubmit={async (
                payload: PacotePayload,
              ) => {
                await createMutation.mutateAsync(
                  payload,
                );
              }}
            />
          </div>
        </section>
      ) : null}

      {editing ? (
        <section className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold">
            Editar pacote
          </h2>

          <div className="mt-4">
            <PacoteForm
              key={editing.id}
              pacote={editing}
              isSubmitting={
                updateMutation.isPending
              }
              onSubmit={async (
                payload: PacotePayload,
              ) => {
                await updateMutation.mutateAsync({
                  id: editing.id,
                  payload,
                });

                setEditingId(null);
              }}
              onCancel={() => {
                setEditingId(null);
              }}
            />
          </div>
        </section>
      ) : null}

      <section className="rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">
          Catálogo
        </h2>

        {query.isPending ? (
          <div
            aria-busy="true"
            className="mt-5 h-40 animate-pulse rounded-lg bg-muted/40"
          />
        ) : null}

        {query.isError ? (
          <div
            role="alert"
            className="mt-5 rounded-lg border border-destructive/30 p-4"
          >
            <p>
              Não foi possível carregar os pacotes.
            </p>

            <button
              type="button"
              onClick={() => {
                void query.refetch();
              }}
              className="mt-3 min-h-10 rounded-md border px-4 py-2 text-sm"
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        {query.data?.length === 0 ? (
          <div className="mt-5 rounded-lg border p-5 text-center">
            <p className="font-medium">
              Nenhum pacote cadastrado
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              O frontend não cria pacotes ou condições comerciais automaticamente.
            </p>
          </div>
        ) : null}

        {query.data &&
        query.data.length > 0 ? (
          <ul
            className="mt-5 grid gap-3"
            aria-label="Catálogo de pacotes"
          >
            {query.data.map((pacote) => (
              <li
                key={pacote.id}
                className="rounded-lg border p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">
                        {pacote.nome}
                      </h3>

                      <span className="rounded-full border px-2 py-0.5 text-xs">
                        {pacote.ativo
                          ? "Ativo"
                          : "Inativo"}
                      </span>
                    </div>

                    <p className="mt-2 whitespace-pre-wrap text-sm">
                      {pacote.descricao?.trim() ||
                        "Sem descrição."}
                    </p>

                    <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                      <div>
                        <dt className="text-muted-foreground">
                          Valor
                        </dt>

                        <dd className="font-medium">
                          {formatCurrency(
                            pacote.valor,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt className="text-muted-foreground">
                          Sessões
                        </dt>

                        <dd className="font-medium">
                          {
                            pacote
                              .quantidadeSessoes
                          }
                        </dd>
                      </div>

                      <div>
                        <dt className="text-muted-foreground">
                          Validade
                        </dt>

                        <dd className="font-medium">
                          {pacote.validadeDias ==
                          null
                            ? "Sem prazo informado"
                            : `${pacote.validadeDias} dias`}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {canManage ? (
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(
                            pacote.id,
                          );
                        }}
                        className="min-h-10 rounded-md border px-3 py-2 text-sm"
                      >
                        Editar
                      </button>

                      {pacote.ativo ? (
                        inativarId ===
                        pacote.id ? (
                          <>
                            <button
                              type="button"
                              disabled={
                                inativarMutation
                                  .isPending
                              }
                              onClick={() => {
                                void inativarMutation
                                  .mutateAsync(
                                    pacote.id,
                                  )
                                  .then(() => {
                                    setInativarId(
                                      null,
                                    );

                                    if (
                                      editingId ===
                                      pacote.id
                                    ) {
                                      setEditingId(
                                        null,
                                      );
                                    }
                                  });
                              }}
                              className="min-h-10 rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground disabled:opacity-60"
                            >
                              Confirmar inativação
                            </button>

                            <button
                              type="button"
                              disabled={
                                inativarMutation
                                  .isPending
                              }
                              onClick={() => {
                                setInativarId(
                                  null,
                                );
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
                              setInativarId(
                                pacote.id,
                              );
                            }}
                            className="min-h-10 rounded-md border px-3 py-2 text-sm"
                          >
                            Inativar
                          </button>
                        )
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : null}

        {createMutation.isError ||
        updateMutation.isError ||
        inativarMutation.isError ? (
          <p
            role="alert"
            className="mt-4 text-sm text-destructive"
          >
            Não foi possível concluir a operação do pacote.
          </p>
        ) : null}
      </section>
    </div>
  );
}
