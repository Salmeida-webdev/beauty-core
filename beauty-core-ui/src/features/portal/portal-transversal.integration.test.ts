import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

function source(path: string) {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("Portal transversal integration contract", () => {
  it("connects private resources to the Portal query gate", () => {
    const gate = source(
      "src/features/portal/query/portal-query-gate.ts",
    );

    const messages = source(
      "src/features/portal/query/portal-messages-query.ts",
    );

    const notifications = source(
      "src/features/portal/query/portal-notifications-query.ts",
    );

    expect(gate).toContain("handlePortalAccessError");
    expect(gate).toContain("usePortalAccessErrorHandler");
    expect(messages).toContain("portalQueryEnabled");
    expect(notifications).toContain("portalQueryEnabled");
  });

  it("connects notification mutation with private cache invalidation", () => {
    const notifications = source(
      "src/features/portal/query/portal-notifications-query.ts",
    );

    expect(notifications).toContain("useMutation");
    expect(notifications).toContain(
      "markPortalNotificationAsRead",
    );
    expect(notifications).toContain("invalidateQueries");
    expect(notifications).toContain("private");
  });

  it("keeps WhatsApp history read-only", () => {
    const api = source(
      "src/features/portal/services/portal-messages-api.ts",
    );

    const page = source(
      "src/app/portal/mensagens/page.tsx",
    );

    expect(api).toContain(
      "/area-cliente/me/mensagens-whatsapp",
    );
    expect(api).not.toMatch(
      /\.post\(|\.patch\(|\.put\(|\.delete\(/,
    );
    expect(page).toContain("PortalPrivateRoute");
    expect(page).toContain("maskRecipient");
  });

  it("connects the Portal shell with PWA and offline UX", () => {
    const shell = source(
      "src/features/portal/components/portal-shell.tsx",
    );

    const registration = source(
      "src/features/portal/components/portal-service-worker-registration.tsx",
    );

    const offline = source(
      "src/features/portal/pwa/portal-offline-indicator.tsx",
    );

    expect(shell).toContain("PortalServiceWorkerRegistration");
    expect(shell).toContain("PortalOfflineIndicator");
    expect(registration).toContain('scope: "/portal/"');
    expect(offline).toContain('role="status"');
  });

  it("keeps the private session lifecycle explicit", () => {
    const session = source(
      "src/features/portal/auth/portal-auth-session.ts",
    );

    const context = source(
      "src/features/portal/auth/portal-auth-context.tsx",
    );

    expect(context).toContain("identity");
    expect(session).toMatch(/logout|clear|remove/);
  });
});
