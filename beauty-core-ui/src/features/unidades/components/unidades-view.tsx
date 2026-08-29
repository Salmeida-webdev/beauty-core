"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import { PageSection } from "@/components/layout/page-section";
import {
  ErrorState,
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { DataTableFrame } from "@/components/tables/table-foundation";
import { Button } from "@/components/ui/button";
import { UnidadeDeactivateDialog } from "@/features/unidades/components/unidade-deactivate-dialog";
import { UnidadeFormDialog } from "@/features/unidades/components/unidade-form-dialog";
import { UnidadesList } from "@/features/unidades/components/unidades-list";
import {
  canAccessUnidades,
  canCreateUnidade,
} from "@/features/unidades/permissions/unidades-permissions";
import { unidadesQueryOptions } from "@/features/unidades/queries/unidades-query-options";
import type { Unidade } from "@/features/unidades/types/unidades.types";
import { useAuthStore } from "@/stores/auth-store";

export function UnidadesView() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  const [createOpen, setCreateOpen] = useState(false);
  const [editingUnidade, setEditingUnidade] = useState<Unidade | null>(null);
  const [deactivatingUnidade, setDeactivatingUnidade] =
    useState<Unidade | null>(null);

  const canAccess =
    status === "authenticated" && user !== null && canAccessUnidades(user.role);

  const canManage =
    status === "authenticated" && user !== null && canCreateUnidade(user.role);

  const unidadesQuery = useQuery(unidadesQueryOptions.list(canAccess));

  const isRestoring = status === "idle" || status === "restoring";
  const total = unidadesQuery.data?.length;

  const headerMeta = !canAccess
    ? "Acesso conforme o perfil administrativo"
    : total === undefined
      ? "Unidades ativas da empresa"
      : total === 1
        ? "1 unidade ativa"
        : `${total} unidades ativas`;

  return (
    <PageContainer size="wide" data-testid="unidades-page">
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Unidades"
        description="Gestão das unidades operacionais vinculadas à empresa."
        meta={headerMeta}
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null || !canAccess ? (
        <PermissionState description="Seu perfil não possui permissão para acessar o gestão de unidades." />
      ) : (
        <>
          <PageSection
            title="Unidades ativas"
            description="A API retorna somente unidades ativas, ordenados por nome. Busca e paginação não fazem parte deste contrato."
            actions={
              canManage ? (
                <Button type="button" onClick={() => setCreateOpen(true)}>
                  <Plus aria-hidden="true" />
                  Nova unidade
                </Button>
              ) : undefined
            }
          >
            <DataTableFrame>
              {unidadesQuery.isPending ? (
                <div className="p-card">
                  <LoadingState />
                </div>
              ) : unidadesQuery.isError && !unidadesQuery.data ? (
                <div className="p-card">
                  <ErrorState
                    title="Não foi possível carregar os unidades"
                    description="O catálogo de unidades não pôde ser carregado. Tente novamente."
                    onRetry={() => {
                      void unidadesQuery.refetch();
                    }}
                  />
                </div>
              ) : unidadesQuery.data ? (
                <UnidadesList
                  unidades={unidadesQuery.data}
                  isFetching={unidadesQuery.isFetching}
                  canManage={canManage}
                  onEdit={setEditingUnidade}
                  onDeactivate={setDeactivatingUnidade}
                />
              ) : null}
            </DataTableFrame>
          </PageSection>

          <UnidadeFormDialog
            mode="create"
            open={createOpen}
            onOpenChange={setCreateOpen}
          />

          {editingUnidade && (
            <UnidadeFormDialog
              key={editingUnidade.id}
              mode="edit"
              unidade={editingUnidade}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setEditingUnidade(null);
                }
              }}
            />
          )}

          {deactivatingUnidade && (
            <UnidadeDeactivateDialog
              key={deactivatingUnidade.id}
              unidade={deactivatingUnidade}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setDeactivatingUnidade(null);
                }
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
