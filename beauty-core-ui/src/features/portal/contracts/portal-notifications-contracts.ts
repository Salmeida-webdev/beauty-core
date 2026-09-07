export type PortalNotification = {
  id: string;
  titulo?: string | null;
  title?: string | null;
  mensagem?: string | null;
  message?: string | null;
  tipo?: string | null;
  type?: string | null;
  readAt?: string | null;
  lida?: boolean;
  createdAt: string;
  updatedAt?: string | null;
};

export type PortalNotificationsResponse = {
  data: PortalNotification[];
  total: number;
  page: number;
  limit: number;
  totalPages?: number;
};

export type PortalUnreadNotificationsResponse = {
  data: PortalNotification[];
  total: number;
};
