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

import { PortalNavigation } from "./portal-navigation";

afterEach(() => {
  cleanup();
});

describe("PortalNavigation", () => {
  it("does not render links when no real portal route exists", () => {
    render(<PortalNavigation />);

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders safe routes with aria-current on the active route", () => {
    render(
      <PortalNavigation
        activePath="/portal/historico"
        items={[
          { href: "/portal", label: "Inicio" },
          { href: "/portal/historico", label: "Historico" },
        ]}
      />,
    );

    const links = screen.getAllByRole("link", { name: "Historico" });

    expect(links).toHaveLength(2);
    expect(
      links.every(
        (link) => link.getAttribute("aria-current") === "page",
      ),
    ).toBe(true);
  });

  it("rejects external and administrative routes", () => {
    render(
      <PortalNavigation
        items={[
          {
            href: "https://externo.example",
            label: "Externo",
          },
          {
            href: "/admin",
            label: "Admin",
          },
          {
            href: "//externo.example",
            label: "Protocol Relative",
          },
        ]}
      />,
    );

    expect(screen.queryByRole("navigation")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});