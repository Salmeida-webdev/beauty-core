import { getApiClient } from "@/services/api/api-client";

import {
  portalWhatsappMessagesParamsSchema,
  portalWhatsappMessagesResponseSchema,
  type PortalWhatsappMessagesParams,
  type PortalWhatsappMessagesResponse,
} from "../contracts/portal-messages-contracts";

export const PORTAL_MESSAGES_ENDPOINTS = {
  list: "/area-cliente/me/mensagens-whatsapp",
} as const;

export async function getPortalWhatsappMessages(
  params: PortalWhatsappMessagesParams = {},
): Promise<PortalWhatsappMessagesResponse> {
  const safeParams = portalWhatsappMessagesParamsSchema.parse(params);

  const response = await getApiClient().get<unknown>(
    PORTAL_MESSAGES_ENDPOINTS.list,
    {
      params: safeParams,
    },
  );

  return portalWhatsappMessagesResponseSchema.parse(response.data);
}
