"use client";

import {
  NotificacoesSection,
} from "./notificacoes-section";
import {
  NotificacoesSettingsSection,
} from "./notificacoes-settings-section";
import {
  canAccessNotifications,
  canManageNotificationSettings,
} from "../permissions/notificacoes.permissions";
import {
  useAuthStore,
} from "@/stores/auth-store";

export function NotificacoesView() {
  const role = useAuthStore(
    (state) => state.user?.role,
  );

  if (!canAccessNotifications(role)) {
    return (
      <div className="p-page">
        <section className="rounded-large border border-border-subtle bg-surface-elevated p-card">
          <h1 className="text-heading-3 font-semibold text-text-primary">
            Notificações
          </h1>

          <p className="mt-2 text-body-small text-text-muted">
            Seu perfil não possui acesso às
            notificações administrativas.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="p-page space-y-8">
      <header>
        <h1 className="text-heading-2 font-semibold text-text-primary">
          Notificações
        </h1>

        <p className="mt-2 max-w-3xl text-body-small text-text-muted">
          Acompanhe notificações internas e,
          quando autorizado, configure as
          preferências globais da empresa.
        </p>
      </header>

      <NotificacoesSection
        role={role}
      />

      {canManageNotificationSettings(role) && (
        <NotificacoesSettingsSection
          role={role}
        />
      )}
    </div>
  );
}