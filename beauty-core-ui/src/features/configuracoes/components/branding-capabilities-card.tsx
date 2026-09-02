export function BrandingCapabilitiesCard() {
  return (
    <section
      className="rounded-xl border border-border bg-card"
      aria-labelledby="branding-capabilities-title"
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2
          id="branding-capabilities-title"
          className="text-lg font-semibold text-foreground"
        >
          White-label disponível
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Somente capacidades respaldadas pelos contratos atuais.
        </p>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-medium text-foreground">
              Logo personalizada
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              O upload da logo do tenant está disponível nesta tela através do
              contrato próprio de Arquivos.
            </p>
          </div>

          <div className="rounded-lg border border-border p-4">
            <p className="text-sm font-medium text-foreground">Cor primária</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Existe persistência de cor primária, mas a edição não é liberada
              sem contrato tenant-safe comprovado.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <p className="text-sm font-medium text-foreground">
            Personalizações ainda não disponíveis
          </p>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Favicon por tenant, logo específica para tema escuro, cores
            secundária e de destaque personalizáveis e conteúdo livre de CSS,
            HTML ou JavaScript não fazem parte do contrato atual.
          </p>
        </div>
      </div>
    </section>
  );
}
