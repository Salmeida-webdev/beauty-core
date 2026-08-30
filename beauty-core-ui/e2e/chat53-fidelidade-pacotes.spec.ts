import {
  expect,
  test,
  type Page,
} from "@playwright/test";

import {
  CHAT53_IDS,
  installChat53Fixture,
} from "./fixtures/chat53-fidelidade-pacotes.fixture";

const VIEWPORTS = [
  {
    name: "mobile-360",
    width: 360,
    height: 800,
  },
  {
    name: "mobile-390",
    width: 390,
    height: 844,
  },
  {
    name: "tablet-768",
    width: 768,
    height: 1024,
  },
  {
    name: "desktop-1366",
    width: 1366,
    height: 768,
  },
  {
    name: "desktop-1440",
    width: 1440,
    height: 900,
  },
  {
    name: "desktop-1920",
    width: 1920,
    height: 1080,
  },
] as const;

async function expectNoHorizontalOverflow(
  page: Page,
): Promise<void> {
  const hasOverflow =
    await page.evaluate(() => {
      const root =
        document.documentElement;

      return (
        root.scrollWidth >
        root.clientWidth
      );
    });

  expect(
    hasOverflow,
  ).toBe(false);
}

async function expectNoUnhandled(
  unhandled: string[],
): Promise<void> {
  expect(
    unhandled,
  ).toEqual([]);
}

