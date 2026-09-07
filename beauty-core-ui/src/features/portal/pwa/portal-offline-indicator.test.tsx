import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PortalOfflineIndicator } from "./portal-offline-indicator";

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("Portal offline UX", () => {
  it("renders an accessible indicator while offline", () => {
    vi.spyOn(window.navigator, "onLine", "get")
      .mockReturnValue(false);

    render(<PortalOfflineIndicator />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Você está offline",
    );
  });

  it("does not render the indicator while online", () => {
    vi.spyOn(window.navigator, "onLine", "get")
      .mockReturnValue(true);

    render(<PortalOfflineIndicator />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("reacts to the online event", () => {
    let online = false;

    vi.spyOn(window.navigator, "onLine", "get")
      .mockImplementation(() => online);

    render(<PortalOfflineIndicator />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    online = true;

    act(() => {
      window.dispatchEvent(new Event("online"));
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
