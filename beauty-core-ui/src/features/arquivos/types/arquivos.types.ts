import type { z } from "zod";

import type {
  arquivoSchema,
  arquivoStatusSchema,
  arquivoTipoSchema,
  arquivoVisibilidadeSchema,
  arquivosPageSchema,
} from "@/features/arquivos/schemas/arquivos.schemas";

export type Arquivo = z.infer<typeof arquivoSchema>;
export type ArquivosPage = z.infer<typeof arquivosPageSchema>;
export type ArquivoTipo = z.infer<typeof arquivoTipoSchema>;
export type ArquivoStatus = z.infer<typeof arquivoStatusSchema>;
export type ArquivoVisibilidade = z.infer<typeof arquivoVisibilidadeSchema>;

export type ArquivosListParams = {
  page?: number;
  limit?: number;
};

export type ArquivosTipoListParams = ArquivosListParams & {
  tipo: ArquivoTipo;
};

export type ArquivoUploadKind = "image" | "document";
