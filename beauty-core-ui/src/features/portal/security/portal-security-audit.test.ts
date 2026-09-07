import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const messageService = readFileSync(
  resolve(
    process.cwd(),
    "src/features/portal/services/portal-messages-api.ts",
  ),
  "utf8",
);

const messagePage = readFileSync(
  resolve(
    process.cwd(),
    "src/app/portal/mensagens/page.tsx",
  ),
  "utf8",
);

const serviceWorker = readFileSync(
  resolve(process.cwd(), "public/sw.js"),
  "utf8",
);

describe("Portal security and privacy contract", () => {
  it("uses the fixed authenticated Portal endpoint", () => {
    expect(messageService).toContain(
      "/area-cliente/me/mensagens-whatsapp",
    );
    expect(messageService).not.toContain("clienteId:");
    expect(messageService).not.toContain("empresaId:");
    expect(messageService).not.toContain("tenantId:");
  });

  it("keeps the Portal messages service read-only", () => {
    expect(messageService).not.toMatch(/\.post\(|\.patch\(|\.put\(|\.delete\(/);
  });

  it("masks the WhatsApp recipient", () => {
    expect(messagePage).toContain("maskRecipient");
    expect(messagePage).toContain("Destinatário:");
  });

  it("does not expose private identity in the page", () => {
    expect(messagePage).not.toMatch(/clienteId\s*\}/);
    expect(messagePage).not.toMatch(/empresaId\s*\}/);
  });

  it("does not store private data in the Service Worker", () => {
    expect(serviceWorker).not.toMatch(
      /localStorage|sessionStorage|accessToken|refreshToken|clienteId|empresaId|tenantId/i,
    );
  });
});
