import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";

export type ConfiguracaoGeralItem = {
  key: "nome" | "slug" | "dominio" | "locale";
  label: string;
  value: string;
};

function fallback(value: string | null | undefined): string {
  const normalized = value?.trim();

  return normalized ? normalized : "Não informado";
}

export function getConfiguracoesGerais(
  tenant: TenantPublicConfig,
): ConfiguracaoGeralItem[] {
  return [
    {
      key: "nome",
      label: "Nome da empresa",
      value: fallback(tenant.name),
    },
    {
      key: "slug",
      label: "Identificador",
      value: fallback(tenant.slug),
    },
    {
      key: "dominio",
      label: "Domínio",
      value: fallback(tenant.domain),
    },
    {
      key: "locale",
      label: "Localidade",
      value: fallback(tenant.locale),
    },
  ];
}
