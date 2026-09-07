import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import PortalMessagesPage from "./page";

const mocks = vi.hoisted(() => ({
  useQuery: vi.fn(),
}));

vi.mock("@/features/portal/auth/portal-private-route", () => ({
  PortalPrivateRoute: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <>{children}</>,
}));

vi.mock("@/features/portal/query/portal-messages-query", () => ({
  usePortalWhatsappMessagesQuery: mocks.useQuery,
}));

afterEach(() => {
  cleanup();
  mocks.useQuery.mockReset();
});

describe("PortalMessagesPage", () => {
  it("renders the read-only WhatsApp history", () => {
    mocks.useQuery.mockReturnValue({
      isPending: false,
      isError: false,
      data: {
        data: [
          {
            id: "message-1",
            clienteId: "cliente-real",
            usuarioId: null,
            templateId: null,
            tipo: "SISTEMA",
            destinatario: "5511999999999",
            mensagem: "Mensagem de acompanhamento",
            status: "ENVIADA",
            erro: null,
            dataEnvio: "2026-09-06T10:00:00.000Z",
            createdAt: "2026-09-06T10:00:00.000Z",
            updatedAt: "2026-09-06T10:00:00.000Z",
          },
        ],
        page: 1,
        limit: 20,
        total: 1,
        orderBy: "createdAt",
        orderDirection: "desc",
      },
    });

    render(<PortalMessagesPage />);

    expect(
      screen.getByRole("heading", {
        name: "Histórico de WhatsApp",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Mensagem de acompanhamento"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("ENVIADA"),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: /enviar/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the empty state", () => {
    mocks.useQuery.mockReturnValue({
      isPending: false,
      isError: false,
      data: {
        data: [],
        page: 1,
        limit: 20,
        total: 0,
        orderBy: "createdAt",
        orderDirection: "desc",
      },
    });

    render(<PortalMessagesPage />);

    expect(
      screen.getByRole("heading", {
        name: "Nenhuma mensagem encontrada",
      }),
    ).toBeInTheDocument();
  });

  it("renders the loading state", () => {
    mocks.useQuery.mockReturnValue({
      isPending: true,
      isError: false,
      data: undefined,
    });

    render(<PortalMessagesPage />);

    expect(
      screen.getByRole("heading", {
        name: "Carregando mensagens",
      }),
    ).toBeInTheDocument();
  });
});
