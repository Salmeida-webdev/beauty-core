// Chat 54 — Bloco 05/20 — Foundations frontend

import { describe, expect, it } from "vitest";

import {
  canAccessNotifications,
  canManageNotificationSettings,
  notificationAccessRoles,
  notificationSettingsRoles,
} from "./permissions/notificacoes.permissions";
import {
  statusNotificacaoSchema,
  tipoNotificacaoSchema,
} from "./schemas/notificacoes.schemas";
import { notificacoesApiPaths } from "./services/notificacoes-api";
import {
  statusNotificacaoValues,
  tipoNotificacaoValues,
} from "./types/notificacoes.types";
import { notificacoesKeys } from "./queries/notificacoes-keys";
import { notificacoesQueryOptions } from "./queries/notificacoes-query-options";

describe("Chat 54 — foundations Notificações", () => {
  it("mantém tipos e status derivados do backend", () => {
    expect(tipoNotificacaoValues.length).toBeGreaterThan(0);
    expect(statusNotificacaoValues.length).toBeGreaterThan(0);

    expect(
      tipoNotificacaoSchema.safeParse(
        tipoNotificacaoValues[0],
      ).success,
    ).toBe(true);

    expect(
      statusNotificacaoSchema.safeParse(
        "STATUS_FRONTEND_INVENTADO",
      ).success,
    ).toBe(false);
  });

  it("mantém apenas rotas-base comprovadas", () => {
    for (const path of Object.values(notificacoesApiPaths)) {
      expect(path.startsWith("/")).toBe(true);
      expect(path).not.toContain("empresaId");
    }
  });

  it("deriva RBAC dos controllers", () => {
    for (const role of notificationAccessRoles) {
      expect(canAccessNotifications(role)).toBe(true);
    }

    for (const role of notificationSettingsRoles) {
      expect(
        canManageNotificationSettings(role),
      ).toBe(true);
    }
  });

  it("mantém query key de filtros estável por contrato", () => {
    expect(
      notificacoesKeys.list({
        search: "aviso",
      }),
    ).toEqual([
      "notificacoes",
      "list",
      {
        search: "aviso",
      },
    ]);
  });

  it("cria query options sem QueryClient paralelo", () => {
    const options = notificacoesQueryOptions.list(
      async () => [],
      {
        search: "aviso",
      },
    );

    expect(options.queryKey[0]).toBe("notificacoes");
  });
});