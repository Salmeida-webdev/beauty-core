import { expect, test, type Locator, type Page } from "@playwright/test";

import {
  CHAT52_IDS,
  hasNoHorizontalOverflow,
  installChat52Financeiro,
  type Chat52Role,
  type Chat52Runtime,
} from "./fixtures/chat52-financeiro.fixture";

function lastRequest(runtime: Chat52Runtime, method: string, pathname: string) {
  return [...runtime.requests]
    .reverse()
    .find((item) => item.method === method && item.pathname === pathname);
}

async function expectRuntimeClean(runtime: Chat52Runtime): Promise<void> {
  expect(runtime.pageErrors).toEqual([]);

  expect(runtime.consoleErrors).toEqual([]);
}

async function loadFinanceiro(page: Page): Promise<void> {
  await page.goto("/financeiro");

  await expect(
    page.getByRole("heading", {
      name: "Financeiro",
      level: 1,
    }),
  ).toBeVisible();
}

async function choosePix(page: Page, dialog: Locator): Promise<void> {
  const nativeSelect = dialog.locator("select");

  if (await nativeSelect.count()) {
    await nativeSelect.first().selectOption("PIX");

    return;
  }

  const combobox = dialog.getByRole("combobox").first();

  await combobox.click();

  await page
    .getByRole("option", {
      name: /PIX/i,
    })
    .click();
}

