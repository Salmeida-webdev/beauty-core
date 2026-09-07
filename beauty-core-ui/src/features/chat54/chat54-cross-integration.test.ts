import {
  readFileSync,
} from "node:fs";
import {
  join,
} from "node:path";

import {
  describe,
  expect,
  it,
} from "vitest";

import {
  getNavigationForRole,
} from "@/config/admin-navigation";
import type {
  AdminRole,
} from "@/constants/roles";
import {
  canAccessAutomations,
  canOperateAutomations,
  canViewAutomationEvents,
} from "@/features/automacoes/permissions/automacoes.permissions";
import {
  canAccessNotifications,
  canManageNotificationSettings,
} from "@/features/notificacoes/permissions/notificacoes.permissions";
import {
  canAccessWhatsApp,
  canManageCampaigns,
  canManageWhatsAppTemplates,
  canSendWhatsAppMessage,
} from "@/features/whatsapp/permissions/whatsapp.permissions";

function readSource(path: string): string {
  return readFileSync(
    join(process.cwd(), path),
    "utf8",
  );
}

function getItemIds(role: AdminRole): string[] {
  return getNavigationForRole(role).flatMap(
    (group) =>
      group.items.flatMap((item) => [
        item.id,
        ...(item.children?.map(
          (child) => child.id,
        ) ?? []),
      ]),
  );
}

function countMatches(
  source: string,
  pattern: RegExp,
): number {
  return source.match(pattern)?.length ?? 0;
}

