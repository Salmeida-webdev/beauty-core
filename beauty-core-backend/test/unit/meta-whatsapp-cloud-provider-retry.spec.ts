import { ConfigService } from '@nestjs/config';

import {
  MetaWhatsappCloudProvider,
  MetaWhatsappProviderError,
} from '../../src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider';

const config = new ConfigService({
  META_WHATSAPP_ACCESS_TOKEN: 'token-de-teste',
  META_WHATSAPP_PHONE_NUMBER_ID: 'phone-id-de-teste',
  META_WHATSAPP_API_VERSION: 'v23.0',
  META_WHATSAPP_GRAPH_BASE_URL: 'https://graph.test',
});

describe('MetaWhatsappCloudProvider - erros e retry', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('classifica 429 como recuperavel', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 429,
      json: () => Promise.resolve({ error: { message: 'rate limit' } }),
    } as Response);

    const provider = new MetaWhatsappCloudProvider(config);
    const promise = provider.enviarTexto('5511999999999', 'teste');
    await expect(promise).rejects.toMatchObject({
      retryable: true,
      httpStatus: 429,
    });
  });

  it('classifica 400 como definitivo sem tentar mascarar o erro', async () => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 400,
      json: () => Promise.resolve({ error: { type: 'invalid_request' } }),
    } as Response);

    const provider = new MetaWhatsappCloudProvider(config);
    await expect(
      provider.enviarTexto('5511999999999', 'teste'),
    ).rejects.toBeInstanceOf(MetaWhatsappProviderError);
    await expect(
      provider.enviarTexto('5511999999999', 'teste'),
    ).rejects.toMatchObject({ retryable: false, httpStatus: 400 });
  });
});
