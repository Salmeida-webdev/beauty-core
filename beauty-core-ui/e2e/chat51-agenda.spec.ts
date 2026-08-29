import {
  expect,
  test,
} from "@playwright/test";

import {
  AGENDA_E2E_DATE,
  AGENDA_E2E_IDS,
  hasHorizontalOverflow,
  installAgendaAuthenticatedRole,
  mockAgendaApi,
  monitorAgendaRuntime,
  type AgendaE2ERole,
} from "./fixtures/chat51-agenda.fixture";

const operationalRoles = [
  "ADMIN",
  "GERENTE",
  "RECEPCAO",
  "PROFISSIONAL",
] as const satisfies readonly AgendaE2ERole[];

function expectNoRuntimeErrors(
  runtime: ReturnType<
    typeof monitorAgendaRuntime
  >,
) {
  expect(
    runtime.consoleErrors,
  ).toEqual([]);

  expect(
    runtime.pageErrors,
  ).toEqual([]);
}

test.describe(
  "Chat 51 â€” Agenda E2E",
  () => {
    for (
      const role of
      operationalRoles
    ) {
      test(
        `${role} acessa a Agenda tenant`,
        async ({ page }) => {
          const runtime =
            monitorAgendaRuntime(
              page,
            );

          const controller =
            await mockAgendaApi(
              page,
            );

          await installAgendaAuthenticatedRole(
            page,
            role,
          );

          await page.goto(
            `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
          );

          await expect(
            page.getByTestId(
              "agenda-calendar",
            ),
          ).toBeVisible();

          await expect(
            page.getByRole(
              "button",
              {
                name:
                  "Novo agendamento",
              },
            ),
          ).toBeVisible();

          await expect(
            page
              .getByTestId(
                "agenda-calendar-event",
              )
              .getByText(
                "Maria Agenda E2E",
              )
              .first(),
          ).toBeVisible();

          await expect.poll(
            () =>
              controller.calls.filter(
                (call) =>
                  call.method ===
                    "GET" &&
                  call.pathname ===
                    "/agendamentos",
              ).length,
          ).toBeGreaterThan(0);

          expectNoRuntimeErrors(
            runtime,
          );
        },
      );
    }

    test(
      "URL list + status + cliente chega ao request server-side",
      async ({ page }) => {
        const runtime =
          monitorAgendaRuntime(
            page,
          );

        const controller =
          await mockAgendaApi(
            page,
            {
              initialStatus:
                "CONFIRMADO",
            },
          );

        await installAgendaAuthenticatedRole(
          page,
          "ADMIN",
        );

        const url =
          `/agenda?view=list&date=${AGENDA_E2E_DATE}` +
          `&status=CONFIRMADO` +
          `&clienteId=${AGENDA_E2E_IDS.cliente}`;

        await page.goto(url);

        await expect(
          page.getByTestId(
            "agenda-list",
          ),
        ).toBeVisible();

        await expect(
          page,
        ).toHaveURL(
          /view=list/,
        );

        await expect(
          page,
        ).toHaveURL(
          /status=CONFIRMADO/,
        );

        await expect.poll(() => {
          const matching =
            controller.calls.find(
              (call) =>
                call.method ===
                  "GET" &&
                call.pathname ===
                  "/agendamentos" &&
                call.searchParams
                  .status ===
                  "CONFIRMADO" &&
                call.searchParams
                  .clienteId ===
                  AGENDA_E2E_IDS.cliente,
            );

          return Boolean(
            matching,
          );
        }).toBe(true);

        expectNoRuntimeErrors(
          runtime,
        );
      },
    );

    test(
      "troca Semana para Lista e sincroniza URL",
      async ({ page }) => {
        const runtime =
          monitorAgendaRuntime(
            page,
          );

        await mockAgendaApi(
          page,
        );

        await installAgendaAuthenticatedRole(
          page,
          "ADMIN",
        );

        await page.goto(
          `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
        );

        await expect(
          page.getByTestId(
            "agenda-calendar",
          ),
        ).toBeVisible();

        await page
          .getByRole(
            "button",
            {
              name: "Lista",
            },
          )
          .click();

        await expect(
          page,
        ).toHaveURL(
          /view=list/,
        );

        await expect(
          page.getByTestId(
            "agenda-list",
          ),
        ).toBeVisible();

        expectNoRuntimeErrors(
          runtime,
        );
      },
    );

    test(
      "abre detalhe e altera status com confirmacao",
      async ({ page }) => {
        const runtime =
          monitorAgendaRuntime(
            page,
          );

        const controller =
          await mockAgendaApi(
            page,
            {
              initialStatus:
                "PENDENTE",
            },
          );

        await installAgendaAuthenticatedRole(
          page,
          "ADMIN",
        );

        await page.goto(
          `/agenda?view=list&date=${AGENDA_E2E_DATE}`,
        );

        await page
          .getByRole(
            "button",
            {
              name:
                "Ver detalhes",
            },
          )
          .click();

        await expect(
          page.getByRole(
            "heading",
            {
              name:
                "Detalhes do agendamento",
            },
          ),
        ).toBeVisible();

        await expect(
          page
            .getByLabel(
              "Detalhes do agendamento",
            )
            .getByText(
              "Corte Premium",
            ),
        ).toBeVisible();

        await page
          .getByRole(
            "button",
            {
              name:
                "Confirmado",
            },
          )
          .click();

        await expect(
          page.getByRole(
            "heading",
            {
              name:
                "Confirmar alteracao de status",
            },
          ),
        ).toBeVisible();

        await page
          .getByRole(
            "button",
            {
              name:
                "Confirmar status",
            },
          )
          .click();

        await expect.poll(() => {
          return controller.calls.some(
            (call) =>
              call.method ===
                "PATCH" &&
              call.pathname ===
                `/agendamentos/${AGENDA_E2E_IDS.agendamento}` &&
              (
                call.body as {
                  status?: string;
                }
              )?.status ===
                "CONFIRMADO",
          );
        }).toBe(true);

        await expect(
          page.getByRole(
            "status",
          ).filter({
            hasText:
              "Status alterado para Confirmado.",
          }),
        ).toBeVisible();

        expect(
          controller.currentStatus(),
        ).toBe(
          "CONFIRMADO",
        );

        expectNoRuntimeErrors(
          runtime,
        );
      },
    );

    test(
      "cancela somente pela rota dedicada e com confirmacao",
      async ({ page }) => {
        const runtime =
          monitorAgendaRuntime(
            page,
          );

        const controller =
          await mockAgendaApi(
            page,
            {
              initialStatus:
                "CONFIRMADO",
            },
          );

        await installAgendaAuthenticatedRole(
          page,
          "GERENTE",
        );

        await page.goto(
          `/agenda?view=list&date=${AGENDA_E2E_DATE}`,
        );

        await page
          .getByRole(
            "button",
            {
              name:
                "Ver detalhes",
            },
          )
          .click();

        await page
          .getByRole(
            "button",
            {
              name:
                "Cancelar agendamento",
            },
          )
          .click();

        await expect(
          page.getByRole(
            "heading",
            {
              name:
                "Confirmar cancelamento",
            },
          ),
        ).toBeVisible();

        expect(
          controller.calls.some(
            (call) =>
              call.pathname.endsWith(
                "/cancelar",
              ),
          ),
        ).toBe(false);

        await page
          .getByRole(
            "button",
            {
              name:
                "Confirmar cancelamento",
            },
          )
          .click();

        await expect.poll(() =>
          controller.calls.some(
            (call) =>
              call.method ===
                "PATCH" &&
              call.pathname ===
                `/agendamentos/${AGENDA_E2E_IDS.agendamento}/cancelar`,
          ),
        ).toBe(true);

        expect(
          controller.currentStatus(),
        ).toBe(
          "CANCELADO",
        );

        await expect(
          page.getByRole(
            "status",
          ).filter({
            hasText:
              "Agendamento cancelado.",
          }),
        ).toBeVisible();

        expectNoRuntimeErrors(
          runtime,
        );
      },
    );

    test(
      "SUPER_ADMIN nao recebe Agenda tenant nem dispara consulta",
      async ({ page }) => {
        const controller =
          await mockAgendaApi(
            page,
          );

        await installAgendaAuthenticatedRole(
          page,
          "SUPER_ADMIN",
        );

        await page.goto(
          `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
        );

        await expect(
          page.getByRole(
            "link",
            {
              name:
                "Dashboard",
            },
          ).first(),
        ).toBeVisible();

        await expect(
          page.getByRole(
            "link",
            {
              name:
                "Agenda",
            },
          ),
        ).toHaveCount(0);

        await expect(
          page.getByTestId(
            "agenda-calendar",
          ),
        ).toHaveCount(0);

        await expect(
          page.getByRole(
            "button",
            {
              name:
                "Novo agendamento",
            },
          ),
        ).toHaveCount(0);

        expect(
          controller.calls.filter(
            (call) =>
              call.pathname.startsWith(
                "/agendamentos",
              ),
          ),
        ).toEqual([]);
      },
    );

    test(
      "Agenda nao possui overflow horizontal nas resolucoes alvo",
      async ({ page }) => {
        await mockAgendaApi(
          page,
        );

        await installAgendaAuthenticatedRole(
          page,
          "RECEPCAO",
        );

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
        ];

        for (
          const viewport of
          viewports
        ) {
          await page.setViewportSize(
            viewport,
          );

          await page.goto(
            `/agenda?view=week&date=${AGENDA_E2E_DATE}`,
          );

          await expect(
            page.getByTestId(
              "agenda-calendar",
            ),
          ).toBeVisible();

          await expect.poll(
            async () =>
              hasHorizontalOverflow(
                page,
              ),
          ).toBe(false);
        }
      },
    );
  },
);