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
  vi,
} from "vitest";

import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { useUiStore } from "@/stores/ui-store";

vi.mock("next/navigation", () => ({
  usePathname: () => "/design-system",
}));

vi.mock("@/providers/tenant-provider", () => ({
  useTenant: () => ({
    tenant: {
      name: "Clínica Demo",
    },
  }),
}));

afterEach(() => {
  cleanup();
  useUiStore.getState().resetUi();
});

describe("AdminSidebar", () => {
  it("renderiza tenant e item ativo", () => {
    useUiStore.setState({
      sidebarOpen: true,
      mobileSidebarOpen: false,
    });

    render(
      <AdminSidebar role="SUPER_ADMIN" />,
    );

    expect(
      screen.getByRole("complementary", {
        name: "Navegação administrativa",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Clínica Demo"),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /Design System/,
      }),
    ).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("filtra módulos pela role", () => {
    useUiStore.setState({
      sidebarOpen: true,
      mobileSidebarOpen: false,
    });

    render(
      <AdminSidebar role="PROFISSIONAL" />,
    );

    expect(
      screen.queryByText("Financeiro"),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByText("Auditoria"),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Design System"),
    ).toBeInTheDocument();
  });
});