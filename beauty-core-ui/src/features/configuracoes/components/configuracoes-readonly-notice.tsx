export function ConfiguracoesReadonlyNotice() {
  return (
    <section
      className="rounded-xl border border-border bg-muted/30 p-5 sm:p-6"
      aria-labelledby="configuracoes-readonly-title"
    >
      <h2
        id="configuracoes-readonly-title"
        className="text-base font-semibold text-foreground"
      >
        Alterações cadastrais
      </h2>

      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
        Os dados gerais são exibidos a partir do tenant autenticado. A edição
        cadastral não está disponível nesta tela porque ainda não há contrato
        tenant-safe comprovado para alterações gerais da empresa.
      </p>
    </section>
  );
}
