import { getApiClient } from "@/services/api/api-client";


export async function fetchPortalDocuments() {
  const response = await getApiClient().get("/area-cliente/me/documentos");
  return response.data;
}

export async function getPortalDocumentSignedUrl(documentId: string) {
  const response = await getApiClient().get(
    "/area-cliente/me/documentos/" + documentId + "/signed-url",
  );

  return response.data;
}