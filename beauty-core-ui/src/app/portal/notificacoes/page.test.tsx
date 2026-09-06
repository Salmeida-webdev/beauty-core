import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/features/portal/auth/portal-private-route", () => ({
  PortalPrivateRoute: ({ children }: { children: ReactNode }) => (
    <div data-testid="private-boundary">{children}</div>
  ),
}));

vi.mock("@/features/portal/query/portal-notifications-query", () => ({
  usePortalNotificationsQuery: () => ({
    isPending: false,
    isError: false,
    isSuccess: true,
    data: {
      data: [],
      total: 0,
      page: 1,
      limit: 20,
    },
  }),
  useMarkPortalNotificationAsRead: () => ({
    isPending: false,
    mutate: vi.fn(),
  }),
}));

import PortalNotificationsPage from "./page";

afterEach(() => {
  cleanup();
});

describe("Portal notifications route", () => {
  it("renders inside the shared private route boundary", () => {
    render(<PortalNotificationsPage />);

    expect(
      screen.getByRole("heading", { name: "Notificações" }),
    ).toBeInTheDocument();

    expect(screen.getByTestId("private-boundary")).toBeInTheDocument();
  });

  it("renders an honest empty state", () => {
    render(<PortalNotificationsPage />);

    expect(
      screen.getByRole("heading", { name: "Nenhuma notificação" }),
    ).toBeInTheDocument();
  });
});
