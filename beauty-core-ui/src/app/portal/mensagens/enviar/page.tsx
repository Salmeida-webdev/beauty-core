"use client";

import { PortalPrivateRoute } from "@/features/portal/auth/portal-private-route";
import { PortalPageContainer } from "@/features/portal/components/portal-page-container";
import { PortalWhatsappCompose } from "@/features/portal/components/portal-whatsapp-compose";

export default function PortalMensagensEnviarPage() {
  return (
    <PortalPrivateRoute>
      <PortalPageContainer>
        <PortalWhatsappCompose />
      </PortalPageContainer>
    </PortalPrivateRoute>
  );
}
