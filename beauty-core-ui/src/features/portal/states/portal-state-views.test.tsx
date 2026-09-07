import {
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  PortalAccessUnavailableState,
  PortalEmptyState,
  PortalErrorState,
  PortalLoadingState,
  PortalOfflineState,
  PortalSuccessState,
} from "./portal-state-views";

afterEach(() => {
  cleanup();
});

describe("Portal transversal state views", () => {
  it("renders all approved transversal states with semantic content", () => {
    render(
      <main>
        <PortalLoadingState
          description="Aguarde enquanto os dados sao preparados."
          title="Carregando conteudo"
        />

        <PortalEmptyState
          description="Ainda nao existem itens para exibir."
          title="Nenhum item encontrado"
        />

        <PortalErrorState
          description="Tente novamente em alguns instantes."
          title="Nao foi possivel carregar"
        />

        <PortalOfflineState
          description="A conexao atual nao esta disponivel."
          title="Conexao indisponivel"
        />

        <PortalSuccessState
          description="A operacao foi concluida."
          title="Operacao concluida"
        />

        <PortalAccessUnavailableState
          description="Entre em contato com a empresa para continuar."
          title="Acesso indisponivel"
        />
      </main>,
    );

    expect(
      screen.getByRole("heading", { name: "Carregando conteudo" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Nenhum item encontrado" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Nao foi possivel carregar" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Conexao indisponivel" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Operacao concluida" }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: "Acesso indisponivel" }),
    ).toBeInTheDocument();

    expect(
      document.querySelectorAll("[data-portal-state]"),
    ).toHaveLength(6);
  });

  it("supports an optional accessible action", () => {
    const onAction = vi.fn();

    render(
      <PortalErrorState
        action={{
          label: "Tentar novamente",
          onClick: onAction,
        }}
        description="Ocorreu um erro temporario."
        title="Falha temporaria"
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Tentar novamente" }),
    );

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it("uses an empty alternative when the illustration is decorative", () => {
    const { container } = render(
      <PortalEmptyState
        description="Nenhum resultado foi encontrado."
        title="Lista vazia"
      />,
    );

    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("supports a meaningful alternative when supplied", () => {
    render(
      <PortalSuccessState
        assetAlt="Ilustracao de sucesso"
        description="Tudo certo."
        title="Sucesso"
      />,
    );

    expect(
      screen.getByAltText("Ilustracao de sucesso"),
    ).toBeInTheDocument();
  });
});
