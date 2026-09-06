import { useQuery } from "@tanstack/react-query";
import { fetchPortalDocuments } from "../services/portal-documents-api";

export const portalDocumentsQueryKey = [
  "portal",
  "documentos",
] as const;

export function usePortalDocumentsQuery() {
  return useQuery({
    queryKey: portalDocumentsQueryKey,
    queryFn: fetchPortalDocuments,
    staleTime: 60_000,
  });
}
