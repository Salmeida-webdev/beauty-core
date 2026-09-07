"use client";

import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
import {
  PortalErrorState,
  PortalLoadingState,
} from "@/features/portal/states/portal-state-views";
import { usePortalLoyaltyQuery } from "@/features/portal/query/portal-loyalty-query";

export default function PortalLoyaltyPage() {
  const query = usePortalLoyaltyQuery();

  if (query.isPending) {
    return (
      <PortalPrivateRoutePage
        heading="Fidelidade"
        description="Acompanhe seus pontos e benefícios."
      >
        <PortalLoadingState
          title="Carregando fidelidade"
          description="Estamos consultando seu saldo e nível atual."
        />
      </PortalPrivateRoutePage>
    );
  }

  if (query.isError) {
    return (
      <PortalPrivateRoutePage
        heading="Fidelidade"
        description="Acompanhe seus pontos e benefícios."
      >
        <PortalErrorState
          title="Falha ao carregar fidelidade"
          description="Não foi possível consultar seus dados de fidelidade."
          action={{
            label: "Tentar novamente",
            onClick: () => {
              void query.refetch();
            },
          }}
        />
      </PortalPrivateRoutePage>
    );
  }

  const loyalty = query.data;

  return (
    <PortalPrivateRoutePage
      heading="Fidelidade"
      description="Acompanhe seus pontos, nível e benefícios."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-border/80 bg-background/70 p-5">
          <p className="text-sm text-muted-foreground">Saldo atual</p>
          <p className="mt-2 text-3xl font-semibold text-foreground">
            {loyalty.saldoAtual}
          </p>
          <p className="text-sm text-muted-foreground">pontos</p>
        </section>

        <section className="rounded-xl border border-border/80 bg-background/70 p-5">
          <p className="text-sm text-muted-foreground">Próximo nível</p>
          <p className="mt-2 text-lg font-semibold text-foreground">
            {loyalty.proximoNivel &&
            typeof loyalty.proximoNivel === "object" &&
            "nome" in loyalty.proximoNivel
              ? String(loyalty.proximoNivel.nome)
              : "Nível máximo ou não informado"}
          </p>
          <p className="text-sm text-muted-foreground">
            {loyalty.pontosParaProximoNivel} pontos restantes
          </p>
        </section>
      </div>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          Resumo de movimentações
        </h2>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/80 p-4">
            <dt className="text-sm text-muted-foreground">
              Pontos recebidos
            </dt>
            <dd className="mt-1 text-xl font-semibold">
              {loyalty.totalPontosRecebidos}
            </dd>
          </div>

          <div className="rounded-lg border border-border/80 p-4">
            <dt className="text-sm text-muted-foreground">
              Pontos resgatados
            </dt>
            <dd className="mt-1 text-xl font-semibold">
              {loyalty.totalPontosResgatados}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-6 space-y-3">
        <h2 className="text-lg font-semibold text-foreground">
          Benefícios liberados
        </h2>

        {loyalty.beneficiosDisponiveis.length === 0 ? (
          <p className="rounded-lg border border-border/80 p-4 text-sm text-muted-foreground">
            Nenhum benefício liberado no momento.
          </p>
        ) : (
          <ul className="space-y-2">
            {loyalty.beneficiosDisponiveis.map((benefit, index) => (
              <li
                className="rounded-lg border border-border/80 p-4 text-sm text-foreground"
                key={index}
              >
                Benefício disponível
              </li>
            ))}
          </ul>
        )}
      </section>
    </PortalPrivateRoutePage>
  );
}
