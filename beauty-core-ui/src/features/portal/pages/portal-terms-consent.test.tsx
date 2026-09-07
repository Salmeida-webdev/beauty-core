import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TenantProvider } from "@/providers/tenant-provider";

import { PortalTermsConsent } from "./portal-terms-consent";

afterEach(() => {
  cleanup();
});

function renderTerms(onAccept: () => Promise<void>) {
  return render(
    <TenantProvider>
      <PortalTermsConsent onAccept={onAccept} />
    </TenantProvider>,
  );
}

describe("PortalTermsConsent", () => {
  it("renders the official terms asset and the mandatory acceptance", () => {
    renderTerms(vi.fn(async () => undefined));

    const image = screen.getByRole("img", {
      name: "Ilustração do primeiro acesso",
    });

    expect(decodeURIComponent(image.getAttribute("src") ?? "")).toContain(
      "/images/portal/legal/portal-terms.webp",
    );
    expect(
      screen.getByRole("heading", {
        name: "Primeiro acesso obrigatório",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeRequired();
    expect(screen.getByRole("button", { name: "Aceitar e continuar" })).toBeInTheDocument();
  });

  it("does not call the operation without explicit acceptance", () => {
    const onAccept = vi.fn(async () => undefined);

    renderTerms(onAccept);

    fireEvent.click(screen.getByRole("button", { name: "Aceitar e continuar" }));

    expect(onAccept).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Aceite os termos de uso para continuar",
    );
  });

  it("persists acceptance once and exposes success feedback", async () => {
    let resolveOperation!: () => void;
    const operation = new Promise<void>((resolve) => {
      resolveOperation = resolve;
    });
    const onAccept = vi.fn(() => operation);

    renderTerms(onAccept);

    fireEvent.click(screen.getByRole("checkbox"));

    const button = screen.getByRole("button", {
      name: "Aceitar e continuar",
    });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();

    resolveOperation();

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "Primeiro acesso concluído",
      );
    });
  });

  it("shows a safe error without exposing the backend response", async () => {
    const onAccept = vi.fn(async () => {
      throw new Error("detalhe interno do backend");
    });

    renderTerms(onAccept);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(
      screen.getByRole("button", { name: "Aceitar e continuar" }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Não foi possível registrar o aceite dos termos",
      );
    });

    expect(screen.getByRole("alert")).not.toHaveTextContent(
      "detalhe interno do backend",
    );
  });
});
