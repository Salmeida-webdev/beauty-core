"use client";

import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
import { PortalPageContainer } from "@/features/portal/components/portal-page-container";
import { usePortalPackagesQuery } from "@/features/portal/query/portal-packages-query";
import { useConsumePortalPackageMutation } from "@/features/portal/query/portal-packages-mutations";

function text(
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

function number(
  item: Record<string, unknown>,
  keys: string[],
) {
  for (const key of keys) {
    if (typeof item[key] === "number") {
      return item[key] as number;
    }
  }

  return undefined;
}

function readPackages(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) {
    return data.filter(
      (item): item is Record<string, unknown> =>
        typeof item === "object" && item !== null,
    );
  }

  if (typeof data === "object" && data !== null) {
    const source = data as Record<string, unknown>;

    for (const key of ["pacotes", "dados", "items", "data"]) {
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

export default function PacotesPortalPage() {
  const query = usePortalPackagesQuery();
  const consumeMutation = useConsumePortalPackageMutation();
  const packages = readPackages(query.data);

  return (
    <PortalPrivateRoutePage
      heading="Meus pacotes"
      description="Acompanhe suas sessões, saldo e validade."
    >
      <PortalPageContainer>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Meus pacotes</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Acompanhe suas sessões, saldo e validade.
          </p>
        </header>

        {query.isPending ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            Carregando pacotes...
          </div>
        ) : query.isError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-card p-6"
          >
            Não foi possível carregar seus pacotes.
          </div>
        ) : packages.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            Você ainda não possui pacotes vinculados.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {packages.map((item, index) => {
              const packageId = text(item, ["id"], "pacote-" + index);
              const total = number(item, [
                "sessoesTotais",
                "totalSessoes",
                "quantidadeSessoes",
              ]);
              const used = number(item, [
                "sessoesUtilizadas",
                "sessoesUsadas",
                "utilizadas",
              ]);
              const remaining = number(item, [
                "sessoesRestantes",
                "saldoSessoes",
                "restantes",
              ]);

              return (
                <article
                  key={packageId}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-semibold">
                      {text(item, ["nome", "titulo", "name"], "Pacote")}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {text(item, ["status"], "Ativo")}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    {text(
                      item,
                      ["descricao", "description"],
                      "Pacote vinculado ao seu cadastro.",
                    )}
                  </p>

                  <dl className="mt-5 grid gap-2 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Sessões totais</dt>
                      <dd>{total ?? "Não informado"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Utilizadas</dt>
                      <dd>{used ?? "Não informado"}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted-foreground">Saldo restante</dt>
                      <dd>{remaining ?? "Não informado"}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Validade</dt>
                      <dd className="text-right">
                        {text(
                          item,
                          ["validade", "dataValidade", "expiresAt"],
                          "Não informado",
                        )}
                      </dd>
                    </div>
                  </dl>
                <button
                  type="button"
                  disabled={consumeMutation.isPending}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Confirmar o consumo de uma sessão deste pacote?",
                      )
                    ) {
                      consumeMutation.mutate(packageId);
                    }
                  }}
                  className="mt-5 rounded-xl border border-border px-4 py-2 text-sm disabled:opacity-50"
                >
                  {consumeMutation.isPending
                    ? "Processando..."
                    : "Usar uma sessão"}
                </button>                </article>
              );
            })}
          </div>
        )}
      </PortalPageContainer>
    </PortalPrivateRoutePage>
  );
}
