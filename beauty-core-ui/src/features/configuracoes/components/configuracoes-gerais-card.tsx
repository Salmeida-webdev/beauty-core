import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import { getConfiguracoesGerais } from "@/features/configuracoes/utils/configuracoes-gerais";

type ConfiguracoesGeraisCardProps = {
  tenant: TenantPublicConfig;
};

export function ConfiguracoesGeraisCard({
  tenant,
}: ConfiguracoesGeraisCardProps) {
  const items = getConfiguracoesGerais(tenant);

  return (
    <section
      className="rounded-xl border border-border bg-card"
      aria-labelledby="configuracoes-gerais-title"
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2
          id="configuracoes-gerais-title"
          className="text-lg font-semibold text-foreground"
        >
          Dados gerais
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Informações públicas do tenant autenticado.
        </p>
      </div>

      <dl className="grid gap-px bg-border sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.key} className="min-w-0 bg-card px-5 py-4 sm:px-6">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {item.label}
            </dt>

            <dd className="mt-1 break-words text-sm font-medium text-foreground">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
