import request from 'supertest';

import { bootstrapE2eTestApp, E2eContext, teardownE2eTestApp } from '../setup-e2e';
import { bearer, loginAdmin } from '../helpers/auth.helper';

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown, label: string): JsonRecord {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new Error(label + ' nao e um objeto JSON.');
  }
  return value as JsonRecord;
}

function property(value: unknown, key: string): unknown {
  return asRecord(value, 'valor')[key];
}

function requiredString(value: unknown, key: string): string {
  const result = property(value, key);
  if (typeof result !== 'string' || result.length === 0) {
    throw new Error('Propriedade textual ausente: ' + key);
  }
  return result;
}

function expectNoTechnicalSecrets(value: unknown): void {
  const record = asRecord(value, 'perfil');
  for (const key of [
    'senha', 'password', 'refreshToken', 'refreshTokenHash', 'token',
    'accessToken', 'codigo', 'codigoHash', 'otp', 'secret',
    'clientSecret', 'apiKey', 'authorization',
  ]) {
    expect(record[key]).toBeUndefined();
  }
}

describe('LGPD runtime HTTP E2E', () => {
  let ctx: E2eContext;
  let adminToken: string;
  let clienteId: string;
  let originalName: string;
  let originalEmail: string;
  let originalPhone: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    adminToken = (await loginAdmin(ctx.app)).access_token;
    const cliente = property(ctx.seed as unknown, 'cliente');
    clienteId = requiredString(cliente, 'id');
    originalName = requiredString(cliente, 'nome');
    originalEmail = requiredString(cliente, 'email');
    originalPhone = requiredString(cliente, 'telefone');
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('exporta dados sem segredos tecnicos', async () => {
    const response = await request(ctx.app.getHttpServer())
      .get('/lgpd/exportar-cliente/' + clienteId)
      .set('Authorization', bearer(adminToken));

    expect(response.status).toBe(200);
    const body = asRecord(response.body as unknown, 'exportacao');
    expect(property(body, 'clienteId')).toBe(clienteId);
    expect(property(body, 'empresaId')).toBeDefined();
    expectNoTechnicalSecrets(property(body, 'perfil'));
    expect(Array.isArray(property(body, 'agendamentos'))).toBe(true);
    expect(Array.isArray(property(body, 'notificacoes'))).toBe(true);
    expect(Array.isArray(property(body, 'mensagensWhatsApp'))).toBe(true);
  });

  it('anonimiza dados pessoais e preserva auditoria', async () => {
    const auditBefore = await ctx.prisma.auditoriaSistema.count();
    const response = await request(ctx.app.getHttpServer())
      .post('/lgpd/anonimizar-cliente/' + clienteId)
      .set('Authorization', bearer(adminToken));

    expect([200, 201]).toContain(response.status);
    expect(property(asRecord(response.body as unknown, 'anonimizacao'), 'success')).toBe(true);

    const clienteDepois = await ctx.prisma.cliente.findUnique({ where: { id: clienteId } });
    expect(clienteDepois).not.toBeNull();
    const after = clienteDepois as unknown as JsonRecord;
    expect(requiredString(after, 'nome')).not.toBe(originalName);
    expect(requiredString(after, 'email')).not.toBe(originalEmail);
    expect(requiredString(after, 'telefone')).not.toBe(originalPhone);

    const auditAfter = await ctx.prisma.auditoriaSistema.count();
    expect(auditAfter).toBeGreaterThanOrEqual(auditBefore + 1);

    const exportAfter = await request(ctx.app.getHttpServer())
      .get('/lgpd/exportar-cliente/' + clienteId)
      .set('Authorization', bearer(adminToken));
    expect(exportAfter.status).toBe(200);
    expectNoTechnicalSecrets(
      property(asRecord(exportAfter.body as unknown, 'exportacao apos anonimizacao'), 'perfil'),
    );
  });
});

// CHAT03_LGPD_RUNTIME_E2E_V1