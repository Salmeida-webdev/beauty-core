// Chat 54 — Bloco 05/20 — Foundations frontend

import { describe, expect, it } from "vitest";

import {
  canAccessWhatsApp,
  canManageCampaigns,
  canManageWhatsAppTemplates,
  canSendWhatsAppMessage,
  whatsappAccessRoles,
  whatsappCampaignRoles,
  whatsappMessageRoles,
  whatsappTemplateRoles,
} from "./permissions/whatsapp.permissions";
import {
  statusMensagemWhatsappSchema,
  whatsappTelefoneSchema,
} from "./schemas/whatsapp.schemas";
import { whatsappApiPaths } from "./services/whatsapp-api";
import {
  canalWhatsappValues,
  statusMensagemWhatsappValues,
} from "./types/whatsapp.types";
import { whatsappKeys } from "./queries/whatsapp-keys";
import { whatsappQueryOptions } from "./queries/whatsapp-query-options";

describe("Chat 54 — foundations WhatsApp", () => {
  it("mantém enums reais e fechados", () => {
    expect(canalWhatsappValues.length).toBeGreaterThan(0);
    expect(statusMensagemWhatsappValues.length).toBeGreaterThan(0);
    expect(
      statusMensagemWhatsappSchema.safeParse(
        statusMensagemWhatsappValues[0],
      ).success,
    ).toBe(true);
    expect(
      statusMensagemWhatsappSchema.safeParse(
        "STATUS_FRONTEND_INVENTADO",
      ).success,
    ).toBe(false);
  });

  it("mantém telefone sem inventar normalização backend", () => {
    expect(
      whatsappTelefoneSchema.safeParse("83999999999").success,
    ).toBe(true);

    expect(
      whatsappTelefoneSchema.safeParse("telefone").success,
    ).toBe(false);
  });

  it("usa apenas rotas-base auditadas", () => {
    for (const path of Object.values(whatsappApiPaths)) {
      expect(path.startsWith("/")).toBe(true);
      expect(path).not.toContain("empresaId");
      expect(path).not.toContain("undefined");
    }
  });

  it("deriva RBAC dos controllers", () => {
    for (const role of whatsappAccessRoles) {
      expect(canAccessWhatsApp(role)).toBe(true);
    }

    for (const role of whatsappTemplateRoles) {
      expect(canManageWhatsAppTemplates(role)).toBe(true);
    }

    for (const role of whatsappMessageRoles) {
      expect(canSendWhatsAppMessage(role)).toBe(true);
    }

    for (const role of whatsappCampaignRoles) {
      expect(canManageCampaigns(role)).toBe(true);
    }
  });

  it("mantém query keys centralizadas", () => {
    expect(whatsappKeys.configuracao()).toEqual([
      "whatsapp",
      "configuracao",
    ]);

    const options = whatsappQueryOptions.templates(
      async () => [],
    );

    expect(options.queryKey).toEqual([
      "whatsapp",
      "templates",
    ]);
  });
});