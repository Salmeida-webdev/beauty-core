import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TenantProvider } from "@/providers/tenant-provider";

import { PortalShell } from "./portal-shell";
import { PortalErrorState, PortalEmptyState } from "../states/portal-state-views";

afterEach(() => {
  cleanup();
});

describe("Portal responsive and accessibility foundation", () => {
  it("exposes landmarks and a keyboard skip link", () => {
    render(
      <TenantProvider>
        <PortalShell>
          <h1>Conteudo principal</h1>
        </PortalShell>
      </TenantProvider>,
    );

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute(
      "id",
      "portal-main",
    );
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    const skipLink = screen.getByRole("link", {
      name: "Pular para o conteúdo principal",
    });

    expect(skipLink).toHaveAttribute("href", "#portal-main");
    expect(skipLink).toHaveClass("focus:not-sr-only");
    expect(skipLink).toHaveClass("focus-visible:outline-none");
  });

  it("keeps the shell within responsive content bounds", () => {
    render(
      <TenantProvider>
        <PortalShell>
          <h1>Conteudo principal</h1>
        </PortalShell>
      </TenantProvider>,
    );

    const main = screen.getByRole("main");

    expect(main).toHaveClass("w-full");
    expect(main).toHaveClass("max-w-6xl");
    expect(main).toHaveClass("px-4");
    expect(main).toHaveClass("sm:px-6");
    expect(main).toHaveClass("lg:px-8");
    expect(main).toHaveClass("flex-1");
  });

  it("keeps state actions keyboard accessible and motion-aware", () => {
    const onAction = vi.fn();

    render(
      <PortalErrorState
        action={{
          label: "Tentar novamente",
          onClick: onAction,
        }}
        description="Tente novamente em alguns instantes."
        title="Erro temporario"
      />,
    );

    const button = screen.getByRole("button", {
      name: "Tentar novamente",
    });

    expect(button).toHaveClass("min-h-11");
    expect(button).toHaveClass("focus-visible:outline-none");
    expect(button).toHaveClass("focus-visible:ring-2");
    expect(button).toHaveClass("motion-reduce:transition-none");
  });

  it("keeps transversal panels usable on narrow screens", () => {
    render(
      <PortalEmptyState
        description="Nenhum item disponivel."
        title="Lista vazia"
      />,
    );

    const panel = screen.getByRole("heading", {
      name: "Lista vazia",
    }).closest("section");

    expect(panel).toHaveClass("w-full");
    expect(panel).toHaveClass("max-w-xl");
    expect(panel).toHaveClass("px-5");
    expect(panel).toHaveClass("sm:px-8");
  });

});
