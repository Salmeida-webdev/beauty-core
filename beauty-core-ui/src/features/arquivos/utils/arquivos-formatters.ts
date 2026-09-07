const FILE_SIZE_UNITS = ["B", "KB", "MB", "GB", "TB"] as const;

export function formatFileSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return "—";
  }

  if (bytes === 0) {
    return "0 B";
  }

  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    FILE_SIZE_UNITS.length - 1,
  );

  const value = bytes / 1024 ** unitIndex;
  const maximumFractionDigits = unitIndex === 0 ? 0 : value >= 10 ? 1 : 2;

  const formatted = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits,
  }).format(value);

  return `${formatted} ${FILE_SIZE_UNITS[unitIndex]}`;
}

export function getArquivoDisplayName(
  nomeOriginal: string | null | undefined,
): string {
  const normalized = nomeOriginal?.trim();

  return normalized || "Arquivo sem nome";
}
