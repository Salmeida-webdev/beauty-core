import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  afterEach,
  describe,
  expect,
  it,
} from "vitest";

import { DEFAULT_TENANT } from "@/features/tenant/config/default-tenant";
import { TenantProvider } from "@/providers/tenant-provider";

import { PortalShell } from "./portal-shell";

afterEach(() => {
  cleanup();
});

describe("PortalShell", () => {
  it("renders shell landmarks with real tenant branding", () => {
    render(
      <TenantProvider initialTenant={DEFAULT_TENANT}>
        <PortalShell>
          <h1>Conteudo do portal</h1>
        </PortalShell>
      </TenantProvider>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "portal-main");
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    expect(
      screen.getByLabelText(DEFAULT_TENANT.name),
    ).toHaveTextContent(DEFAULT_TENANT.name);

    expect(
      screen.getByRole("link", {
        name: "Pular para o conte\u00fado principal",
      }),
    ).toHaveAttribute("href", "#portal-main");
  });
});