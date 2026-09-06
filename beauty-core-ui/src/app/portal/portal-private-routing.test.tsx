import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/portal/auth/portal-private-route", () => ({
  PortalPrivateRoute: ({ children }: { children: ReactNode }) => (
    <div data-testid="private-boundary">{children}</div>
  ),
}));

import PortalHistoryRoute from "./historico/page";
import PortalProfileRoute from "./perfil/page";
import { portalNavigationItems } from "@/features/portal/navigation/portal-navigation-config";

afterEach(() => {
  cleanup();
});

describe("Portal private App Router routes", () => {
  it("keeps Perfil and Historico under the shared private route boundary", () => {
    render(
      <>
        <PortalProfileRoute />
        <PortalHistoryRoute />
      </>,
    );

    expect(screen.getByRole("heading", { name: "Perfil" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Historico" })).toBeInTheDocument();
    expect(screen.getAllByTestId("private-boundary")).toHaveLength(2);
  });

  it("does not declare an administrative route in the Portal surface", () => {
    expect(
      portalNavigationItems.some(
        (item) => item.href === "/admin",
      ),
    ).toBe(false);
  });
});