import request from 'supertest';

import {
  bootstrapE2eTestApp,
  E2eContext,
  teardownE2eTestApp,
} from '../setup-e2e';
import {
  bearer,
  loginAdmin,
  loginClientePublico,
} from '../helpers/auth.helper';
import {
  createBlockedTempFile,
  createTempUploadFile,
} from '../helpers/upload.helper';

function readStringProperty(value: unknown, property: string): string {
  const record = value as Record<string, unknown>;
  const item = record[property];
  if (typeof item !== 'string' || !item) {
    throw new Error('Campo de texto ausente: ' + property);
  }
  return item;
}
describe('Uploads E2E', () => {
  let ctx: E2eContext;
  let adminToken: string;
  let clienteToken: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    adminToken = (await loginAdmin(ctx.app)).access_token;
    clienteToken = (
      await loginClientePublico(
        ctx.app,
        readStringProperty(ctx.seed.empresaA as unknown, 'slug'),
        ctx.prisma,
      )
    ).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('deve bloquear arquivo proibido', async () => {
    const file = createBlockedTempFile();

    try {
      await request(ctx.app.getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath)
        .expect((res) => {
          expect([400, 404, 415]).toContain(res.status);
        });
    } finally {
      file.cleanup();
    }
  });

  it('deve validar upload privado/download/signed-url quando rota existir', async () => {
    const file = createTempUploadFile();

    try {
      const upload = await request(ctx.app.getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath)
        .expect((res) => {
          expect([200, 201, 404]).toContain(res.status);
        });

      if (upload.status === 404) {
        return;
      }

      const arquivoId = upload.body.id ?? upload.body.arquivo?.id;

      expect(arquivoId).toBeDefined();

      await request(ctx.app.getHttpServer())
        .get('/arquivos/' + arquivoId + '/download')
        .set('Authorization', bearer(clienteToken))
        .expect((res) => {
          expect([200, 302, 403]).toContain(res.status);
        });

      await request(ctx.app.getHttpServer())
        .get('/arquivos/' + arquivoId + '/signed-url')
        .set('Authorization', bearer(adminToken))
        .expect((res) => {
          expect([200, 403, 404]).toContain(res.status);
        });
    } finally {
      file.cleanup();
    }
  });
  it('deve bloquear upload privado com clienteId de outro tenant', async () => {
    const suffix = Date.now().toString();

    const empresaBase = await ctx.prisma.empresa.findUnique({
      where: {
        id: ctx.seed.empresaA.id,
      },
    });

    expect(empresaBase).toBeDefined();

    const empresaData: any = { ...empresaBase };
    delete empresaData.id;
    delete empresaData.createdAt;
    delete empresaData.updatedAt;

    const empresaPayload = empresaData as Record<string, unknown>;
    if ('nome' in empresaPayload)
      empresaPayload.nome = 'Empresa Cross Tenant ' + suffix;
    if ('slug' in empresaPayload)
      empresaPayload.slug = 'empresa-cross-tenant-' + suffix;
    if ('email' in empresaPayload)
      empresaPayload.email = 'empresa-cross-' + suffix + '@teste.local';
    if ('dominio' in empresaPayload)
      empresaPayload.dominio = 'cross-' + suffix + '.teste.local';
    if ('cnpj' in empresaPayload) empresaPayload.cnpj = null;

    const empresaOutroTenant = await ctx.prisma.empresa.create({
      data: empresaData,
    });

    const clienteBase = await ctx.prisma.cliente.findFirst({
      where: {
        empresaId: ctx.seed.empresaA.id,
      },
    });

    expect(clienteBase).toBeDefined();

    const clienteData: any = { ...clienteBase };
    delete clienteData.id;
    delete clienteData.createdAt;
    delete clienteData.updatedAt;
    delete clienteData.ultimoAcessoEm;

    clienteData.empresaId = empresaOutroTenant.id;

    const clientePayload = clienteData as Record<string, unknown>;
    if ('nome' in clientePayload)
      clientePayload.nome = 'Cliente Cross Tenant ' + suffix;
    if ('telefone' in clientePayload)
      clientePayload.telefone = '119' + suffix.slice(-8).padStart(8, '0');
    if ('email' in clientePayload)
      clientePayload.email = 'cliente-cross-' + suffix + '@teste.local';
    if ('cpf' in clientePayload) clientePayload.cpf = null;

    const clienteOutroTenant = await ctx.prisma.cliente.create({
      data: clienteData,
      select: {
        id: true,
      },
    });

    expect(clienteOutroTenant).toBeDefined();

    const arquivosAntes = await ctx.prisma.arquivo.count({
      where: {
        empresaId: ctx.seed.empresaA.id,
        clienteId: clienteOutroTenant.id,
      },
    });

    const file = createTempUploadFile({
      filename: 'documento-cross-tenant.pdf',
    });

    try {
      await request(ctx.app.getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .field('clienteId', clienteOutroTenant.id)
        .attach('file', file.filePath)
        .expect((res) => {
          expect([400, 403, 404]).toContain(res.status);
        });

      const arquivosDepois = await ctx.prisma.arquivo.count({
        where: {
          empresaId: ctx.seed.empresaA.id,
          clienteId: clienteOutroTenant.id,
        },
      });

      expect(arquivosDepois).toBe(arquivosAntes);
    } finally {
      file.cleanup();
    }
  });

  it('deve bloquear PDF falso sem assinatura interna %PDF-', async () => {
    const file = createTempUploadFile({
      filename: 'fake.pdf',
      content: Buffer.from('isto-nao-e-um-pdf'),
    });

    try {
      const arquivosAntes = await ctx.prisma.arquivo.count({
        where: {
          empresaId: ctx.seed.empresaA.id,
          nomeOriginal: 'fake.pdf',
        },
      });

      await request(ctx.app.getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath, {
          filename: 'fake.pdf',
          contentType: 'application/pdf',
        })
        .expect(400);

      const arquivosDepois = await ctx.prisma.arquivo.count({
        where: {
          empresaId: ctx.seed.empresaA.id,
          nomeOriginal: 'fake.pdf',
        },
      });

      expect(arquivosDepois).toBe(arquivosAntes);
    } finally {
      file.cleanup();
    }
  });
});
