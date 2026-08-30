"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/auth-store";

import {
  canAccessLoyalty,
  canManageBenefits,
} from "../permissions/fidelidade-permissions";
import { formatPontos } from "../utils/fidelidade-formatters";
import { BeneficioForm } from "./beneficio-form";
import type { BeneficioPayload } from "./beneficio-form.schema";
import type { Beneficio } from "./beneficio.types";
import { useBeneficios } from "./use-beneficios";

export function BeneficiosView() {
  const role = useAuthStore(
    (state) => state.user?.role ?? null,
  );

  const canRead =
    canAccessLoyalty(role);

  const canManage =
    canManageBenefits(role);

  const [editing, setEditing] =
    useState<Beneficio | null>(null);

  const [inativarId, setInativarId] =
    useState<string | null>(null);

  const {
    query,
    createMutation,
    updateMutation,
    inativarMutation,
  } = useBeneficios({
    enabled: canRead,
  });

  if (!canRead) {
    return null;
  }

  return (
    <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold">
        Benefícios
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Catálogo de benefícios vinculados às regras de
        fidelidade da empresa.
      </p>

      {canManage && !editing ? (
        <div className="mt-5">
          <h3 className="mb-3 font-medium">
            Novo benefício
          </h3>

          <BeneficioForm
            isSubmitting={
              createMutation.isPending
            }
            onSubmit={async (
              payload: BeneficioPayload,
            ) => {
              await createMutation.mutateAsync(
                payload,
              );
            }}
          />
        </div>
      ) : null}

      {editing ? (
        <div className="mt-5">
          <h3 className="mb-3 font-medium">
            Editar benefício
          </h3>

          <BeneficioForm
            key={editing.id}
            beneficio={editing}
            isSubmitting={
              updateMutation.isPending
            }
            onSubmit={async (
              payload: BeneficioPayload,
            ) => {
              await updateMutation.mutateAsync({
                id: editing.id,
                payload,
              });

              setEditing(null);
            }}
            onCancel={() => {
              setEditing(null);
            }}
          />
        </div>
      ) : null}

      {query.isPending ? (
        <div
          aria-busy="true"
          className="mt-5 h-32 animate-pulse rounded-lg bg-muted/40"
        />
      ) : null}

      {query.isError ? (
        <div
          role="alert"
          className="mt-5 rounded-lg border border-destructive/30 p-4"
        >
          <p>
            Não foi possível carregar os benefícios.
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
            Nenhum benefício cadastrado
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            O frontend não cria benefícios automaticamente.
          </p>
        </div>
      ) : null}

      {query.data &&
      query.data.length > 0 ? (
        <ul
          className="mt-5 grid gap-3"
          aria-label="Benefícios de fidelidade"
        >
          {query.data.map((beneficio) => (
            <li
              key={beneficio.id}
              className="rounded-lg border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">
                      {beneficio.nome}
                    </h3>

                    <span className="rounded-full border px-2 py-0.5 text-xs">
                      {beneficio.ativo
                        ? "Ativo"
                        : "Inativo"}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatPontos(
                      beneficio.pontosNecessarios,
                    )}{" "}
                    necessários
                  </p>

                  <p className="mt-2 whitespace-pre-wrap text-sm">
                    {beneficio.descricao?.trim() ||
                      "Sem descrição."}
                  </p>
                </div>

                {canManage ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(beneficio);
                      }}
                      className="min-h-10 rounded-md border px-3 py-2 text-sm"
                    >
                      Editar
                    </button>

                    {beneficio.ativo ? (
                      inativarId === beneficio.id ? (
                        <>
                          <button
                            type="button"
                            disabled={
                              inativarMutation.isPending
                            }
                            onClick={() => {
                              void inativarMutation
                                .mutateAsync(
                                  beneficio.id,
                                )
                                .then(() => {
                                  setInativarId(null);

                                  if (
                                    editing?.id ===
                                    beneficio.id
                                  ) {
                                    setEditing(null);
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
                              inativarMutation.isPending
                            }
                            onClick={() => {
                              setInativarId(null);
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
                              beneficio.id,
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
          Não foi possível concluir a operação do benefício.
        </p>
      ) : null}
    </section>
  );
}
