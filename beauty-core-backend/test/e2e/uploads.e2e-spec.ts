import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { Server } from 'node:net';

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

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readStringProperty(value: unknown, property: string): string {
  if (!isRecord(value)) {
    throw new Error('Esperado objeto ao ler o campo: ' + property);
  }

  const item = value[property];
  if (typeof item !== 'string' || item.length === 0) {
    throw new Error('Campo de texto ausente: ' + property);
  }

  return item;
}

function readUploadedFileId(value: unknown): string {
  if (!isRecord(value)) {
    throw new Error('A resposta do upload não contém um objeto de arquivo.');
  }

  const directId = value.id;
  if (typeof directId === 'string' && directId.length > 0) {
    return directId;
  }

  const nestedFile = value.arquivo;
  if (isRecord(nestedFile)) {
    const nestedId = nestedFile.id;
    if (typeof nestedId === 'string' && nestedId.length > 0) {
      return nestedId;
    }
  }

  throw new Error('A resposta do upload não contém um id de arquivo válido.');
}

function getHttpApp(context: E2eContext): INestApplication<Server> {
  return context.app as INestApplication<Server>;
}

function getEmpresaSeed(context: E2eContext): { id: string; slug: string } {
  const { id, slug } = context.seed.empresaA;

  if (typeof id !== 'string' || typeof slug !== 'string') {
    throw new Error('A seed da empresa A não contém id e slug válidos.');
  }

  return { id, slug };
}

describe('Uploads E2E', () => {
  let ctx: E2eContext;
  let adminToken: string;
  let clienteToken: string;

  beforeAll(async () => {
    ctx = await bootstrapE2eTestApp();
    const empresa = getEmpresaSeed(ctx);
    adminToken = (await loginAdmin(getHttpApp(ctx))).access_token;
    clienteToken = (
      await loginClientePublico(getHttpApp(ctx), empresa.slug, ctx.prisma)
    ).access_token;
  });

  afterAll(async () => {
    await teardownE2eTestApp(ctx);
  });

  it('deve bloquear arquivo proibido', async () => {
    const file = createBlockedTempFile();

    try {
      await request(getHttpApp(ctx).getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath)
        .expect(400);
    } finally {
      file.cleanup();
    }
  });

  it('deve validar upload privado, download protegido e URL assinada', async () => {
    const file = createTempUploadFile();

    try {
      const upload = await request(getHttpApp(ctx).getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath)
        .expect(201);
      const arquivoId = readUploadedFileId(upload.body);

      await request(getHttpApp(ctx).getHttpServer())
        .get(`/arquivos/${arquivoId}/download`)
        .set('Authorization', bearer(adminToken))
        .expect('Content-Type', /application\/pdf/)
        .expect(200);

      await request(getHttpApp(ctx).getHttpServer())
        .get(`/arquivos/${arquivoId}/download`)
        .set('Authorization', bearer(clienteToken))
        .expect(403);

      const signedUrlResponse = await request(getHttpApp(ctx).getHttpServer())
        .get(`/arquivos/${arquivoId}/signed-url`)
        .set('Authorization', bearer(adminToken))
        .expect(200);
      const signedUrlBody: unknown = signedUrlResponse.body;
      const signedUrl = readStringProperty(signedUrlBody, 'url');
      const expiresIn = isRecord(signedUrlBody)
        ? signedUrlBody.expiresIn
        : undefined;

      expect(signedUrl).toMatch(/^\/arquivos\/signed\//);
      expect(typeof expiresIn).toBe('number');
      if (typeof expiresIn !== 'number') {
        throw new Error('A URL assinada não informa o prazo de expiração.');
      }
      expect(expiresIn).toBeGreaterThan(0);
    } finally {
      file.cleanup();
    }
  });

  it('deve bloquear upload privado com clienteId de outro tenant', async () => {
    const empresa = getEmpresaSeed(ctx);
    const suffix = Date.now().toString();
    const empresaOutroTenant = await ctx.prisma.empresa.create({
      data: {
        nome: 'Empresa Cross Tenant ' + suffix,
        slug: 'empresa-cross-tenant-' + suffix,
      },
    });
    const clienteOutroTenant = await ctx.prisma.cliente.create({
      data: {
        empresaId: empresaOutroTenant.id,
        nome: 'Cliente Cross Tenant ' + suffix,
        telefone: '119' + suffix.slice(-8).padStart(8, '0'),
        email: 'cliente-cross-' + suffix + '@teste.local',
      },
      select: {
        id: true,
      },
    });

    const arquivosAntes = await ctx.prisma.arquivo.count({
      where: {
        empresaId: empresa.id,
        clienteId: clienteOutroTenant.id,
      },
    });
    const file = createTempUploadFile({
      filename: 'documento-cross-tenant.pdf',
    });

    try {
      await request(getHttpApp(ctx).getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .field('clienteId', clienteOutroTenant.id)
        .attach('file', file.filePath)
        .expect(404);

      const arquivosDepois = await ctx.prisma.arquivo.count({
        where: {
          empresaId: empresa.id,
          clienteId: clienteOutroTenant.id,
        },
      });

      expect(arquivosDepois).toBe(arquivosAntes);
    } finally {
      file.cleanup();
    }
  });

  it('deve bloquear PDF falso sem assinatura interna %PDF-', async () => {
    const empresa = getEmpresaSeed(ctx);
    const file = createTempUploadFile({
      filename: 'fake.pdf',
      content: Buffer.from('isto-nao-e-um-pdf'),
    });

    try {
      const arquivosAntes = await ctx.prisma.arquivo.count({
        where: {
          empresaId: empresa.id,
          nomeOriginal: 'fake.pdf',
        },
      });

      await request(getHttpApp(ctx).getHttpServer())
        .post('/arquivos/private/documentos')
        .set('Authorization', bearer(adminToken))
        .attach('file', file.filePath, {
          filename: 'fake.pdf',
          contentType: 'application/pdf',
        })
        .expect(400);

      const arquivosDepois = await ctx.prisma.arquivo.count({
        where: {
          empresaId: empresa.id,
          nomeOriginal: 'fake.pdf',
        },
      });

      expect(arquivosDepois).toBe(arquivosAntes);
    } finally {
      file.cleanup();
    }
  });
});
