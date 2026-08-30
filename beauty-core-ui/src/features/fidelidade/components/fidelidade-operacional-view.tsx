"use client";

import Link from "next/link";
import { useFidelidadeCliente } from "../hooks/use-fidelidade-cliente";
import { FidelidadeHistorico } from "./fidelidade-historico";
import { BeneficiosView } from "../beneficios/beneficios-view";
import { CuponsView } from "../cupons/cupons-view";
import { FidelidadeOperacoesView } from "../operacoes/fidelidade-operacoes-view";
import { FidelidadeProgramaView } from "./fidelidade-programa-view";
import { FidelidadeSaldoCard } from "./fidelidade-saldo-card";

type FidelidadeOperacionalViewProps = {
  clienteId?: string | null;
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function FidelidadeLoadingState() {
  return (
    <div
      aria-busy="true"
      aria-label="Carregando fidelidade"
      className="grid gap-4"
    >
      <div className="h-36 animate-pulse rounded-xl border bg-muted/40" />
      <div className="h-72 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  );
}

export function FidelidadeOperacionalView({
  clienteId,
}: FidelidadeOperacionalViewProps) {
  const hasCliente = Boolean(clienteId);
  const isClienteIdValid = Boolean(
    clienteId && uuidPattern.test(clienteId),
  );

  const queryClienteId = isClienteIdValid ? clienteId ?? "" : "";

  const {
    saldoQuery,
    historicoQuery,
    isInitialLoading,
    isRefetching,
  } = useFidelidadeCliente(queryClienteId);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Fidelidade
        </h1>

        <p className="mt-2 max-w-3xl text-sm text-muted-foreground sm:text-base">
          Consulte o saldo autoritativo e o histórico real de
          pontos de um cliente.
        </p>
      </header>


      <FidelidadeProgramaView />
      <BeneficiosView />
      <FidelidadeOperacoesView />
      <CuponsView />
      {!hasCliente ? (
        <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <h2 className="font-semibold">
            Selecione um cliente
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            A integração do seletor será centralizada com o
            módulo Clientes. Até lá, esta tela aceita o
            clienteId pela URL.
          </p>

          <Link
            href="/clientes"
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Ir para Clientes
          </Link>
        </section>
      ) : null}

      {hasCliente && !isClienteIdValid ? (
        <section
          role="alert"
          className="rounded-xl border border-destructive/30 bg-card p-6 text-card-foreground"
        >
          <h2 className="font-semibold">
            Cliente inválido
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            O clienteId informado na URL não possui um UUID
            válido.
          </p>
        </section>
      ) : null}

      {isClienteIdValid && isInitialLoading ? (
        <FidelidadeLoadingState />
      ) : null}

      {isClienteIdValid && !isInitialLoading ? (
        <div className="grid gap-6">
          {saldoQuery.isError ? (
            <section
              role="alert"
              className="rounded-xl border border-destructive/30 bg-card p-5"
            >
              <h2 className="font-semibold">
                Não foi possível carregar o saldo
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Verifique o acesso ao cliente e tente novamente.
              </p>

              <button
                type="button"
                onClick={() => {
                  void saldoQuery.refetch();
                }}
                className="mt-4 min-h-10 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Tentar saldo novamente
              </button>
            </section>
          ) : saldoQuery.data ? (
            <FidelidadeSaldoCard
              saldoPontos={saldoQuery.data.saldoPontos}
              isRefetching={isRefetching}
            />
          ) : null}

          {historicoQuery.isError ? (
            <section
              role="alert"
              className="rounded-xl border border-destructive/30 bg-card p-5"
            >
              <h2 className="font-semibold">
                Não foi possível carregar o histórico
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                O saldo pode continuar disponível mesmo quando
                esta consulta falha.
              </p>

              <button
                type="button"
                onClick={() => {
                  void historicoQuery.refetch();
                }}
                className="mt-4 min-h-10 rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Tentar histórico novamente
              </button>
            </section>
          ) : historicoQuery.data ? (
            <FidelidadeHistorico
              movimentacoes={historicoQuery.data}
            />
          ) : null}
        </div>
      ) : null}
    </main>
  );
}
