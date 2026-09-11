import { BadRequestException } from '@nestjs/common';

import { ClientesPacotesService } from '../../src/modules/clientes-pacotes/clientes-pacotes.service';

const pacote = (overrides: Record<string, unknown> = {}) => ({
  id: 'cliente-pacote-1',
  empresaId: 'empresa-1',
  clienteId: 'cliente-1',
  pacoteId: 'pacote-1',
  sessoesTotal: 2,
  sessoesUsadas: 0,
  sessoesRestantes: 2,
  dataValidade: null,
  status: 'ATIVO',
  cliente: { nome: 'Cliente' },
  pacote: { nome: 'Pacote', quantidadeSessoes: 2 },
  ...overrides,
});

describe('ClientesPacotesService atomic session consumption', () => {
  it('uses conditional increment/decrement and finalizes once', async () => {
    const initial = pacote({ sessoesRestantes: 1 });
    const updated = pacote({
      sessoesUsadas: 1,
      sessoesRestantes: 0,
      status: 'FINALIZADO',
    });
    const prisma = {
      clientePacote: {
        findFirst: jest
          .fn()
          .mockResolvedValueOnce(initial)
          .mockResolvedValueOnce(updated)
          .mockResolvedValueOnce(updated),
        updateMany: jest
          .fn()
          .mockResolvedValueOnce({ count: 1 })
          .mockResolvedValueOnce({ count: 1 }),
      },
    };
    const automacoes = { processarEvento: jest.fn() };
    const auditoria = { registrarAtualizacao: jest.fn() };
    const tenant = {
      validarEmpresaAtiva: jest.fn(),
      validarCliente: jest.fn(),
    };
    const service = new ClientesPacotesService(
      prisma as any,
      automacoes as any,
      auditoria as any,
      tenant as any,
    );

    await expect(
      service.usarSessao('empresa-1', 'cliente-pacote-1'),
    ).resolves.toEqual(updated);

    expect(prisma.clientePacote.updateMany).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        where: expect.objectContaining({
          empresaId: 'empresa-1',
          status: 'ATIVO',
          sessoesRestantes: { gt: 0 },
        }),
        data: {
          sessoesUsadas: { increment: 1 },
          sessoesRestantes: { decrement: 1 },
        },
      }),
    );
    expect(automacoes.processarEvento).toHaveBeenCalledTimes(1);
  });

  it('rejects a losing concurrent update without decrementing again', async () => {
    const initial = pacote({ sessoesRestantes: 1 });
    const consumed = pacote({
      sessoesRestantes: 0,
      sessoesUsadas: 2,
      status: 'FINALIZADO',
    });
    const prisma = {
      clientePacote: {
        findFirst: jest
          .fn()
          .mockResolvedValueOnce(initial)
          .mockResolvedValueOnce(consumed),
        updateMany: jest.fn().mockResolvedValue({ count: 0 }),
      },
    };
    const service = new ClientesPacotesService(
      prisma as any,
      { processarEvento: jest.fn() } as any,
      { registrarAtualizacao: jest.fn() } as any,
      { validarEmpresaAtiva: jest.fn(), validarCliente: jest.fn() } as any,
    );

    await expect(
      service.usarSessao('empresa-1', 'cliente-pacote-1'),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.clientePacote.updateMany).toHaveBeenCalledTimes(1);
  });
});
