"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import { getArquivoDisplayName } from "@/features/arquivos/utils/arquivos-formatters";

type ArquivoRemoveDialogProps = {
  arquivo: Arquivo | null;
  onOpenChange: (open: boolean) => void;
  onConfirm: (arquivo: Arquivo) => Promise<void>;
  isRemoving: boolean;
};

export function ArquivoRemoveDialog({
  arquivo,
  onOpenChange,
  onConfirm,
  isRemoving,
}: ArquivoRemoveDialogProps) {
  async function handleConfirm() {
    if (!arquivo) {
      return;
    }

    try {
      await onConfirm(arquivo);
      onOpenChange(false);
    } catch {
      // A mutation apresenta a mensagem de erro.
      // O dialog permanece aberto para nova tentativa.
    }
  }

  return (
    <Dialog open={Boolean(arquivo)} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Remover arquivo</DialogTitle>
          <DialogDescription>
            Confirme a remoção lógica do arquivo selecionado.
          </DialogDescription>
        </DialogHeader>

        {arquivo ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <p className="break-words font-medium text-foreground">
                {getArquivoDisplayName(arquivo.nomeOriginal)}
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                O backend marcará este registro como excluído. Esta ação não é
                apresentada como exclusão física do armazenamento.
              </p>
            </div>

            <div
              className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
              aria-busy={isRemoving}
            >
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isRemoving}
              >
                Cancelar
              </Button>

              <Button
                type="button"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => void handleConfirm()}
                disabled={isRemoving}
              >
                {isRemoving ? "Removendo..." : "Remover arquivo"}
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
