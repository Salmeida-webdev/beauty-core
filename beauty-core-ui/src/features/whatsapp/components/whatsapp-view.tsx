"use client";

import {
  CampanhasWhatsappSection,
} from "./campanhas-whatsapp-section";
import {
  MensagensWhatsappSection,
} from "./mensagens-whatsapp-section";
import {
  TemplatesWhatsappSection,
} from "./templates-whatsapp-section";
import {
  canAccessWhatsApp,
  canManageCampaigns,
  canManageWhatsAppTemplates,
  canSendWhatsAppMessage,
} from "../permissions/whatsapp.permissions";
import {
  useAuthStore,
} from "@/stores/auth-store";

export function WhatsappView() {
  const role = useAuthStore(
    (state) => state.user?.role,
  );

  if (!canAccessWhatsApp(role)) {
    return (
      <div className="p-page">
        <section className="rounded-large border border-border-subtle bg-surface-elevated p-card">
          <h1 className="text-heading-3 font-semibold text-text-primary">
            WhatsApp
          </h1>

          <p className="mt-2 text-body-small text-text-muted">
            Seu perfil não possui acesso ao módulo
            operacional de WhatsApp.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="p-page space-y-8">
      <header>
        <h1 className="text-heading-2 font-semibold text-text-primary">
          WhatsApp
        </h1>

        <p className="mt-2 max-w-3xl text-body-small text-text-muted">
          Mensagens, templates e campanhas conforme
          as operações disponíveis no backend.
        </p>
      </header>

      {canSendWhatsAppMessage(role) && (
        <MensagensWhatsappSection
          role={role}
        />
      )}

      {canManageWhatsAppTemplates(role) && (
        <TemplatesWhatsappSection
          role={role}
        />
      )}

      {canManageCampaigns(role) && (
        <CampanhasWhatsappSection
          role={role}
        />
      )}
    </div>
  );
}