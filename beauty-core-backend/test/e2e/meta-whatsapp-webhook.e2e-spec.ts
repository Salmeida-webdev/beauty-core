import request from 'supertest';
import { createHmac } from 'node:crypto';

process.env.META_WHATSAPP_APP_SECRET = 'chat03-meta-app-secret';
process.env.META_WHATSAPP_VERIFY_TOKEN = 'chat03-meta-verify-token';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';

describe('Meta WhatsApp webhook E2E', () => {
  let ctx: E2eContext;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('valida challenge GET e rejeita token incorreto', async () => {
    await request(ctx.app.getHttpServer())
      .get('/webhooks/meta/whatsapp')
      .query({
        'hub.mode': 'subscribe',
        'hub.verify_token': 'chat03-meta-verify-token',
        'hub.challenge': 'challenge-123',
      })
      .expect(200, 'challenge-123');

    await request(ctx.app.getHttpServer())
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
        empresaId: ctx.seed.empresaA.id,
        clienteId: ctx.seed.cliente.id,
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

    const first = await request(ctx.app.getHttpServer())
      .post('/webhooks/meta/whatsapp')
      .set('Content-Type', 'application/json')
      .set('x-hub-signature-256', signature)
      .send(raw)
      .expect(200);
    expect(first.body.received).toBe(true);
    expect(first.body.duplicates).toBe(0);

    const duplicate = await request(ctx.app.getHttpServer())
      .post('/webhooks/meta/whatsapp')
      .set('Content-Type', 'application/json')
      .set('x-hub-signature-256', signature)
      .send(raw)
      .expect(200);
    expect(duplicate.body.duplicates).toBe(1);

    await new Promise((resolve) => setTimeout(resolve, 150));
    const updated = await ctx.prisma.mensagemWhatsApp.findUnique({
      where: { id: mensagem.id },
    });
    expect(updated?.status).toBe('ENVIADA');
    expect(updated?.metaStatus).toBe('delivered');

    await request(ctx.app.getHttpServer())
      .post('/webhooks/meta/whatsapp')
      .set('Content-Type', 'application/json')
      .set('x-hub-signature-256', 'sha256=invalid')
      .send(raw)
      .expect(401);
  });
});
