"use client";

import Link from "next/link";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

import type { Cliente } from "@/features/clientes/types/clientes.types";
import { useAuthStore } from "@/stores/auth-store";

import {
  canAccessPackages,
  canAssignPackage,
  canConsumePackageSession,
  canManagePackages,
} from "../permissions/pacotes-permissions";
import { ClientePacoteForm } from "./cliente-pacote-form";
import type { CreateClientePacotePayload } from "./cliente-pacote-form.schema";
import { canReadClientPackages } from "./clientes-pacotes-permissions";
import { useClientesPacotes } from "./use-clientes-pacotes";
import {
  parseClientesPacotesStatusFilter,
  parseClientesPacotesUrlState,
  serializeClientesPacotesUrlState,
  type ClientesPacotesUrlState,
} from "./clientes-pacotes-url-state";
import { useClientesPacotesOptions } from "./use-clientes-pacotes-options";

function formatDate(
  value: string | null,
): string {
  if (!value) {
    return "Sem validade definida";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
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

export function ClientesPacotesView() {
  const router = useRouter();

  const searchParams =
    useSearchParams();

  const role = useAuthStore(
    (state) =>
      state.user?.role ?? null,
  );

  const canRead =
    canReadClientPackages(role);

  const canAssign =
    canAssignPackage(role);

  const canReadCatalog =
    canAccessPackages(role);

  const canCancel =
    canManagePackages(role);

  const canConsume =
    canConsumePackageSession(
      role,
    );

  const urlState =
    parseClientesPacotesUrlState(
      searchParams,
    );

  const urlClienteId =
    urlState.clienteId ?? "";

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedCliente,
    setSelectedCliente,
  ] = useState<Cliente | null>(
    null,
  );

  const [
    cancelarId,
    setCancelarId,
  ] = useState<string | null>(
    null,
  );

  const [
    usarSessaoId,
    setUsarSessaoId,
  ] = useState<string | null>(
    null,
  );

  const {
    clientesQuery,
    clienteQuery,
    pacotesQuery,
  } = useClientesPacotesOptions({
    search,

    clienteId:
      selectedCliente
        ? ""
        : urlClienteId,

    canReadClients: canRead,
    canReadCatalog,
  });

  const effectiveCliente =
    selectedCliente ??
    clienteQuery.data ??
    null;

  const effectiveClienteId =
    effectiveCliente?.id ??
    urlClienteId;

  function replaceUrlState(
    patch: Partial<ClientesPacotesUrlState>,
  ) {
    const nextState: ClientesPacotesUrlState = {
      clienteId:
        effectiveClienteId ||
        urlState.clienteId,

      status:
        urlState.status,

      ...patch,
    };

    const params =
      serializeClientesPacotesUrlState(
        nextState,
      );

    const queryString =
      params.toString();

    router.replace(
      queryString
        ? `/pacotes?${queryString}`
        : "/pacotes",
      {
        scroll: false,
      },
    );
  }

  const {
    query,
    createMutation,
    usarSessaoMutation,
    cancelarMutation,
  } = useClientesPacotes({
    clienteId:
      effectiveClienteId,

    enabled:
      canRead &&
      effectiveClienteId.length > 0,
  });

  const visibleClientePacotes =
    query.data?.filter(
      (clientePacote) =>
        urlState.status === "TODOS" ||
        clientePacote.status ===
          urlState.status,
    );

  if (!canRead) {
    return null;
  }

  return (
    <section className="rounded-xl border bg-card p-5 text-card-foreground shadow-sm">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Clientes-Pacotes
        </p>

        <h2 className="mt-1 text-xl font-semibold">
          Pacotes dos clientes
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Consulte vínculos, atribua pacotes quando o
          contrato permitir e preserve os saldos de sessões
          calculados pelo backend.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        <label
          htmlFor="clientes-pacotes-search"
          className="font-medium"
        >
          Buscar cliente
        </label>

        <input
          id="clientes-pacotes-search"
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(
              event.target.value,
            );
          }}
          placeholder="Nome, telefone ou e-mail"
          className="min-h-10 rounded-md border bg-background px-3 py-2"
        />

        {clientesQuery.isPending ? (
          <p
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            Buscando clientes...
          </p>
        ) : null}

        {clientesQuery.isError ? (
          <div
            role="alert"
            className="rounded-md border border-destructive/30 p-3 text-sm"
          >
            <p>
              Não foi possível buscar clientes.
            </p>

            <button
              type="button"
              onClick={() => {
                void clientesQuery.refetch();
              }}
              className="mt-2 min-h-10 rounded-md border px-3 py-2"
            >
              Tentar novamente
            </button>
          </div>
        ) : null}

        {clientesQuery.data?.data.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum cliente encontrado.
          </p>
        ) : null}

        {clientesQuery.data &&
        clientesQuery.data.data.length > 0 ? (
          <ul
            aria-label="Clientes encontrados"
            className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3"
          >
            {clientesQuery.data.data.map(
              (cliente) => (
                <li
                  key={cliente.id}
                >
                  <button
                    type="button"
                    aria-pressed={
                      effectiveClienteId ===
                      cliente.id
                    }
                    onClick={() => {
                      setSelectedCliente(
                        cliente,
                      );

                      replaceUrlState({
                        clienteId:
                          cliente.id,
                      });

                      setCancelarId(
                        null,
                      );

                      setUsarSessaoId(
                        null,
                      );
                    }}
                    className="min-h-12 w-full rounded-md border p-3 text-left"
                  >
                    <span className="block font-medium">
                      {cliente.nome}
                    </span>

                    <span className="block text-xs text-muted-foreground">
                      {cliente.telefone}
                      {cliente.ativo
                        ? ""
                        : " · Inativo"}
                    </span>
                  </button>
                </li>
              ),
            )}
          </ul>
        ) : null}
      </div>

      {effectiveCliente ? (
        <div className="mt-6 grid gap-6">
          <div className="rounded-lg border p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Cliente selecionado
            </p>

            <p className="mt-1 font-semibold">
              {effectiveCliente.nome}
            </p>

            <p className="text-sm text-muted-foreground">
              {effectiveCliente.telefone}
            </p>

            <Link
              href={`/fidelidade?clienteId=${encodeURIComponent(
                effectiveCliente.id,
              )}`}
              className="mt-3 inline-flex min-h-10 items-center rounded-md border px-3 py-2 text-sm font-medium"
            >
              Abrir fidelidade deste cliente
            </Link>
          </div>

          {canAssign &&
          canReadCatalog &&
          effectiveCliente.ativo ? (
            <div>
              <h3 className="font-semibold">
                Atribuir pacote
              </h3>

              <p className="mt-1 text-sm text-muted-foreground">
                Sessões, validade e status são definidos
                automaticamente pelo backend.
              </p>

              <div className="mt-3">
                <ClientePacoteForm
                  key={
                    effectiveCliente.id
                  }
                  clienteId={
                    effectiveCliente.id
                  }
                  pacotes={
                    pacotesQuery.data ??
                    []
                  }
                  isLoadingPacotes={
                    pacotesQuery.isPending
                  }
                  isSubmitting={
                    createMutation.isPending
                  }
                  onSubmit={async (
                    payload:
                      CreateClientePacotePayload,
                  ) => {
                    await createMutation.mutateAsync(
                      payload,
                    );
                  }}
                />
              </div>

              {pacotesQuery.isError ? (
                <p
                  role="alert"
                  className="mt-3 text-sm text-destructive"
                >
                  Não foi possível carregar o catálogo para
                  atribuição.
                </p>
              ) : null}
            </div>
          ) : null}

          {canAssign &&
          !canReadCatalog ? (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              O backend permite atribuição para este perfil,
              porém o catálogo de pacotes não é exposto a ele.
              O frontend não solicitará um UUID manual nem
              inventará uma fonte alternativa de pacotes.
            </div>
          ) : null}

          {canAssign &&
          canReadCatalog &&
          !effectiveCliente.ativo ? (
            <div className="rounded-lg border p-4 text-sm text-muted-foreground">
              O cliente selecionado está inativo. A listagem
              histórica permanece disponível, mas o frontend
              não oferecerá nova atribuição.
            </div>
          ) : null}

          <div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h3 className="font-semibold">
                Vínculos do cliente
              </h3>

              <div className="grid gap-1">
                <label
                  htmlFor="clientes-pacotes-status"
                  className="text-xs text-muted-foreground"
                >
                  Status
                </label>

                <select
                  id="clientes-pacotes-status"
                  value={urlState.status}
                  onChange={(event) => {
                    replaceUrlState({
                      status:
                        parseClientesPacotesStatusFilter(
                          event.target.value,
                        ),
                    });
                  }}
                  className="min-h-10 rounded-md border bg-background px-3 py-2 text-sm"
                >
                  <option value="TODOS">
                    Todos
                  </option>

                  <option value="ATIVO">
                    Ativo
                  </option>

                  <option value="FINALIZADO">
                    Finalizado
                  </option>

                  <option value="VENCIDO">
                    Vencido
                  </option>

                  <option value="CANCELADO">
                    Cancelado
                  </option>
                </select>
              </div>
            </div>

            {query.isPending ? (
              <div
                aria-busy="true"
                className="mt-3 h-32 animate-pulse rounded-lg bg-muted/40"
              />
            ) : null}

            {query.isError ? (
              <div
                role="alert"
                className="mt-3 rounded-lg border border-destructive/30 p-4"
              >
                <p>
                  Não foi possível carregar os pacotes do
                  cliente.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    void query.refetch();
                  }}
                  className="mt-3 min-h-10 rounded-md border px-3 py-2 text-sm"
                >
                  Tentar novamente
                </button>
              </div>
            ) : null}

            {visibleClientePacotes?.length === 0 ? (
              <div className="mt-3 rounded-lg border p-5 text-center">
                <p className="font-medium">
                  Cliente sem pacotes vinculados
                </p>
              </div>
            ) : null}

            {visibleClientePacotes && visibleClientePacotes.length > 0 ? (
              <ul
                className="mt-3 grid gap-3"
                aria-label="Pacotes vinculados ao cliente"
              >
                {visibleClientePacotes.map(
                  (clientePacote) => (
                    <li
                      key={
                        clientePacote.id
                      }
                      className="rounded-lg border p-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-semibold">
                              {
                                clientePacote
                                  .pacote
                                  .nome
                              }
                            </h4>

                            <span className="rounded-full border px-2 py-0.5 text-xs">
                              {
                                clientePacote
                                  .status
                              }
                            </span>
                          </div>

                          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
                            <div>
                              <dt className="text-muted-foreground">
                                Total
                              </dt>

                              <dd className="font-medium">
                                {
                                  clientePacote
                                    .sessoesTotal
                                }
                              </dd>
                            </div>

                            <div>
                              <dt className="text-muted-foreground">
                                Usadas
                              </dt>

                              <dd className="font-medium">
                                {
                                  clientePacote
                                    .sessoesUsadas
                                }
                              </dd>
                            </div>

                            <div>
                              <dt className="text-muted-foreground">
                                Restantes
                              </dt>

                              <dd className="font-medium">
                                {
                                  clientePacote
                                    .sessoesRestantes
                                }
                              </dd>
                            </div>
                          </dl>

                          <p className="mt-3 text-xs text-muted-foreground">
                            Compra:{" "}
                            {formatDate(
                              clientePacote
                                .dataCompra,
                            )}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Validade:{" "}
                            {formatDate(
                              clientePacote
                                .dataValidade,
                            )}
                          </p>
                        </div>

                        {canConsume &&
                        clientePacote.status ===
                          "ATIVO" &&
                        clientePacote
                          .sessoesRestantes >
                          0 ? (
                          <div className="flex flex-wrap gap-2">
                            {usarSessaoId ===
                            clientePacote.id ? (
                              <>
                                <button
                                  type="button"
                                  disabled={
                                    usarSessaoMutation
                                      .isPending
                                  }
                                  onClick={() => {
                                    void usarSessaoMutation
                                      .mutateAsync({
                                        id:
                                          clientePacote.id,
                                        clienteId:
                                          effectiveCliente.id,
                                      })
                                      .then(
                                        () => {
                                          setUsarSessaoId(
                                            null,
                                          );
                                        },
                                      )
                                      .catch(
                                        () => {
                                          setUsarSessaoId(
                                            null,
                                          );
                                        },
                                      );
                                  }}
                                  className="min-h-10 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60"
                                >
                                  Confirmar uso de 1 sessão
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    usarSessaoMutation
                                      .isPending
                                  }
                                  onClick={() => {
                                    setUsarSessaoId(
                                      null,
                                    );
                                  }}
                                  className="min-h-10 rounded-md border px-3 py-2 text-sm"
                                >
                                  Voltar
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setUsarSessaoId(
                                    clientePacote.id,
                                  );

                                  setCancelarId(
                                    null,
                                  );
                                }}
                                className="min-h-10 rounded-md border px-3 py-2 text-sm"
                              >
                                Usar 1 sessão
                              </button>
                            )}
                          </div>
                        ) : null}

                        {canCancel &&
                        clientePacote.status !==
                          "CANCELADO" ? (
                          <div className="flex flex-wrap gap-2">
                            {cancelarId ===
                            clientePacote.id ? (
                              <>
                                <button
                                  type="button"
                                  disabled={
                                    cancelarMutation
                                      .isPending
                                  }
                                  onClick={() => {
                                    void cancelarMutation
                                      .mutateAsync({
                                        id:
                                          clientePacote.id,
                                        clienteId:
                                          effectiveCliente.id,
                                      })
                                      .then(
                                        () => {
                                          setCancelarId(
                                            null,
                                          );
                                        },
                                      );
                                  }}
                                  className="min-h-10 rounded-md bg-destructive px-3 py-2 text-sm font-medium text-destructive-foreground disabled:opacity-60"
                                >
                                  Confirmar cancelamento
                                </button>

                                <button
                                  type="button"
                                  disabled={
                                    cancelarMutation
                                      .isPending
                                  }
                                  onClick={() => {
                                    setCancelarId(
                                      null,
                                    );
                                  }}
                                  className="min-h-10 rounded-md border px-3 py-2 text-sm"
                                >
                                  Voltar
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => {
                                  setCancelarId(
                                    clientePacote.id,
                                  );

                                  setUsarSessaoId(
                                    null,
                                  );
                                }}
                                className="min-h-10 rounded-md border px-3 py-2 text-sm"
                              >
                                Cancelar pacote
                              </button>
                            )}
                          </div>
                        ) : null}
                      </div>
                    </li>
                  ),
                )}
              </ul>
            ) : null}

            {createMutation.isError ||
            usarSessaoMutation.isError ||
            cancelarMutation.isError ? (
              <p
                role="alert"
                className="mt-4 text-sm text-destructive"
              >
                Não foi possível concluir a operação do
                pacote do cliente.
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="mt-6 rounded-lg border p-5 text-center">
          <p className="font-medium">
            Selecione um cliente
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            A consulta de vínculos começa após a seleção.
          </p>
        </div>
      )}

      <p className="mt-5 text-xs text-muted-foreground">
        Cada confirmação consome exatamente uma sessão no
        backend. Não existe sessão individual, observação ou
        estorno neste contrato.
      </p>
    </section>
  );
}
