"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { ADMIN_ROLES } from "@/constants/roles";
import type { AdminRole } from "@/constants/roles";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { ContentToolbar, PageSection } from "@/components/layout/page-section";
import {
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { DataTableFrame } from "@/components/tables/table-foundation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebouncedValue } from "@/features/clientes/hooks/use-debounced-value";
import { UsuarioDeactivateDialog } from "@/features/usuarios/components/usuario-deactivate-dialog";
import { UsuarioFormDialog } from "@/features/usuarios/components/usuario-form-dialog";
import { UsuariosList } from "@/features/usuarios/components/usuarios-list";
import {
  canAccessUsuarios,
  canCreateUsuario,
} from "@/features/usuarios/permissions/usuarios-permissions";
import { usuariosQueryOptions } from "@/features/usuarios/queries/usuarios-query-options";
import {
  USUARIO_ORDER_BY_VALUES,
  USUARIO_ORDER_DIRECTION_VALUES,
} from "@/features/usuarios/types/usuarios.types";
import type {
  UsuarioAdministrativo,
  UsuarioOrderBy,
  UsuarioOrderDirection,
} from "@/features/usuarios/types/usuarios.types";
import {
  parseUsuariosListSearchParams,
  serializeUsuariosListState,
  toUsuariosListParams,
} from "@/features/usuarios/utils/usuarios-list-url";
import type { UsuariosListUrlState } from "@/features/usuarios/utils/usuarios-list-url";
import { useAuthStore } from "@/stores/auth-store";

const LIMITS = [20, 50, 100] as const;

const ORDER_LABELS: Record<UsuarioOrderBy, string> = {
  nome: "Nome",

  email: "E-mail",

  role: "Perfil",

  createdAt: "Data de cadastro",

  updatedAt: "Última atualização",

  ultimoLogin: "Último acesso",
};

const DIRECTION_LABELS: Record<UsuarioOrderDirection, string> = {
  asc: "Crescente",

  desc: "Decrescente",
};

const ROLE_LABELS: Record<AdminRole, string> = {
  SUPER_ADMIN: "Super administrador",

  ADMIN: "Administrador",

  GERENTE: "Gerente",

  RECEPCAO: "Recepção",

  PROFISSIONAL: "Profissional",
};

const FILTER_ROLES: Record<AdminRole, readonly AdminRole[]> = {
  SUPER_ADMIN: ["SUPER_ADMIN", "ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"],

  ADMIN: ["ADMIN", "GERENTE", "RECEPCAO", "PROFISSIONAL"],

  GERENTE: ["GERENTE", "RECEPCAO", "PROFISSIONAL"],

  RECEPCAO: [],
  PROFISSIONAL: [],
};

function resolveRole(value: string): AdminRole | null {
  return ADMIN_ROLES.find((role) => role === value) ?? null;
}

function resolveOrderBy(value: string): UsuarioOrderBy | null {
  return USUARIO_ORDER_BY_VALUES.find((item) => item === value) ?? null;
}

function resolveOrderDirection(value: string): UsuarioOrderDirection | null {
  return USUARIO_ORDER_DIRECTION_VALUES.find((item) => item === value) ?? null;
}

type UsuariosSearchFieldProps = {
  initialValue: string;

  onSearchChange: (value: string) => void;
};

function UsuariosSearchField({
  initialValue,
  onSearchChange,
}: UsuariosSearchFieldProps) {
  const [searchInput, setSearchInput] = useState(initialValue);

  const debouncedSearch = useDebouncedValue(searchInput, 350);

  useEffect(() => {
    const normalizedSearch = debouncedSearch.trim();

    if (normalizedSearch === initialValue) {
      return;
    }

    onSearchChange(normalizedSearch);
  }, [debouncedSearch, initialValue, onSearchChange]);

  return (
    <div className="relative min-w-0 lg:col-span-2">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-muted"
      />

      <Input
        type="search"
        value={searchInput}
        aria-label="Buscar usuários"
        placeholder="Buscar por nome ou e-mail"
        className="pl-9"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
    </div>
  );
}

export function UsuariosView() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const status = useAuthStore((state) => state.status);

  const user = useAuthStore((state) => state.user);

  const [createOpen, setCreateOpen] = useState(false);

  const [editingUsuario, setEditingUsuario] =
    useState<UsuarioAdministrativo | null>(null);

  const [deactivatingUsuario, setDeactivatingUsuario] =
    useState<UsuarioAdministrativo | null>(null);

  const listState = useMemo(
    () => parseUsuariosListSearchParams(searchParams),
    [searchParams],
  );

  const replaceListState = useCallback(
    (patch: Partial<UsuariosListUrlState>) => {
      const nextState: UsuariosListUrlState = {
        ...listState,
        ...patch,
      };

      const params = serializeUsuariosListState(nextState);

      const query = params.toString();

      router.replace(query ? `/usuarios?${query}` : "/usuarios");
    },
    [listState, router],
  );

  const handleSearchChange = useCallback(
    (search: string) => {
      replaceListState({
        page: 1,
        search,
      });
    },
    [replaceListState],
  );

  const canAccess =
    status === "authenticated" && user !== null && canAccessUsuarios(user.role);

  const canCreate =
    status === "authenticated" && user !== null && canCreateUsuario(user.role);

  const roleOptions = user ? FILTER_ROLES[user.role] : [];

  const allowedRole =
    listState.role && roleOptions.includes(listState.role)
      ? listState.role
      : null;

  const queryState = useMemo<UsuariosListUrlState>(
    () => ({
      ...listState,
      role: allowedRole,
    }),
    [allowedRole, listState],
  );

  const queryParams = useMemo(
    () => toUsuariosListParams(queryState),
    [queryState],
  );

  const usuariosQuery = useQuery(
    usuariosQueryOptions.list(queryParams, canAccess),
  );

  const isRestoring = status === "idle" || status === "restoring";

  const total = usuariosQuery.data?.meta.total;

  const headerMeta = !canAccess
    ? "Acesso conforme o perfil administrativo"
    : total === undefined
      ? "Gestão de usuários administrativos"
      : total === 1
        ? "1 usuário administrativo"
        : `${total} usuários administrativos`;

  const filtered = Boolean(queryState.search) || queryState.role !== null;

  return (
    <PageContainer size="wide" data-testid="usuarios-page">
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Usuários"
        description="Consulta e gestão administrativa de usuários, perfis de acesso e atividade de login."
        meta={headerMeta}
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null || !canAccess ? (
        <PermissionState description="Seu perfil não possui permissão para acessar a gestão administrativa de usuários." />
      ) : (
        <>
          <PageSection
            title="Usuários ativos"
            description="Busca, filtros, ordenação e paginação são processados pelo servidor. Alterações respeitam a hierarquia administrativa."
            actions={
              canCreate ? (
                <Button
                  type="button"
                  onClick={() => {
                    setCreateOpen(true);
                  }}
                >
                  <Plus aria-hidden="true" />
                  Novo usuário
                </Button>
              ) : undefined
            }
          >
            <ContentToolbar>
              <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-5">
                <UsuariosSearchField
                  key={listState.search}
                  initialValue={listState.search}
                  onSearchChange={handleSearchChange}
                />

                <select
                  aria-label="Filtrar por perfil"
                  value={allowedRole ?? ""}
                  className="h-10 rounded-medium border border-border-subtle bg-background px-3 text-body-small text-text-primary"
                  onChange={(event) => {
                    replaceListState({
                      page: 1,

                      role: event.target.value
                        ? resolveRole(event.target.value)
                        : null,
                    });
                  }}
                >
                  <option value="">Todos os perfis</option>

                  {roleOptions.map((role) => (
                    <option key={role} value={role}>
                      {ROLE_LABELS[role]}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Ordenar usuários por"
                  value={listState.orderBy}
                  className="h-10 rounded-medium border border-border-subtle bg-background px-3 text-body-small text-text-primary"
                  onChange={(event) => {
                    const orderBy = resolveOrderBy(event.target.value);

                    if (orderBy) {
                      replaceListState({
                        page: 1,
                        orderBy,
                      });
                    }
                  }}
                >
                  {USUARIO_ORDER_BY_VALUES.map((orderBy) => (
                    <option key={orderBy} value={orderBy}>
                      {ORDER_LABELS[orderBy]}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Direção da ordenação"
                  value={listState.orderDirection}
                  className="h-10 rounded-medium border border-border-subtle bg-background px-3 text-body-small text-text-primary"
                  onChange={(event) => {
                    const direction = resolveOrderDirection(event.target.value);

                    if (direction) {
                      replaceListState({
                        page: 1,

                        orderDirection: direction,
                      });
                    }
                  }}
                >
                  {USUARIO_ORDER_DIRECTION_VALUES.map((direction) => (
                    <option key={direction} value={direction}>
                      {DIRECTION_LABELS[direction]}
                    </option>
                  ))}
                </select>
              </div>

              <select
                aria-label="Usuários por página"
                value={listState.limit}
                className="h-10 shrink-0 rounded-medium border border-border-subtle bg-background px-3 text-body-small text-text-primary"
                onChange={(event) => {
                  replaceListState({
                    page: 1,

                    limit: Number(event.target.value),
                  });
                }}
              >
                {LIMITS.map((limit) => (
                  <option key={limit} value={limit}>
                    {limit} por página
                  </option>
                ))}
              </select>
            </ContentToolbar>

            <DataTableFrame>
              {usuariosQuery.isPending ? (
                <div className="p-card">
                  <LoadingState />
                </div>
              ) : usuariosQuery.isError && !usuariosQuery.data ? (
                <div className="p-card">
                  <ErrorState
                    title="Não foi possível carregar os usuários"
                    description="A listagem administrativa de usuários não pôde ser carregada. Tente novamente."
                    onRetry={() => {
                      void usuariosQuery.refetch();
                    }}
                  />
                </div>
              ) : usuariosQuery.data ? (
                <UsuariosList
                  usuarios={usuariosQuery.data.data}
                  meta={usuariosQuery.data.meta}
                  actorId={user.id}
                  actorRole={user.role}
                  isFetching={usuariosQuery.isFetching}
                  filtered={filtered}
                  onPageChange={(page) => {
                    replaceListState({
                      page,
                    });
                  }}
                  onEdit={setEditingUsuario}
                  onDeactivate={setDeactivatingUsuario}
                />
              ) : null}
            </DataTableFrame>
          </PageSection>

          <UsuarioFormDialog
            mode="create"
            actorId={user.id}
            actorRole={user.role}
            open={createOpen}
            onOpenChange={setCreateOpen}
          />

          {editingUsuario && (
            <UsuarioFormDialog
              key={editingUsuario.id}
              mode="edit"
              usuario={editingUsuario}
              actorId={user.id}
              actorRole={user.role}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setEditingUsuario(null);
                }
              }}
            />
          )}

          {deactivatingUsuario && (
            <UsuarioDeactivateDialog
              key={deactivatingUsuario.id}
              usuario={deactivatingUsuario}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setDeactivatingUsuario(null);
                }
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
