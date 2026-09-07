"use client";

import { PortalPrivateRoutePage } from "@/features/portal/pages/portal-private-route-page";
import { PortalPageContainer } from "@/features/portal/components/portal-page-container";
import { usePortalDocumentsQuery } from "@/features/portal/query/portal-documents-query";

function documentsFrom(data: unknown): Record<string, unknown>[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.filter(
    (item): item is Record<string, unknown> =>
      typeof item === "object" && item !== null,
  );
}

function display(
  item: Record<string, unknown>,
  key: string,
  fallback: string,
) {
  const value = item[key];

  if (typeof value === "string" && value.trim()) {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
}

export default function DocumentosPortalPage() {
  const query = usePortalDocumentsQuery();
  const documents = documentsFrom(query.data);

  return (
    <PortalPrivateRoutePage
      heading="Meus documentos"
      description="Consulte os documentos vinculados ao seu cadastro."
    >
      <PortalPageContainer>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Meus documentos</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Consulte os documentos vinculados ao seu cadastro.
          </p>
        </header>

        {query.isPending ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            Carregando documentos...
          </div>
        ) : query.isError ? (
          <div
            role="alert"
            className="rounded-2xl border border-destructive/30 bg-card p-6"
          >
            Não foi possível carregar seus documentos.
          </div>
        ) : documents.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-6">
            Nenhum documento disponível.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {documents.map((document, index) => (
              <article
                key={display(document, "id", "documento-" + index)}
                className="rounded-2xl border border-border bg-card p-5"
              >
                <h2 className="font-semibold">
                  {display(document, "nomeOriginal", "Documento")}
                </h2>

                <dl className="mt-4 grid gap-2 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Tipo</dt>
                    <dd>{display(document, "tipo", "Não informado")}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Formato</dt>
                    <dd>{display(document, "mimeType", "Não informado")}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Criado em</dt>
                    <dd>{display(document, "createdAt", "Não informado")}</dd>
                  </div>
                </dl>

                <p className="mt-5 text-xs text-muted-foreground">
                  Download e preview serão tratados pelo fluxo seguro de
                  autorização.
                </p>
              </article>
            ))}
          </div>
        )}
      </PortalPageContainer>
    </PortalPrivateRoutePage>
  );
}
