export type ApiErrorPayload = {
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
  requestId: string | null;
  correlationId: string | null;
};

export type NormalizedApiError = {
  statusCode: number | null;
  message: string;
  messages: string[];
  error: string | null;
  requestId: string | null;
  correlationId: string | null;
  isNetworkError: boolean;
};
