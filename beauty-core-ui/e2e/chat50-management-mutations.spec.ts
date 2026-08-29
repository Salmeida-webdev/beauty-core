import { expect, test, type Page, type Route } from "@playwright/test";

import {
  ADMIN_FIXTURE,
  EMPRESA_ID,
  PROFISSIONAL_FIXTURE,
  SERVICO_FIXTURE,
  UNIDADE_FIXTURE,
  expectNoRuntimeErrors,
  expectVisibleExactText,
  installChat50Auth,
  mockChat50ManagementApi,
  monitorChat50Runtime,
  waitForChat50Request,
} from "./fixtures/chat50-management.fixture";

type MutationRecord = {
  method: "POST" | "PATCH";

  path: string;

  body: unknown;
};

type MutationController = {
  records: MutationRecord[];

  waitFor: (
    method: MutationRecord["method"],
    path: string,
  ) => Promise<MutationRecord>;
};

const CREATED_AT = "2026-08-28T10:00:00.000Z";

const UPDATED_AT = "2026-08-28T23:30:00.000Z";

const NOVO_USUARIO_ID = "550e8400-e29b-41d4-a716-446655440060";

const NOVO_PROFISSIONAL_ID = "550e8400-e29b-41d4-a716-446655440061";

async function jsonBody(route: Route): Promise<unknown> {
  const raw = route.request().postData();

  if (!raw) {
    return null;
  }

  return JSON.parse(raw);
}

async function fulfillJson(route: Route, data: unknown): Promise<void> {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify(data),
  });
}

async function installMutationMocks(page: Page): Promise<MutationController> {
  const records: MutationRecord[] = [];

  await page.route("**/*", async (route) => {
    const request = route.request();

    const method = request.method();

    if (method !== "POST" && method !== "PATCH") {
      await route.fallback();

      return;
    }

    const url = new URL(request.url());

    if (url.pathname.includes("/auth/")) {
      await route.fallback();

      return;
    }

    const body = await jsonBody(route);

    records.push({
      method,
      path: url.pathname,
      body,
    });

    if (
      method === "PATCH" &&
      url.pathname.endsWith(`/servicos/${SERVICO_FIXTURE.id}/inativar`)
    ) {
      await fulfillJson(route, {
        ...SERVICO_FIXTURE,
        ativo: false,
        updatedAt: UPDATED_AT,
      });

      return;
    }

    if (
      method === "PATCH" &&
      url.pathname.endsWith(`/servicos/${SERVICO_FIXTURE.id}`)
    ) {
      const patch = (body ?? {}) as Record<string, unknown>;

      await fulfillJson(route, {
        ...SERVICO_FIXTURE,
        ...patch,
        updatedAt: UPDATED_AT,
      });

      return;
    }

    if (
      method === "PATCH" &&
      url.pathname.endsWith(`/unidades/${UNIDADE_FIXTURE.id}/inativar`)
    ) {
      await fulfillJson(route, {
        ...UNIDADE_FIXTURE,
        ativa: false,
        updatedAt: UPDATED_AT,
      });

      return;
    }

    if (
      method === "PATCH" &&
      url.pathname.endsWith(`/unidades/${UNIDADE_FIXTURE.id}`)
    ) {
      const patch = (body ?? {}) as Record<string, unknown>;

      await fulfillJson(route, {
        ...UNIDADE_FIXTURE,
        ...patch,
        updatedAt: UPDATED_AT,
      });

      return;
    }

    if (method === "POST" && url.pathname.endsWith("/usuarios")) {
      const payload = (body ?? {}) as Record<string, unknown>;

      const profissional = payload.role === "PROFISSIONAL";

      await fulfillJson(route, {
        id: profissional ? NOVO_PROFISSIONAL_ID : NOVO_USUARIO_ID,

        empresaId: EMPRESA_ID,

        nome: String(payload.nome ?? ""),

        email: String(payload.email ?? ""),

        telefone:
          typeof payload.telefone === "string" ? payload.telefone : null,

        foto: null,

        role: payload.role,

        ativo: true,

        ultimoLogin: null,

        createdAt: CREATED_AT,

        updatedAt: UPDATED_AT,
      });

      return;
    }

    if (
      method === "PATCH" &&
      url.pathname.endsWith(`/usuarios/${ADMIN_FIXTURE.id}`)
    ) {
      const patch = (body ?? {}) as Record<string, unknown>;

      await fulfillJson(route, {
        ...ADMIN_FIXTURE,
        ...patch,
        updatedAt: UPDATED_AT,
      });

      return;
    }

    if (
      method === "PATCH" &&
      url.pathname.endsWith(`/usuarios/${PROFISSIONAL_FIXTURE.id}/inativar`)
    ) {
      await fulfillJson(route, {
        ...PROFISSIONAL_FIXTURE,
        ativo: false,
        updatedAt: UPDATED_AT,
      });

      return;
    }

    await route.fallback();
  });

  return {
    records,

    waitFor: async (method, path) => {
      await expect
        .poll(
          () =>
            records.some(
              (record) =>
                record.method === method && record.path.endsWith(path),
            ),
          {
            timeout: 10_000,

            intervals: [100, 200, 300, 500],

            message: `Mutation não observada: ${method} ${path}`,
          },
        )
        .toBe(true);

      const record = records.find(
        (item) => item.method === method && item.path.endsWith(path),
      );

      if (!record) {
        throw new Error(`Mutation não localizada: ${method} ${path}`);
      }

      return record;
    },
  };
}

