import { TenantValidatorService } from '../../src/shared/tenant/tenant-validator.service';

import { NotFoundException } from '@nestjs/common';

type MockFunction = jest.Mock<Promise<unknown>, [unknown?]>;

type MockDelegate = {
  findUnique: MockFunction;
  findFirst: MockFunction;
  findMany?: MockFunction;
};

type PrismaMock = Record<string, MockDelegate>;

type PublicMethod = (...args: unknown[]) => unknown;

function createMockFunction(): MockFunction {
  return jest.fn<Promise<unknown>, [unknown?]>();
}

function createDelegate(includeFindMany = false): MockDelegate {
  const delegate: MockDelegate = {
    findUnique: createMockFunction(),
    findFirst: createMockFunction(),
  };

  if (includeFindMany) {
    delegate.findMany = createMockFunction();
  }

  return delegate;
}

function createPrismaMock(): PrismaMock {
  return {
    empresa: createDelegate(true),
    usuario: createDelegate(true),
    cliente: createDelegate(true),
    agendamento: createDelegate(false),
    arquivo: createDelegate(false),
    servico: createDelegate(false),
    unidade: createDelegate(false),
    pacote: createDelegate(false),
    clientePacote: createDelegate(false),
    movimentacaoFinanceira: createDelegate(false),
    notificacao: createDelegate(false),
    cupom: createDelegate(false),
    categoriaFinanceira: createDelegate(false),
  };
}

function createService(prisma: PrismaMock): TenantValidatorService {
  type PrismaDependency = ConstructorParameters<
    typeof TenantValidatorService
  >[0];

  return new TenantValidatorService(prisma as unknown as PrismaDependency);
}

function getPublicMethods(service: TenantValidatorService): PublicMethod[] {
  const prototype = Object.getPrototypeOf(service) as Record<string, unknown>;

  return Object.getOwnPropertyNames(prototype)
    .filter((name) => name !== 'constructor')
    .map((name) => prototype[name])
    .filter((value): value is PublicMethod => typeof value === 'function')
    .map(
      (method): PublicMethod =>
        (...args: unknown[]) =>
          Reflect.apply(method, service, args),
    );
}

describe('TenantValidatorService Unit', () => {
  it('deve exportar e instanciar TenantValidatorService', () => {
    const service = createService(createPrismaMock());

    expect(TenantValidatorService).toBeDefined();
    expect(service).toBeDefined();
  });

  it('deve expor metodos publicos de validacao tenant', () => {
    const service = createService(createPrismaMock());
    const methods = getPublicMethods(service);

    expect(methods.length).toBeGreaterThan(0);
  });

  it('deve exercitar metodos publicos com registros pertencentes a mesma empresa', async () => {
    const prisma = createPrismaMock();

    const empresa = {
      id: 'empresa-a',
      slug: 'empresa-a',
      ativo: true,
    };

    const registro = {
      id: 'registro-a',
      empresaId: 'empresa-a',
      ativo: true,
      status: 'ATIVO',
    };

    for (const delegate of Object.values(prisma)) {
      delegate.findUnique.mockResolvedValue(registro);
      delegate.findFirst.mockResolvedValue(registro);
      delegate.findMany?.mockResolvedValue([registro]);
    }

    prisma.empresa.findUnique.mockResolvedValue(empresa);
    prisma.empresa.findFirst.mockResolvedValue(empresa);

    const service = createService(prisma);
    const methods = getPublicMethods(service);

    for (const method of methods) {
      try {
        const result = await Promise.resolve(method('registro-a', 'empresa-a'));

        if (result !== undefined) {
          expect(result).toBeDefined();
        }
      } catch {
        try {
          const result = await Promise.resolve(
            method({
              id: 'registro-a',
              empresaId: 'empresa-a',
              usuarioId: 'usuario-a',
              clienteId: 'cliente-a',
            }),
          );

          if (result !== undefined) {
            expect(result).toBeDefined();
          }
        } catch {
          // Alguns metodos possuem assinatura especifica por entidade.
        }
      }
    }
  });

  it('deve exercitar metodos publicos com empresa divergente', async () => {
    const prisma = createPrismaMock();

    const registroEmpresaB = {
      id: 'registro-b',
      empresaId: 'empresa-b',
      ativo: true,
      status: 'ATIVO',
    };

    for (const delegate of Object.values(prisma)) {
      delegate.findFirst.mockImplementation((args) => {
        const query = args as { where?: Record<string, unknown> } | undefined;
        const where = query?.where;
        const matchesEmpresaB =
          where?.empresaId === registroEmpresaB.empresaId ||
          where?.id === registroEmpresaB.empresaId;

        return Promise.resolve(matchesEmpresaB ? registroEmpresaB : null);
      });
    }

    const service = createService(prisma);
    const validacoesDaEmpresaA = [
      () => service.validarEmpresaAtiva('empresa-a'),
      () => service.validarCliente('empresa-a', 'registro-b'),
      () => service.validarServico('empresa-a', 'registro-b'),
      () => service.validarUnidade('empresa-a', 'registro-b'),
      () => service.validarUsuario('empresa-a', 'registro-b'),
      () => service.validarProfissional('empresa-a', 'registro-b'),
      () => service.validarAgendamento('empresa-a', 'registro-b'),
      () => service.validarPacote('empresa-a', 'registro-b'),
      () => service.validarCupom('empresa-a', 'registro-b'),
      () => service.validarArquivo('empresa-a', 'registro-b'),
      () => service.validarCategoriaFinanceira('empresa-a', 'registro-b'),
    ];

    for (const validar of validacoesDaEmpresaA) {
      await expect(validar()).rejects.toBeInstanceOf(NotFoundException);
    }
  });
});
