import type { ArquivoUploadKind } from "@/features/arquivos/types/arquivos.types";

export const IMAGE_UPLOAD_MAX_BYTES = 5 * 1024 * 1024;
export const DOCUMENT_UPLOAD_MAX_BYTES = 10 * 1024 * 1024;

export const IMAGE_UPLOAD_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const DOCUMENT_UPLOAD_MIME_TYPES = ["application/pdf"] as const;

export const IMAGE_UPLOAD_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
] as const;

export const DOCUMENT_UPLOAD_EXTENSIONS = [".pdf"] as const;

function getExtension(filename: string): string {
  const normalized = filename.trim().toLowerCase();
  const lastDot = normalized.lastIndexOf(".");

  return lastDot >= 0 ? normalized.slice(lastDot) : "";
}

export type UploadValidationResult =
  | {
      valid: true;
      error: null;
    }
  | {
      valid: false;
      error: string;
    };

export function validateUploadFile(
  file: File,
  kind: ArquivoUploadKind,
): UploadValidationResult {
  const extension = getExtension(file.name);

  const allowedMimeTypes: readonly string[] =
    kind === "image" ? IMAGE_UPLOAD_MIME_TYPES : DOCUMENT_UPLOAD_MIME_TYPES;

  const allowedExtensions: readonly string[] =
    kind === "image" ? IMAGE_UPLOAD_EXTENSIONS : DOCUMENT_UPLOAD_EXTENSIONS;

  const maxBytes =
    kind === "image" ? IMAGE_UPLOAD_MAX_BYTES : DOCUMENT_UPLOAD_MAX_BYTES;

  if (!allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error:
        kind === "image"
          ? "Selecione uma imagem JPG, PNG ou WEBP."
          : "Selecione um documento PDF.",
    };
  }

  if (!allowedMimeTypes.includes(file.type)) {
    return {
      valid: false,
      error:
        kind === "image"
          ? "O tipo da imagem não é permitido."
          : "O tipo do documento não é permitido.",
    };
  }

  if (file.size > maxBytes) {
    return {
      valid: false,
      error:
        kind === "image"
          ? "A imagem deve possuir no máximo 5 MiB."
          : "O documento deve possuir no máximo 10 MiB.",
    };
  }

  return {
    valid: true,
    error: null,
  };
}
