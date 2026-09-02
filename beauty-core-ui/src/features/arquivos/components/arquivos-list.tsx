import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import { isArquivoPublicoBaixavel } from "@/features/arquivos/utils/arquivos-download";
import {
  formatFileSize,
  getArquivoDisplayName,
} from "@/features/arquivos/utils/arquivos-formatters";
import { getArquivoStatusPresentation } from "@/features/arquivos/utils/arquivo-status";
import { getArquivoTipoLabel } from "@/features/arquivos/utils/arquivo-tipo";

type ArquivosListProps = {
  arquivos: Arquivo[];
  onOpenDetails: (arquivoId: string) => void;
  onDownload?: (arquivo: Arquivo) => void;
  onRemove?: (arquivo: Arquivo) => void;
  downloadingArquivoId?: string | null;
  removingArquivoId?: string | null;
};

function formatDate(value: string | undefined): string {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function ArquivosList({
  arquivos,
  onOpenDetails,
  onDownload,
  onRemove,
  downloadingArquivoId,
  removingArquivoId,
}: ArquivosListProps) {
  if (arquivos.length === 0) {
    return (
      <div
        className="rounded-xl border border-border bg-card px-6 py-12 text-center"
        role="status"
      >
        <p className="font-medium text-foreground">Nenhum arquivo encontrado</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Ainda não existem arquivos para esta página.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Arquivo</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Tamanho</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {arquivos.map((arquivo) => {
            const status = arquivo.status
              ? getArquivoStatusPresentation(arquivo.status)
              : null;

            const displayName = getArquivoDisplayName(arquivo.nomeOriginal);

            const canDownload =
              Boolean(onDownload) && isArquivoPublicoBaixavel(arquivo);

            const canRemove =
              Boolean(onRemove) && arquivo.status !== "EXCLUIDO";

            return (
              <TableRow key={arquivo.id}>
                <TableCell className="max-w-[18rem]">
                  <div className="min-w-0">
                    <p
                      className="truncate font-medium text-foreground"
                      title={arquivo.nomeOriginal}
                    >
                      {displayName}
                    </p>

                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      {arquivo.mimeType}
                    </p>
                  </div>
                </TableCell>

                <TableCell>{getArquivoTipoLabel(arquivo.tipo)}</TableCell>

                <TableCell>{formatFileSize(arquivo.tamanhoBytes)}</TableCell>

                <TableCell>
                  {status ? (
                    <StatusBadge tone={status.tone}>{status.label}</StatusBadge>
                  ) : (
                    <span className="text-sm text-muted-foreground">—</span>
                  )}
                </TableCell>

                <TableCell>{formatDate(arquivo.createdAt)}</TableCell>

                <TableCell className="text-right">
                  <div className="flex flex-wrap justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onOpenDetails(arquivo.id)}
                      aria-label={`Ver detalhes de ${displayName}`}
                    >
                      Ver detalhes
                    </Button>

                    {canDownload ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onDownload?.(arquivo)}
                        disabled={downloadingArquivoId === arquivo.id}
                        aria-label={`Baixar ${displayName}`}
                      >
                        {downloadingArquivoId === arquivo.id
                          ? "Baixando..."
                          : "Baixar"}
                      </Button>
                    ) : null}

                    {canRemove ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onRemove?.(arquivo)}
                        disabled={removingArquivoId === arquivo.id}
                        aria-label={`Remover ${displayName}`}
                      >
                        Remover
                      </Button>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
