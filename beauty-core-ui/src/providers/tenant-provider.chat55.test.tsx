import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import { TenantProvider, useTenant } from "@/providers/tenant-provider";

const initialTenant: TenantPublicConfig = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "Clínica Aurora",
  slug: "clinica-aurora",
  domain: null,
  locale: "pt-BR",
  branding: {
    logoUrl: null,
    faviconUrl: "/uploads/public/tenant/favicon.png",
    primaryColor: "#7A1234",
    secondaryColor: "#ABCDEF",
    accentColor: "#FEDCBA",
  },
  settings: {
    allowDarkMode: true,
    showPoweredByBeautyCore: true,
  },
};

const nextTenant: TenantPublicConfig = {
  ...initialTenant,
  name: "Clínica Nova",
  slug: "clinica-nova",
  branding: {
    ...initialTenant.branding,
    logoUrl: "/uploads/public/tenant/logo.png",
    primaryColor: "#123456",
  },
};

function TenantProbe() {
  const { tenant, setTenant, resetTenant } = useTenant();

  return (
    <div>
      <span data-testid="tenant-name">{tenant.name}</span>

      <span data-testid="tenant-logo">
        {tenant.branding.logoUrl ?? "sem-logo"}
      </span>

      <button type="button" onClick={() => setTenant(nextTenant)}>
        Atualizar tenant
      </button>

      <button type="button" onClick={resetTenant}>
        Resetar tenant
      </button>
    </div>
  );
}

beforeEach(() => {
  document.documentElement.style.removeProperty("--tenant-primary");

  document.documentElement.style.removeProperty("--tenant-secondary");

  document.documentElement.style.removeProperty("--tenant-accent");

  document.documentElement.style.removeProperty("--primary");

  document.documentElement.removeAttribute("data-tenant");

  document.documentElement.className = "";

  document.head
    .querySelectorAll('link[data-tenant-favicon="true"]')
    .forEach((node) => node.remove());
});

afterEach(() => {
  cleanup();

  document.documentElement.style.removeProperty("--tenant-primary");

  document.documentElement.style.removeProperty("--tenant-secondary");

  document.documentElement.style.removeProperty("--tenant-accent");

  document.documentElement.style.removeProperty("--primary");

  document.documentElement.removeAttribute("data-tenant");

  document.documentElement.className = "";

  document.head
    .querySelectorAll('link[data-tenant-favicon="true"]')
    .forEach((node) => node.remove());
});

describe("TenantProvider Chat55 runtime", () => {
  it("aplica tokens seguros sem alterar primary funcional", async () => {
    document.documentElement.style.setProperty(
      "--primary",
      "functional-primary",
    );

    render(
      <TenantProvider initialTenant={initialTenant}>
        <TenantProbe />
      </TenantProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.tenant).toBe("clinica-aurora");
    });

    expect(
      document.documentElement.style.getPropertyValue("--tenant-primary"),
    ).toBe("#7A1234");

    expect(
      document.documentElement.style.getPropertyValue("--tenant-secondary"),
    ).toBe(DEFAULT_TENANT.branding.secondaryColor);

    expect(
      document.documentElement.style.getPropertyValue("--tenant-accent"),
    ).toBe(DEFAULT_TENANT.branding.accentColor);

    expect(document.documentElement.style.getPropertyValue("--primary")).toBe(
      "functional-primary",
    );
  });

  it("atualiza tokens e estado imediatamente via setTenant", async () => {
    render(
      <TenantProvider initialTenant={initialTenant}>
        <TenantProbe />
      </TenantProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Atualizar tenant",
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("tenant-name")).toHaveTextContent(
        "Clínica Nova",
      );
    });

    expect(screen.getByTestId("tenant-logo")).toHaveTextContent(
      "/uploads/public/tenant/logo.png",
    );

    await waitFor(() => {
      expect(
        document.documentElement.style.getPropertyValue("--tenant-primary"),
      ).toBe("#123456");
    });

    expect(document.documentElement.dataset.tenant).toBe("clinica-nova");
  });

  it("nao injeta favicon dinamico", async () => {
    render(
      <TenantProvider initialTenant={initialTenant}>
        <TenantProbe />
      </TenantProvider>,
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.tenant).toBe("clinica-aurora");
    });

    expect(
      document.head.querySelector('link[data-tenant-favicon="true"]'),
    ).toBeNull();
  });

  it("nao interfere na classe dark controlada pelo ThemeProvider", async () => {
    document.documentElement.className = "dark";

    render(
      <TenantProvider initialTenant={initialTenant}>
        <TenantProbe />
      </TenantProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Atualizar tenant",
      }),
    );

    await waitFor(() => {
      expect(document.documentElement.dataset.tenant).toBe("clinica-nova");
    });

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("reset restaura o tenant Beauty Core", async () => {
    render(
      <TenantProvider initialTenant={initialTenant}>
        <TenantProbe />
      </TenantProvider>,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Resetar tenant",
      }),
    );

    await waitFor(() => {
      expect(screen.getByTestId("tenant-name")).toHaveTextContent(
        DEFAULT_TENANT.name,
      );
    });

    expect(document.documentElement.dataset.tenant).toBe(DEFAULT_TENANT.slug);
  });
});