async function setupAdmin(page: Page) {
  const runtime = monitorChat50Runtime(page);

  const reads = await mockChat50ManagementApi(page);

  await installChat50Auth(page, "ADMIN");

  const mutations = await installMutationMocks(page);

  return {
    runtime,
    reads,
    mutations,
  };
}

test.describe("Chat 50 — mutations administrativas", () => {
  test("edita Serviço com PATCH do contrato real", async ({ page }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/servicos");

    await waitForChat50Request(reads, "/servicos");

    await expectVisibleExactText(page, "Limpeza Premium");

    await page
      .getByRole("button", {
        name: "Editar",
      })
      .first()
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/^Nome/).fill("Limpeza Premium Atualizada");

    await dialog
      .getByRole("button", {
        name: "Salvar alterações",
      })
      .click();

    const mutation = await mutations.waitFor(
      "PATCH",
      `/servicos/${SERVICO_FIXTURE.id}`,
    );

    expect(mutation.body).toEqual(
      expect.objectContaining({
        nome: "Limpeza Premium Atualizada",
      }),
    );

    expectNoRuntimeErrors(runtime);
  });

  test("inativa Serviço no endpoint dedicado", async ({ page }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/servicos");

    await waitForChat50Request(reads, "/servicos");

    await expectVisibleExactText(page, "Limpeza Premium");

    await page
      .getByRole("button", {
        name: "Inativar",
      })
      .first()
      .click();

    const alert = page.getByRole("alertdialog");

    await expect(alert).toBeVisible();

    const confirm = alert
      .getByRole("button")
      .filter({
        hasText: /inativ/i,
      })
      .last();

    await expect(confirm).toBeVisible();

    await confirm.click();

    const mutation = await mutations.waitFor(
      "PATCH",
      `/servicos/${SERVICO_FIXTURE.id}/inativar`,
    );

    expect(mutation.body).toBeNull();

    expectNoRuntimeErrors(runtime);
  });

  test("edita Unidade sem inventar cidade estado ou CEP", async ({ page }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/unidades");

    await waitForChat50Request(reads, "/unidades");

    await expectVisibleExactText(page, "Unidade Centro");

    await page
      .getByRole("button", {
        name: "Editar",
      })
      .first()
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/^Nome/).fill("Unidade Centro Atualizada");

    await dialog
      .getByRole("button", {
        name: "Salvar alterações",
      })
      .click();

    const mutation = await mutations.waitFor(
      "PATCH",
      `/unidades/${UNIDADE_FIXTURE.id}`,
    );

    expect(mutation.body).toEqual(
      expect.objectContaining({
        nome: "Unidade Centro Atualizada",
      }),
    );

    const payload = mutation.body as Record<string, unknown>;

    expect(payload).not.toHaveProperty("cidade");

    expect(payload).not.toHaveProperty("estado");

    expect(payload).not.toHaveProperty("cep");

    expectNoRuntimeErrors(runtime);
  });

  test("inativa Unidade no endpoint dedicado", async ({ page }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/unidades");

    await waitForChat50Request(reads, "/unidades");

    await expectVisibleExactText(page, "Unidade Centro");

    await page
      .getByRole("button", {
        name: "Inativar",
      })
      .first()
      .click();

    const alert = page.getByRole("alertdialog");

    await expect(alert).toBeVisible();

    const confirm = alert
      .getByRole("button")
      .filter({
        hasText: /inativ/i,
      })
      .last();

    await expect(confirm).toBeVisible();

    await confirm.click();

    const mutation = await mutations.waitFor(
      "PATCH",
      `/unidades/${UNIDADE_FIXTURE.id}/inativar`,
    );

    expect(mutation.body).toBeNull();

    expectNoRuntimeErrors(runtime);
  });

  test("ADMIN cria usuário sem empresaId arbitrário", async ({ page }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/usuarios");

    await waitForChat50Request(
      reads,
      "/usuarios",
      (item) => item.searchParams.role === undefined,
    );

    await page
      .getByRole("button", {
        name: "Novo usuário",
      })
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await dialog.getByLabel(/^Nome/).fill("Novo Gerente E2E");

    await dialog.getByLabel(/^E-mail/).fill("novo.gerente@beautycore.test");

    await dialog.getByLabel(/^Senha/).fill("Senha123");

    await dialog
      .getByRole("button", {
        name: "Cadastrar usuário",
      })
      .click();

    const mutation = await mutations.waitFor("POST", "/usuarios");

    expect(mutation.body).toEqual({
      nome: "Novo Gerente E2E",

      email: "novo.gerente@beautycore.test",

      role: "GERENTE",

      senha: "Senha123",
    });

    expectNoRuntimeErrors(runtime);
  });

  test("self edit não envia role nem senha vazia", async ({ page }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/usuarios");

    await waitForChat50Request(
      reads,
      "/usuarios",
      (item) => item.searchParams.role === undefined,
    );

    await expectVisibleExactText(page, "Administrador E2E");

    const row = page.getByRole("row").filter({
      hasText: "Administrador E2E",
    });

    await expect(row).toBeVisible();

    await row
      .getByRole("button", {
        name: "Editar",
      })
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await expect(dialog.getByLabel(/^Perfil/)).toBeDisabled();

    await dialog.getByLabel(/^Nome/).fill("Administrador Atualizado E2E");

    await dialog
      .getByRole("button", {
        name: "Salvar alterações",
      })
      .click();

    const mutation = await mutations.waitFor(
      "PATCH",
      `/usuarios/${ADMIN_FIXTURE.id}`,
    );

    const payload = mutation.body as Record<string, unknown>;

    expect(payload.nome).toBe("Administrador Atualizado E2E");

    expect(payload.email).toBe("admin@beautycore.test");

    expect(payload).not.toHaveProperty("role");

    expect(payload).not.toHaveProperty("senha");

    expect(payload).not.toHaveProperty("empresaId");

    expectNoRuntimeErrors(runtime);
  });

  test("cadastro em Profissionais força role PROFISSIONAL", async ({
    page,
  }) => {
    const { runtime, reads, mutations } = await setupAdmin(page);

    await page.goto("/profissionais");

    await waitForChat50Request(
      reads,
      "/usuarios",
      (item) => item.searchParams.role === "PROFISSIONAL",
    );

    await page
      .getByRole("button", {
        name: "Novo profissional",
      })
      .click();

    const dialog = page.getByRole("dialog");

    await expect(dialog).toBeVisible();

    await expect(dialog.getByLabel(/^Perfil/)).toBeDisabled();

    await expect(dialog.getByLabel(/^Perfil/)).toHaveValue("Profissional");

    await dialog.getByLabel(/^Nome/).fill("Novo Profissional E2E");

    await dialog
      .getByLabel(/^E-mail/)
      .fill("novo.profissional@beautycore.test");

    await dialog.getByLabel(/^Senha/).fill("Senha123");

    await dialog
      .getByRole("button", {
        name: "Cadastrar usuário",
      })
      .click();

    const mutation = await mutations.waitFor("POST", "/usuarios");

    expect(mutation.body).toEqual({
      nome: "Novo Profissional E2E",

      email: "novo.profissional@beautycore.test",

      role: "PROFISSIONAL",

      senha: "Senha123",
    });

    expectNoRuntimeErrors(runtime);
  });
});
