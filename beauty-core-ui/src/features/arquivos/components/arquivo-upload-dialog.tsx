"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { validateUploadFile } from "@/features/arquivos/utils/arquivos-upload-validator";

type UploadMode = "document" | "gallery";

type ArquivoUploadDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUploadDocument: (file: File) => Promise<void>;
  onUploadGallery: (files: readonly File[]) => Promise<void>;
  isUploading: boolean;
};

const MAX_GALLERY_FILES = 10;

export function ArquivoUploadDialog({
  open,
  onOpenChange,
  onUploadDocument,
  onUploadGallery,
  isUploading,
}: ArquivoUploadDialogProps) {
  const [mode, setMode] = useState<UploadMode>("document");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);

  function resetState() {
    setMode("document");
    setDocumentFile(null);
    setGalleryFiles([]);
    setValidationError(null);
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetState();
    }

    onOpenChange(nextOpen);
  }

  function selectMode(nextMode: UploadMode) {
    setMode(nextMode);
    setDocumentFile(null);
    setGalleryFiles([]);
    setValidationError(null);
  }

  function handleDocumentChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setDocumentFile(null);
    setValidationError(null);

    if (!file) {
      return;
    }

    const result = validateUploadFile(file, "document");

    if (!result.valid) {
      setValidationError(result.error);
      event.target.value = "";
      return;
    }

    setDocumentFile(file);
  }

  function handleGalleryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    setGalleryFiles([]);
    setValidationError(null);

    if (files.length === 0) {
      return;
    }

    if (files.length > MAX_GALLERY_FILES) {
      setValidationError("Selecione no máximo 10 imagens por envio.");
      event.target.value = "";
      return;
    }

    for (const file of files) {
      const result = validateUploadFile(file, "image");

      if (!result.valid) {
        setValidationError(`${file.name}: ${result.error}`);
        event.target.value = "";
        return;
      }
    }

    setGalleryFiles(files);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    try {
      if (mode === "document") {
        if (!documentFile) {
          setValidationError("Selecione um documento PDF.");
          return;
        }

        await onUploadDocument(documentFile);
        handleOpenChange(false);
        return;
      }

      if (galleryFiles.length === 0) {
        setValidationError("Selecione pelo menos uma imagem para a galeria.");
        return;
      }

      await onUploadGallery(galleryFiles);
      handleOpenChange(false);
    } catch {
      // O feedback da falha HTTP é responsabilidade da mutation.
      // O dialog permanece aberto para permitir nova tentativa.
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Enviar arquivo</DialogTitle>
          <DialogDescription>
            Envie um PDF administrativo ou imagens para a galeria.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
          aria-busy={isUploading}
        >
          <div
            className="grid grid-cols-2 gap-2"
            role="group"
            aria-label="Tipo de upload"
          >
            <Button
              type="button"
              variant={mode === "document" ? "default" : "outline"}
              aria-pressed={mode === "document"}
              onClick={() => selectMode("document")}
              disabled={isUploading}
            >
              Documento
            </Button>

            <Button
              type="button"
              variant={mode === "gallery" ? "default" : "outline"}
              aria-pressed={mode === "gallery"}
              onClick={() => selectMode("gallery")}
              disabled={isUploading}
            >
              Galeria
            </Button>
          </div>

          {mode === "document" ? (
            <div className="space-y-2">
              <label
                htmlFor="arquivo-documento"
                className="text-sm font-medium text-foreground"
              >
                Documento PDF
              </label>

              <input
                id="arquivo-documento"
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleDocumentChange}
                disabled={isUploading}
                aria-describedby="arquivo-documento-ajuda arquivo-upload-erro"
                className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground"
              />

              <p
                id="arquivo-documento-ajuda"
                className="text-xs text-muted-foreground"
              >
                Apenas PDF, com até 10 MiB.
              </p>

              {documentFile ? (
                <p className="text-sm text-foreground" aria-live="polite">
                  Selecionado: {documentFile.name}
                </p>
              ) : null}
            </div>
          ) : (
            <div className="space-y-2">
              <label
                htmlFor="arquivo-galeria"
                className="text-sm font-medium text-foreground"
              >
                Imagens da galeria
              </label>

              <input
                id="arquivo-galeria"
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                onChange={handleGalleryChange}
                disabled={isUploading}
                aria-describedby="arquivo-galeria-ajuda arquivo-upload-erro"
                className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground"
              />

              <p
                id="arquivo-galeria-ajuda"
                className="text-xs text-muted-foreground"
              >
                JPG, JPEG, PNG ou WEBP. Até 5 MiB por imagem e no máximo 10
                imagens por envio.
              </p>

              {galleryFiles.length > 0 ? (
                <p className="text-sm text-foreground" aria-live="polite">
                  {galleryFiles.length}{" "}
                  {galleryFiles.length === 1
                    ? "imagem selecionada"
                    : "imagens selecionadas"}
                </p>
              ) : null}
            </div>
          )}

          <p
            id="arquivo-upload-erro"
            role={validationError ? "alert" : undefined}
            aria-live="polite"
            className={validationError ? "text-sm text-destructive" : "sr-only"}
          >
            {validationError ?? ""}
          </p>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isUploading}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Enviando..." : "Enviar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
