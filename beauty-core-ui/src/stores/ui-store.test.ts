import { beforeEach, describe, expect, it } from "vitest";

import { useUiStore } from "@/stores/ui-store";

function getUiState() {
  return useUiStore.getState();
}

describe("ui-store", () => {
  beforeEach(() => {
    getUiState().resetUi();
  });

  it("inicia com sidebar desktop aberta e mobile fechada", () => {
    expect(getUiState().sidebarOpen).toBe(true);
    expect(getUiState().mobileSidebarOpen).toBe(false);
  });

  it("altera explicitamente o estado da sidebar desktop", () => {
    getUiState().setSidebarOpen(false);

    expect(getUiState().sidebarOpen).toBe(false);

    getUiState().setSidebarOpen(true);

    expect(getUiState().sidebarOpen).toBe(true);
  });

  it("alterna a sidebar desktop", () => {
    getUiState().toggleSidebar();
    expect(getUiState().sidebarOpen).toBe(false);

    getUiState().toggleSidebar();
    expect(getUiState().sidebarOpen).toBe(true);
  });

  it("controla a sidebar mobile", () => {
    getUiState().setMobileSidebarOpen(true);

    expect(getUiState().mobileSidebarOpen).toBe(true);

    getUiState().setMobileSidebarOpen(false);

    expect(getUiState().mobileSidebarOpen).toBe(false);
  });

  it("fecha a sidebar mobile pela ação dedicada", () => {
    getUiState().setMobileSidebarOpen(true);
    getUiState().closeMobileSidebar();

    expect(getUiState().mobileSidebarOpen).toBe(false);
  });

  it("restaura o estado visual inicial", () => {
    getUiState().setSidebarOpen(false);
    getUiState().setMobileSidebarOpen(true);

    getUiState().resetUi();

    expect(getUiState().sidebarOpen).toBe(true);
    expect(getUiState().mobileSidebarOpen).toBe(false);
  });
});
