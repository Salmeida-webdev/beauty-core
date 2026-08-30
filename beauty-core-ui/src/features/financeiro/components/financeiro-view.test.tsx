import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { FinanceiroView } from "@/features/financeiro/components/financeiro-view";

const authState = {
  status: "authenticated",
  user: {
    role: "ADMIN",
  } as {
    role: string;
  } | null,
};

vi.mock("@/stores/auth-store", () => ({
  useAuthStore: (selector: (state: typeof authState) => unknown) =>
    selector(authState),
}));

vi.mock(
  "@/features/financeiro/components/categorias-financeiras-section",
  () => ({
    CategoriasFinanceirasSection: () => (
      <div data-testid="categorias-section" />
    ),
  }),
);

vi.mock(
  "@/features/financeiro/components/movimentacoes-financeiras-section",
  () => ({
    MovimentacoesFinanceirasSection: () => (
      <div data-testid="movimentacoes-section" />
    ),
  }),
);

vi.mock("@/features/financeiro/components/comissoes-section", () => ({
  ComissoesSection: () => <div data-testid="comissoes-section" />,
}));

vi.mock(
  "@/features/financeiro/components/relatorios-financeiros-section",
  () => ({
    RelatoriosFinanceirosSection: () => (
      <div data-testid="relatorios-section" />
    ),
  }),
);

afterEach(() => {
  cleanup();

  authState.status = "authenticated";

  authState.user = {
    role: "ADMIN",
  };
});

function expectModulesVisible() {
  expect(screen.getByTestId("categorias-section")).toBeInTheDocument();

  expect(screen.getByTestId("movimentacoes-section")).toBeInTheDocument();

  expect(screen.getByTestId("comissoes-section")).toBeInTheDocument();

  expect(screen.getByTestId("relatorios-section")).toBeInTheDocument();
}

function expectModulesBlocked() {
  expect(screen.queryByTestId("categorias-section")).not.toBeInTheDocument();

  expect(screen.queryByTestId("movimentacoes-section")).not.toBeInTheDocument();

  expect(screen.queryByTestId("comissoes-section")).not.toBeInTheDocument();

  expect(screen.queryByTestId("relatorios-section")).not.toBeInTheDocument();
}

describe("FinanceiroView", () => {
  it("compõe todos os módulos para ADMIN", () => {
    authState.user = {
      role: "ADMIN",
    };

    render(<FinanceiroView />);

    expectModulesVisible();
  });

  it("compõe todos os módulos para GERENTE", () => {
    authState.user = {
      role: "GERENTE",
    };

    render(<FinanceiroView />);

    expectModulesVisible();
  });

  it.each(["SUPER_ADMIN", "RECEPCAO", "PROFISSIONAL"])(
    "não monta dados financeiros para %s",
    (role) => {
      authState.user = {
        role,
      };

      render(<FinanceiroView />);

      expectModulesBlocked();
    },
  );

  it("não monta módulos durante restauração da sessão", () => {
    authState.status = "restoring";

    render(<FinanceiroView />);

    expectModulesBlocked();
  });

  it("não monta módulos sem usuário", () => {
    authState.user = null;

    render(<FinanceiroView />);

    expectModulesBlocked();
  });
});
