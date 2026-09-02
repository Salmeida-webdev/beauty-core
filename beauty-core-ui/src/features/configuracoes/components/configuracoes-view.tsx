"use client";

import { ConfiguracoesGeraisCard } from "@/features/configuracoes/components/configuracoes-gerais-card";
import { ConfiguracoesNavigationCard } from "@/features/configuracoes/components/configuracoes-navigation-card";
import { ConfiguracoesReadonlyNotice } from "@/features/configuracoes/components/configuracoes-readonly-notice";
import { canAccessConfiguracoes } from "@/features/configuracoes/permissions/configuracoes-permissions";
import { useTenant } from "@/providers/tenant-provider";
import { useAuthStore } from "@/stores/auth-store";

export function ConfiguracoesView() {
  const { tenant } = useTenant();

  const status = useAuthStore((state) => state.status);

  const user = useAuthStore((state) => state.user);

  const accessDenied =
    status === "authenticated" && (!user || !canAccessConfiguracoes(user.role));

  if (accessDenied) {
    return (
      <main className="min-w-0 space-y-6">
        <section
          className="rounded-xl border border-border bg-card p-6"
          role="alert"
        >
          <h1 className="text-xl font-semibold text-foreground">
            Acesso não disponível
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Configurações da empresa estão disponíveis somente para ADMIN e
            GERENTE.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-w-0 space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">
          Administração
        </p>

        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Configurações
        </h1>

        <p className="max-w-3xl text-sm text-muted-foreground">
          Consulte as configurações gerais disponíveis para a empresa
          autenticada.
        </p>
      </header>

      <ConfiguracoesGeraisCard tenant={tenant} />

      <ConfiguracoesNavigationCard />

      <ConfiguracoesReadonlyNotice />
    </main>
  );
}
