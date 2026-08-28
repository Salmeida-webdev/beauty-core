import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Pencil,
  UserRoundSearch,
} from "lucide-react";

import {
  ResponsiveTableRegion,
  TableFooter,
} from "@/components/tables/table-foundation";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import type {
  Cliente,
  ClientesListResponse,
} from "@/features/clientes/types/clientes.types";
import type {
  ClientesListUrlState,
} from "@/features/clientes/utils/clientes-list-url";
import {
  buildClienteDetailHref,
} from "@/features/clientes/utils/clientes-list-url";

type ClientesListProps = {
  response: ClientesListResponse;
  state: ClientesListUrlState;
  isFetching: boolean;
  canEdit: boolean;
  onEdit: (
    cliente: Cliente,
  ) => void;
  onStateChange: (
    state: ClientesListUrlState,
  ) => void;
};

function maskPhone(
  telefone: string,
): string {
  const digits = telefone.replace(
    /\D/g,
    "",
  );

  if (digits.length < 4) {
    return "Contato protegido";
  }

  return `•••• ${digits.slice(-4)}`;
}

function formatDate(
  value: string,
): string {
  const date = new Date(value);

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return "—";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    },
  ).format(date);
}

function ClienteStatuses({
  ativoPortal,
}: {
  ativoPortal: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      <StatusBadge tone="success">
        Ativo
      </StatusBadge>

      <StatusBadge
        tone={
          ativoPortal
            ? "info"
            : "neutral"
        }
      >
        {ativoPortal
          ? "Portal ativo"
          : "Portal inativo"}
      </StatusBadge>
    </div>
  );
}

function ClientesEmpty({
  hasSearch,
}: {
  hasSearch: boolean;
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-card py-section text-center">
      <Image
        src="/images/empty-states/beauty-core-clientes-empty.webp"
        width={280}
        height={210}
        alt="Ilustração da gestão de clientes"
        className="h-auto w-full max-w-60 object-contain"
      />

      <h3 className="mt-5 text-heading-4 font-semibold text-text-primary">
        {hasSearch
          ? "Nenhum cliente encontrado"
          : "Nenhum cliente cadastrado"}
      </h3>

      <p className="mt-2 max-w-md text-body-small text-text-muted">
        {hasSearch
          ? "Nenhum cliente ativo corresponde aos filtros informados."
          : "Quando houver clientes ativos cadastrados, eles aparecerão aqui."}
      </p>
    </div>
  );
}

export function ClientesList({
  response,
  state,
  isFetching,
  canEdit,
  onEdit,
  onStateChange,
}: ClientesListProps) {
  const {
    data,
    meta,
  } = response;

  if (data.length === 0) {
    return (
      <ClientesEmpty
        hasSearch={
          state.search.length > 0
        }
      />
    );
  }

  const hasPrevious =
    meta.page > 1;

  const hasNext =
    meta.totalPages > 0 &&
    meta.page < meta.totalPages;

  const goToPage = (
    page: number,
  ) => {
    onStateChange({
      ...state,
      page,
    });
  };

  return (
    <>
      <div
        className="md:hidden"
        aria-label="Clientes em cartões"
      >
        <div className="divide-y divide-border-subtle">
          {data.map(
            (cliente) => (
              <article
                key={cliente.id}
                className="space-y-4 p-card"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-text-muted"
                  >
                    <UserRoundSearch className="size-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold text-text-primary">
                      {cliente.nome}
                    </h3>

                    <p className="mt-1 text-body-small text-text-muted">
                      Telefone{" "}
                      {maskPhone(
                        cliente.telefone,
                      )}
                    </p>
                  </div>
                </div>

                <ClienteStatuses
                  ativoPortal={
                    cliente.ativoPortal
                  }
                />

                <div className="text-caption text-text-muted">
                  Atualizado em{" "}
                  {formatDate(
                    cliente.updatedAt,
                  )}
                </div>

                <div className="flex flex-wrap justify-end gap-2">
                  {canEdit && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        onEdit(
                          cliente,
                        );
                      }}
                    >
                      <Pencil
                        aria-hidden="true"
                      />
                      Editar
                    </Button>
                  )}

                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                  >
                    <Link
                      href={buildClienteDetailHref(
                        cliente.id,
                        state,
                      )}
                      aria-label={`Abrir perfil de ${cliente.nome}`}
                    >
                      Ver perfil
                    </Link>
                  </Button>
                </div>
              </article>
            ),
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <ResponsiveTableRegion label="Lista de clientes">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead className="bg-surface-subtle">
              <tr className="border-b border-border-subtle">
                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Cliente
                </th>

                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Contato
                </th>

                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Status
                </th>

                <th
                  scope="col"
                  className="px-card py-3 text-caption font-semibold text-text-secondary"
                >
                  Atualização
                </th>

                <th
                  scope="col"
                  className="px-card py-3 text-right text-caption font-semibold text-text-secondary"
                >
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-border-subtle">
              {data.map(
                (cliente) => (
                  <tr
                    key={cliente.id}
                    className="transition-colors hover:bg-surface-subtle/60"
                  >
                    <td className="px-card py-3">
                      <div className="font-medium text-text-primary">
                        {cliente.nome}
                      </div>
                    </td>

                    <td className="px-card py-3 text-body-small text-text-muted">
                      {maskPhone(
                        cliente.telefone,
                      )}
                    </td>

                    <td className="px-card py-3">
                      <ClienteStatuses
                        ativoPortal={
                          cliente.ativoPortal
                        }
                      />
                    </td>

                    <td className="px-card py-3 text-body-small text-text-muted">
                      {formatDate(
                        cliente.updatedAt,
                      )}
                    </td>

                    <td className="px-card py-3">
                      <div className="flex justify-end gap-1">
                        {canEdit && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              onEdit(
                                cliente,
                              );
                            }}
                          >
                            <Pencil
                              aria-hidden="true"
                            />
                            Editar
                          </Button>
                        )}

                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                        >
                          <Link
                            href={buildClienteDetailHref(
                              cliente.id,
                              state,
                            )}
                            aria-label={`Abrir perfil de ${cliente.nome}`}
                          >
                            Ver perfil
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </ResponsiveTableRegion>
      </div>

      <TableFooter>
        <div
          aria-live="polite"
          className="flex flex-wrap items-center gap-x-2 gap-y-1"
        >
          <span>
            {meta.total}{" "}
            {meta.total === 1
              ? "cliente ativo"
              : "clientes ativos"}
          </span>

          <span aria-hidden="true">
            ·
          </span>

          <span>
            Página {meta.page} de{" "}
            {Math.max(
              meta.totalPages,
              1,
            )}
          </span>

          {isFetching && (
            <>
              <span aria-hidden="true">
                ·
              </span>

              <span>
                Atualizando…
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasPrevious}
            onClick={() => {
              goToPage(
                meta.page - 1,
              );
            }}
          >
            <ChevronLeft
              aria-hidden="true"
            />
            Anterior
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!hasNext}
            onClick={() => {
              goToPage(
                meta.page + 1,
              );
            }}
          >
            Próxima
            <ChevronRight
              aria-hidden="true"
            />
          </Button>
        </div>
      </TableFooter>
    </>
  );
}
