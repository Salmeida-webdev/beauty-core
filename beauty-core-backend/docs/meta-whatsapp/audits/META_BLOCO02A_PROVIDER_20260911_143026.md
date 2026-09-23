
## 1. Preflight

- Branch: `main`
- HEAD: `7da979412362ba5abc7ff2d03f26a2fd2cdd9dcd`
- Stage, commit, push, deploy e envio Meta real: NAO EXECUTADOS.
- `.env` real nao foi lido e nenhum segredo foi exibido.
```text
 M beauty-core-backend/prisma/schema.prisma
 M beauty-core-backend/src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
 M beauty-core-backend/src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
?? beauty-core-backend/docs/meta-whatsapp/
?? beauty-core-backend/prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
```

## 2. Provider Meta completo

```typescript
function stringifyLintValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return '';
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return value.toString();
  }

  if (typeof value === 'symbol') {
    return value.description ?? '';
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value) ?? '';
    } catch {
      return '[unserializable]';
    }
  }

  return '';
}

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
      return value;
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
    return stringifyLintValue(value)
      .replace(/[\r\n]+/g, ' ')
      .slice(0, 300);
  }
}
```

## 3. Chamada do service

- Linha 29: MetaWhatsappProviderError,
- Linha 63: private readonly metaWhatsappProvider: MetaWhatsappCloudProvider,
- Linha 90: const configuracao = await this.prisma.configuracaoWhatsApp.findUnique({
- Linha 122: const resultado = await this.metaWhatsappProvider.enviarTexto(
- Linha 142: error instanceof MetaWhatsappProviderError ? error.retryable : true;
- Linha 197: const configuracao = await this.prisma.configuracaoWhatsApp.findUnique({
- Linha 466: const configuracao = await this.prisma.configuracaoWhatsApp.findUnique({

## 4. Interfaces e testes

- `beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.module.ts`: 27 linhas
  - Linha 10: import { MetaWhatsappCloudProvider } from './providers/meta-whatsapp-cloud.provider';
  - Linha 11: import { MetaWhatsappWebhookController } from './meta-whatsapp-webhook.controller';
  - Linha 12: import { MetaWhatsappWebhookService } from './meta-whatsapp-webhook.service';
  - Linha 17: controllers: [MensagensWhatsappController, MetaWhatsappWebhookController],
  - Linha 19: providers: [
  - Linha 21: MetaWhatsappCloudProvider,
  - Linha 22: MetaWhatsappWebhookService,
- `beauty-core-backend/test/unit/meta-whatsapp-cloud.provider.spec.ts`: 81 linhas
  - Linha 3: import { MetaWhatsappCloudProvider } from '../../src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider';
  - Linha 5: describe('MetaWhatsappCloudProvider', () => {
  - Linha 20: const provider = new MetaWhatsappCloudProvider(
  - Linha 22: META_WHATSAPP_ACCESS_TOKEN: 'token-de-teste',
  - Linha 30: provider.enviarTexto('+55 (83) 99999-9999', 'Ola!'),
  - Linha 38: Authorization: 'Bearer token-de-teste',
  - Linha 54: const provider = new MetaWhatsappCloudProvider(new ConfigService());
  - Linha 56: await expect(provider.enviarTexto('5583999999999', 'Ola!')).rejects.toThrow(
  - Linha 69: const provider = new MetaWhatsappCloudProvider(
  - Linha 71: META_WHATSAPP_ACCESS_TOKEN: 'token-de-teste',
  - Linha 77: await expect(provider.enviarTexto('5583999999999', 'Ola!')).rejects.toThrow(
- `beauty-core-backend/test/unit/meta-whatsapp-cloud-provider-retry.spec.ts`: 50 linhas
  - Linha 4: MetaWhatsappCloudProvider,
  - Linha 5: MetaWhatsappProviderError,
  - Linha 6: } from '../../src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider';
  - Linha 9: META_WHATSAPP_ACCESS_TOKEN: 'token-de-teste',
  - Linha 15: describe('MetaWhatsappCloudProvider - erros e retry', () => {
  - Linha 27: const provider = new MetaWhatsappCloudProvider(config);
  - Linha 28: const promise = provider.enviarTexto('5511999999999', 'teste');
  - Linha 42: const provider = new MetaWhatsappCloudProvider(config);
  - Linha 44: provider.enviarTexto('5511999999999', 'teste'),
  - Linha 45: ).rejects.toBeInstanceOf(MetaWhatsappProviderError);
  - Linha 47: provider.enviarTexto('5511999999999', 'teste'),
- `beauty-core-backend/test/unit/meta-whatsapp-worker-flow.spec.ts`: 131 linhas
  - Linha 7: import { MetaWhatsappProviderError } from '../../src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider';
  - Linha 9: const empresaId = 'empresa-chat03';
  - Linha 15: empresaId,
  - Linha 24: providerResult?: { messageId: string };
  - Linha 25: providerError?: MetaWhatsappProviderError;
  - Linha 49: const provider = {
  - Linha 50: enviarTexto: options.providerError
  - Linha 51: ? jest.fn().mockRejectedValue(options.providerError)
  - Linha 54: .mockResolvedValue(options.providerResult ?? { messageId: 'wamid.TESTE' }),
  - Linha 68: provider as never,
  - Linha 71: provider,
  - Linha 76: it('persiste o messageId retornado pelo provider', async () => {
  - Linha 77: const harness = criarService({ providerResult: { messageId: 'wamid.SUCESSO' } });
  - Linha 80: empresaId,
  - Linha 86: expect(harness.provider.enviarTexto).toHaveBeenCalledTimes(1);
  - Linha 100: providerError: new MetaWhatsappProviderError('HTTP 400', false, 400),
  - Linha 105: empresaId,
  - Linha 117: providerError: new MetaWhatsappProviderError('HTTP 429', true, 429),
  - Linha 123: empresaId,

## 5. Diagnostico para implementacao

- O provider deve aceitar a conexao Meta resolvida por empresaId, sem retornar credenciais.
- O token deve continuar vindo de resolver seguro; metaAccessTokenRef nao e token bruto.
- O phoneNumberId deve deixar de depender exclusivamente do ambiente global.
- O modo demonstracao e o fluxo BullMQ devem permanecer intactos.
- A proxima alteracao sera feita somente apos revisar este contrato real.

## 6. Conclusao

- Status: `PARTIAL`
- Warnings: `1`
- Falhas: `0`
- Nenhum arquivo de produto foi alterado.