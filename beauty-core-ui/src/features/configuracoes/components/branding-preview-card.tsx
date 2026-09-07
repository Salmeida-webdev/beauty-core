import type { ConfiguracoesBrandingOverview } from "@/features/configuracoes/utils/configuracoes-branding";

type BrandingPreviewCardProps = {
  branding: ConfiguracoesBrandingOverview;
};

export function BrandingPreviewCard({ branding }: BrandingPreviewCardProps) {
  return (
    <section
      className="min-w-0 overflow-hidden rounded-xl border border-border bg-card"
      aria-labelledby="branding-preview-title"
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2
          id="branding-preview-title"
          className="text-lg font-semibold text-foreground"
        >
          Identidade efetiva
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Estado atual aplicado ao tenant autenticado.
        </p>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-muted font-semibold text-foreground"
            aria-hidden="true"
          >
            {branding.tenantName.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="truncate font-semibold text-foreground">
              {branding.tenantName}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {branding.hasCustomLogo
                ? "Logo personalizada configurada"
                : "Usando fallback visual do Beauty Core"}
            </p>
          </div>
        </div>

        <dl className="grid gap-4 sm:grid-cols-2">
          <div className="min-w-0 rounded-lg border border-border p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Cor primária efetiva
            </dt>

            <dd className="mt-2 flex min-w-0 items-center gap-3">
              <span
                className="size-5 shrink-0 rounded-full border border-border"
                style={{
                  backgroundColor: branding.primaryColor,
                }}
                aria-hidden="true"
              />

              <code className="min-w-0 break-all text-sm font-medium text-foreground">
                {branding.primaryColor}
              </code>
            </dd>
          </div>

          <div className="min-w-0 rounded-lg border border-border p-4">
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Logo do tenant
            </dt>

            <dd className="mt-2 text-sm font-medium text-foreground">
              {branding.logoStatus === "custom"
                ? "Personalizada"
                : "Fallback Beauty Core"}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
