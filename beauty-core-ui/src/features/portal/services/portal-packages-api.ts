import { getApiClient } from "@/services/api/api-client";


export async function fetchPortalPackages() {
  const response = await getApiClient().get("/area-cliente/me/pacotes");
  return response.data;
}

export async function consumePortalPackage(pacoteId: string) {
  const response = await getApiClient().patch(
    "/area-cliente/me/pacotes/" + pacoteId + "/usar-sessao",
    {},
  );

  return response.data;
}