import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import {
  AdminSessionsPanel,
} from "@/features/auth/components/admin-sessions-panel";

export const metadata: Metadata = {
  title: "Sessões e dispositivos | Beauty Core",
  description: "Gerenciamento das sessões administrativas do Beauty Core.",
};

export default function AdminSessionsPage() {
  return (
    <PageContainer
      size="wide"
      data-testid="admin-sessions-page"
    >
      <PageHeader
        eyebrow="Segurança"
        title="Sessões e dispositivos"
        description="Consulte os dispositivos conectados à sua conta administrativa e encerre acessos que não devem permanecer ativos."
        meta="As sessões exibidas são fornecidas pela API de autenticação."
      />

      <div className="mt-8">
        <AdminSessionsPanel />
      </div>
    </PageContainer>
  );
}
