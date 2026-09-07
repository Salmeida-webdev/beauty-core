import { AgendamentosService } from '../../src/modules/agendamentos/agendamentos.service';

describe('AgendamentosService - opcoes seguras da agenda', () => {
  function createService() {
    const service = Object.create(
      AgendamentosService.prototype,
    ) as AgendamentosService;

    const tenantValidator = {
      validarEmpresaAtiva: jest.fn().mockResolvedValue(undefined),
    };

    const prisma = {
      usuario: {
        findMany: jest.fn(),
      },
      unidade: {
        findMany: jest.fn(),
      },
    };

    Object.assign(service as object, {
      tenantValidator,
      prisma,
    });

    return {
      service,
      tenantValidator,
      prisma,
    };
  }

  it('lista somente profissionais ativos do tenant com campos minimos', async () => {
    const { service, tenantValidator, prisma } = createService();

    prisma.usuario.findMany.mockResolvedValue([
      {
        id: 'profissional-1',
        nome: 'Ana',
      },
    ]);

    const result = await service.listarProfissionaisDisponiveis(
      'empresa-1',
      '  Ana  ',
    );

    expect(tenantValidator.validarEmpresaAtiva).toHaveBeenCalledWith(
      'empresa-1',
    );

    expect(prisma.usuario.findMany).toHaveBeenCalledWith({
      where: {
        empresaId: 'empresa-1',
        role: 'PROFISSIONAL',
        ativo: true,
        nome: {
          contains: 'Ana',
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        nome: 'asc',
      },
      take: 30,
    });

    expect(result).toEqual([
      {
        id: 'profissional-1',
        nome: 'Ana',
      },
    ]);
  });

  it('lista somente unidades ativas do tenant com campos minimos', async () => {
    const { service, tenantValidator, prisma } = createService();

    prisma.unidade.findMany.mockResolvedValue([
      {
        id: 'unidade-1',
        nome: 'Centro',
      },
    ]);

    const result = await service.listarUnidadesDisponiveis('empresa-1');

    expect(tenantValidator.validarEmpresaAtiva).toHaveBeenCalledWith(
      'empresa-1',
    );

    expect(prisma.unidade.findMany).toHaveBeenCalledWith({
      where: {
        empresaId: 'empresa-1',
        ativa: true,
      },
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        nome: 'asc',
      },
      take: 50,
    });

    expect(result).toEqual([
      {
        id: 'unidade-1',
        nome: 'Centro',
      },
    ]);
  });

  it('limita a busca de profissionais a cem caracteres', async () => {
    const { service, prisma } = createService();

    prisma.usuario.findMany.mockResolvedValue([]);

    await service.listarProfissionaisDisponiveis('empresa-1', 'A'.repeat(150));

    expect(prisma.usuario.findMany).toHaveBeenCalledWith({
      where: {
        empresaId: 'empresa-1',
        role: 'PROFISSIONAL',
        ativo: true,
        nome: {
          contains: 'A'.repeat(100),
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        nome: true,
      },
      orderBy: {
        nome: 'asc',
      },
      take: 30,
    });
  });
});
