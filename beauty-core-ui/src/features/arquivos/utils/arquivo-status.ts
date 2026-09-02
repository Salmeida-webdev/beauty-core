import type { ArquivoStatus } from "@/features/arquivos/types/arquivos.types";

export type ArquivoStatusTone = "success" | "warning" | "danger";

export type ArquivoStatusPresentation = {
  label: string;
  tone: ArquivoStatusTone;
};

const STATUS_PRESENTATION: Record<ArquivoStatus, ArquivoStatusPresentation> = {
  ATIVO: {
    label: "Ativo",
    tone: "success",
  },
  INATIVO: {
    label: "Inativo",
    tone: "warning",
  },
  EXCLUIDO: {
    label: "Excluído",
    tone: "danger",
  },
};

export function getArquivoStatusPresentation(
  status: ArquivoStatus,
): ArquivoStatusPresentation {
  return STATUS_PRESENTATION[status];
}
