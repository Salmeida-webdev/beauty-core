"use client";

import { useTenant } from "@/providers/tenant-provider";

type TokenSwatchProps = {
  label: string;
  className: string;
  textClassName?: string;
};

function TokenSwatch({
  label,
  className,
  textClassName = "text-text-primary",
}: TokenSwatchProps) {
  return (
    <div
      className={`flex min-h-24 items-end rounded-large border border-border-subtle p-3 shadow-subtle ${className}`}
    >
      <span
        className={`text-caption font-semibold ${textClassName}`}
      >
        {label}
      </span>
    </div>
  );
}

export function FoundationsDemo() {
  const { tenant } = useTenant();

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary">
            Superfícies e cores semânticas
          </h3>

          <p className="mt-1 text-body-small text-text-muted">
            Tokens independentes de implementação para temas claro e escuro.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-grid md:grid-cols-3 xl:grid-cols-5">
          <TokenSwatch
            label="surface"
            className="bg-surface"
          />

          <TokenSwatch
            label="surface-subtle"
            className="bg-surface-subtle"
          />

          <TokenSwatch
            label="surface-elevated"
            className="bg-surface-elevated"
          />

          <TokenSwatch
            label="surface-hover"
            className="bg-surface-hover"
          />

          <TokenSwatch
            label="surface-active"
            className="bg-surface-active"
          />
        </div>

        <div className="grid grid-cols-2 gap-grid md:grid-cols-4">
          <TokenSwatch
            label="success"
            className="bg-success"
            textClassName="text-success-foreground"
          />

          <TokenSwatch
            label="warning"
            className="bg-warning"
            textClassName="text-warning-foreground"
          />

          <TokenSwatch
            label="danger"
            className="bg-danger"
            textClassName="text-danger-foreground"
          />

          <TokenSwatch
            label="info"
            className="bg-info"
            textClassName="text-info-foreground"
          />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary">
            White-label e branding
          </h3>

          <p className="mt-1 text-body-small text-text-muted">
            Cores públicas do tenant são propagadas para tokens de marca controlados.
          </p>
        </div>

        <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-card">
          <div className="grid grid-cols-1 gap-grid lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="text-overline font-semibold uppercase tracking-[0.14em] text-text-muted">
                Tenant ativo
              </p>

              <p className="mt-2 text-heading-3 font-semibold text-text-primary">
                {tenant.name}
              </p>

              <dl className="mt-4 space-y-2 text-body-small">
                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">
                    Slug
                  </dt>
                  <dd className="font-medium text-text-primary">
                    {tenant.slug}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">
                    Dark mode
                  </dt>
                  <dd className="font-medium text-text-primary">
                    {tenant.settings.allowDarkMode
                      ? "Permitido"
                      : "Desabilitado"}
                  </dd>
                </div>

                <div className="flex justify-between gap-4">
                  <dt className="text-text-muted">
                    Powered by
                  </dt>
                  <dd className="font-medium text-text-primary">
                    {tenant.settings.showPoweredByBeautyCore
                      ? "Visível"
                      : "Oculto"}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-1 gap-grid sm:grid-cols-3">
              <div
                className="min-h-32 rounded-large border border-border-subtle p-4 shadow-subtle"
                style={{
                  backgroundColor: "var(--brand-primary)",
                }}
              >
                <p className="text-caption font-semibold text-white">
                  brand-primary
                </p>

                <p className="mt-2 break-all text-caption text-white/80">
                  {tenant.branding.primaryColor}
                </p>
              </div>

              <div
                className="min-h-32 rounded-large border border-border-subtle p-4 shadow-subtle"
                style={{
                  backgroundColor: "var(--brand-secondary)",
                }}
              >
                <p className="text-caption font-semibold text-text-primary">
                  brand-secondary
                </p>

                <p className="mt-2 break-all text-caption text-text-secondary">
                  {tenant.branding.secondaryColor}
                </p>
              </div>

              <div
                className="min-h-32 rounded-large border border-border-subtle p-4 shadow-subtle"
                style={{
                  backgroundColor: "var(--brand-accent)",
                }}
              >
                <p className="text-caption font-semibold text-text-primary">
                  brand-accent
                </p>

                <p className="mt-2 break-all text-caption text-text-secondary">
                  {tenant.branding.accentColor}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary">
            Escala tipográfica
          </h3>

          <p className="mt-1 text-body-small text-text-muted">
            Hierarquia reutilizável para títulos, conteúdo, tabelas e indicadores.
          </p>
        </div>

        <div className="space-y-5 rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
          <p className="text-display font-semibold">
            Display
          </p>

          <p className="text-heading-1 font-semibold">
            Heading 1
          </p>

          <p className="text-heading-2 font-semibold">
            Heading 2
          </p>

          <p className="text-heading-3 font-semibold">
            Heading 3
          </p>

          <p className="text-heading-4 font-semibold">
            Heading 4
          </p>

          <p className="text-body-large">
            Body Large — conteúdo de maior destaque.
          </p>

          <p className="text-body">
            Body — conteúdo administrativo padrão.
          </p>

          <p className="text-body-small">
            Body Small — conteúdo secundário.
          </p>

          <p className="text-label font-semibold">
            Label — campos e controles.
          </p>

          <p className="text-caption text-text-muted">
            Caption — metadados e informações auxiliares.
          </p>

          <p className="text-overline font-semibold uppercase tracking-[0.14em]">
            Overline
          </p>

          <p className="text-kpi font-semibold">
            12.480
          </p>

          <p className="text-table">
            Table — conteúdo tabular.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-heading-4 font-semibold text-text-primary">
            Espaçamento, raios e elevação
          </h3>

          <p className="mt-1 text-body-small text-text-muted">
            Escalas estruturais aplicadas de maneira consistente em toda a interface.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-grid lg:grid-cols-3">
          <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
            <p className="text-label font-semibold text-text-primary">
              Espaçamento
            </p>

            <div className="mt-4 space-y-3">
              <div className="h-2 w-[var(--spacing-grid)] bg-brand-primary" />
              <div className="h-2 w-[var(--spacing-card)] bg-brand-primary" />
              <div className="h-2 w-[var(--spacing-form)] bg-brand-primary" />
              <div className="h-2 w-[var(--spacing-section)] bg-brand-primary" />
            </div>
          </div>

          <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
            <p className="text-label font-semibold text-text-primary">
              Border radius
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-16 rounded-small bg-surface-subtle" />
              <div className="h-16 rounded-medium bg-surface-subtle" />
              <div className="h-16 rounded-large bg-surface-subtle" />
              <div className="h-16 rounded-extra-large bg-surface-subtle" />
            </div>
          </div>

          <div className="rounded-large border border-border-subtle bg-surface-elevated p-card shadow-subtle">
            <p className="text-label font-semibold text-text-primary">
              Elevação
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="flex h-16 items-center justify-center rounded-medium bg-surface text-caption shadow-subtle">
                subtle
              </div>

              <div className="flex h-16 items-center justify-center rounded-medium bg-surface text-caption shadow-card">
                card
              </div>

              <div className="flex h-16 items-center justify-center rounded-medium bg-surface text-caption shadow-dropdown">
                dropdown
              </div>

              <div className="flex h-16 items-center justify-center rounded-medium bg-surface text-caption shadow-modal">
                modal
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}