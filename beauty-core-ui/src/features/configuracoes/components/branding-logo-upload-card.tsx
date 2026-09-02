"use client";

import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { validateUploadFile } from "@/features/arquivos/utils/arquivos-upload-validator";

type BrandingLogoUploadCardProps = {
  onUpload: (file: File) => Promise<void>;
  isUploading: boolean;
};

export function BrandingLogoUploadCard({
  onUpload,
  isUploading,
}: BrandingLogoUploadCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0] ?? null;

    setFile(null);
    setValidationError(null);

    if (!selectedFile) {
      return;
    }

    const validation = validateUploadFile(selectedFile, "image");

    if (!validation.valid) {
      setValidationError(validation.error);
      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setValidationError(null);

    if (!file) {
      setValidationError("Selecione uma imagem válida para a logo.");
      return;
    }

    try {
      await onUpload(file);

      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch {
      // O feedback HTTP e apresentado pela mutation.
      // O arquivo permanece selecionado para nova tentativa.
    }
  }

  return (
    <section
      className="rounded-xl border border-border bg-card"
      aria-labelledby="branding-logo-upload-title"
    >
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2
          id="branding-logo-upload-title"
          className="text-lg font-semibold text-foreground"
        >
          Logo personalizada
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Atualize a logo vinculada à empresa autenticada.
        </p>
      </div>

      <form
        className="space-y-5 p-5 sm:p-6"
        onSubmit={handleSubmit}
        aria-busy={isUploading}
      >
        <div className="space-y-2">
          <label
            htmlFor="branding-logo-file"
            className="text-sm font-medium text-foreground"
          >
            Arquivo da logo
          </label>

          <input
            ref={inputRef}
            id="branding-logo-file"
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            disabled={isUploading}
            aria-invalid={Boolean(validationError)}
            aria-required="true"
            aria-describedby="branding-logo-help branding-logo-error"
            className="block w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground file:mr-3 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-foreground"
          />

          <p
            id="branding-logo-help"
            className="text-xs leading-5 text-muted-foreground"
          >
            JPG, JPEG, PNG ou WEBP, com até 5 MiB. SVG não é aceito neste fluxo.
          </p>

          {file ? (
            <p
              className="break-words text-sm text-foreground"
              aria-live="polite"
            >
              Selecionado: {file.name}
            </p>
          ) : null}
        </div>

        <p
          id="branding-logo-error"
          role={validationError ? "alert" : undefined}
          aria-live="polite"
          className={validationError ? "text-sm text-destructive" : "sr-only"}
        >
          {validationError ?? ""}
        </p>

        <div className="flex justify-end">
          <Button type="submit" disabled={isUploading || !file}>
            {isUploading ? "Enviando..." : "Enviar logo"}
          </Button>
        </div>
      </form>
    </section>
  );
}
