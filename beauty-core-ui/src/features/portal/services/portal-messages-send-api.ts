import { getApiClient } from "@/services/api/api-client";

export async function sendPortalWhatsappMessage(input: {
  tipo: string;
  mensagem: string;
}) {
  const response = await getApiClient().post(
    "/area-cliente/me/mensagens-whatsapp/enviar",
    input,
  );

  return response.data;
}
