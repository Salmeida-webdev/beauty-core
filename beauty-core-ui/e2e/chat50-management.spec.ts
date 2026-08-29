import { expect, test, type Page } from "@playwright/test";

import {
  expectNoHorizontalOverflow,
  expectNoRuntimeErrors,
  expectVisibleExactText,
  installChat50Auth,
  mockChat50ManagementApi,
  monitorChat50Runtime,
  waitForChat50Request,
  type Chat50Role,
} from "./fixtures/chat50-management.fixture";

async function setupPage(page: Page, role: Chat50Role) {
  const runtime = monitorChat50Runtime(page);

  const controller = await mockChat50ManagementApi(page);

  await installChat50Auth(page, role);

  return {
    runtime,
    controller,
  };
}

test.describe("Chat 50 — gestão operacional", () => {
  test("ADMIN acessa Serviços com dados e ações de gestão", async ({
    page,
  }) => {
    const { runtime, controller } = await setupPage(page, "ADMIN");

    await page.goto("/servicos");

    await expect(
      page.getByRole("heading", {
        name: "Serviços",
        exact: true,
      }),
    ).toBeVisible();

    await waitForChat50Request(controller, "/servicos");

    await expectVisibleExactText(page, "Limpeza Premium");

    await expect(
      page.getByRole("button", {
        name: "Novo serviço",
      }),
    ).toBeVisible();

    expect(controller.callsTo("/servicos")).toBeGreaterThan(0);

    expectNoRuntimeErrors(runtime);
  });

  test("RECEPCAO acessa Serviços somente para leitura", async ({ page }) => {
    const { runtime, controller } = await setupPage(page, "RECEPCAO");

    await page.goto("/servicos");

    await waitForChat50Request(controller, "/servicos");

    await expectVisibleExactText(page, "Limpeza Premium");

    await expect(
      page.getByRole("button", {
        name: "Novo serviço",
      }),
    ).toHaveCount(0);

    await expect(
      page.getByRole("button", {
        name: "Editar",
      }),
    ).toHaveCount(0);

    await expect(
      page.getByRole("button", {
        name: "Inativar",
      }),
    ).toHaveCount(0);

    expectNoRuntimeErrors(runtime);
  });

  test("ADMIN acessa Unidades com dados reais", async ({ page }) => {
    const { runtime, controller } = await setupPage(page, "ADMIN");

    await page.goto("/unidades");

    await expect(
      page.getByRole("heading", {
        name: "Unidades",
        exact: true,
      }),
    ).toBeVisible();

    await waitForChat50Request(controller, "/unidades");

    await expectVisibleExactText(page, "Unidade Centro");

    expectNoRuntimeErrors(runtime);
  });

  test("ADMIN acessa Usuários com paginação server-side e self identificado", async ({
    page,
  }) => {
    const { runtime, controller } = await setupPage(page, "ADMIN");

    await page.goto("/usuarios");

    await expect(
      page.getByRole("heading", {
        name: "Usuários",
        exact: true,
      }),
    ).toBeVisible();

    const request = await waitForChat50Request(
      controller,
      "/usuarios",
      (item) => item.searchParams.role === undefined,
    );

    await expectVisibleExactText(page, "Administrador E2E");

    await expectVisibleExactText(page, "Gerente E2E");

    await expectVisibleExactText(page, "Você");

    expect(request.searchParams).toMatchObject({
      page: "1",
      limit: "20",
      orderBy: "createdAt",
      orderDirection: "desc",
    });

    expectNoRuntimeErrors(runtime);
  });

  test("Profissionais envia obrigatoriamente role PROFISSIONAL", async ({
    page,
  }) => {
    const { runtime, controller } = await setupPage(page, "ADMIN");

    await page.goto("/profissionais");

    await expect(
      page.getByRole("heading", {
        name: "Profissionais",
        exact: true,
      }),
    ).toBeVisible();

    const request = await waitForChat50Request(
      controller,
      "/usuarios",
      (item) => item.searchParams.role === "PROFISSIONAL",
    );

    expect(request.searchParams.role).toBe("PROFISSIONAL");

    await expectVisibleExactText(page, "Maria Profissional");

    expectNoRuntimeErrors(runtime);
  });

  test("RECEPCAO não acessa gestão de Usuários nem dispara listagem", async ({
    page,
  }) => {
    const { runtime, controller } = await setupPage(page, "RECEPCAO");

    await page.goto("/usuarios");

    await expect(
      page.getByText(
        /não possui permissão para acessar a gestão administrativa de usuários/i,
      ),
    ).toBeVisible();

    await expect
      .poll(() => controller.callsTo("/usuarios"), {
        timeout: 1_000,
      })
      .toBe(0);

    expectNoRuntimeErrors(runtime);
  });

  test("quatro módulos não geram overflow horizontal no mobile", async ({
    page,
  }) => {
    const { runtime, controller } = await setupPage(page, "ADMIN");

    await page.setViewportSize({
      width: 390,
      height: 844,
    });

    await page.goto("/servicos");

    await waitForChat50Request(controller, "/servicos");

    await expectVisibleExactText(page, "Limpeza Premium");

    await expectNoHorizontalOverflow(page);

    await page.goto("/unidades");

    await waitForChat50Request(controller, "/unidades");

    await expectVisibleExactText(page, "Unidade Centro");

    await expectNoHorizontalOverflow(page);

    await page.goto("/usuarios");

    await waitForChat50Request(
      controller,
      "/usuarios",
      (item) => item.searchParams.role === undefined,
    );

    await expectVisibleExactText(page, "Administrador E2E");

    await expectNoHorizontalOverflow(page);

    await page.goto("/profissionais");

    await waitForChat50Request(
      controller,
      "/usuarios",
      (item) => item.searchParams.role === "PROFISSIONAL",
    );

    await expectVisibleExactText(page, "Maria Profissional");

    await expectNoHorizontalOverflow(page);

    expectNoRuntimeErrors(runtime);
  });
});
