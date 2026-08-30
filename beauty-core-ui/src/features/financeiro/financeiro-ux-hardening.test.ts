import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function source(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

function combined(...files: string[]) {
  return files.map((file) => source(file)).join("\n");
}

describe("Financeiro UX hardening", () => {
  it("usa useWatch no tipo da movimentação", () => {
    const content = source(
      "src/features/financeiro/components/movimentacao-financeira-form.tsx",
    );

    expect(content).toContain("useWatch");

    expect(content).not.toContain('watch("tipo")');
  });

  it("protege áreas principais contra overflow", () => {
    const files = [
      "src/features/financeiro/components/financeiro-view.tsx",
      "src/features/financeiro/components/categorias-financeiras-section.tsx",
      "src/features/financeiro/components/movimentacoes-financeiras-section.tsx",
      "src/features/financeiro/components/comissoes-section.tsx",
      "src/features/financeiro/components/relatorios-financeiros-section.tsx",
    ];

    for (const file of files) {
      expect(source(file)).toContain("min-w-0");
    }
  });

  it("mantém tabela do fluxo contida horizontalmente", () => {
    const content = source(
      "src/features/financeiro/components/fluxo-caixa-operacional-list.tsx",
    );

    expect(content).toContain("overflow-x-auto");

    expect(content).toContain("min-w-[680px]");

    expect(content).toContain('scope="col"');
  });

  it("mantém ações de comissões responsivas", () => {
    const content = source(
      "src/features/financeiro/components/comissoes-list.tsx",
    );

    expect(content).toContain("flex-wrap");

    expect(content).toContain("break-all");
  });

  it("mantém aria-busy nas consultas compostas", () => {
    expect(
      source("src/features/financeiro/components/comissoes-section.tsx"),
    ).toContain("aria-busy");

    expect(
      source(
        "src/features/financeiro/components/relatorios-financeiros-section.tsx",
      ),
    ).toContain("aria-busy");
  });

  it("mantém labels explícitos do período", () => {
    const content = source(
      "src/features/financeiro/components/relatorios-financeiros-section.tsx",
    );

    expect(content).toContain('htmlFor="relatorio-data-inicio"');

    expect(content).toContain('id="relatorio-data-inicio"');

    expect(content).toContain('htmlFor="relatorio-data-fim"');

    expect(content).toContain('id="relatorio-data-fim"');
  });

  it("protege double-submit do pagamento pela composição dialog + form", () => {
    const content = combined(
      "src/features/financeiro/components/pagamento-movimentacao-dialog.tsx",
      "src/features/financeiro/components/pagamento-movimentacao-form.tsx",
    );

    expect(content).toMatch(/\b(isPending|pending)\b/);

    expect(content).toMatch(/\bdisabled\s*=/);
  });

  it("protege double-submit da comissão pela composição", () => {
    const content = combined(
      "src/features/financeiro/components/comissao-create-dialog.tsx",
      "src/features/financeiro/components/comissao-form.tsx",
      "src/features/financeiro/components/comissao-pay-dialog.tsx",
    );

    expect(content).toMatch(/\b(isPending|pending)\b/);

    expect(content).toMatch(/\bdisabled\s*=/);
  });

  it("mantém cancelamento distinto de estorno externo", () => {
    expect(
      source(
        "src/features/financeiro/components/cancelar-movimentacao-dialog.tsx",
      ),
    ).toContain("não representa estorno externo");
  });
});
