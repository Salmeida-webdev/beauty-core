import request from 'supertest';
import { StatusMensagemWhatsApp } from '@prisma/client';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';

type QueueResponse = {
  processamento: string;
  queue: string;
  mensagemId: string;
  jobId: string;
};

function readQueueResponse(value: unknown): QueueResponse {
  const body = value as Record<string, unknown>;
  const getString = (key: string): string => {
    const item = body[key];
    if (typeof item !== 'string' || !item) {
      throw new Error('Resposta da fila invalida: ' + key);
    }
    return item;
  };
  return {
    processamento: getString('processamento'),
    queue: getString('queue'),
    mensagemId: getString('mensagemId'),
    jobId: getString('jobId'),
  };
}

function requestApp(app: unknown) {
  const application = app as {
    getHttpServer: () => Parameters<typeof request>[0];
  };
  return request(application.getHttpServer());
}
describe('WhatsApp queue demo E2E', () => {
  let ctx: E2eContext;
  let adminToken: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    adminToken = (await loginAdmin(ctx.app)).access_token;

    await requestApp(ctx.app)
      .post('/configuracao-whatsapp')
      .set('Authorization', bearer(adminToken))
      .send({
        ativo: true,
        canal: 'MODO_DEMONSTRACAO',
        numeroWhatsApp: '55839999990000',
        usarModoDemonstracao: true,
      })
      .expect(201);
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('enfileira, deduplica e processa a mensagem demo sem chamar provider externo', async () => {
    const payload = {
      tipo: 'SISTEMA',
      destinatario: '55839999990001',
      mensagem: 'Teste controlado da fila WhatsApp em modo demonstracao.',
    };

    const primeira = await requestApp(ctx.app)
      .post('/mensagens-whatsapp/enviar')
      .set('Authorization', bearer(adminToken))
      .send(payload)
      .expect(201);

    const segunda = await requestApp(ctx.app)
      .post('/mensagens-whatsapp/enviar')
      .set('Authorization', bearer(adminToken))
      .send(payload)
      .expect(201);

    const primeiraData = readQueueResponse(primeira.body as unknown);
    const segundaData = readQueueResponse(segunda.body as unknown);

    expect(primeiraData.processamento).toBe('assincrono');
    expect(primeiraData.queue).toBe('whatsapp');
    expect(primeiraData.mensagemId).toBeDefined();
    expect(primeiraData.jobId).toBeDefined();
    expect(segundaData.jobId).toBe(primeiraData.jobId);

    const mensagem = await esperarStatus(
      ctx,
      primeiraData.mensagemId,
      StatusMensagemWhatsApp.SIMULADA,
    );

    expect(mensagem.status).toBe(StatusMensagemWhatsApp.SIMULADA);
    expect(mensagem.erro).toBeNull();
    expect(mensagem.dataEnvio).not.toBeNull();
  });
});

async function esperarStatus(
  ctx: E2eContext,
  mensagemId: string,
  status: StatusMensagemWhatsApp,
) {
  for (let tentativa = 0; tentativa < 40; tentativa += 1) {
    const mensagem = await ctx.prisma.mensagemWhatsApp.findUnique({
      where: { id: mensagemId },
    });

    if (mensagem?.status === status) {
      return mensagem;
    }

    await new Promise((resolve) => setTimeout(resolve, 150));
  }

  throw new Error(`Mensagem ${mensagemId} nao alcancou o status ${status}.`);
}
