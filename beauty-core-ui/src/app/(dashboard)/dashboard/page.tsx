import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <PageContainer
      size="wide"
      data-testid="dashboard-placeholder"
    >
      <PageHeader
        eyebrow="Beauty Core 1.0"
        title="Dashboard Executivo"
        description="O ambiente administrativo está autenticado e preparado para receber os módulos executivos."
        meta="Módulo executivo programado para o Chat 48."
      />

      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-heading-4 font-semibold text-text-primary">
            Dashboard em preparação
          </h2>

          <p className="mt-2 max-w-2xl text-body-small leading-6 text-text-muted">
            A autenticação administrativa, a proteção de rotas e o contexto
            da sessão já estão sendo preparados nesta etapa. Indicadores,
            gráficos e dados reais serão implementados posteriormente.
          </p>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
