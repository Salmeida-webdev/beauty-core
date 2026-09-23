import { BadRequestException } from '@nestjs/common';
import { StatusClientePacote } from '@prisma/client';

import { PrismaService } from '../../src/database/prisma/prisma.service';
import { AutomacoesService } from '../../src/modules/automacoes/automacoes.service';
import { AuditoriaService } from '../../src/modules/auditoria/auditoria.service';
import { ClientesPacotesService } from '../../src/modules/clientes-pacotes/clientes-pacotes.service';
import { TenantValidatorService } from '../../src/shared/tenant';

type ClientePacoteRecord = {
  id: string;
  empresaId: string;
  clienteId: string;
  pacoteId: string;
  sessoesTotal: number;
  sessoesUsadas: number;
  sessoesRestantes: number;
  dataValidade: Date | null;
  status: StatusClientePacote;
  cliente: { nome: string };
  pacote: { nome: string; quantidadeSessoes: number };
};

type QueryArgs = Record<string, unknown>;
type FindFirstMock = jest.MockedFunction<
  (args: QueryArgs) => Promise<ClientePacoteRecord | null>
>;
type UpdateManyArgs = {
  where: {
    id: string;
    empresaId: string;
    status: StatusClientePacote;
    sessoesRestantes?: { gt: number } | 0;
  };
  data: {
    sessoesUsadas?: { increment: number };
    sessoesRestantes?: { decrement: number };
    status?: StatusClientePacote;
  };
};
type UpdateManyMock = jest.MockedFunction<
  (args: UpdateManyArgs) => Promise<{ count: number }>
>;

type PrismaDouble = {
  clientePacote: {
    findFirst: FindFirstMock;
    updateMany: UpdateManyMock;
  };
};

type AutomacoesDouble = {
  processarEvento: jest.MockedFunction<
    (payload: Record<string, unknown>) => Promise<unknown>
  >;
};

type AuditoriaDouble = {
  registrarAtualizacao: jest.MockedFunction<
    (payload: Record<string, unknown>) => Promise<unknown>
  >;
};

type TenantDouble = {
  validarEmpresaAtiva: jest.MockedFunction<
    (empresaId: string) => Promise<unknown>
  >;
  validarCliente: jest.MockedFunction<
    (empresaId: string, clienteId: string) => Promise<unknown>
  >;
};

type ServiceDependencies = {
  prisma: PrismaDouble;
  automacoes: AutomacoesDouble;
  auditoria: AuditoriaDouble;
  tenant: TenantDouble;
};

function pacote(
  overrides: Partial<ClientePacoteRecord> = {},
): ClientePacoteRecord {
  return {
    id: 'cliente-pacote-1',
    empresaId: 'empresa-1',
    clienteId: 'cliente-1',
    pacoteId: 'pacote-1',
    sessoesTotal: 2,
    sessoesUsadas: 0,
    sessoesRestantes: 2,
    dataValidade: null,
    status: StatusClientePacote.ATIVO,
    cliente: { nome: 'Cliente' },
    pacote: { nome: 'Pacote', quantidadeSessoes: 2 },
    ...overrides,
  };
}

function createService(
  dependencies: ServiceDependencies,
): ClientesPacotesService {
  return new ClientesPacotesService(
    dependencies.prisma as unknown as PrismaService,
    dependencies.automacoes as unknown as AutomacoesService,
    dependencies.auditoria as unknown as AuditoriaService,
    dependencies.tenant as unknown as TenantValidatorService,
  );
}

function createSideEffectDoubles(): Pick<
  ServiceDependencies,
  'automacoes' | 'auditoria' | 'tenant'
> {
  return {
    automacoes: {
      processarEvento: jest
        .fn<
          ReturnType<AutomacoesDouble['processarEvento']>,
          Parameters<AutomacoesDouble['processarEvento']>
        >()
        .mockResolvedValue(undefined),
    },
    auditoria: {
      registrarAtualizacao: jest
        .fn<
          ReturnType<AuditoriaDouble['registrarAtualizacao']>,
          Parameters<AuditoriaDouble['registrarAtualizacao']>
        >()
        .mockResolvedValue(undefined),
    },
    tenant: {
      validarEmpresaAtiva: jest
        .fn<
          ReturnType<TenantDouble['validarEmpresaAtiva']>,
          Parameters<TenantDouble['validarEmpresaAtiva']>
        >()
        .mockResolvedValue(undefined),
      validarCliente: jest
        .fn<
          ReturnType<TenantDouble['validarCliente']>,
          Parameters<TenantDouble['validarCliente']>
        >()
        .mockResolvedValue(undefined),
    },
  };
}

describe('ClientesPacotesService atomic session consumption', () => {
  it('uses conditional increment/decrement and finalizes once', async () => {
    const initial = pacote({ sessoesRestantes: 1 });
    const updated = pacote({
      sessoesUsadas: 1,
      sessoesRestantes: 0,
      status: StatusClientePacote.FINALIZADO,
    });
    const prisma: PrismaDouble = {
      clientePacote: {
        findFirst: jest
          .fn<ReturnType<FindFirstMock>, Parameters<FindFirstMock>>()
          .mockResolvedValueOnce(initial)
          .mockResolvedValueOnce(updated)
          .mockResolvedValueOnce(updated),
        updateMany: jest
          .fn<ReturnType<UpdateManyMock>, Parameters<UpdateManyMock>>()
          .mockResolvedValueOnce({ count: 1 })
          .mockResolvedValueOnce({ count: 1 }),
      },
    };
    const sideEffects = createSideEffectDoubles();
    const service = createService({ prisma, ...sideEffects });

    await expect(
      service.usarSessao('empresa-1', 'cliente-pacote-1'),
    ).resolves.toEqual(updated);

    const [firstUpdate] = prisma.clientePacote.updateMany.mock.calls;

    if (!firstUpdate) {
      throw new Error('A atualização condicional do pacote não foi executada.');
    }

    expect(firstUpdate[0].where.empresaId).toBe('empresa-1');
    expect(firstUpdate[0].where.status).toBe(StatusClientePacote.ATIVO);
    expect(firstUpdate[0].where.sessoesRestantes).toEqual({ gt: 0 });
    expect(firstUpdate[0].data).toEqual({
      sessoesUsadas: { increment: 1 },
      sessoesRestantes: { decrement: 1 },
    });
    expect(sideEffects.automacoes.processarEvento).toHaveBeenCalledTimes(1);
  });

  it('rejects a losing concurrent update without decrementing again', async () => {
    const initial = pacote({ sessoesRestantes: 1 });
    const consumed = pacote({
      sessoesRestantes: 0,
      sessoesUsadas: 2,
      status: StatusClientePacote.FINALIZADO,
    });
    const prisma: PrismaDouble = {
      clientePacote: {
        findFirst: jest
          .fn<ReturnType<FindFirstMock>, Parameters<FindFirstMock>>()
          .mockResolvedValueOnce(initial)
          .mockResolvedValueOnce(consumed),
        updateMany: jest
          .fn<ReturnType<UpdateManyMock>, Parameters<UpdateManyMock>>()
          .mockResolvedValue({ count: 0 }),
      },
    };
    const sideEffects = createSideEffectDoubles();
    const service = createService({ prisma, ...sideEffects });

    await expect(
      service.usarSessao('empresa-1', 'cliente-pacote-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.clientePacote.updateMany).toHaveBeenCalledTimes(1);
  });
});