test.describe(
  "Chat53 — Fidelidade + Pacotes E2E",
  () => {
    test(
      "ADMIN acessa Fidelidade e Pacotes com superfícies administrativas reais",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/configuracao-fidelidade",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                `/fidelidade/cliente/${CHAT53_IDS.cliente}`,
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/pacotes",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect(
          page.getByText(
            "Cliente selecionado",
          ),
        ).toBeVisible();

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "GERENTE acessa os dois módulos e recebe contratos de gestão permitidos",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "GERENTE",
          );

        await page.goto(
          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/configuracao-fidelidade",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                "/pacotes",
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect(
          page.getByText(
            "Pacote Premium E2E",
          ).first(),
        ).toBeVisible();

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "RECEPCAO possui acesso operacional sem consultar configuração nem catálogo administrativo",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "RECEPCAO",
          );

        await page.goto(
          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                `/fidelidade/cliente/${CHAT53_IDS.cliente}`,
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expect(
          fixture.callsTo(
            "/configuracao-fidelidade",
            "GET",
          ),
        ).toBe(0);

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect(
          page.getByText(
            "Cliente selecionado",
          ),
        ).toBeVisible();

        expect(
          fixture.callsTo(
            "/pacotes",
            "GET",
          ),
        ).toBe(0);

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "PROFISSIONAL possui leitura e consumo operacional sem catálogo ou configuração",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "PROFISSIONAL",
          );

        await page.goto(
          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                `/fidelidade/historico/${CHAT53_IDS.cliente}`,
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        expect(
          fixture.callsTo(
            "/configuracao-fidelidade",
            "GET",
          ),
        ).toBe(0);

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Usar 1 sessão",
            },
          ),
        ).toBeVisible();

        expect(
          fixture.callsTo(
            "/pacotes",
            "GET",
          ),
        ).toBe(0);

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "SUPER_ADMIN não dispara APIs tenant de Fidelidade ou Pacotes",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "SUPER_ADMIN",
          );

        await page.goto(
          "/fidelidade",
        );

        await page.waitForTimeout(
          600,
        );

        await page.goto(
          "/pacotes",
        );

        await page.waitForTimeout(
          600,
        );

        expect(
          fixture.calls.length,
        ).toBe(0);

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "clienteId restaura cliente e preserva navegação Pacotes para Fidelidade",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect(
          page.getByText(
            "Cliente selecionado",
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            "Maria Silva E2E",
          ).first(),
        ).toBeVisible();

        await expect(
          page.getByRole(
            "link",
            {
              name:
                "Abrir fidelidade deste cliente",
            },
          ),
        ).toHaveAttribute(
          "href",
          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                `/clientes/${CHAT53_IDS.cliente}`,
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "filtro status permanece na URL sem perder clienteId",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        const status =
          page.locator(
            "#clientes-pacotes-status",
          );

        await expect(
          status,
        ).toBeVisible();

        await status.selectOption(
          "FINALIZADO",
        );

        await expect
          .poll(() => {
            const url =
              new URL(
                page.url(),
              );

            return {
              clienteId:
                url.searchParams.get(
                  "clienteId",
                ),

              status:
                url.searchParams.get(
                  "status",
                ),
            };
          })
          .toEqual({
            clienteId:
              CHAT53_IDS.cliente,

            status:
              "FINALIZADO",
          });

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "consumo confirma 1 sessão, usa PATCH dedicado sem body e relê estado",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        const listPath =
          `/clientes-pacotes/cliente/${CHAT53_IDS.cliente}`;

        const consumePath =
          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/usar-sessao`;

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Usar 1 sessão",
            },
          ),
        ).toBeVisible();

        const readsBefore =
          fixture.callsTo(
            listPath,
            "GET",
          );

        await page
          .getByRole(
            "button",
            {
              name:
                "Usar 1 sessão",
            },
          )
          .click();

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Confirmar uso de 1 sessão",
            },
          ),
        ).toBeVisible();

        await page
          .getByRole(
            "button",
            {
              name:
                "Confirmar uso de 1 sessão",
            },
          )
          .click();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                consumePath,
                "PATCH",
              ),
          )
          .toBe(1);

        const consumeCall =
          fixture.lastCallTo(
            consumePath,
            "PATCH",
          );

        expect(
          consumeCall?.body,
        ).toBeNull();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                listPath,
                "GET",
              ),
          )
          .toBeGreaterThan(
            readsBefore,
          );

        expect(
          fixture
            .getClientePacote()
            .sessoesUsadas,
        ).toBe(2);

        expect(
          fixture
            .getClientePacote()
            .sessoesRestantes,
        ).toBe(3);

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "cancelamento exige confirmação, usa PATCH dedicado sem body e relê estado",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        const listPath =
          `/clientes-pacotes/cliente/${CHAT53_IDS.cliente}`;

        const cancelPath =
          `/clientes-pacotes/${CHAT53_IDS.clientePacote}/cancelar`;

        await page.goto(
          `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Cancelar pacote",
            },
          ),
        ).toBeVisible();

        const readsBefore =
          fixture.callsTo(
            listPath,
            "GET",
          );

        await page
          .getByRole(
            "button",
            {
              name:
                "Cancelar pacote",
            },
          )
          .click();

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Confirmar cancelamento",
            },
          ),
        ).toBeVisible();

        await page
          .getByRole(
            "button",
            {
              name:
                "Confirmar cancelamento",
            },
          )
          .click();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                cancelPath,
                "PATCH",
              ),
          )
          .toBe(1);

        const cancelCall =
          fixture.lastCallTo(
            cancelPath,
            "PATCH",
          );

        expect(
          cancelCall?.body,
        ).toBeNull();

        await expect
          .poll(
            () =>
              fixture.callsTo(
                listPath,
                "GET",
              ),
          )
          .toBeGreaterThan(
            readsBefore,
          );

        expect(
          fixture
            .getClientePacote()
            .status,
        ).toBe(
          "CANCELADO",
        );

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "Fidelidade lê saldo e histórico autoritativos do cliente",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        const saldoPath =
          `/fidelidade/cliente/${CHAT53_IDS.cliente}`;

        const historicoPath =
          `/fidelidade/historico/${CHAT53_IDS.cliente}`;

        await page.goto(
          `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
        );

        await expect
          .poll(
            () =>
              fixture.callsTo(
                saldoPath,
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect
          .poll(
            () =>
              fixture.callsTo(
                historicoPath,
                "GET",
              ),
          )
          .toBeGreaterThan(0);

        await expect(
          page.getByText(
            "Bônus de fidelidade E2E",
          ),
        ).toBeVisible();

        await expect(
          page.getByText(
            /120/,
          ).first(),
        ).toBeVisible();

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );

    test(
      "Fidelidade e Pacotes não apresentam overflow horizontal nas seis viewports oficiais",
      async ({
        page,
      }) => {
        const fixture =
          await installChat53Fixture(
            page,
            "ADMIN",
          );

        for (
          const viewport of
          VIEWPORTS
        ) {
          await test.step(
            viewport.name,
            async () => {
              await page.setViewportSize({
                width:
                  viewport.width,

                height:
                  viewport.height,
              });

              await page.goto(
                `/fidelidade?clienteId=${CHAT53_IDS.cliente}`,
              );

              await expect
                .poll(
                  () =>
                    fixture.callsTo(
                      `/fidelidade/cliente/${CHAT53_IDS.cliente}`,
                      "GET",
                    ),
                )
                .toBeGreaterThan(0);

              await expectNoHorizontalOverflow(
                page,
              );

              await page.goto(
                `/pacotes?clienteId=${CHAT53_IDS.cliente}`,
              );

              await expect(
                page.getByText(
                  "Cliente selecionado",
                ),
              ).toBeVisible();

              await expectNoHorizontalOverflow(
                page,
              );
            },
          );
        }

        await expectNoUnhandled(
          fixture.unhandled,
        );
      },
    );
  },
);
