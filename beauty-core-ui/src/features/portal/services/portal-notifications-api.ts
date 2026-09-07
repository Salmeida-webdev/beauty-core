import { getApiClient } from "@/services/api/api-client";

import type {
  PortalNotification,
  PortalNotificationsResponse,
  PortalUnreadNotificationsResponse,
} from "../contracts/portal-notifications-contracts";

export const PORTAL_NOTIFICATIONS_ENDPOINTS = {
  list: "/area-cliente/me/notificacoes",
  unread: "/area-cliente/me/notificacoes/nao-lidas",
  markRead: (id: string) => `/area-cliente/me/notificacoes/${id}/lida`,
} as const;

function normalizeNotification(
  input: PortalNotification,
): PortalNotification {
  return {
    ...input,
    titulo: input.titulo ?? input.title ?? null,
    mensagem: input.mensagem ?? input.message ?? null,
    tipo: input.tipo ?? input.type ?? null,
    lida: input.lida ?? Boolean(input.readAt),
  };
}

function normalizeList(
  input: PortalNotificationsResponse,
): PortalNotificationsResponse {
  return {
    ...input,
    data: Array.isArray(input.data)
      ? input.data.map(normalizeNotification)
      : [],
  };
}

export async function getPortalNotifications(
  page = 1,
  limit = 20,
): Promise<PortalNotificationsResponse> {
  const response = await getApiClient().get<PortalNotificationsResponse>(
    PORTAL_NOTIFICATIONS_ENDPOINTS.list,
    { params: { page, limit } },
  );

  return normalizeList(response.data);
}

export async function getPortalUnreadNotifications(): Promise<PortalUnreadNotificationsResponse> {
  const response =
    await getApiClient().get<PortalUnreadNotificationsResponse>(
      PORTAL_NOTIFICATIONS_ENDPOINTS.unread,
    );

  return {
    ...response.data,
    data: Array.isArray(response.data.data)
      ? response.data.data.map(normalizeNotification)
      : [],
  };
}

export async function markPortalNotificationAsRead(
  notificationId: string,
): Promise<PortalNotification> {
  const response = await getApiClient().patch<PortalNotification>(
    PORTAL_NOTIFICATIONS_ENDPOINTS.markRead(notificationId),
  );

  return normalizeNotification(response.data);
}
