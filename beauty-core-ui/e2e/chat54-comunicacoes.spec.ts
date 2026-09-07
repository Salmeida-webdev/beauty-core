import {
  expect,
  test,
} from "@playwright/test";

import {
  installChat54Fixture,
  type Chat54Fixture,
} from "./fixtures/chat54-comunicacoes.fixture";

function expectNoUnhandled(
  fixture: Chat54Fixture,
): void {
  expect(
    fixture.unhandled,
  ).toEqual([]);

  expect(
    fixture.forbidden,
  ).toEqual([]);
}

async function expectHeading(
  page: Parameters<
    typeof test
  >[0] extends never
    ? never
    : import("@playwright/test").Page,
  name: string,
): Promise<void> {
  await expect(
    page.getByRole(
      "heading",
      {
        name,
        level: 1,
      },
    ),
  ).toBeVisible();
}

const VIEWPORTS = [
  {
    name: "360x800",
    width: 360,
    height: 800,
  },
  {
    name: "390x844",
    width: 390,
    height: 844,
  },
  {
    name: "768x1024",
    width: 768,
    height: 1024,
  },
  {
    name: "1366x768",
    width: 1366,
    height: 768,
  },
  {
    name: "1440x900",
    width: 1440,
    height: 900,
  },
  {
    name: "1920x1080",
    width: 1920,
    height: 1080,
  },
] as const;

