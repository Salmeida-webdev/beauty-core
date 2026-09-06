"use client";

import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
import { PortalPageContainer } from "@/features/portal/components/portal-page-container";
import { usePortalBenefitsQuery } from "@/features/portal/query/portal-loyalty-query";

function readText(
  item: Record<string, unknown>,
  keys: string[],
  fallback: string,
) {
  for (const key of keys) {
    const value = item[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }

    if (typeof value === "number") {
      return String(value);
    }
  }

  return fallback;
}

function readBoolean(
  item: Record<string, unknown>,
  keys: string[],
) {
  for (const key of keys) {
    if (typeof item[key] === "boolean") {
      return item[key] as boolean;
    }
  }

  return undefined;
}

function readBenefits(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) {
    return data.filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null,
    );
  }

  if (typeof data === "object" && data !== null) {
    const source = data as Record<string, unknown>;

    for (const key of ["beneficios", "dados", "items", "data"]) {
      if (Array.isArray(source[key])) {
        return source[key].filter(
          (item): item is Record<string, unknown> =>
            typeof item === "object" && item !== null,
        );
      }
    }
  }

  return [];
}

export default function BeneficiosPortalPage() {
  const query = usePortalBenefitsQuery();
  const benefits = readBenefits(query.data);

  return (
    <PortalPrivateRoutePage heading="Benefícios" description="Consulte os benefícios disponíveis para o seu nível e saldo de pontos.">
      <PortalPageContainer>
        {query.isPending ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            Carregando benefícios...
          </div>
        ) : query.isError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-card p-6"
          >
            Não foi possível carregar seus benefícios.
          </div>
        ) : benefits.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            Nenhum benefício disponível no momento.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {benefits.map((benefit, index) => {
              const id = readText(
                benefit,
                ["id", "beneficioId", "codigo"],
                `beneficio-${index}`,
              );
              const title = readText(
                benefit,
                ["nome", "titulo", "name"],
                "Benefício disponível",
              );
              const description = readText(
                benefit,
                ["descricao", "description", "detalhes"],
                "Consulte as condições deste benefício.",
              );
              const points = readText(
                benefit,
                ["pontosParaResgate", "pontosNecessarios", "custoPontos"],
                "Não informado",
              );
              const validity = readText(
                benefit,
                ["validade", "dataValidade", "validUntil", "expiresAt"],
                "Conforme regras da empresa",
              );
              const eligible = readBoolean(
                benefit,
                ["elegivel", "disponivel", "liberado", "eligible"],
              );

              return (
                <article
                  key={id}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-semibold">{title}</h2>
                    {eligible !== undefined ? (
                      <span className="text-sm text-muted-foreground">
                        {eligible ? "Elegível" : "Indisponível"}
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {description}
                  </p>

                  <dl className="mt-5 grid gap-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Pontos</dt>
                      <dd>{points}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Validade</dt>
                      <dd className="text-right">{validity}</dd>
                    </div>
                  </dl>

                  <p className="mt-5 text-xs text-muted-foreground">
                    O resgate será disponibilizado somente quando houver
                    contrato Portal autorizado para essa operação.
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </PortalPageContainer>
    </PortalPrivateRoutePage>
  );
}
