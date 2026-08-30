import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { useFidelidadeClienteMock } = vi.hoisted(() => ({
  useFidelidadeClienteMock: vi.fn(),
}));

vi.mock("../hooks/use-fidelidade-cliente", () => ({
  useFidelidadeCliente: useFidelidadeClienteMock,
}));

vi.mock("./fidelidade-programa-view", () => ({
  FidelidadeProgramaView: () => (
    <div data-testid="fidelidade-programa" />
  ),
}));

vi.mock("../beneficios/beneficios-view", () => ({
  BeneficiosView: () => (
    <div data-testid="beneficios-view" />
  ),
}));

vi.mock("../cupons/cupons-view", () => ({
  CuponsView: () => (
    <div data-testid="cupons-view" />
  ),
}));

vi.mock("../operacoes/fidelidade-operacoes-view", () => ({
  FidelidadeOperacoesView: () => (
    <div data-testid="fidelidade-operacoes-view" />
  ),
}));

import { FidelidadeOperacionalView } from "./fidelidade-operacional-view";

const clienteId = "550e8400-e29b-41d4-a716-446655440000";

function createQueryState<T>(data?: T) {
  return {
    data,
    isPending: false,
    isFetching: false,
    isError: false,
    refetch: vi.fn(),
  };
}

describe("FidelidadeOperacionalView", () => {
  beforeEach(() => {
    useFidelidadeClienteMock.mockReset();

    useFidelidadeClienteMock.mockReturnValue({
      saldoQuery: createQueryState(),
      historicoQuery: createQueryState(),
      isInitialLoading: false,
      isRefetching: false,
    });
  });

  it("orienta seleção quando clienteId não existe", () => {
    render(<FidelidadeOperacionalView />);

    expect(
      screen.getByRole("heading", {
        name: "Selecione um cliente",
      }),
    ).toBeInTheDocument();

    expect(useFidelidadeClienteMock).toHaveBeenCalledWith("");
  });

  it("não consulta UUID inválido", () => {
    render(
      <FidelidadeOperacionalView clienteId="id-invalido" />,
    );

    expect(
      screen.getByRole("heading", {
        name: "Cliente inválido",
      }),
    ).toBeInTheDocument();

    expect(useFidelidadeClienteMock).toHaveBeenCalledWith("");
  });

  it("mostra saldo backend e histórico real", () => {
    useFidelidadeClienteMock.mockReturnValue({
      saldoQuery: createQueryState({
        id: clienteId,
        clienteId,
        saldoPontos: 350,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      }),
      historicoQuery: createQueryState([
        {
          id: "660e8400-e29b-41d4-a716-446655440000",
          clienteId,
          tipo: "RESGATE",
          pontos: 100,
          descricao: "Resgate registrado pelo backend",
          createdAt: "2026-08-30T12:00:00.000Z",
        },
      ]),
      isInitialLoading: false,
      isRefetching: false,
    });

    render(
      <FidelidadeOperacionalView clienteId={clienteId} />,
    );

    expect(screen.getByText(/350 pts/i)).toBeInTheDocument();
    expect(screen.getByText("Resgate")).toBeInTheDocument();
    expect(
      screen.getByText("Resgate registrado pelo backend"),
    ).toBeInTheDocument();

    expect(useFidelidadeClienteMock).toHaveBeenCalledWith(
      clienteId,
    );
  });

  it("diferencia histórico vazio", () => {
    useFidelidadeClienteMock.mockReturnValue({
      saldoQuery: createQueryState({
        id: clienteId,
        clienteId,
        saldoPontos: 0,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      }),
      historicoQuery: createQueryState([]),
      isInitialLoading: false,
      isRefetching: false,
    });

    render(
      <FidelidadeOperacionalView clienteId={clienteId} />,
    );

    expect(
      screen.getByText("Nenhuma movimentação registrada"),
    ).toBeInTheDocument();
  });

  it("permite retry isolado do histórico", () => {
    const refetchHistorico = vi.fn();

    useFidelidadeClienteMock.mockReturnValue({
      saldoQuery: createQueryState({
        id: clienteId,
        clienteId,
        saldoPontos: 200,
        createdAt: "2026-08-30T12:00:00.000Z",
        updatedAt: "2026-08-30T12:00:00.000Z",
      }),
      historicoQuery: {
        ...createQueryState(),
        isError: true,
        refetch: refetchHistorico,
      },
      isInitialLoading: false,
      isRefetching: false,
    });

    render(
      <FidelidadeOperacionalView clienteId={clienteId} />,
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Tentar histórico novamente",
      }),
    );

    expect(refetchHistorico).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/200 pts/i)).toBeInTheDocument();
  });
});
