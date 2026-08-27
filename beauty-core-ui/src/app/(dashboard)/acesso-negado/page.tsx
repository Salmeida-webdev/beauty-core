import type { Metadata } from "next";

import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import {
  PermissionState,
} from "@/components/states/feedback-states";

export const metadata: Metadata = {
  title: "Acesso não permitido | Beauty Core",
  description: "Acesso administrativo não autorizado no Beauty Core.",
};

export default function AccessDeniedPage() {
  return (
    <PageContainer
      size="wide"
      data-testid="admin-access-denied"
    >
      <PageHeader
        eyebrow="Segurança"
        title="Permissões administrativas"
        description="O Beauty Core protege cada módulo de acordo com o perfil e as permissões da sessão."
      />

      <div className="mt-8">
        <PermissionState
          title="Acesso não permitido"
          description="Seu perfil está autenticado, mas não possui permissão para acessar este recurso."
        />
      </div>
    </PageContainer>
  );
}
