export type MetaWhatsappStatusName = 'sent' | 'delivered' | 'read' | 'failed';

export type MetaWhatsappStatus = {
  id?: unknown;
  status?: unknown;
  timestamp?: unknown;
  errors?: unknown;
};

export type MetaWhatsappWebhookPayload = {
  entry?: unknown;
};

export type MetaWhatsappWebhookResult = {
  received: true;
  accepted: number;
  duplicates: number;
};
