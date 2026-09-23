import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PlanoEmpresa, type Cliente, type Empresa } from '@prisma/client';
import { TenantPublicService } from '../../src/shared/tenant/tenant-public.service';
import { TenantValidatorService } from '../../src/shared/tenant/tenant-validator.service';
import { PrismaService as AppPrismaService } from '../../src/database/prisma/prisma.service';

function createEmpresa(): Empresa {
  const now = new Date('2026-09-22T00:00:00.000Z');

  return {
    id: 'empresa-a',
    nome: 'Empresa A',
    slug: 'empresa-a',
    telefone: null,
    email: 'empresa-a@example.com',
    logo: null,
    corPrimaria: null,
    dominio: 'empresa-a.example.com',
    plano: PlanoEmpresa.STARTER,
    ativo: true,
    createdAt: now,
    updatedAt: now,
  };
}

function createCliente(): Cliente {
  const now = new Date('2026-09-22T00:00:00.000Z');

  return {
    id: 'cliente-a',
    empresaId: 'empresa-a',
    nome: 'Cliente A',
    telefone: '83999990000',
    email: 'cliente-a@example.com',
    foto: null,
    dataNascimento: null,
    observacoes: null,
    ativo: true,
    ultimoAcessoPortal: null,
    aceitouTermos: true,
    dataAceiteTermos: now,
    ativoPortal: true,
    createdAt: now,
    updatedAt: now,
  };
}

describe('Beauty Core tenant services coverage', () => {
  let prisma: AppPrismaService;

  beforeEach(() => {
    prisma = new AppPrismaService();
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('resolves a public tenant using a normalized slug', async () => {
    const empresa = createEmpresa();
    const findFirst = jest
      .spyOn(prisma.empresa, 'findFirst')
      .mockResolvedValue(empresa);
    const service = new TenantPublicService(prisma);

    await expect(
      service.resolverTenantPublico({ slug: '  EMPRESA-A  ' }),
    ).resolves.toEqual({
      empresaId: 'empresa-a',
      nome: 'Empresa A',
      slug: 'empresa-a',
      dominio: 'empresa-a.example.com',
      logo: null,
      plano: PlanoEmpresa.STARTER,
      ativo: true,
    });
    expect(findFirst).toHaveBeenCalledWith({
      where: { slug: 'empresa-a', ativo: true },
      select: {
        id: true,
        nome: true,
        slug: true,
        dominio: true,
        logo: true,
        plano: true,
        ativo: true,
      },
    });
  });

  it('rejects an unresolved tenant and a request without locator', async () => {
    jest.spyOn(prisma.empresa, 'findFirst').mockResolvedValue(null);
    const service = new TenantPublicService(prisma);

    await expect(
      service.resolverPorDominio('missing.example.com'),
    ).rejects.toBeInstanceOf(NotFoundException);
    await expect(service.resolverTenantPublico({})).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('validates active companies and clients within the same tenant', async () => {
    const empresa = createEmpresa();
    const cliente = createCliente();
    jest.spyOn(prisma.empresa, 'findFirst').mockResolvedValue(empresa);
    jest.spyOn(prisma.cliente, 'findFirst').mockResolvedValue(cliente);
    const service = new TenantValidatorService(prisma);

    await expect(service.validarEmpresaAtiva('empresa-a')).resolves.toEqual(
      empresa,
    );
    await expect(
      service.validarCliente('empresa-a', 'cliente-a'),
    ).resolves.toEqual(cliente);
  });

  it('rejects missing identifiers and resources outside the tenant', async () => {
    const empresaFindFirst = jest
      .spyOn(prisma.empresa, 'findFirst')
      .mockResolvedValue(null);
    const clienteFindFirst = jest
      .spyOn(prisma.cliente, 'findFirst')
      .mockResolvedValue(null);
    const service = new TenantValidatorService(prisma);

    await expect(service.validarEmpresaAtiva('')).rejects.toBeInstanceOf(
      BadRequestException,
    );
    await expect(
      service.validarCliente('empresa-a', 'cliente-b'),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(empresaFindFirst).not.toHaveBeenCalled();
    expect(clienteFindFirst).toHaveBeenCalledWith({
      where: { id: 'cliente-b', empresaId: 'empresa-a', ativo: true },
      select: {
        id: true,
        empresaId: true,
        nome: true,
        telefone: true,
        email: true,
        ativo: true,
        ativoPortal: true,
        foto: true,
        dataNascimento: true,
        observacoes: true,
      },
    });
  });
});
