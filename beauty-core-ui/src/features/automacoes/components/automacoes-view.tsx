"use client";

import {
  AutomacoesOperacionaisSection,
} from "./automacoes-operacionais-section";
import {
  canAccessAutomations,
} from "../permissions/automacoes.permissions";
import {
  useAuthStore,
} from "@/stores/auth-store";

export function AutomacoesView() {
  const role = useAuthStore(
    (state) => state.user?.role,
  );

  if (!canAccessAutomations(role)) {
    return (
      <div className="p-page">
        <section className="rounded-large border border-border-subtle bg-surface-elevated p-card">
          <h1 className="text-heading-3 font-semibold text-text-primary">
            Automações
          </h1>

          <p className="mt-2 text-body-small text-text-muted">
            Seu perfil não possui acesso às
            operações administrativas de automação.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="p-page space-y-8">
      <header>
        <h1 className="text-heading-2 font-semibold text-text-primary">
          Automações
        </h1>

        <p className="mt-2 max-w-3xl text-body-small text-text-muted">
          Processamento administrativo e
          monitoramento efêmero das operações
          realmente expostas pelo backend.
        </p>
      </header>

      <AutomacoesOperacionaisSection
        role={role}
      />
    </div>
  );
}