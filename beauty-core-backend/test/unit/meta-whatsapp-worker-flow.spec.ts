import {
  CanalWhatsApp,
  StatusMensagemWhatsApp,
} from '@prisma/client';

import { MensagensWhatsappService } from '../../src/modules/mensagens-whatsapp/mensagens-whatsapp.service';
import { MetaWhatsappProviderError } from '../../src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider';

const empresaId = 'empresa-chat03';
const mensagemId = 'mensagem-chat03';

function criarRegistro(status = StatusMensagemWhatsApp.PENDENTE) {
  return {
    id: mensagemId,
    empresaId,
    status,
    destinatario: '5511999999999',
    mensagem: 'Mensagem controlada Chat 03',
    erro: null,
  };
}

function criarService(options: {
  providerResult?: { messageId: string };
  providerError?: MetaWhatsappProviderError;
  finalStatus?: StatusMensagemWhatsApp;
}) {
  const initial = criarRegistro();
  const finalRecord = criarRegistro(
    options.finalStatus ?? StatusMensagemWhatsApp.ENVIADA,
  );
  const prisma = {
    mensagemWhatsApp: {
      findFirst: jest
        .fn()
        .mockResolvedValueOnce(initial)
        .mockResolvedValue(finalRecord),
      update: jest.fn().mockResolvedValue(finalRecord),
      updateMany: jest.fn().mockResolvedValue({ count: 1 }),
    },
    configuracaoWhatsApp: {
      findUnique: jest.fn().mockResolvedValue({
        ativo: true,
        usarModoDemonstracao: false,
        canal: CanalWhatsApp.API_OFICIAL,
      }),
    },
  };
  const provider = {
    enviarTexto: options.providerError
      ? jest.fn().mockRejectedValue(options.providerError)
      : jest
          .fn()
          .mockResolvedValue(options.providerResult ?? { messageId: 'wamid.TESTE' }),
  };
  const tenantValidator = {
    validarEmpresaAtiva: jest.fn().mockResolvedValue(undefined),
  };
  const auditoria = {
    registrarCriacao: jest.fn().mockResolvedValue(undefined),
  };

  return {
    service: new MensagensWhatsappService(
      prisma as never,
      auditoria as never,
      tenantValidator as never,
      provider as never,
    ),
    prisma,
    provider,
  };
}

describe('MensagensWhatsappService - fluxo Meta e worker', () => {
  it('persiste o messageId retornado pelo provider', async () => {
    const harness = criarService({ providerResult: { messageId: 'wamid.SUCESSO' } });

    await harness.service.processarMensagemEnfileirada(
      empresaId,
      mensagemId,
      '5511999999999',
      'Mensagem controlada Chat 03',
    );

    expect(harness.provider.enviarTexto).toHaveBeenCalledTimes(1);
    expect(harness.prisma.mensagemWhatsApp.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          status: StatusMensagemWhatsApp.ENVIADA,
          metaMessageId: 'wamid.SUCESSO',
          metaStatus: 'sent',
        }),
      }),
    );
  });

  it('nao relanca erro 4xx definitivo para novo retry do BullMQ', async () => {
    const harness = criarService({
      providerError: new MetaWhatsappProviderError('HTTP 400', false, 400),
      finalStatus: StatusMensagemWhatsApp.FALHOU,
    });

    const result = await harness.service.processarMensagemEnfileirada(
      empresaId,
      mensagemId,
      '5511999999999',
      'Mensagem controlada Chat 03',
    );

    expect(result.status).toBe(StatusMensagemWhatsApp.FALHOU);
    expect(harness.prisma.mensagemWhatsApp.updateMany).toHaveBeenCalledTimes(1);
  });

  it('relanca erro transitorio para permitir retry do BullMQ', async () => {
    const harness = criarService({
      providerError: new MetaWhatsappProviderError('HTTP 429', true, 429),
      finalStatus: StatusMensagemWhatsApp.FALHOU,
    });

    await expect(
      harness.service.processarMensagemEnfileirada(
        empresaId,
        mensagemId,
        '5511999999999',
        'Mensagem controlada Chat 03',
      ),
    ).rejects.toThrow('HTTP 429');
    expect(harness.prisma.mensagemWhatsApp.updateMany).toHaveBeenCalledTimes(1);
  });
});