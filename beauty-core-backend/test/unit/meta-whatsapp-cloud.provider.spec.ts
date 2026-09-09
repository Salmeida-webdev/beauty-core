import { ConfigService } from '@nestjs/config';

import { MetaWhatsappCloudProvider } from '../../src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider';

describe('MetaWhatsappCloudProvider', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('envia texto usando o contrato da Cloud API e retorna o id Meta', async () => {
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => ({ messages: [{ id: 'wamid.TESTE' }] }),
    });
    global.fetch = fetchMock as typeof fetch;

    const provider = new MetaWhatsappCloudProvider(
      new ConfigService({
        META_WHATSAPP_ACCESS_TOKEN: 'token-de-teste',
        META_WHATSAPP_PHONE_NUMBER_ID: '123456789',
        META_WHATSAPP_API_VERSION: 'vXX.X',
        META_WHATSAPP_GRAPH_BASE_URL: 'https://graph.test',
      }),
    );

    await expect(
      provider.enviarTexto('+55 (83) 99999-9999', 'Ola!'),
    ).resolves.toEqual({ messageId: 'wamid.TESTE' });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://graph.test/vXX.X/123456789/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Bearer token-de-teste',
        }) as Record<string, unknown>,
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: '5583999999999',
          type: 'text',
          text: { preview_url: false, body: 'Ola!' },
        }),
      }),
    );
  });

  it('bloqueia envio real sem credenciais e nao chama a rede', async () => {
    const fetchMock = jest.fn();
    global.fetch = fetchMock as typeof fetch;
    const provider = new MetaWhatsappCloudProvider(new ConfigService());

    await expect(provider.enviarTexto('5583999999999', 'Ola!')).rejects.toThrow(
      'Meta WhatsApp Cloud API nao configurada',
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('nao confirma envio quando a Meta responde sem message id', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => ({ messages: [] }),
    }) as typeof fetch;

    const provider = new MetaWhatsappCloudProvider(
      new ConfigService({
        META_WHATSAPP_ACCESS_TOKEN: 'token-de-teste',
        META_WHATSAPP_PHONE_NUMBER_ID: '123456789',
        META_WHATSAPP_API_VERSION: 'vXX.X',
      }),
    );

    await expect(provider.enviarTexto('5583999999999', 'Ola!')).rejects.toThrow(
      'envio nao confirmado',
    );
  });
});
