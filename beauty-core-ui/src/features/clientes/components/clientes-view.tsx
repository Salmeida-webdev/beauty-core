"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Plus,
  Search,
  X,
} from "lucide-react";
import {
  useQuery,
} from "@tanstack/react-query";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

import {
  PageContainer,
} from "@/components/layout/page-container";
import {
  PageHeader,
} from "@/components/layout/page-header";
import {
  ContentToolbar,
  PageSection,
} from "@/components/layout/page-section";
import {
  DataTableFrame,
} from "@/components/tables/table-foundation";
import {
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ClienteFormDialog,
} from "@/features/clientes/components/cliente-form-dialog";
import {
  ClientesList,
} from "@/features/clientes/components/clientes-list";
import {
  useDebouncedValue,
} from "@/features/clientes/hooks/use-debounced-value";
import {
  canAccessClientes,
  canManageClientes,
} from "@/features/clientes/permissions/clientes-permissions";
import {
  clientesQueryOptions,
} from "@/features/clientes/queries/clientes-query-options";
import {
  CLIENTE_ORDER_BY_VALUES,
  CLIENTE_ORDER_DIRECTION_VALUES,
} from "@/features/clientes/types/clientes.types";
import type {
  Cliente,
  ClienteOrderBy,
  ClienteOrderDirection,
} from "@/features/clientes/types/clientes.types";
import {
  buildClientesListHref,
  parseClientesListSearchParams,
  toClientesListParams,
} from "@/features/clientes/utils/clientes-list-url";
import type {
  ClientesListUrlState,
} from "@/features/clientes/utils/clientes-list-url";
import {
  useAuthStore,
} from "@/stores/auth-store";

const STANDARD_LIMITS:
  readonly number[] = [
    20,
    50,
    100,
  ];

const ORDER_LABELS:
  Record<
    ClienteOrderBy,
    string
  > = {
    nome: "Nome",
    telefone: "Telefone",
    email: "E-mail",
    createdAt: "Data de cadastro",
    updatedAt: "Última atualização",
    ultimoAcessoPortal:
      "Último acesso ao portal",
  };

const DIRECTION_LABELS:
  Record<
    ClienteOrderDirection,
    string
  > = {
    asc: "Crescente",
    desc: "Decrescente",
  };

function resolveOrderBy(
  value: string,
): ClienteOrderBy | null {
  return (
    CLIENTE_ORDER_BY_VALUES.find(
      (item) => item === value,
    ) ?? null
  );
}

function resolveOrderDirection(
  value: string,
): ClienteOrderDirection | null {
  return (
    CLIENTE_ORDER_DIRECTION_VALUES.find(
      (item) => item === value,
    ) ?? null
  );
}

type ClientesSearchFieldProps = {
  initialValue: string;
  onSearchChange: (
    value: string,
  ) => void;
};