test.describe("Chat 52 — Financeiro E2E", () => {
  for (const role of ["ADMIN", "GERENTE"] as const) {
    test(`${role} acessa o Financeiro tenant`, async ({ page }) => {
      const runtime = await installChat52Financeiro(page, role);

      await loadFinanceiro(page);

      await expect
        .poll(() => Boolean(lastRequest(runtime, "GET", "/financeiro")))
        .toBe(true);

      await expect
        .poll(() =>
          Boolean(lastRequest(runtime, "GET", "/categorias-financeiras")),
        )
        .toBe(true);

      await expect
        .poll(() => Boolean(lastRequest(runtime, "GET", "/comissoes")))
        .toBe(true);

      await expectRuntimeClean(runtime);
    });
  }

  for (const role of [
    "SUPER_ADMIN",
    "RECEPCAO",
    "PROFISSIONAL",
  ] as const satisfies readonly Chat52Role[]) {
    test(`${role} não monta APIs tenant do Financeiro`, async ({ page }) => {
      const runtime = await installChat52Financeiro(page, role);

      await page.goto("/financeiro");

      await page.waitForTimeout(700);

      const financeRequests = runtime.requests.filter(
        (item) =>
          item.pathname === "/financeiro" ||
          item.pathname.startsWith("/financeiro/") ||
          item.pathname.startsWith("/categorias-financeiras") ||
          item.pathname.startsWith("/comissoes"),
      );

      expect(financeRequests).toEqual([]);

      await expectRuntimeClean(runtime);
    });
  }

  test("URL state envia filtros suportados ao backend sem período fictício", async ({
    page,
  }) => {
    const runtime = await installChat52Financeiro(page, "ADMIN");

    const query = new URLSearchParams({
      page: "2",
      limit: "10",

      categoriaId: CHAT52_IDS.categoria,

      clienteId: CHAT52_IDS.cliente,

      agendamentoId: CHAT52_IDS.agendamento,

      tipo: "RECEITA",

      status: "PENDENTE",

      orderBy: "dataMovimentacao",

      orderDirection: "desc",
    });

    await page.goto(`/financeiro?${query.toString()}`);

    await expect(
      page.getByRole("heading", {
        name: "Financeiro",
        level: 1,
      }),
    ).toBeVisible();

    await expect
      .poll(
        () =>
          runtime.requests
            .filter(
              (item) =>
                item.method === "GET" && item.pathname === "/financeiro",
            )
            .at(-1)?.search ?? "",
      )
      .toContain("status=PENDENTE");

    const request = runtime.requests
      .filter(
        (item) => item.method === "GET" && item.pathname === "/financeiro",
      )
      .at(-1);

    expect(request).toBeDefined();

    const params = new URLSearchParams(request?.search ?? "");

    expect(params.get("categoriaId")).toBe(CHAT52_IDS.categoria);

    expect(params.get("clienteId")).toBe(CHAT52_IDS.cliente);

    expect(params.get("agendamentoId")).toBe(CHAT52_IDS.agendamento);

    expect(params.get("tipo")).toBe("RECEITA");

    expect(params.get("status")).toBe("PENDENTE");

    expect(params.get("orderBy")).toBe("dataMovimentacao");

    expect(params.get("orderDirection")).toBe("desc");

    expect(params.has("dataInicio")).toBe(false);

    expect(params.has("dataFim")).toBe(false);

    await expectRuntimeClean(runtime);
  });

  test("pagamento usa PATCH dedicado com somente formaPagamento", async ({
    page,
  }) => {
    const runtime = await installChat52Financeiro(page, "ADMIN");

    await loadFinanceiro(page);

    await expect(page.getByText("Receita E2E pendente")).toBeVisible();

    const pendingCard = page.locator("article").filter({
      hasText: "Receita E2E pendente",
    });

    await expect(pendingCard).toBeVisible();

    await pendingCard
      .getByRole("button", {
        name: "Registrar pagamento",
      })
      .click();

    const dialog = page.getByRole("dialog").last();

    await expect(dialog).toBeVisible();

    await choosePix(page, dialog);

    await dialog.locator('button[type="submit"]').click();

    const pathname = `/financeiro/${CHAT52_IDS.movimentoPendente}/pagar`;

    await expect
      .poll(() => lastRequest(runtime, "PATCH", pathname)?.body)
      .toEqual({
        formaPagamento: "PIX",
      });

    const request = lastRequest(runtime, "PATCH", pathname);

    expect(
      Object.keys((request?.body ?? {}) as Record<string, unknown>),
    ).toEqual(["formaPagamento"]);

    expect(
      runtime.requests.some((item) => item.pathname.startsWith("/pagamentos")),
    ).toBe(false);

    await expectRuntimeClean(runtime);
  });

  test("cancelamento de movimentação paga não simula estorno externo", async ({
    page,
  }) => {
    const runtime = await installChat52Financeiro(page, "ADMIN");

    await loadFinanceiro(page);

    const paidCard = page.locator("article").filter({
      hasText: "Receita E2E paga",
    });

    await expect(paidCard).toBeVisible();

    await paidCard
      .getByRole("button", {
        name: "Cancelar",
      })
      .click();

    const dialog = page
      .locator('[role="alertdialog"], [role="dialog"]')
      .filter({
        hasText: /estorno externo/i,
      });

    await expect(dialog).toBeVisible();

    await expect(dialog).toContainText(/não representa estorno externo/i);

    await dialog
      .getByRole("button", {
        name: /confirmar|cancelar/i,
      })
      .last()
      .click();

    const pathname = `/financeiro/${CHAT52_IDS.movimentoPago}/cancelar`;

    await expect
      .poll(() => Boolean(lastRequest(runtime, "PATCH", pathname)))
      .toBe(true);

    expect(lastRequest(runtime, "PATCH", pathname)?.body).toBeNull();

    expect(
      runtime.requests.some((item) => item.pathname.includes("estornar")),
    ).toBe(false);

    await expectRuntimeClean(runtime);
  });

  test("comissão é paga somente pela rota dedicada", async ({ page }) => {
    const runtime = await installChat52Financeiro(page, "GERENTE");

    await loadFinanceiro(page);

    await page
      .getByRole("button", {
        name: "Pagar comissão",
      })
      .click();

    const dialog = page
      .locator('[role="alertdialog"], [role="dialog"]')
      .filter({
        hasText: /comiss/i,
      });

    await expect(dialog).toBeVisible();

    await dialog
      .getByRole("button", {
        name: /confirmar|pagar/i,
      })
      .last()
      .click();

    const pathname = `/comissoes/${CHAT52_IDS.comissao}/pagar`;

    await expect
      .poll(() => Boolean(lastRequest(runtime, "PATCH", pathname)))
      .toBe(true);

    expect(lastRequest(runtime, "PATCH", pathname)?.body).toBeNull();

    await expectRuntimeClean(runtime);
  });

  test("relatórios usam quatro endpoints operacionais sem analytics duplicado", async ({
    page,
  }) => {
    const runtime = await installChat52Financeiro(page, "ADMIN");

    await loadFinanceiro(page);

    for (const pathname of [
      "/financeiro/resumo",
      "/financeiro/fluxo-caixa",
      "/financeiro/receitas-mes",
      "/financeiro/despesas-mes",
    ] as const) {
      await expect
        .poll(() => Boolean(lastRequest(runtime, "GET", pathname)))
        .toBe(true);
    }

    expect(
      lastRequest(runtime, "GET", "/analytics/financeiro"),
    ).toBeUndefined();

    expect(
      runtime.requests.some((item) => item.pathname.startsWith("/pagamentos")),
    ).toBe(false);

    expect(
      runtime.requests.some((item) => item.pathname.includes("estornar")),
    ).toBe(false);

    await expectRuntimeClean(runtime);
  });

  test("Financeiro não possui overflow global nos seis viewports oficiais", async ({
    page,
  }) => {
    const runtime = await installChat52Financeiro(page, "ADMIN");

    const viewports = [
      {
        width: 360,
        height: 800,
      },
      {
        width: 390,
        height: 844,
      },
      {
        width: 768,
        height: 1024,
      },
      {
        width: 1366,
        height: 768,
      },
      {
        width: 1440,
        height: 900,
      },
      {
        width: 1920,
        height: 1080,
      },
    ] as const;

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      await loadFinanceiro(page);

      await expect.poll(() => hasNoHorizontalOverflow(page)).toBe(true);
    }

    await expectRuntimeClean(runtime);
  });
});
