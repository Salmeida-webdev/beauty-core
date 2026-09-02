import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { ConfiguracoesNavigationCard } from "@/features/configuracoes/components/configuracoes-navigation-card";

afterEach(() => {
  cleanup();
});

describe("ConfiguracoesNavigationCard", () => {
  it("liga Configuracoes ao Branding real", () => {
    render(<ConfiguracoesNavigationCard />);

    expect(
      screen.getByRole("link", {
        name: /Branding e white-label/i,
      }),
    ).toHaveAttribute("href", "/configuracoes/branding");
  });

  it("liga Configuracoes a Arquivos usando filtro real por tipo", () => {
    render(<ConfiguracoesNavigationCard />);

    expect(
      screen.getByRole("link", {
        name: /Logos em Arquivos/i,
      }),
    ).toHaveAttribute("href", "/arquivos?tipo=LOGO_EMPRESA");
  });
});
