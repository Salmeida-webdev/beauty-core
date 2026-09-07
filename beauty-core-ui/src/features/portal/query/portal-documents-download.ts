import { useMutation } from "@tanstack/react-query";
import { getPortalDocumentSignedUrl } from "../services/portal-documents-api";

export function usePortalDocumentDownloadMutation() {
  return useMutation({
    mutationFn: (documentId: string) =>
      getPortalDocumentSignedUrl(documentId),
  });
}
