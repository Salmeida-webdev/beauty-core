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
import { ServicoDeactivateDialog } from "@/features/servicos/components/servico-deactivate-dialog";
import { ServicoFormDialog } from "@/features/servicos/components/servico-form-dialog";
import { ServicosList } from "@/features/servicos/components/servicos-list";
import {
  canAccessServicos,
  canCreateServico,
} from "@/features/servicos/permissions/servicos-permissions";
import { servicosQueryOptions } from "@/features/servicos/queries/servicos-query-options";
import type { Servico } from "@/features/servicos/types/servicos.types";
import { useAuthStore } from "@/stores/auth-store";

export function ServicosView() {
  const status = useAuthStore((state) => state.status);
  const user = useAuthStore((state) => state.user);

  const [createOpen, setCreateOpen] = useState(false);
  const [editingServico, setEditingServico] = useState<Servico | null>(null);
  const [deactivatingServico, setDeactivatingServico] =
    useState<Servico | null>(null);

  const canAccess =
    status === "authenticated" && user !== null && canAccessServicos(user.role);

  const canManage =
    status === "authenticated" && user !== null && canCreateServico(user.role);

  const servicosQuery = useQuery(servicosQueryOptions.list(canAccess));

  const isRestoring = status === "idle" || status === "restoring";
  const total = servicosQuery.data?.length;

  const headerMeta = !canAccess
    ? "Acesso conforme o perfil administrativo"
    : total === undefined
      ? "Catálogo ativo da empresa"
      : total === 1
        ? "1 serviço ativo"
        : `${total} serviços ativos`;

  return (
    <PageContainer size="wide" data-testid="servicos-page">
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Serviços"
        description="Gestão do catálogo operacional usado em atendimentos, agenda e produtos da empresa."
        meta={headerMeta}
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null || !canAccess ? (
        <PermissionState description="Seu perfil não possui permissão para acessar o catálogo administrativo de serviços." />
      ) : (
        <>
          <PageSection
            title="Catálogo ativo"
            description="A API retorna somente serviços ativos, ordenados por nome. Busca e paginação não fazem parte deste contrato."
            actions={
              canManage ? (
                <Button type="button" onClick={() => setCreateOpen(true)}>
                  <Plus aria-hidden="true" />
                  Novo serviço
                </Button>
              ) : undefined
            }
          >
            <DataTableFrame>
              {servicosQuery.isPending ? (
                <div className="p-card">
                  <LoadingState />
                </div>
              ) : servicosQuery.isError && !servicosQuery.data ? (
                <div className="p-card">
                  <ErrorState
                    title="Não foi possível carregar os serviços"
                    description="O catálogo de serviços não pôde ser carregado. Tente novamente."
                    onRetry={() => {
                      void servicosQuery.refetch();
                    }}
                  />
                </div>
              ) : servicosQuery.data ? (
                <ServicosList
                  servicos={servicosQuery.data}
                  isFetching={servicosQuery.isFetching}
                  canManage={canManage}
                  onEdit={setEditingServico}
                  onDeactivate={setDeactivatingServico}
                />
              ) : null}
            </DataTableFrame>
          </PageSection>

          <ServicoFormDialog
            mode="create"
            open={createOpen}
            onOpenChange={setCreateOpen}
          />

          {editingServico && (
            <ServicoFormDialog
              key={editingServico.id}
              mode="edit"
              servico={editingServico}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setEditingServico(null);
                }
              }}
            />
          )}

          {deactivatingServico && (
            <ServicoDeactivateDialog
              key={deactivatingServico.id}
              servico={deactivatingServico}
              open
              onOpenChange={(open) => {
                if (!open) {
                  setDeactivatingServico(null);
                }
              }}
            />
          )}
        </>
      )}
    </PageContainer>
  );
}
