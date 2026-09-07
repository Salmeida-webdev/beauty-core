"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

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
import { ProfissionalFormDialog } from "@/features/profissionais/components/profissional-form-dialog";
import { ProfissionaisList } from "@/features/profissionais/components/profissionais-list";
import {
  parseProfissionaisListSearchParams,
  PROFISSIONAIS_ORDER_BY_VALUES,
  PROFISSIONAIS_ORDER_DIRECTION_VALUES,
  serializeProfissionaisListState,
  toProfissionaisListParams,
} from "@/features/profissionais/utils/profissionais-list-url";
import type {
  ProfissionaisListUrlState,
  ProfissionaisOrderBy,
  ProfissionaisOrderDirection,
} from "@/features/profissionais/utils/profissionais-list-url";
import { UsuarioDeactivateDialog } from "@/features/usuarios/components/usuario-deactivate-dialog";
import {
  canAccessUsuarios,
  canCreateUsuario,
} from "@/features/usuarios/permissions/usuarios-permissions";
import { usuariosQueryOptions } from "@/features/usuarios/queries/usuarios-query-options";
import type { UsuarioAdministrativo } from "@/features/usuarios/types/usuarios.types";
import { useAuthStore } from "@/stores/auth-store";

const LIMITS = [20, 50, 100] as const;

const ORDER_LABELS: Record<ProfissionaisOrderBy, string> = {
  nome: "Nome",

  email: "E-mail",

  createdAt: "Data de cadastro",

  updatedAt: "Última atualização",

  ultimoLogin: "Último acesso",
};

const DIRECTION_LABELS: Record<ProfissionaisOrderDirection, string> = {
  asc: "Crescente",

  desc: "Decrescente",
};

function resolveOrderBy(value: string): ProfissionaisOrderBy | null {
  return PROFISSIONAIS_ORDER_BY_VALUES.find((item) => item === value) ?? null;
}

function resolveOrderDirection(
  value: string,
): ProfissionaisOrderDirection | null {
  return (
    PROFISSIONAIS_ORDER_DIRECTION_VALUES.find((item) => item === value) ?? null
  );
}

type ProfissionaisSearchFieldProps = {
  initialValue: string;

  onSearchChange: (value: string) => void;
};

function ProfissionaisSearchField({
  initialValue,
  onSearchChange,
}: ProfissionaisSearchFieldProps) {
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
        aria-label="Buscar profissionais"
        placeholder="Buscar por nome ou e-mail"
        className="pl-9"
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />
    </div>
  );
}

export function ProfissionaisView() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const status = useAuthStore((state) => state.status);

  const user = useAuthStore((state) => state.user);

  const [createOpen, setCreateOpen] = useState(false);

  const [editingProfissional, setEditingProfissional] =
    useState<UsuarioAdministrativo | null>(null);

  const [deactivatingProfissional, setDeactivatingProfissional] =
    useState<UsuarioAdministrativo | null>(null);

  const listState = useMemo(
    () => parseProfissionaisListSearchParams(searchParams),
    [searchParams],
  );

  const replaceListState = useCallback(
    (patch: Partial<ProfissionaisListUrlState>) => {
      const nextState: ProfissionaisListUrlState = {
        ...listState,
        ...patch,
      };

      const params = serializeProfissionaisListState(nextState);

      const query = params.toString();

      router.replace(query ? `/profissionais?${query}` : "/profissionais");
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

  const queryParams = useMemo(
    () => toProfissionaisListParams(listState),
    [listState],
  );

  const profissionaisQuery = useQuery(
    usuariosQueryOptions.list(queryParams, canAccess),
  );

  const isRestoring = status === "idle" || status === "restoring";

  const total = profissionaisQuery.data?.meta.total;

  const headerMeta = !canAccess
    ? "Acesso conforme o perfil administrativo"
    : total === undefined
      ? "Gestão de profissionais"
      : total === 1
        ? "1 profissional"
        : `${total} profissionais`;

  const filtered = Boolean(listState.search);

  return (
    <PageContainer size="wide" data-testid="profissionais-page">
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Profissionais"
        description="Gestão dos usuários administrativos com perfil Profissional."
        meta={headerMeta}
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null || !canAccess ? (
        <PermissionState description="Seu perfil não possui permissão para acessar a gestão de profissionais." />
      ) : (
        <>
          <PageSection
            title="Profissionais ativos"
            description="Esta visão utiliza o contrato real de Usuários com role PROFISSIONAL fixada server-side."
            actions={
              canCreate ? (
                <Button
                  type="button"
                  onClick={() => {
                    setCreateOpen(true);
                  }}
                >
                  <Plus aria-hidden="true" />
                  Novo profissional
                </Button>
              ) : undefined
            }
          >
            <ContentToolbar>
              <div className="grid w-full grid-cols-1 gap-3 lg:grid-cols-2 xl:grid-cols-4">
                <ProfissionaisSearchField
                  key={listState.search}
                  initialValue={listState.search}
                  onSearchChange={handleSearchChange}
                />

                <select
                  aria-label="Ordenar profissionais por"
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
                  {PROFISSIONAIS_ORDER_BY_VALUES.map((orderBy) => (
                    <option key={orderBy} value={orderBy}>
                      {ORDER_LABELS[orderBy]}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Direção da ordenação dos profissionais"
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
                  {PROFISSIONAIS_ORDER_DIRECTION_VALUES.map((direction) => (
                    <option key={direction} value={direction}>
                      {DIRECTION_LABELS[direction]}
                    </option>
                  ))}
                </select>
              </div>

              <select
                aria-label="Profissionais por página"
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
              {profissionaisQuery.isPending ? (
                <div className="p-card">
                  <LoadingState />
                </div>
              ) : profissionaisQuery.isError && !profissionaisQuery.data ? (
                <div className="p-card">
                  <ErrorState
                    title="Não foi possível carregar os profissionais"
                    description="A listagem de profissionais não pôde ser carregada. Tente novamente."
                    onRetry={() => {
                      void profissionaisQuery.refetch();
                    }}
                  />
                </div>
              ) : profissionaisQuery.data ? (
                <ProfissionaisList
                  profissionais={profissionaisQuery.data.data}
                  meta={profissionaisQuery.data.meta}
                  actorId={user.id}
                  actorRole={user.role}
                  isFetching={profissionaisQuery.isFetching}
                  filtered={filtered}
                  onPageChange={(page) => {
                    replaceListState({
                      page,
                    });
                  }}
                  onEdit={setEditingProfissional}
                  onDeactivate={setDeactivatingProfissional}
                />
              ) : null}
            </DataTableFrame>
          </PageSection>

          <ProfissionalFormDialog
            mode="create"
            actorId={user.id}
            actorRole={user.role}
            open={createOpen}
            onOpenChange={setCreateOpen}
          />

          {editingProfissional && (
            <ProfissionalFormDialog
              key={editingProfissional.id}
              mode="edit"
              profissional={editingProfissional}
              actorId={user.id}
              actorRole={user.role}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setEditingProfissional(null);
                }
              }}
            />
          )}

          {deactivatingProfissional && (
            <UsuarioDeactivateDialog
              key={deactivatingProfissional.id}
              usuario={deactivatingProfissional}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setDeactivatingProfissional(null);
                }
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
