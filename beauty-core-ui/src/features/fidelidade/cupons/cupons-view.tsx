"use client";

import { useState } from "react";

import { useAuthStore } from "@/stores/auth-store";

import {
  canAccessLoyalty,
  canManageCoupons,
} from "../permissions/fidelidade-permissions";
import { CupomForm } from "./cupom-form";
import type { CupomPayload } from "./cupom-form.schema";
import { CupomValidacaoForm } from "./cupom-validacao-form";
import type { Cupom } from "./cupom.types";
import { useCupons } from "./use-cupons";

function formatDate(
  value: unknown,
): string {
  if (
    typeof value !== "string" &&
    !(value instanceof Date)
  ) {
    return "Sem data";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Sem data";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short",
    },
  ).format(date);
}

export function CuponsView() {
  const role = useAuthStore(
    (state) => state.user?.role ?? null,
  );

  const canRead =
    canAccessLoyalty(role);

  const canManage =
    canManageCoupons(role);

  const [editing, setEditing] =
    useState<Cupom | null>(null);

  const [inativarId, setInativarId] =
    useState<string | null>(null);

  const [validacaoOk, setValidacaoOk] =
    useState(false);

  const {
    query,
    createMutation,
    updateMutation,
    inativarMutation,
    validarMutation,
  } = useCupons({
    enabled: canRead,
  });

  if (!canRead) {
    return null;
  }

  return (
    <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <h2 className="text-lg font-semibold">
        Cupons
      </h2>

      <p className="mt-1 text-sm text-muted-foreground">
        Catálogo e validação conforme as regras do backend.
      </p>

      <div className="mt-5">
        <h3 className="mb-3 font-medium">
          Validar cupom
        </h3>

        <CupomValidacaoForm
          isSubmitting={
            validarMutation.isPending
          }
          onSubmit={async (codigo) => {
            setValidacaoOk(false);

            await validarMutation.mutateAsync(
              codigo,
            );

            setValidacaoOk(true);
          }}
        />

        {validacaoOk ? (
          <p
            role="status"
            className="mt-3 text-sm"
          >
            Cupom validado com sucesso pelo backend.
          </p>
        ) : null}

        {validarMutation.isError ? (
          <p
            role="alert"
            className="mt-3 text-sm text-destructive"
          >
            O backend rejeitou ou não encontrou este cupom.
          </p>
        ) : null}
      </div>

      {canManage && !editing ? (
        <div className="mt-6">
          <h3 className="mb-3 font-medium">
            Novo cupom
          </h3>

          <CupomForm
            isSubmitting={
              createMutation.isPending
            }
            onSubmit={async (
              payload: CupomPayload,
            ) => {
              await createMutation.mutateAsync(
                payload,
              );
            }}
          />
        </div>
      ) : null}

      {editing ? (
        <div className="mt-6">
          <h3 className="mb-3 font-medium">
            Editar cupom
          </h3>

          <CupomForm
            key={editing.id}
            cupom={editing}
            isSubmitting={
              updateMutation.isPending
            }
            onSubmit={async (
              payload: CupomPayload,
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
          className="mt-6 h-32 animate-pulse rounded-lg bg-muted/40"
        />
      ) : null}

      {query.isError ? (
        <div
          role="alert"
          className="mt-6 rounded-lg border border-destructive/30 p-4"
        >
          <p>
            Não foi possível carregar os cupons.
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
        <div className="mt-6 rounded-lg border p-5 text-center">
          <p className="font-medium">
            Nenhum cupom cadastrado
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Nenhum cupom é criado automaticamente pelo frontend.
          </p>
        </div>
      ) : null}

      {query.data &&
      query.data.length > 0 ? (
        <ul
          className="mt-6 grid gap-3"
          aria-label="Cupons"
        >
          {query.data.map((cupom) => (
            <li
              key={cupom.id}
              className="rounded-lg border p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">
                      {cupom.nome}
                    </h3>

                    <span className="rounded-full border px-2 py-0.5 text-xs">
                      {cupom.ativo
                        ? "Ativo"
                        : "Inativo"}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-sm">
                    {cupom.codigo}
                  </p>

                  <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-muted-foreground">
                        Tipo
                      </dt>
                      <dd>{String(cupom.tipo)}</dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">
                        Valor configurado
                      </dt>
                      <dd>{String(cupom.valor)}</dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">
                        Início
                      </dt>
                      <dd>
                        {formatDate(
                          cupom.dataInicio,
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">
                        Fim
                      </dt>
                      <dd>
                        {formatDate(
                          cupom.dataFim,
                        )}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">
                        Limite
                      </dt>
                      <dd>
                        {cupom.quantidadeMaxima ??
                          "Sem limite informado"}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-muted-foreground">
                        Utilizações
                      </dt>
                      <dd>
                        {cupom.quantidadeUtilizada}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-3 whitespace-pre-wrap text-sm">
                    {cupom.descricao?.trim() ||
                      "Sem descrição."}
                  </p>
                </div>

                {canManage ? (
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditing(cupom);
                      }}
                      className="min-h-10 rounded-md border px-3 py-2 text-sm"
                    >
                      Editar
                    </button>

                    {cupom.ativo ? (
                      inativarId === cupom.id ? (
                        <>
                          <button
                            type="button"
                            disabled={
                              inativarMutation.isPending
                            }
                            onClick={() => {
                              void inativarMutation
                                .mutateAsync(
                                  cupom.id,
                                )
                                .then(() => {
                                  setInativarId(null);

                                  if (
                                    editing?.id ===
                                    cupom.id
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
                              cupom.id,
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
          Não foi possível concluir a operação do cupom.
        </p>
      ) : null}
    </section>
  );
}
