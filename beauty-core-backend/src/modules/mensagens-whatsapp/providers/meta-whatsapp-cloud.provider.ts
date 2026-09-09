import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type MetaWhatsappPayload = {
  messages?: Array<{ id?: unknown }>;
  error?: { message?: unknown; type?: unknown };
};

export class MetaWhatsappProviderError extends Error {
  constructor(
    message: string,
    public readonly retryable: boolean,
    public readonly httpStatus?: number,
  ) {
    super(message);
    this.name = 'MetaWhatsappProviderError';
  }
}

export type MetaWhatsappSendResult = {
  messageId: string;
};

@Injectable()
export class MetaWhatsappCloudProvider {
  constructor(private readonly configService: ConfigService) {}

  async enviarTexto(
    destinatario: string,
    mensagem: string,
  ): Promise<MetaWhatsappSendResult> {
    const token = this.configService
      .get<string>('META_WHATSAPP_ACCESS_TOKEN')
      ?.trim();
    const phoneNumberId = this.configService
      .get<string>('META_WHATSAPP_PHONE_NUMBER_ID')
      ?.trim();
    const apiVersion = this.configService
      .get<string>('META_WHATSAPP_API_VERSION')
      ?.trim();

    if (!token || !phoneNumberId || !apiVersion) {
      throw new MetaWhatsappProviderError(
        'Meta WhatsApp Cloud API nao configurada: informe as credenciais no ambiente seguro.',
        false,
      );
    }

    const numero = destinatario.replace(/\D/g, '');
    if (numero.length < 8) {
      throw new MetaWhatsappProviderError(
        'Destinatario WhatsApp invalido: informe o numero em formato internacional.',
        false,
      );
    }
    if (!mensagem.trim()) {
      throw new MetaWhatsappProviderError(
        'Mensagem WhatsApp nao pode ser vazia.',
        false,
      );
    }

    const graphBaseUrl =
      this.configService.get<string>('META_WHATSAPP_GRAPH_BASE_URL')?.trim() ||
      'https://graph.facebook.com';
    const endpoint = `${graphBaseUrl}/${apiVersion}/${encodeURIComponent(phoneNumberId)}/messages`;
    const configuredTimeout = Number(
      this.configService.get<string>('META_WHATSAPP_TIMEOUT_MS') || 10000,
    );
    const timeoutMs = Number.isFinite(configuredTimeout)
      ? Math.min(Math.max(configuredTimeout, 1000), 60000)
      : 10000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      let response: Response;
      try {
        response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to: numero,
            type: 'text',
            text: { preview_url: false, body: mensagem },
          }),
          signal: controller.signal,
        });
      } catch (error) {
        const detail = error instanceof Error ? error.message : 'falha de rede';
        throw new MetaWhatsappProviderError(
          `Falha transitoria ao chamar a Meta WhatsApp: ${detail}`,
          true,
        );
      }

      const payload = await this.lerPayload(response);
      if (!response.ok) {
        const retryable =
          response.status === 408 ||
          response.status === 429 ||
          response.status >= 500;
        throw new MetaWhatsappProviderError(
          `Meta WhatsApp rejeitou o envio (HTTP ${response.status}): ${this.resumirErro(payload)}`,
          retryable,
          response.status,
        );
      }

      const messageId = this.extrairMessageId(payload);
      if (!messageId) {
        throw new MetaWhatsappProviderError(
          'Meta WhatsApp respondeu sem identificador da mensagem; envio nao confirmado.',
          true,
        );
      }
      return { messageId };
    } finally {
      clearTimeout(timer);
    }
  }

  private async lerPayload(response: Response): Promise<MetaWhatsappPayload> {
    try {
      const value: unknown = await response.json();
      if (typeof value !== 'object' || value === null || Array.isArray(value))
        return {};
      return value as MetaWhatsappPayload;
    } catch {
      return {};
    }
  }

  private extrairMessageId(payload: MetaWhatsappPayload): string | null {
    const value = payload.messages?.[0]?.id;
    return typeof value === 'string' && value.trim() ? value.trim() : null;
  }

  private resumirErro(payload: MetaWhatsappPayload): string {
    const value =
      payload.error?.message || payload.error?.type || 'resposta sem detalhes';
    return String(value)
      .replace(/[\r\n]+/g, ' ')
      .slice(0, 300);
  }
}
