import { ForbiddenException, NotFoundException } from '@nestjs/common';

import { LgpdController } from '../../src/lgpd/lgpd.controller';
import { LgpdService } from '../../src/lgpd/lgpd.service';

type Chat36Matcher = {
  asymmetricMatch: (other: unknown) => boolean;
};
type Chat36MockFunction = jest.Mock<Promise<unknown>, [unknown?]>;
type Chat36Prisma = {
  cliente: {
    findFirst: Chat36MockFunction;
    update: Chat36MockFunction;
  };
  agendamento: {
    findMany: Chat36MockFunction;
  };
  mensagemWhatsApp: {
    findMany: Chat36MockFunction;
  };
  codigoAcessoCliente: {
    updateMany: Chat36MockFunction;
  };
  auditoriaSistema: {
    create: Chat36MockFunction;
  };
  notificacao?: Record<string, unknown>;
};
type Chat36Request = Parameters<LgpdService['exportarCliente']>[1] &
  Parameters<LgpdController['exportarCliente']>[1];
type Chat36ControllerService = ConstructorParameters<typeof LgpdController>[0];

function chat36IsMatcher(value: unknown): value is Chat36Matcher {
  return (
    typeof value === 'object' &&
    value !== null &&
    'asymmetricMatch' in value &&
    typeof value.asymmetricMatch === 'function'
  );
}

function chat36AsMatcher(value: unknown): Chat36Matcher {
  if (!chat36IsMatcher(value)) {
    throw new TypeError('Matcher Jest invalido');
  }
  return value;
}

function chat36ObjectContaining<T extends Record<string, unknown>>(
  value: T,
): Chat36Matcher {
  const matcher: unknown = expect.objectContaining(value);
  return chat36AsMatcher(matcher);
}

function chat36StringContaining(value: string): Chat36Matcher {
  const matcher: unknown = expect.stringContaining(value);
  return chat36AsMatcher(matcher);
}

function chat36StringMatching(value: RegExp): Chat36Matcher {
  const matcher: unknown = expect.stringMatching(value);
  return chat36AsMatcher(matcher);
}

