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
import type { TenantPublicConfig } from "@/features/tenant/types/tenant.types";
import {
  TenantProvider,
} from "@/providers/tenant-provider";

import { PortalBranding } from "./portal-branding";

afterEach(() => {
  cleanup();
});

const customTenant: TenantPublicConfig = {
  ...DEFAULT_TENANT,
  name: "Studio Aurora",
  slug: "studio-aurora",
  branding: {
    ...DEFAULT_TENANT.branding,
    logoUrl: null,
    primaryColor: "#7A1234",
  },
};

const customTenantWithLogo: TenantPublicConfig = {
  ...customTenant,
  branding: {
    ...customTenant.branding,
    logoUrl: "/uploads/public/tenant/logo.png",
  },
};

describe("PortalBranding", () => {
  it("uses the real TenantProvider fallback branding", () => {
    render(
      <TenantProvider initialTenant={customTenant}>
        <PortalBranding />
      </TenantProvider>,
    );

    expect(screen.getByLabelText("Studio Aurora")).toBeInTheDocument();
    expect(screen.getByText("Studio Aurora")).toBeInTheDocument();
  });

  it("renders the tenant logo when the real logoUrl exists", () => {
    render(
      <TenantProvider initialTenant={customTenantWithLogo}>
        <PortalBranding />
      </TenantProvider>,
    );

    expect(screen.getByAltText("")).toHaveAttribute(
      "src",
      expect.stringContaining("/uploads/public/tenant/logo.png"),
    );
  });
});