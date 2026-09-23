import { INestApplication } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import request from 'supertest';
import type { Server } from 'node:net';

process.env.META_WHATSAPP_APP_SECRET = 'chat03-meta-app-secret';
process.env.META_WHATSAPP_VERIFY_TOKEN = 'chat03-meta-verify-token';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';

type WebhookResponseBody = Record<string, unknown>;

function asHttpApp(app: E2eContext['app']): INestApplication<Server> {
  return app as INestApplication<Server>;
}

function readSeedString(
  record: Record<string, unknown>,
  field: string,
): string {
  const value = record[field];

  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Fixture de webhook sem ${field} válido.`);
  }

  return value;
}

function readWebhookResponse(body: unknown): WebhookResponseBody {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    throw new Error('Resposta do webhook Meta não é um objeto JSON.');
  }

  return body as WebhookResponseBody;
}

describe('Meta WhatsApp webhook E2E', () => {
  let ctx: E2eContext;
  let httpApp: INestApplication<Server>;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    httpApp = asHttpApp(ctx.app);
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('valida challenge GET e rejeita token incorreto', async () => {
    await request(httpApp.getHttpServer())
      .get('/webhooks/meta/whatsapp')
      .query({
        'hub.mode': 'subscribe',
        'hub.verify_token': 'chat03-meta-verify-token',
        'hub.challenge': 'challenge-123',
      })
      .expect(200, 'challenge-123');

    await request(httpApp.getHttpServer())
      .get('/webhooks/meta/whatsapp')
      .query({
        'hub.mode': 'subscribe',
        'hub.verify_token': 'token-incorreto',
        'hub.challenge': 'challenge-123',
      })
      .expect(403);
  });

  it('valida assinatura, atualiza status e deduplica evento', async () => {
    const mensagem = await ctx.prisma.mensagemWhatsApp.create({
      data: {
        empresaId: readSeedString(ctx.seed.empresaA, 'id'),
        clienteId: readSeedString(ctx.seed.cliente, 'id'),
        tipo: 'SISTEMA',
        destinatario: '5511999999999',
        mensagem: 'Mensagem para teste de webhook Meta.',
        status: 'PENDENTE',
        metaMessageId: 'wamid.CHAT03.TESTE',
      },
    });
    const payload = {
      object: 'whatsapp_business_account',
      entry: [
        {
          id: 'waba-chat03',
          changes: [
            {
              field: 'messages',
              value: {
                statuses: [
                  {
                    id: 'wamid.CHAT03.TESTE',
                    status: 'delivered',
                    timestamp: '1760000000',
                  },
                ],
              },
            },
          ],
        },
      ],
    };
    const raw = JSON.stringify(payload);
    const signature =
      'sha256=' +
      createHmac('sha256', 'chat03-meta-app-secret').update(raw).digest('hex');

    const first = await request(httpApp.getHttpServer())
      .post('/webhooks/meta/whatsapp')
      .set('Content-Type', 'application/json')
      .set('x-hub-signature-256', signature)
      .send(raw)
      .expect(200);
    const firstBody = readWebhookResponse(first.body as unknown);
    expect(firstBody.received).toBe(true);
    expect(firstBody.duplicates).toBe(0);

    const duplicate = await request(httpApp.getHttpServer())
      .post('/webhooks/meta/whatsapp')
      .set('Content-Type', 'application/json')
      .set('x-hub-signature-256', signature)
      .send(raw)
      .expect(200);
    const duplicateBody = readWebhookResponse(duplicate.body as unknown);
    expect(duplicateBody.duplicates).toBe(1);

    await new Promise((resolve) => setTimeout(resolve, 150));
    const updated = await ctx.prisma.mensagemWhatsApp.findUnique({
      where: { id: mensagem.id },
    });
    expect(updated?.status).toBe('ENVIADA');
    expect(updated?.metaStatus).toBe('delivered');

    await request(httpApp.getHttpServer())
      .post('/webhooks/meta/whatsapp')
      .set('Content-Type', 'application/json')
      .set('x-hub-signature-256', 'sha256=invalid')
      .send(raw)
      .expect(401);
  });
});
