import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { TenantProvider } from "@/providers/tenant-provider";

import { PortalFirstAccessExperience } from "./portal-first-access-experience";

afterEach(() => {
  cleanup();
});

function renderExperience(onComplete: () => Promise<void>) {
  return render(
    <TenantProvider>
      <PortalFirstAccessExperience onComplete={onComplete} />
    </TenantProvider>,
  );
}

describe("PortalFirstAccessExperience", () => {
  it("uses the official asset and does not expose a complete profile form", () => {
    renderExperience(vi.fn(async () => undefined));

    expect(
      screen.getByRole("img", { name: "Ilustração do primeiro acesso" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
    ).toBeInTheDocument();
    expect(screen.queryByLabelText(/nome completo/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/data de nascimento/i)).not.toBeInTheDocument();
  });

  it("requires the real mandatory acceptance before submitting", () => {
    const onComplete = vi.fn(async () => undefined);

    renderExperience(onComplete);

    fireEvent.click(
      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
    );

    expect(onComplete).not.toHaveBeenCalled();
    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent("Aceite os termos de uso");
  });

  it("protects the operation against double submit and shows success", async () => {
    let resolveOperation!: () => void;
    const operation = new Promise<void>((resolve) => {
      resolveOperation = resolve;
    });
    const onComplete = vi.fn(() => operation);

    renderExperience(onComplete);

    fireEvent.click(screen.getByRole("checkbox"));
    const button = screen.getByRole("button", {
      name: "Concluir primeiro acesso",
    });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(button).toBeDisabled();

    resolveOperation();

    await waitFor(() => {
      expect(
        screen.getByRole("status"),
      ).toHaveTextContent("Primeiro acesso concluído");
    });
  });

  it("exposes a safe error without leaking the backend response", async () => {
    const onComplete = vi.fn(async () => {
      throw new Error("detalhe interno da API");
    });

    renderExperience(onComplete);
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(
      screen.getByRole("button", { name: "Concluir primeiro acesso" }),
    );

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Não foi possível concluir o primeiro acesso",
      );
    });
    expect(screen.getByRole("alert")).not.toHaveTextContent(
      "detalhe interno da API",
    );
  });
});