test.describe(
  "Chat 54 — Comunicações E2E",
  () => {
    test(
      "ADMIN acessa WhatsApp, Notificações e Automações com APIs permitidas",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          "/whatsapp",
        );

        await expectHeading(
          page,
          "WhatsApp",
        );

        await expect(
          page
            .getByRole(
              "link",
              {
                name: "WhatsApp",
                exact: true,
              },
            )
            .first(),
        ).toBeVisible();

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Enviar mensagem",
            },
          ),
        ).toBeVisible();

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Novo template",
            },
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Campanhas WhatsApp",
            {
              exact: true,
            },
          ).first(),
        ).toBeVisible();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/templates-whatsapp",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/mensagens-whatsapp",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/campanhas-whatsapp",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await page.goto(
          "/notificacoes",
        );

        await expectHeading(
          page,
          "Notificações",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/notificacoes",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/notificacoes/resumo",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/configuracoes-notificacao",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await page.goto(
          "/automacoes",
        );

        await expectHeading(
          page,
          "Automações",
        );

        await expect(
          page.getByText(
            "Eventos recentes",
            {
              exact: true,
            },
          ),
        ).toBeVisible();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/automacoes/eventos",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "GERENTE possui os três módulos tenant",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "GERENTE",
          );

        await page.goto(
          "/whatsapp",
        );

        await expectHeading(
          page,
          "WhatsApp",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/templates-whatsapp",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/campanhas-whatsapp",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await page.goto(
          "/notificacoes",
        );

        await expectHeading(
          page,
          "Notificações",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/configuracoes-notificacao",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await page.goto(
          "/automacoes",
        );

        await expectHeading(
          page,
          "Automações",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/automacoes/eventos",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "RECEPCAO possui mensagens e notificações sem templates, campanhas, settings ou automações",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "RECEPCAO",
          );

        await page.goto(
          "/whatsapp",
        );

        await expectHeading(
          page,
          "WhatsApp",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/mensagens-whatsapp",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expect(
          fixture.callsTo(
            "/templates-whatsapp",
            "GET",
          ),
        ).toBe(0);

        expect(
          fixture.callsTo(
            "/campanhas-whatsapp",
            "GET",
          ),
        ).toBe(0);

        await expect(
          page.getByRole(
            "link",
            {
              name:
                "Automações",
              exact: true,
            },
          ),
        ).toHaveCount(0);

        await page.goto(
          "/notificacoes",
        );

        await expectHeading(
          page,
          "Notificações",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/notificacoes",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expect(
          fixture.callsTo(
            "/configuracoes-notificacao",
            "GET",
          ),
        ).toBe(0);

        await page.goto(
          "/automacoes",
        );

        await expect(
          page.getByText(
            "Seu perfil não possui acesso às operações administrativas de automação.",
          ),
        ).toBeVisible();

        expect(
          fixture.callsTo(
            "/automacoes/eventos",
            "GET",
          ),
        ).toBe(0);

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "PROFISSIONAL possui somente histórico de Notificações entre os módulos Chat54",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "PROFISSIONAL",
          );

        await page.goto(
          "/notificacoes",
        );

        await expectHeading(
          page,
          "Notificações",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/notificacoes",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expect(
          fixture.callsTo(
            "/configuracoes-notificacao",
            "GET",
          ),
        ).toBe(0);

        await page.goto(
          "/whatsapp",
        );

        await expect(
          page.getByText(
            "Seu perfil não possui acesso ao módulo operacional de WhatsApp.",
          ),
        ).toBeVisible();

        expect(
          fixture.callsTo(
            "/mensagens-whatsapp",
          ),
        ).toBe(0);

        expect(
          fixture.callsTo(
            "/templates-whatsapp",
          ),
        ).toBe(0);

        expect(
          fixture.callsTo(
            "/campanhas-whatsapp",
          ),
        ).toBe(0);

        await page.goto(
          "/automacoes",
        );

        await expect(
          page.getByText(
            "Seu perfil não possui acesso às operações administrativas de automação.",
          ),
        ).toBeVisible();

        expect(
          fixture.callsTo(
            "/automacoes/eventos",
          ),
        ).toBe(0);

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "SUPER_ADMIN não dispara nenhuma API tenant Chat54",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "SUPER_ADMIN",
          );

        await page.goto(
          "/whatsapp",
        );

        await expect(
          page.getByText(
            "Seu perfil não possui acesso ao módulo operacional de WhatsApp.",
          ),
        ).toBeVisible();

        await page.goto(
          "/notificacoes",
        );

        await expect(
          page.getByText(
            "Seu perfil não possui acesso às notificações administrativas.",
          ),
        ).toBeVisible();

        await page.goto(
          "/automacoes",
        );

        await expect(
          page.getByText(
            "Seu perfil não possui acesso às operações administrativas de automação.",
          ),
        ).toBeVisible();

        expect(
          fixture.calls,
        ).toEqual([]);

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "envio manual usa POST assíncrono real e não envia empresaId",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          "/whatsapp",
        );

        await expectHeading(
          page,
          "WhatsApp",
        );

        const messageForm =
          page.locator(
            'form:has(#whatsapp-mensagem-destinatario)',
          );

        await expect(
          messageForm,
        ).toBeVisible();

        await messageForm
          .locator(
            "#whatsapp-mensagem-tipo",
          )
          .selectOption(
            "SISTEMA",
          );

        await messageForm
          .locator(
            "#whatsapp-mensagem-destinatario",
          )
          .fill(
            "83999999999",
          );

        await messageForm
          .locator(
            "#whatsapp-mensagem-conteudo",
          )
          .fill(
            "Mensagem E2E Chat 54",
          );

        await messageForm
          .getByRole(
            "button",
            {
              name:
                "Enviar mensagem",
            },
          )
          .click();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/mensagens-whatsapp/enviar",
                "POST",
              ),
          )
          .toBe(1);

        const sendCall =
          fixture.calls.find(
            (call) =>
              call.path ===
                "/mensagens-whatsapp/enviar" &&
              call.method ===
                "POST",
          );

        expect(
          sendCall,
        ).toBeDefined();

        expect(
          sendCall?.body,
        ).toEqual(
          expect.objectContaining({
            tipo:
              "SISTEMA",
            destinatario:
              "83999999999",
            mensagem:
              "Mensagem E2E Chat 54",
          }),
        );

        expect(
          sendCall?.body,
        ).not.toHaveProperty(
          "empresaId",
        );

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "ADMIN salva configurações de Notificações via PATCH real sem empresaId",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          "/notificacoes",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/configuracoes-notificacao",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        const firstCheckbox =
          page
            .locator(
              'input[type="checkbox"]',
            )
            .first();

        await expect(
          firstCheckbox,
        ).toBeVisible();

        await firstCheckbox.click();

        await page
          .getByRole(
            "button",
            {
              name:
                "Salvar configurações",
            },
          )
          .click();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/configuracoes-notificacao",
                "PATCH",
              ),
          )
          .toBe(1);

        const patchCall =
          fixture.calls.find(
            (call) =>
              call.path ===
                "/configuracoes-notificacao" &&
              call.method ===
                "PATCH",
          );

        expect(
          patchCall,
        ).toBeDefined();

        expect(
          patchCall?.body,
        ).not.toHaveProperty(
          "empresaId",
        );

        await expect(
          page.getByText(
            "Configurações atualizadas",
            {
              exact: false,
            },
          ),
        ).toBeVisible();

        expectNoUnhandled(
          fixture,
        );
      },
    );

    test(
      "ADMIN confirma teste de relatório pela operação real sem acessar queues",
      async ({
        page,
      }) => {
        const fixture =
          await installChat54Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          "/automacoes",
        );

        await expectHeading(
          page,
          "Automações",
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/automacoes/eventos",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        const testButtons =
          page.getByRole(
            "button",
            {
              name:
                "Executar teste",
            },
          );

        await expect(
          testButtons,
        ).toHaveCount(2);

        await testButtons
          .nth(1)
          .click();

        await expect(
          page.getByText(
            "Executar teste de relatório?",
            {
              exact: true,
            },
          ),
        ).toBeVisible();

        await page
          .getByRole(
            "button",
            {
              name:
                "Confirmar teste",
            },
          )
          .click();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/automacoes/teste-relatorio",
                "POST",
              ),
          )
          .toBe(1);

        expect(
          fixture.forbidden,
        ).toEqual([]);

        expectNoUnhandled(
          fixture,
        );
      },
    );

    for (
      const viewport of
      VIEWPORTS
    ) {
      test(
        `responsividade ${viewport.name} mantém as três páginas sem overflow global`,
        async ({
          page,
        }) => {
          const fixture =
            await installChat54Fixture(
              page,
              "ADMIN",
            );

          await page.setViewportSize({
            width:
              viewport.width,
            height:
              viewport.height,
          });

          const routes = [
            {
              path:
                "/whatsapp",
              heading:
                "WhatsApp",
            },
            {
              path:
                "/notificacoes",
              heading:
                "Notificações",
            },
            {
              path:
                "/automacoes",
              heading:
                "Automações",
            },
          ] as const;

          for (
            const route of routes
          ) {
            await page.goto(
              route.path,
            );

            await expectHeading(
              page,
              route.heading,
            );

            const overflow =
              await page.evaluate(
                () =>
                  Math.max(
                    0,
                    document
                      .documentElement
                      .scrollWidth -
                      document
                        .documentElement
                        .clientWidth,
                  ),
              );

            expect(
              overflow,
            ).toBeLessThanOrEqual(
              1,
            );
          }

          expectNoUnhandled(
            fixture,
          );
        },
      );
    }
  },
);