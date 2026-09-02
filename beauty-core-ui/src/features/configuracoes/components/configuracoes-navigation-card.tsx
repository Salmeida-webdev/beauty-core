import Link from "next/link";

export function ConfiguracoesNavigationCard() {
  return (
    <section
      className="rounded-xl border border-border bg-card"
      aria-labelledby="configuracoes-navigation-title"
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2
          id="configuracoes-navigation-title"
          className="text-lg font-semibold text-foreground"
        >
          Identidade e arquivos
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Acesse os módulos relacionados sem duplicar dados ou contratos.
        </p>
      </div>

      <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
        <Link
          href="/configuracoes/branding"
          className="min-w-0 rounded-lg border border-border p-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="block text-sm font-semibold text-foreground">
            Branding e white-label
          </span>

          <span className="mt-1 block text-sm leading-6 text-muted-foreground">
            Consulte a identidade do tenant e atualize a logo suportada pelo
            backend.
          </span>
        </Link>

        <Link
          href="/arquivos?tipo=LOGO_EMPRESA"
          className="min-w-0 rounded-lg border border-border p-4 transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="block text-sm font-semibold text-foreground">
            Logos em Arquivos
          </span>

          <span className="mt-1 block text-sm leading-6 text-muted-foreground">
            Abra a listagem server-side já filtrada pelo tipo LOGO_EMPRESA.
          </span>
        </Link>
      </div>
    </section>
  );
}
