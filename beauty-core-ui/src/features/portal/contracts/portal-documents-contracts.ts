import { z } from "zod";

export const portalDocumentSchema = z.object({
  id: z.string(),
  tipo: z.string(),
  nomeOriginal: z.string(),
  mimeType: z.string(),
  tamanhoBytes: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  expiraEm: z.string().nullable(),
  privado: z.boolean(),
  visibilidade: z.string(),
}).passthrough();

export const portalDocumentsResponseSchema =
  z.array(portalDocumentSchema);

export type PortalDocument = z.infer<typeof portalDocumentSchema>;
