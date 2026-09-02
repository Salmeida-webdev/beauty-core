import type { ArquivoTipo } from "@/features/arquivos/types/arquivos.types";

const ARQUIVO_TIPO_LABELS: Record<ArquivoTipo, string> = {
  LOGO_EMPRESA: "Logo da empresa",
  FOTO_CLIENTE: "Foto de cliente",
  FOTO_USUARIO: "Foto de usuário",
  FOTO_PROFISSIONAL: "Foto de profissional",
  IMAGEM_SERVICO: "Imagem de serviço",
  GALERIA_EMPRESA: "Galeria",
  DOCUMENTO: "Documento",
  OUTRO: "Outro",
};

export function getArquivoTipoLabel(tipo: ArquivoTipo): string {
  return ARQUIVO_TIPO_LABELS[tipo];
}
