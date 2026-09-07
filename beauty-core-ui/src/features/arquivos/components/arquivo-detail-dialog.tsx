"use client";

import { useQuery } from "@tanstack/react-query";

import { ErrorState, LoadingState } from "@/components/states/feedback-states";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { arquivoDetailQueryOptions } from "@/features/arquivos/queries/arquivos-query-options";
import { getArquivoRelations } from "@/features/arquivos/utils/arquivo-relations";
import {
  formatFileSize,
  getArquivoDisplayName,
} from "@/features/arquivos/utils/arquivos-formatters";
import { getArquivoStatusPresentation } from "@/features/arquivos/utils/arquivo-status";
import { getArquivoTipoLabel } from "@/features/arquivos/utils/arquivo-tipo";

type ArquivoDetailDialogProps = {
  arquivoId: string | null;
  onOpenChange: (open: boolean) => void;
};

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm text-foreground">{value}</dd>
    </div>
  );
}

function formatDate(value: string | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

export function ArquivoDetailDialog({
  arquivoId,
  onOpenChange,
}: ArquivoDetailDialogProps) {
  const query = useQuery({
    ...arquivoDetailQueryOptions(arquivoId ?? ""),
    enabled: Boolean(arquivoId),
  });

  const arquivo = query.data;
  const status = arquivo?.status
    ? getArquivoStatusPresentation(arquivo.status)
    : null;

  const relations = arquivo ? getArquivoRelations(arquivo) : [];

  return (
    <Dialog open={Boolean(arquivoId)} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Detalhes do arquivo</DialogTitle>
          <DialogDescription>
            Metadados registrados pelo backend para o arquivo selecionado.
          </DialogDescription>
        </DialogHeader>

        {query.isPending ? <LoadingState /> : null}

        {query.isError ? (
          <ErrorState onRetry={() => void query.refetch()} />
        ) : null}

        {arquivo ? (
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="break-words font-medium text-foreground">
                {getArquivoDisplayName(arquivo.nomeOriginal)}
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {getArquivoTipoLabel(arquivo.tipo)}
                </span>

                {status ? (
                  <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                ) : null}
              </div>
            </div>

            <dl className="grid gap-5 sm:grid-cols-2">
              <DetailItem
                label="Tipo"
                value={getArquivoTipoLabel(arquivo.tipo)}
              />

              <DetailItem label="MIME type" value={arquivo.mimeType} />

              <DetailItem
                label="Tamanho"
                value={formatFileSize(arquivo.tamanhoBytes)}
              />

              <DetailItem
                label="Criado em"
                value={formatDate(arquivo.createdAt)}
              />

              <DetailItem
                label="Atualizado em"
                value={formatDate(arquivo.updatedAt)}
              />

              <DetailItem label="ID do arquivo" value={arquivo.id} />
            </dl>

            {relations.length > 0 ? (
              <section
                className="space-y-3 border-t border-border pt-5"
                aria-labelledby="arquivo-relacoes-title"
              >
                <div>
                  <h3
                    id="arquivo-relacoes-title"
                    className="text-sm font-semibold text-foreground"
                  >
                    Relações registradas
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    IDs relacionados já retornados pelo próprio registro.
                  </p>
                </div>

                <dl className="grid gap-5 sm:grid-cols-2">
                  {relations.map((relation) => (
                    <DetailItem
                      key={relation.key}
                      label={relation.label}
                      value={relation.id}
                    />
                  ))}
                </dl>
              </section>
            ) : null}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
