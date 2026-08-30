import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

function frontend(relativePath: string) {
  return readFileSync(resolve(process.cwd(), relativePath), "utf8");
}

function backend(relativePath: string) {
  return readFileSync(
    resolve(process.cwd(), "../beauty-core-backend", relativePath),
    "utf8",
  );
}

function expectContainsAll(content: string, values: readonly string[]) {
  for (const value of values) {
    expect(content).toContain(value);
  }
}

describe("Chat 52 — fluxo financeiro transversal", () => {
  it("alinha RBAC backend, feature e navegação", () => {
    const permissions = frontend(
      "src/features/financeiro/permissions/financeiro-permissions.ts",
    );

    const navigation = frontend("src/config/admin-navigation.ts");

    const financeController = backend(
      "src/modules/financeiro/financeiro.controller.ts",
    );

    const categoriesController = backend(
      "src/modules/categorias-financeiras/categorias-financeiras.controller.ts",
    );

    const commissionsController = backend(
      "src/modules/comissoes/comissoes.controller.ts",
    );

    expectContainsAll(permissions, [
      "FINANCEIRO_MODULE_ROLES",
      '"ADMIN"',
      '"GERENTE"',
      "canAccessFinanceiroModule",
    ]);

    expectContainsAll(navigation, [
      'label: "Financeiro"',
      'href: "/financeiro"',
      "roles: FINANCEIRO_MODULE_ROLES",
      'state: "available"',
    ]);

    for (const controller of [
      financeController,
      categoriesController,
      commissionsController,
    ]) {
      expect(controller).toMatch(/@Roles\([^)]*'ADMIN'[^)]*'GERENTE'[^)]*\)/);

      expect(controller).not.toMatch(/@Roles\([^)]*'SUPER_ADMIN'[^)]*\)/);

      expect(controller).not.toMatch(/@Roles\([^)]*'RECEPCAO'[^)]*\)/);

      expect(controller).not.toMatch(/@Roles\([^)]*'PROFISSIONAL'[^)]*\)/);
    }
  });

  it("liga a rota /financeiro à view protegida", () => {
    const page = frontend("src/app/(dashboard)/financeiro/page.tsx");

    const view = frontend(
      "src/features/financeiro/components/financeiro-view.tsx",
    );

    expect(page).toContain("FinanceiroView");

    expectContainsAll(view, [
      "useAuthStore",
      "canAccessFinanceiroModule",
      "PermissionState",
      "LoadingState",
      'status === "authenticated"',
    ]);
  });

  it("compõe as quatro áreas operacionais na view autorizada", () => {
    const view = frontend(
      "src/features/financeiro/components/financeiro-view.tsx",
    );

    expectContainsAll(view, [
      "CategoriasFinanceirasSection",
      "MovimentacoesFinanceirasSection",
      "ComissoesSection",
      "RelatoriosFinanceirosSection",
    ]);
  });

  it("mantém os filtros frontend alinhados ao DTO backend", () => {
    const dto = backend(
      "src/modules/financeiro/dto/list-movimentacoes-query.dto.ts",
    );

    const types = frontend("src/features/financeiro/types/financeiro.types.ts");

    for (const filter of [
      "categoriaId",
      "clienteId",
      "agendamentoId",
      "tipo",
      "status",
    ]) {
      expect(dto).toContain(filter);
      expect(types).toContain(filter);
    }

    expect(dto).not.toContain("empresaId");

    expect(types).not.toMatch(/FinanceiroListQuery[\s\S]*?\bempresaId\b/);
  });

  it("integra categorias somente pelos endpoints reais", () => {
    const service = frontend(
      "src/features/financeiro/services/categorias-financeiras-api.ts",
    );

    expectContainsAll(service, [
      "getApiClient",
      "financeiroEndpoints",
      ".get(",
      ".post(",
      ".patch(",
    ]);

    expect(service).not.toContain("empresaId");

    expect(service).not.toContain(".delete(");
  });

  it("integra movimentações com criação edição pagamento e cancelamento reais", () => {
    const api = frontend(
      "src/features/financeiro/services/movimentacoes-financeiras-api.ts",
    );

    const controller = backend(
      "src/modules/financeiro/financeiro.controller.ts",
    );

    expectContainsAll(api, [
      "getApiClient",
      "financeiroEndpoints",
      "pagar",
      "cancelar",
    ]);

    expectContainsAll(controller, [
      "@Post()",
      "@Patch(':id')",
      "@Patch(':id/pagar')",
      "@Patch(':id/cancelar')",
    ]);

    expect(api).not.toContain(".delete(");
  });

  it("mantém pagamento como mutation da movimentação sem entidade paralela", () => {
    const api = frontend(
      "src/features/financeiro/services/movimentacoes-financeiras-api.ts",
    );

    const formSchema = frontend(
      "src/features/financeiro/forms/pagamento-movimentacao-form.schema.ts",
    );

    expect(api).toMatch(/pagar/i);

    expect(formSchema).toContain("formaPagamento");

    for (const unsupported of ["valorPago", "parcelas", "comprovante"]) {
      expect(formSchema).not.toContain(unsupported);
    }
  });

  it("mantém cancelamento distinto de estorno externo", () => {
    const dialog = frontend(
      "src/features/financeiro/components/cancelar-movimentacao-dialog.tsx",
    );

    const api = frontend(
      "src/features/financeiro/services/movimentacoes-financeiras-api.ts",
    );

    expect(dialog).toContain("não representa estorno externo");

    expect(api).toMatch(/cancelar/i);

    expect(api).not.toMatch(/estornar/i);
  });

  it("integra comissões sem cálculo autoritativo frontend", () => {
    const api = frontend("src/features/financeiro/services/comissoes-api.ts");

    const payload = frontend(
      "src/features/financeiro/forms/comissao-payload.ts",
    );

    const backendService = backend(
      "src/modules/comissoes/comissoes.service.ts",
    );

    expect(api).toContain("getApiClient");

    expect(api).toMatch(/\.get(?:<[^>]+>)?\(/);

    expect(api).toMatch(/\.post(?:<[^>]+>)?\(/);

    expect(api).toMatch(/\.patch(?:<[^>]+>)?\(/);

    expectContainsAll(payload, [
      "profissionalId",
      "agendamentoId",
      "valorServico",
      "percentual",
    ]);

    expect(payload).not.toContain("valorComissao:");

    expect(backendService).toMatch(
      /valorComissao\s*=\s*\(dto\.valorServico\s*\*\s*dto\.percentual\)\s*\/\s*100/,
    );
  });

  it("integra relatórios operacionais sem duplicar analytics executivo", () => {
    const api = frontend(
      "src/features/financeiro/services/relatorios-financeiros-api.ts",
    );

    const section = frontend(
      "src/features/financeiro/components/relatorios-financeiros-section.tsx",
    );

    expectContainsAll(api, [
      "financeiroEndpoints.resumo",
      "financeiroEndpoints.fluxoCaixa",
      "financeiroEndpoints.receitasMes",
      "financeiroEndpoints.despesasMes",
    ]);

    expect(api).not.toContain("/analytics/financeiro");

    expect(section).toContain("Indicadores executivos permanecem");
  });

  it("preserva período somente nos relatórios que o backend suporta", () => {
    const api = frontend(
      "src/features/financeiro/services/relatorios-financeiros-api.ts",
    );

    expectContainsAll(api, ["dataInicio", "dataFim"]);

    const receitasIndex = api.indexOf("getReceitasMes");

    const despesasIndex = api.indexOf("getDespesasMes");

    expect(receitasIndex).toBeGreaterThan(-1);

    expect(despesasIndex).toBeGreaterThan(receitasIndex);

    const receitas = api.slice(receitasIndex, despesasIndex);

    const despesas = api.slice(despesasIndex);

    expect(receitas).not.toContain("dataInicio");

    expect(receitas).not.toContain("dataFim");

    expect(despesas).not.toContain("dataInicio");

    expect(despesas).not.toContain("dataFim");
  });

  it("mantém mutations críticas sem optimistic update e sem retry", () => {
    const movements = frontend(
      "src/features/financeiro/hooks/use-movimentacoes-financeiras.ts",
    );

    const commissions = frontend(
      "src/features/financeiro/hooks/use-comissoes.ts",
    );

    const combined = movements + "\n" + commissions;

    expect(combined).toContain("useMutation");

    expect(combined).toContain("retry: false");

    expect(combined).not.toContain("onMutate");

    expect(combined).not.toContain("setQueryData");

    expect(combined).not.toContain("queryClient.clear");
  });

  it("mantém tenant implícito e infraestrutura compartilhada", () => {
    const productionFiles = [
      "src/features/financeiro/services/categorias-financeiras-api.ts",
      "src/features/financeiro/services/movimentacoes-financeiras-api.ts",
      "src/features/financeiro/services/comissoes-api.ts",
      "src/features/financeiro/services/relatorios-financeiros-api.ts",
    ];

    const combined = productionFiles.map((file) => frontend(file)).join("\n");

    expect(combined).not.toContain("empresaId");

    expect(combined).not.toContain("axios.create");

    expect(combined).not.toContain("new QueryClient");

    expect(combined).not.toContain("Authorization:");
  });

  it("não expõe capacidades financeiras inexistentes", () => {
    const files = [
      "src/features/financeiro/services/movimentacoes-financeiras-api.ts",
      "src/features/financeiro/services/comissoes-api.ts",
      "src/features/financeiro/components/cancelar-movimentacao-dialog.tsx",
    ];

    const combined = files.map((file) => frontend(file)).join("\n");

    for (const unsupported of [
      "/pagamentos",
      "/estornar",
      "cancelarPagamento",
      "reabrirMovimentacao",
      "estornarComissao",
      "deleteComissao",
    ]) {
      expect(combined).not.toContain(unsupported);
    }
  });

  it("mantém cálculos monetários autoritativos fora do frontend", () => {
    const reports = frontend(
      "src/features/financeiro/components/relatorios-financeiros-section.tsx",
    );

    const cards = frontend(
      "src/features/financeiro/components/financeiro-operacional-cards.tsx",
    );

    const commissionPayload = frontend(
      "src/features/financeiro/forms/comissao-payload.ts",
    );

    const combined = reports + "\n" + cards + "\n" + commissionPayload;

    expect(combined).not.toMatch(/receitas\s*-\s*despesas/);

    expect(combined).not.toMatch(/totalEntradas\s*-\s*totalSaidas/);

    expect(combined).not.toMatch(/valorServico\s*\*\s*percentual/);

    expect(combined).not.toMatch(/percentual\s*\*\s*valorServico/);
  });
});
