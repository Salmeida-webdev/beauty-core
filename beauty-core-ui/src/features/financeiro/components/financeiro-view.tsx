"use client";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import {
  LoadingState,
  PermissionState,
} from "@/components/states/feedback-states";
import { CategoriasFinanceirasSection } from "@/features/financeiro/components/categorias-financeiras-section";
import { ComissoesSection } from "@/features/financeiro/components/comissoes-section";
import { MovimentacoesFinanceirasSection } from "@/features/financeiro/components/movimentacoes-financeiras-section";
import { RelatoriosFinanceirosSection } from "@/features/financeiro/components/relatorios-financeiros-section";
import { canAccessFinanceiroModule } from "@/features/financeiro/permissions/financeiro-permissions";
import { useAuthStore } from "@/stores/auth-store";

export function FinanceiroView() {
  const status = useAuthStore((state) => state.status);

  const user = useAuthStore((state) => state.user);

  const isRestoring = status === "idle" || status === "restoring";

  const canAccess =
    status === "authenticated" &&
    user !== null &&
    canAccessFinanceiroModule(user.role);

  return (
    <PageContainer size="wide" data-testid="financeiro-page">
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Financeiro"
        description="Gestão operacional de categorias, receitas, despesas, movimentações, pagamentos, comissões e relatórios financeiros."
        meta="Dados e cálculos financeiros autoritativos fornecidos pelo backend."
      />

      {isRestoring ? (
        <LoadingState />
      ) : user === null || !canAccess ? (
        <PermissionState description="Seu perfil não possui permissão para acessar o Financeiro administrativo." />
      ) : (
        <div className="mt-8 min-w-0 space-y-10">
          <section
            aria-labelledby="financeiro-categorias"
            className="min-w-0 space-y-4"
          >
            <h2 id="financeiro-categorias" className="sr-only">
              Categorias financeiras
            </h2>

            <CategoriasFinanceirasSection />
          </section>

          <section
            aria-labelledby="financeiro-movimentacoes"
            className="min-w-0 space-y-4"
          >
            <h2 id="financeiro-movimentacoes" className="sr-only">
              Movimentações financeiras
            </h2>

            <MovimentacoesFinanceirasSection />
          </section>

          <section
            aria-labelledby="financeiro-comissoes"
            className="min-w-0 space-y-4"
          >
            <h2 id="financeiro-comissoes" className="sr-only">
              Comissões
            </h2>

            <ComissoesSection />
          </section>

          <section
            aria-labelledby="financeiro-relatorios"
            className="min-w-0 space-y-4"
          >
            <h2 id="financeiro-relatorios" className="sr-only">
              Relatórios financeiros
            </h2>

            <RelatoriosFinanceirosSection />
          </section>
        </div>
      )}
    </PageContainer>
  );
}