describe('Chat 36 LGPD Coverage', () => {
  const clienteId = 'cliente-123456789';
  const empresaId = 'empresa-1';

  let prisma: Chat36Prisma;
  let service: LgpdService;

  const request: Chat36Request = {
    user: {
      id: 'usuario-1',
      empresa_id: empresaId,
      sub: 'usuario-1',
      usuarioId: 'usuario-1',
      clienteId,
      role: 'ADMIN',
      empresaId,
      tipoUsuario: 'ADMIN',
      email: 'admin@chat36.local',
      nome: 'Administrador Chat36',
    },
    ip: '127.0.0.1',
    originalUrl: '/lgpd/exportar-cliente/cliente-123456789',
    headers: {
      'user-agent': ['jest', 'chat36'],
    },
  };

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(1710000000123);

    prisma = {
      cliente: {
        findFirst: jest.fn(),
        update: jest.fn(),
      },
      agendamento: {
        findMany: jest.fn().mockResolvedValue([{ id: 'agendamento-1' }]),
      },
      notificacao: {
        findMany: jest.fn().mockResolvedValue([{ id: 'notificacao-1' }]),
      },
      mensagemWhatsApp: {
        findMany: jest.fn().mockResolvedValue([{ id: 'mensagem-1' }]),
      },
      fidelidade: {
        findMany: jest.fn().mockResolvedValue([{ id: 'fidelidade-1' }]),
      },
      clientePacote: {
        findMany: jest.fn().mockResolvedValue([{ id: 'cliente-pacote-1' }]),
      },
      sessaoPacote: {
        findMany: jest.fn().mockResolvedValue([{ id: 'sessao-pacote-1' }]),
      },
      movimentacaoFinanceira: {
        findMany: jest
          .fn()
          .mockResolvedValue([{ id: 'mov-fin-1', token: 'nao-exportar' }]),
      },
      arquivo: {
        findMany: jest
          .fn()
          .mockResolvedValue([
            { id: 'arquivo-1', refreshTokenHash: 'segredo' },
          ]),
      },
      sessao: {
        findMany: jest
          .fn()
          .mockResolvedValue([{ id: 'sessao-1', refreshTokenHash: 'segredo' }]),
      },
      codigoAcessoCliente: {
        updateMany: jest.fn().mockResolvedValue({ count: 2 }),
      },
      auditoriaSistema: {
        create: jest.fn().mockResolvedValue({ id: 'auditoria-1' }),
      },
    } as unknown as Chat36Prisma;

    service = new LgpdService(
      prisma as unknown as ConstructorParameters<typeof LgpdService>[0],
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function mockCliente(extra: Record<string, unknown> = {}) {
    return {
      id: clienteId,
      empresaId,
      nome: 'Cliente Teste',
      telefone: '83999999999',
      email: 'cliente@teste.local',
      cpf: '12345678901',
      dataNascimento: new Date('1990-01-01T00:00:00.000Z'),
      endereco: 'Rua Teste',
      observacoes: 'Observacao pessoal',
      senha: 'segredo',
      refreshToken: 'refresh-secret',
      refreshTokenHash: 'refresh-hash-secret',
      token: 'token-secret',
      codigoAcesso: '123456',
      codigoHash: 'codigo-hash-secret',
      ...extra,
    };
  }

  it('deve exportar dados LGPD removendo segredos tecnicos e registrando auditoria', async () => {
    prisma.cliente.findFirst.mockResolvedValue(mockCliente());

    const result = await service.exportarCliente(clienteId, request);

    expect(result.clienteId).toBe(clienteId);
    expect(result.empresaId).toBe(empresaId);
    expect(result.perfil.senha).toBeUndefined();
    expect(result.perfil.refreshToken).toBeUndefined();
    expect(result.perfil.refreshTokenHash).toBeUndefined();
    expect(result.perfil.token).toBeUndefined();
    expect(result.perfil.codigoAcesso).toBeUndefined();
    expect(result.perfil.codigoHash).toBeUndefined();
    expect(result.agendamentos).toHaveLength(1);
    expect(result.notificacoes).toHaveLength(1);
    expect(result.mensagensWhatsApp).toHaveLength(1);
    expect(result.pontos.fidelidade.fidelidade).toHaveLength(1);
    expect(result.pacotes.clientePacotes).toHaveLength(1);
    expect(result.pacotes.sessoesPacote).toHaveLength(1);
    expect(result.financeiro.movimentacaoFinanceira).toHaveLength(1);
    expect(result.arquivos[0].refreshTokenHash).toBeUndefined();
    expect(result.sessoes[0].refreshTokenHash).toBeUndefined();

    expect(prisma.auditoriaSistema.create).toHaveBeenCalledWith(
      chat36ObjectContaining({
        data: chat36ObjectContaining({
          empresaId,
          usuarioId: 'usuario-1',
          clienteId,
          acao: 'LGPD_EXPORTACAO',
          modulo: 'LGPD',
          userAgent: 'jest chat36',
          status: 'SUCESSO',
        }),
      }),
    );
  });

  it('deve exportar como SUPER_ADMIN buscando cliente apenas por id', async () => {
    prisma.cliente.findFirst.mockResolvedValue(mockCliente());

    await service.exportarCliente(clienteId, {
      ...request,
      user: { id: 'super-1', role: 'SUPER_ADMIN', empresaId: null },
      headers: { 'user-agent': 'jest-super' },
      url: '/lgpd/exportar-cliente/' + clienteId,
      originalUrl: undefined,
    });

    expect(prisma.cliente.findFirst).toHaveBeenCalledWith({
      where: { id: clienteId },
    });
  });

  it('deve usar fallback de findMany sem orderBy quando delegate falhar', async () => {
    prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    prisma.agendamento.findMany
      .mockRejectedValueOnce(new Error('orderBy invalido'))
      .mockResolvedValueOnce([{ id: 'agendamento-fallback' }]);

    const result = await service.exportarCliente(clienteId, request);

    expect(result.agendamentos).toEqual([{ id: 'agendamento-fallback' }]);
    expect(prisma.agendamento.findMany).toHaveBeenCalledTimes(2);
  });

  it('deve retornar arrays vazios quando delegates opcionais nao existirem ou falharem', async () => {
    prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    delete prisma.notificacao;
    prisma.mensagemWhatsApp.findMany.mockRejectedValue(
      new Error('indisponivel'),
    );

    const result = await service.exportarCliente(clienteId, request);

    expect(result.notificacoes).toEqual([]);
    expect(result.mensagensWhatsApp).toEqual([]);
  });

  it('deve anonimizar dados pessoais diretos preservando integridade operacional', async () => {
    prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    prisma.cliente.update.mockResolvedValue({
      id: clienteId,
      empresaId,
      nome: 'Cliente anonimizado cliente100123',
      telefone: 'anon-cliente100123',
      email: 'cliente-cliente100123@anonimizado.local',
      cpf: '00000000000',
      dataNascimento: new Date('1900-01-01T00:00:00.000Z'),
      endereco: 'ANONIMIZADO',
      observacoes: 'ANONIMIZADO',
    });

    const result = await service.anonimizarCliente(clienteId, request);

    expect(result.success).toBe(true);
    expect(result.camposAnonimizados).toEqual(
      expect.arrayContaining([
        'nome',
        'telefone',
        'email',
        'cpf',
        'dataNascimento',
        'endereco',
        'observacoes',
      ]),
    );
    expect(prisma.cliente.update).toHaveBeenCalledWith({
      where: { id: clienteId },
      data: chat36ObjectContaining({
        nome: chat36StringContaining('Cliente anonimizado'),
        telefone: chat36StringContaining('anon-'),
        email: chat36StringContaining('@anonimizado.local'),
        cpf: chat36StringMatching(/^[0-9]{11}$/),
        dataNascimento: new Date('1900-01-01T00:00:00.000Z'),
        endereco: 'ANONIMIZADO',
        observacoes: 'ANONIMIZADO',
      }),
    });
    expect(prisma.codigoAcessoCliente.updateMany).toHaveBeenCalledWith({
      where: { clienteId, empresaId },
      data: chat36ObjectContaining({
        codigo: 'HASHED',
        codigoHash: null,
        usado: true,
      }),
    });
    expect(prisma.auditoriaSistema.create).toHaveBeenCalledWith(
      chat36ObjectContaining({
        data: chat36ObjectContaining({
          acao: 'LGPD_ANONIMIZACAO',
          dadosAntes: chat36ObjectContaining({
            nome: '[REDACTED]',
            cpf: '[REDACTED]',
            dataNascimento: '[REDACTED]',
          }),
          dadosDepois: chat36ObjectContaining({
            email: '[REDACTED]',
            endereco: '[REDACTED]',
          }),
        }),
      }),
    );
  });

  it('deve manter operacao LGPD mesmo se auditoria falhar', async () => {
    prisma.cliente.findFirst.mockResolvedValue(mockCliente());
    prisma.cliente.update.mockResolvedValue(
      mockCliente({ nome: 'Cliente anonimizado' }),
    );
    prisma.auditoriaSistema.create.mockRejectedValue(
      new Error('auditoria indisponivel'),
    );

    await expect(
      service.anonimizarCliente(clienteId, request),
    ).resolves.toEqual(chat36ObjectContaining({ success: true, clienteId }));
  });

  it('deve lancar NotFoundException quando cliente nao existir', async () => {
    prisma.cliente.findFirst.mockResolvedValue(null);

    await expect(
      service.exportarCliente(clienteId, request),
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('deve lancar ForbiddenException quando cliente nao pertencer a empresa do usuario', async () => {
    prisma.cliente.findFirst.mockResolvedValue(
      mockCliente({ empresaId: 'empresa-errada' }),
    );

    await expect(
      service.exportarCliente(clienteId, request),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('deve lancar ForbiddenException quando nao houver campo anonimizavel', async () => {
    prisma.cliente.findFirst.mockResolvedValue({ id: clienteId, empresaId });

    await expect(
      service.anonimizarCliente(clienteId, request),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('controller deve delegar exportacao e anonimizacao para o service', async () => {
    const mockService = {
      exportarCliente: jest.fn().mockResolvedValue({ clienteId }),
      anonimizarCliente: jest.fn().mockResolvedValue({ success: true }),
    };

    const controller = new LgpdController(
      mockService as unknown as Chat36ControllerService,
    );

    await expect(
      controller.exportarCliente(clienteId, request),
    ).resolves.toEqual({ clienteId });
    await expect(
      controller.anonimizarCliente(clienteId, request),
    ).resolves.toEqual({ success: true });
    expect(mockService.exportarCliente).toHaveBeenCalledWith(
      clienteId,
      request,
    );
    expect(mockService.anonimizarCliente).toHaveBeenCalledWith(
      clienteId,
      request,
    );
  });
});