function ClientesSearchField({
  initialValue,
  onSearchChange,
}: ClientesSearchFieldProps) {
  const [
    searchInput,
    setSearchInput,
  ] = useState(initialValue);

  const debouncedSearch =
    useDebouncedValue(
      searchInput,
    );

  useEffect(() => {
    const normalizedSearch =
      debouncedSearch.trim();

    if (
      normalizedSearch ===
      initialValue
    ) {
      return;
    }

    onSearchChange(
      normalizedSearch,
    );
  }, [
    debouncedSearch,
    initialValue,
    onSearchChange,
  ]);

  return (
    <div className="relative min-w-0 flex-1">
      <Search
        aria-hidden="true"
        className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-text-muted"
      />

      <Input
        type="search"
        value={searchInput}
        placeholder="Buscar por nome, telefone ou e-mail"
        aria-label="Buscar clientes"
        className="pl-8 pr-9"
        onChange={(event) => {
          setSearchInput(
            event.target.value,
          );
        }}
      />

      {searchInput && (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Limpar busca de clientes"
          className="absolute right-1 top-1/2 -translate-y-1/2"
          onClick={() => {
            setSearchInput("");
          }}
        >
          <X aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
export function ClientesView() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  const status = useAuthStore(
    (state) => state.status,
  );

  const user = useAuthStore(
    (state) => state.user,
  );

  const listState = useMemo(
    () =>
      parseClientesListSearchParams(
        searchParams,
      ),
    [
      searchParams,
    ],
  );


  const [
    createOpen,
    setCreateOpen,
  ] = useState(false);

  const [
    editingCliente,
    setEditingCliente,
  ] = useState<
    Cliente | null
  >(null);

  const canAccess =
    status === "authenticated" &&
    user !== null &&
    canAccessClientes(
      user.role,
    );

  const canManage =
    status === "authenticated" &&
    user !== null &&
    canManageClientes(
      user.role,
    );

  const queryParams =
    useMemo(
      () =>
        toClientesListParams(
          listState,
        ),
      [
        listState,
      ],
    );

  const clientesQuery = useQuery(
    clientesQueryOptions.list(
      queryParams,
      canAccess,
    ),
  );

  const replaceState = useCallback(
    (
      nextState: ClientesListUrlState,
    ) => {
      router.replace(
        buildClientesListHref(
          nextState,
        ),
        {
          scroll: false,
        },
      );
    },
    [
      router,
    ],
  );

  const handleSearchChange =
    useCallback(
      (search: string) => {
        replaceState({
          ...listState,
          page: 1,
          search,
        });
      },
      [
        listState,
        replaceState,
      ],
    );

  const isRestoring =
    status === "idle" ||
    status === "restoring";

  const total =
    clientesQuery.data?.meta.total;

  const headerMeta =
    !canAccess
      ? "Acesso conforme o perfil administrativo"
      : total === undefined
        ? "Clientes ativos da empresa"
        : total === 1
          ? "1 cliente ativo"
          : `${total} clientes ativos`;

  const limitOptions =
    STANDARD_LIMITS.includes(
      listState.limit,
    )
      ? STANDARD_LIMITS
      : [
          ...STANDARD_LIMITS,
          listState.limit,
        ].sort(
          (a, b) => a - b,
        );

  return (
    <PageContainer
      size="wide"
      data-testid="clientes-page"
    >
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Clientes"
        description="Gestão dos clientes ativos da empresa, com busca, ordenação e acesso ao perfil individual."
        meta={headerMeta}
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null ||
        !canAccess ? (
        <PermissionState
          description="Seu perfil não possui permissão para acessar a gestão administrativa de clientes."
        />
      ) : (
        <>
          <PageSection
            title="Clientes ativos"
            description="A listagem utiliza paginação e filtros processados pelo servidor."
            actions={
              canManage ? (
                <Button
                  type="button"
                  onClick={() => {
                    setCreateOpen(
                      true,
                    );
                  }}
                >
                  <Plus
                    aria-hidden="true"
                  />
                  Novo cliente
                </Button>
              ) : undefined
            }
          >
          <div className="space-y-4">
            <ContentToolbar>
              <div className="flex min-w-0 flex-1 flex-col gap-3 lg:flex-row lg:items-center">
                <ClientesSearchField
                  key={listState.search}
                  initialValue={
                    listState.search
                  }
                  onSearchChange={
                    handleSearchChange
                  }
                />

                <div className="flex flex-wrap gap-2">
                  <Select
                    value={
                      listState.orderBy
                    }
                    onValueChange={(
                      value,
                    ) => {
                      const orderBy =
                        resolveOrderBy(
                          value,
                        );

                      if (!orderBy) {
                        return;
                      }

                      replaceState({
                        ...listState,
                        page: 1,
                        orderBy,
                      });
                    }}
                  >
                    <SelectTrigger
                      aria-label="Ordenar clientes por"
                      className="min-w-44"
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {CLIENTE_ORDER_BY_VALUES.map(
                        (value) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {
                              ORDER_LABELS[
                                value
                              ]
                            }
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>

                  <Select
                    value={
                      listState.orderDirection
                    }
                    onValueChange={(
                      value,
                    ) => {
                      const orderDirection =
                        resolveOrderDirection(
                          value,
                        );

                      if (
                        !orderDirection
                      ) {
                        return;
                      }

                      replaceState({
                        ...listState,
                        page: 1,
                        orderDirection,
                      });
                    }}
                  >
                    <SelectTrigger
                      aria-label="Direção da ordenação"
                      className="min-w-36"
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {CLIENTE_ORDER_DIRECTION_VALUES.map(
                        (value) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {
                              DIRECTION_LABELS[
                                value
                              ]
                            }
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>

                  <Select
                    value={String(
                      listState.limit,
                    )}
                    onValueChange={(
                      value,
                    ) => {
                      const limit =
                        Number(value);

                      if (
                        !Number.isInteger(
                          limit,
                        ) ||
                        limit < 1 ||
                        limit > 100
                      ) {
                        return;
                      }

                      replaceState({
                        ...listState,
                        page: 1,
                        limit,
                      });
                    }}
                  >
                    <SelectTrigger
                      aria-label="Clientes por página"
                      className="min-w-36"
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      {limitOptions.map(
                        (limit) => (
                          <SelectItem
                            key={limit}
                            value={String(
                              limit,
                            )}
                          >
                            {limit} por página
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ContentToolbar>

            <DataTableFrame>
              {clientesQuery.isPending ? (
                <div className="p-card">
                  <LoadingState />
                </div>
              ) : clientesQuery.isError &&
                !clientesQuery.data ? (
                <div className="p-card">
                  <ErrorState
                    title="Não foi possível carregar os clientes"
                    description="A listagem de clientes não pôde ser carregada. Tente novamente."
                    onRetry={() => {
                      void clientesQuery.refetch();
                    }}
                  />
                </div>
              ) : clientesQuery.data ? (
                <ClientesList
                  response={
                    clientesQuery.data
                  }
                  state={listState}
                  isFetching={
                    clientesQuery.isFetching
                  }
                  canEdit={
                    canManage
                  }
                  onEdit={(
                    cliente,
                  ) => {
                    setEditingCliente(
                      cliente,
                    );
                  }}
                  onStateChange={
                    replaceState
                  }
                />
              ) : null}
            </DataTableFrame>
            </div>
          </PageSection>

          <ClienteFormDialog
            mode="create"
            open={createOpen}
            onOpenChange={
              setCreateOpen
            }
          />

          {editingCliente && (
            <ClienteFormDialog
              key={
                editingCliente.id
              }
              mode="edit"
              cliente={
                editingCliente
              }
              open
              onOpenChange={(
                open,
              ) => {
                if (!open) {
                  setEditingCliente(
                    null,
                  );
                }
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