describe("Chat 54 — integração transversal", () => {
  it("mantém navegação e permissões alinhadas para todas as roles", () => {
    const roles: readonly AdminRole[] = [
      "SUPER_ADMIN",
      "ADMIN",
      "GERENTE",
      "RECEPCAO",
      "PROFISSIONAL",
    ];

    for (const role of roles) {
      const itemIds = getItemIds(role);

      expect(
        itemIds.includes("whatsapp"),
      ).toBe(
        canAccessWhatsApp(role),
      );

      expect(
        itemIds.includes("notifications"),
      ).toBe(
        canAccessNotifications(role),
      );

      expect(
        itemIds.includes("automations"),
      ).toBe(
        canAccessAutomations(role),
      );
    }

    expect(
      canManageWhatsAppTemplates("RECEPCAO"),
    ).toBe(false);

    expect(
      canSendWhatsAppMessage("RECEPCAO"),
    ).toBe(true);

    expect(
      canManageCampaigns("RECEPCAO"),
    ).toBe(false);

    expect(
      canManageNotificationSettings(
        "PROFISSIONAL",
      ),
    ).toBe(false);

    expect(
      canOperateAutomations("GERENTE"),
    ).toBe(true);

    expect(
      canViewAutomationEvents("GERENTE"),
    ).toBe(true);
  });

  it("conecta as três rotas às views e às seções funcionais corretas", () => {
    const whatsappPage = readSource(
      "src/app/(dashboard)/whatsapp/page.tsx",
    );
    const notificationsPage = readSource(
      "src/app/(dashboard)/notificacoes/page.tsx",
    );
    const automationsPage = readSource(
      "src/app/(dashboard)/automacoes/page.tsx",
    );

    const whatsappView = readSource(
      "src/features/whatsapp/components/whatsapp-view.tsx",
    );
    const notificationsView = readSource(
      "src/features/notificacoes/components/notificacoes-view.tsx",
    );
    const automationsView = readSource(
      "src/features/automacoes/components/automacoes-view.tsx",
    );

    expect(whatsappPage).toContain(
      "WhatsappView",
    );
    expect(notificationsPage).toContain(
      "NotificacoesView",
    );
    expect(automationsPage).toContain(
      "AutomacoesView",
    );

    expect(whatsappView).toContain(
      "MensagensWhatsappSection",
    );
    expect(whatsappView).toContain(
      "TemplatesWhatsappSection",
    );
    expect(whatsappView).toContain(
      "CampanhasWhatsappSection",
    );

    expect(notificationsView).toContain(
      "NotificacoesSection",
    );
    expect(notificationsView).toContain(
      "NotificacoesSettingsSection",
    );

    expect(automationsView).toContain(
      "AutomacoesOperacionaisSection",
    );
  });

  it("mantém somente namespaces reais de API no frontend tenant", () => {
    const whatsappApi = readSource(
      "src/features/whatsapp/services/whatsapp-api.ts",
    );
    const notificationsApi = readSource(
      "src/features/notificacoes/services/notificacoes-api.ts",
    );
    const automationsApi = readSource(
      "src/features/automacoes/services/automacoes-api.ts",
    );

    expect(whatsappApi).toContain(
      "/templates-whatsapp",
    );
    expect(whatsappApi).toContain(
      "/mensagens-whatsapp",
    );
    expect(whatsappApi).toContain(
      "/campanhas-whatsapp",
    );

    expect(notificationsApi).toContain(
      "/notificacoes",
    );
    expect(notificationsApi).toContain(
      "/configuracoes-notificacao",
    );

    expect(automationsApi).toContain(
      "/automacoes/eventos",
    );
    expect(automationsApi).toContain(
      "/automacoes/teste-aniversario",
    );
    expect(automationsApi).toContain(
      "/automacoes/teste-relatorio",
    );

    const combined = [
      whatsappApi,
      notificationsApi,
      automationsApi,
    ].join("\n");

    expect(combined).not.toContain(
      "/queues",
    );
    expect(combined).not.toContain(
      "queues/dlq",
    );
  });

  it("mantém todas as mutations sem retry automático e sem optimistic update", () => {
    const paths = [
      "src/features/whatsapp/components/campanhas-whatsapp-section.tsx",
      "src/features/whatsapp/components/mensagens-whatsapp-section.tsx",
      "src/features/whatsapp/components/templates-whatsapp-section.tsx",
      "src/features/notificacoes/components/notificacoes-section.tsx",
      "src/features/notificacoes/components/notificacoes-settings-section.tsx",
      "src/features/automacoes/components/automacoes-operacionais-section.tsx",
    ];

    for (const path of paths) {
      const source = readSource(path);

      expect(
        countMatches(
          source,
          /useMutation\s*\(/g,
        ),
        path,
      ).toBe(
        countMatches(
          source,
          /retry\s*:\s*false/g,
        ),
      );

      expect(source).not.toContain(
        "onMutate",
      );
      expect(source).not.toContain(
        "setQueryData",
      );
      expect(source).not.toContain(
        "cancelQueries",
      );
      expect(source).not.toContain(
        "queryClient.clear",
      );
    }
  });

  it("mantém invalidação seletiva de cache após mutations relevantes", () => {
    const whatsappSources = [
      readSource(
        "src/features/whatsapp/components/campanhas-whatsapp-section.tsx",
      ),
      readSource(
        "src/features/whatsapp/components/mensagens-whatsapp-section.tsx",
      ),
      readSource(
        "src/features/whatsapp/components/templates-whatsapp-section.tsx",
      ),
    ];

    for (const source of whatsappSources) {
      expect(source).toContain(
        "invalidateQueries",
      );
      expect(source).toContain(
        "whatsappKeys",
      );
    }

    const notifications = readSource(
      "src/features/notificacoes/components/notificacoes-section.tsx",
    );
    const settings = readSource(
      "src/features/notificacoes/components/notificacoes-settings-section.tsx",
    );
    const automations = readSource(
      "src/features/automacoes/components/automacoes-operacionais-section.tsx",
    );

    expect(notifications).toContain(
      "invalidateQueries",
    );
    expect(notifications).toContain(
      "notificacoesKeys",
    );

    expect(settings).toContain(
      "invalidateQueries",
    );
    expect(settings).toContain(
      "notificacoesKeys",
    );

    expect(automations).toContain(
      "invalidateQueries",
    );
    expect(automations).toContain(
      "automacoesKeys",
    );
  });

  it("não transforma campanha administrativa em envio real inexistente", () => {
    const campaignSection = readSource(
      "src/features/whatsapp/components/campanhas-whatsapp-section.tsx",
    );

    expect(campaignSection).toContain(
      "administrativamente o status",
    );
    expect(campaignSection).toContain(
      "Esta operação altera o status",
    );

    expect(campaignSection).not.toContain(
      "entrega concluída",
    );
    expect(campaignSection).not.toContain(
      "envio concluído",
    );
  });

  it("mantém Automações como operação real sem CRUD inventado e monitoramento in-memory", () => {
    const permissions = readSource(
      "src/features/automacoes/permissions/automacoes.permissions.ts",
    );
    const operationalSection = readSource(
      "src/features/automacoes/components/automacoes-operacionais-section.tsx",
    );

    expect(permissions).toMatch(
      /automationCrudSupported\s*=\s*false/,
    );

    const normalizedOperationalSection =
      operationalSection.toLowerCase();

    expect(
      normalizedOperationalSection,
    ).toContain("monitoramento efêmero");

    expect(
      normalizedOperationalSection,
    ).toContain("histórico persistido");

    expect(
      normalizedOperationalSection,
    ).toContain("reinicializações");

    expect(
      normalizedOperationalSection,
    ).toContain("deploys");

    expect(operationalSection).not.toContain(
      "/queues",
    );
    expect(operationalSection).not.toContain(
      "reprocessar",
    );
  });

  it("preserva privacidade entre mensagens, notificações e eventos operacionais", () => {
    const messagesList = readSource(
      "src/features/whatsapp/components/mensagens-whatsapp-list.tsx",
    );
    const notificationsList = readSource(
      "src/features/notificacoes/components/notificacoes-list.tsx",
    );
    const automations = readSource(
      "src/features/automacoes/components/automacoes-operacionais-section.tsx",
    );

    expect(messagesList).toContain(
      "maskRecipient",
    );
    expect(messagesList).toMatch(
      /maskRecipient\s*\(\s*mensagem\.destinatario/,
    );

    for (const source of [
      notificationsList,
      automations,
    ]) {
      expect(source).not.toContain(
        ".empresaId",
      );
      expect(source).not.toContain(
        ".referenciaId",
      );
      expect(source).not.toContain(
        ".dados",
      );
      expect(source).not.toContain(
        "JSON.stringify",
      );
    }
  });
});