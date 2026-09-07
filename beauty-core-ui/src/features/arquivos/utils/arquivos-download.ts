import type { Arquivo } from "@/features/arquivos/types/arquivos.types";
import { getApiClient } from "@/services/api/api-client";

function isSafeUploadsPath(url: string): boolean {
  const normalized = url.trim();

  return (
    normalized.startsWith("/uploads/public/") &&
    !normalized.startsWith("//") &&
    !normalized.includes("..") &&
    !normalized.includes("\\")
  );
}

export function isArquivoPublicoBaixavel(arquivo: Arquivo): boolean {
  return (
    arquivo.visibilidade === "PUBLICO" &&
    typeof arquivo.url === "string" &&
    isSafeUploadsPath(arquivo.url)
  );
}

function getDownloadFilename(nomeOriginal: string): string {
  const normalized = nomeOriginal
    .replaceAll("\\", "_")
    .replaceAll("/", "_")
    .trim();

  return normalized || "arquivo";
}

export async function baixarArquivoPublico(arquivo: Arquivo): Promise<void> {
  if (!isArquivoPublicoBaixavel(arquivo) || !arquivo.url) {
    throw new Error("Arquivo sem URL pública segura para download.");
  }

  const response = await getApiClient().get<Blob>(arquivo.url, {
    responseType: "blob",
  });

  const objectUrl = URL.createObjectURL(response.data);

  try {
    const anchor = document.createElement("a");

    anchor.href = objectUrl;
    anchor.download = getDownloadFilename(arquivo.nomeOriginal);
    anchor.rel = "noopener";
    anchor.style.display = "none";

    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
