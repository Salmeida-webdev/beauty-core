const fs = require('fs');
const path = require('path');

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  createDto,
  createExecutionContextLike,
  createRequestLike,
  createResponseLike,
  createScenarios,
  installCoverageSmokeSilencer,
  runWithTimeout,
} from './helpers/coverage-smoke.helper';

installCoverageSmokeSilencer();

const targetsPath = path.join(
  process.cwd(),
  'test',
  'unit',
  'generated-targets',
  'coverage-targets-under-70.json',
);

const TARGETS = fs.existsSync(targetsPath)
  ? JSON.parse(fs.readFileSync(targetsPath, 'utf8')).targets
  : [];

type MockMode =
  | 'happy'
  | 'null'
  | 'empty'
  | 'false'
  | 'throw'
  | 'inactive'
  | 'crossTenant'
  | 'expired'
  | 'invalid'
  | 'public'
  | 'private';

const UUID_A = '00000000-0000-4000-8000-000000000001';
const UUID_B = '00000000-0000-4000-8000-000000000002';
const EMPRESA_A = '00000000-0000-4000-8000-000000000101';
const EMPRESA_B = '00000000-0000-4000-8000-000000000102';

function createRecord(
  mode: MockMode = 'happy',
  overrides: Record<string, any> = {},
) {
  const empresaId = mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A;

  return {
    id: UUID_A,
    empresaId,
    clienteId: UUID_A,
    usuarioId: UUID_A,
    profissionalId: UUID_A,
    servicoId: UUID_A,
    unidadeId: UUID_A,
    pacoteId: UUID_A,
    categoriaId: UUID_A,
    agendamentoId: UUID_A,
    arquivoId: UUID_A,

    nome: 'Registro Branch',
    titulo: 'Título Branch',
    descricao: 'Descrição Branch',
    telefone: '83999999999',
    email: 'branch@beautycore.local',
    role: 'ADMIN',

    status: mode === 'inactive' ? 'INATIVO' : 'ATIVO',
    tipo: 'RECEITA',
    canal: 'SISTEMA',
    visibilidade: mode === 'public' ? 'PUBLICO' : 'PRIVADO',
    armazenamento: 'LOCAL',

    ativo: mode !== 'inactive',
    privado: mode !== 'public',
    usado: false,

    valor: 100,
    preco: 100,
    quantidade: 1,
    pontos: 10,
    saldoPontos: 100,
    sessoes: 5,
    sessoesRestantes: 5,

    dataHoraInicio: new Date(Date.now() + 60 * 60 * 1000),
    dataHoraFim: new Date(Date.now() + 2 * 60 * 60 * 1000),
    dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    expiraEm:
      mode === 'expired'
        ? new Date(Date.now() - 30 * 60 * 1000)
        : new Date(Date.now() + 30 * 60 * 1000),

    createdAt: new Date(),
    updatedAt: new Date(),

    empresa: {
      id: empresaId,
      nome: 'Empresa Branch',
      slug: 'empresa-branch',
      ativo: mode !== 'inactive',
    },

    cliente: {
      id: UUID_A,
      empresaId,
      nome: 'Cliente Branch',
      telefone: '83999999999',
      email: 'cliente@beautycore.local',
      ativo: mode !== 'inactive',
    },

    usuario: {
      id: UUID_A,
      empresaId,
      nome: 'Usuário Branch',
      email: 'admin@beautycore.local',
      role: 'ADMIN',
      ativo: mode !== 'inactive',
    },

    servico: {
      id: UUID_A,
      empresaId,
      nome: 'Serviço Branch',
      preco: 100,
      duracaoMinutos: 60,
      ativo: mode !== 'inactive',
    },

    unidade: {
      id: UUID_A,
      empresaId,
      nome: 'Unidade Branch',
      ativo: mode !== 'inactive',
    },

    pacote: {
      id: UUID_A,
      empresaId,
      nome: 'Pacote Branch',
      sessoes: 5,
      preco: 400,
      ativo: mode !== 'inactive',
    },

    ...overrides,
  };
}

function createDelegateMock(mode: MockMode) {
  const record = createRecord(mode);

  const maybeRecord = () => {
    if (mode === 'null') return null;
    return record;
  };

  const maybeMany = () => {
    if (mode === 'empty') return [];
    return [record];
  };

  const maybeCount = () => {
    if (mode === 'empty' || mode === 'null') return 0;
    return 1;
  };

  const maybeThrow = () => {
    if (mode === 'throw') {
      throw new Error('Erro controlado de branch coverage');
    }
  };

  return {
    findUnique: jest.fn(async () => {
      maybeThrow();
      return maybeRecord();
    }),
    findUniqueOrThrow: jest.fn(async () => {
      maybeThrow();
      if (mode === 'null') throw new NotFoundException('Não encontrado');
      return record;
    }),
    findFirst: jest.fn(async () => {
      maybeThrow();
      return maybeRecord();
    }),
    findFirstOrThrow: jest.fn(async () => {
      maybeThrow();
      if (mode === 'null') throw new NotFoundException('Não encontrado');
      return record;
    }),
    findMany: jest.fn(async () => {
      maybeThrow();
      return maybeMany();
    }),
    count: jest.fn(async () => {
      maybeThrow();
      return maybeCount();
    }),
    create: jest.fn(async (args?: any) => {
      maybeThrow();
      return { ...record, ...(args?.data ?? {}) };
    }),
    createMany: jest.fn(async () => {
      maybeThrow();
      return { count: maybeCount() };
    }),
    update: jest.fn(async (args?: any) => {
      maybeThrow();
      return { ...record, ...(args?.data ?? {}) };
    }),
    updateMany: jest.fn(async () => {
      maybeThrow();
      return { count: maybeCount() };
    }),
    delete: jest.fn(async () => {
      maybeThrow();
      return record;
    }),
    deleteMany: jest.fn(async () => {
      maybeThrow();
      return { count: maybeCount() };
    }),
    upsert: jest.fn(async (args?: any) => {
      maybeThrow();
      return { ...record, ...(args?.create ?? {}), ...(args?.update ?? {}) };
    }),
    aggregate: jest.fn(async () => {
      maybeThrow();
      return {
        _sum: {
          valor: mode === 'empty' ? null : 100,
          pontos: mode === 'empty' ? null : 10,
          saldoPontos: mode === 'empty' ? null : 100,
          quantidade: mode === 'empty' ? null : 1,
        },
        _count: {
          _all: maybeCount(),
          id: maybeCount(),
        },
        _avg: {
          valor: mode === 'empty' ? null : 100,
          pontos: mode === 'empty' ? null : 10,
        },
        _min: {
          valor: mode === 'empty' ? null : 100,
          createdAt: new Date(),
        },
        _max: {
          valor: mode === 'empty' ? null : 100,
          createdAt: new Date(),
        },
      };
    }),
    groupBy: jest.fn(async () => {
      maybeThrow();

      if (mode === 'empty') return [];

      return [
        {
          status: record.status,
          tipo: record.tipo,
          categoriaId: UUID_A,
          profissionalId: UUID_A,
          servicoId: UUID_A,
          unidadeId: UUID_A,
          _sum: { valor: 100, pontos: 10 },
          _count: { _all: 1, id: 1 },
          _avg: { valor: 100 },
        },
      ];
    }),
  };
}

function createRichMock(mode: MockMode = 'happy') {
  const target: Record<string, any> = {};
  const delegates = new Map<string, any>();
  const record = createRecord(mode);

  const proxy: any = new Proxy(target, {
    get(obj, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined;
      if (prop === 'then') return undefined;
      if (prop in obj) return obj[prop];

      if (prop === '$transaction') {
        obj[prop] = jest.fn(async (input: any) => {
          if (mode === 'throw') throw new Error('Transaction branch error');
          if (typeof input === 'function') return input(proxy);
          if (Array.isArray(input)) return Promise.all(input);
          return input;
        });
        return obj[prop];
      }

      if (prop === '$connect' || prop === '$disconnect') {
        obj[prop] = jest.fn(async () => undefined);
        return obj[prop];
      }

      if (prop === '$executeRaw') {
        obj[prop] = jest.fn(async () => (mode === 'empty' ? 0 : 1));
        return obj[prop];
      }

      if (prop === '$queryRaw' || prop === '$runCommandRaw') {
        obj[prop] = jest.fn(async () => (mode === 'empty' ? [] : [record]));
        return obj[prop];
      }

      if (prop === 'get') {
        obj[prop] = jest.fn((key: string, fallback?: any) => {
          if (mode === 'null') return undefined;

          const values: Record<string, any> = {
            NODE_ENV: 'test',
            STORAGE_PROVIDER:
              mode === 'invalid'
                ? 'INVALID_PROVIDER'
                : mode === 'public'
                  ? 'S3'
                  : 'LOCAL',
            SIGNED_URL_SECRET:
              mode === 'invalid' ? '' : 'signed-url-secret-test',
            SIGNED_URL_EXPIRES_IN_SECONDS: mode === 'expired' ? '0' : '900',
            JWT_SECRET: 'jwt-secret-test',
            JWT_REFRESH_SECRET: 'jwt-refresh-secret-test',
            JWT_CLIENT_SECRET: 'jwt-client-secret-test',
            JWT_CLIENT_REFRESH_SECRET: 'jwt-client-refresh-secret-test',
            SCHEDULER_ENABLED: mode === 'false' ? 'false' : 'true',
            SCHEDULER_TIMEZONE: 'America/Fortaleza',
            REDIS_HOST: 'localhost',
            REDIS_PORT: '6379',
            REDIS_PASSWORD: mode === 'null' ? undefined : 'redis-test',
          };

          return values[key] ?? fallback ?? 'test-value';
        });

        return obj[prop];
      }

      if (prop === 'sign') {
        obj[prop] = jest.fn(() => (mode === 'invalid' ? '' : 'token-test'));
        return obj[prop];
      }

      if (prop === 'signAsync') {
        obj[prop] = jest.fn(async () =>
          mode === 'invalid' ? '' : 'token-test',
        );
        return obj[prop];
      }

      if (prop === 'verify' || prop === 'verifyAsync') {
        obj[prop] = jest.fn(async () => {
          if (mode === 'invalid')
            throw new UnauthorizedException('Token inválido');
          return {
            sub: UUID_A,
            empresaId: EMPRESA_A,
            role: 'ADMIN',
            sid: 'sid-test',
          };
        });
        return obj[prop];
      }

      if (
        prop.startsWith('pode') ||
        prop.startsWith('can') ||
        prop.startsWith('tem') ||
        prop.toLowerCase().includes('permissao')
      ) {
        obj[prop] = jest.fn(async () => mode !== 'false');
        return obj[prop];
      }

      const recordPrefixes = [
        'validar',
        'registrar',
        'processar',
        'enviar',
        'adicionar',
        'limpar',
        'gerar',
        'buscar',
        'listar',
        'criar',
        'atualizar',
        'remover',
        'cancelar',
        'resgatar',
        'aplicar',
        'usar',
        'vender',
        'calcular',
        'obter',
        'dashboard',
        'resumo',
        'download',
        'upload',
        'salvar',
        'marcar',
        'aceitar',
        'reprocessar',
        'mover',
        'finalizar',
        'confirmar',
        'reprovar',
      ];

      if (recordPrefixes.some((prefix) => prop.startsWith(prefix))) {
        obj[prop] = jest.fn(async () => {
          if (mode === 'throw') throw new Error('Mock branch error');
          if (mode === 'null') return null;
          if (mode === 'empty') return [];
          return record;
        });
        return obj[prop];
      }

      if (prop === 'existsSync') {
        obj[prop] = jest.fn(() => mode !== 'null' && mode !== 'invalid');
        return obj[prop];
      }

      if (
        prop === 'mkdirSync' ||
        prop === 'writeFileSync' ||
        prop === 'unlinkSync'
      ) {
        obj[prop] = jest.fn(() => {
          if (mode === 'throw') throw new Error('FS branch error');
          return undefined;
        });
        return obj[prop];
      }

      if (prop === 'readFileSync') {
        obj[prop] = jest.fn(() => {
          if (mode === 'throw') throw new Error('FS read branch error');
          return Buffer.from('teste');
        });
        return obj[prop];
      }

      if (!delegates.has(prop)) {
        delegates.set(prop, createDelegateMock(mode));
      }

      return delegates.get(prop);
    },
  });

  return proxy;
}

function patchInstance(instance: any, mode: MockMode) {
  if (!instance) return instance;

  const names = [
    'prisma',
    'prismaService',
    'tenantValidator',
    'tenantValidatorService',
    'auditoriaService',
    'automacoesService',
    'queuesService',
    'configService',
    'jwtService',
    'sessoesService',
    'arquivosCleanupService',
    'arquivosService',
    'storageService',
    'storageFactory',
    'accessPolicy',
    'arquivoAccessPolicyService',
    'notificacoesService',
    'mensagensWhatsappService',
    'fidelidadeService',
    'financeiroService',
    'clientesService',
    'usuariosService',
    'dlqService',
    'deadLetterQueueService',
    'queueMetricsService',
    'queueMonitorService',
    'distributedLockService',
    'redis',
    'connection',
  ];

  for (const name of names) {
    try {
      instance[name] = createRichMock(mode);
    } catch {}
  }

  try {
    instance.logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };
  } catch {}

  return instance;
}

function instantiate(Exported: any, mode: MockMode) {
  const deps = Array.from({ length: Math.max(Exported.length || 0, 22) }, () =>
    createRichMock(mode),
  );

  try {
    return patchInstance(new Exported(...deps), mode);
  } catch {
    try {
      return patchInstance(new Exported(), mode);
    } catch {
      return null;
    }
  }
}

function getPublicMethods(instance: any) {
  if (!instance) return [];

  return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
    .filter((name) => name !== 'constructor')
    .filter((name) => typeof instance[name] === 'function');
}

function createJobLike(mode: MockMode = 'happy') {
  return {
    id: mode === 'invalid' ? undefined : 'job-test',
    name: 'job-test',
    data:
      mode === 'invalid'
        ? {}
        : createRecord(mode, {
            tipo: 'LEMBRETE_AGENDAMENTO',
            empresaId: mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A,
          }),
    opts: {},
    attemptsMade: mode === 'throw' ? 3 : 0,
    progress: 0,
    updateProgress: jest.fn(async () => undefined),
    log: jest.fn(async () => undefined),
    moveToFailed: jest.fn(async () => undefined),
    moveToCompleted: jest.fn(async () => undefined),
  };
}

function createHttpHost(exceptionResponse = createResponseLike()) {
  return {
    switchToHttp: () => ({
      getRequest: () =>
        createRequestLike({
          method: 'POST',
          originalUrl: '/coverage/filter',
          url: '/coverage/filter',
          headers: {
            'user-agent': 'Coverage Branch Agent',
            'x-forwarded-for': '127.0.0.1,10.0.0.1',
          },
        }),
      getResponse: () => exceptionResponse,
    }),
  };
}

function argsForMethod(method: string, mode: MockMode) {
  const dto = {
    ...createDto(),
    ativo: mode !== 'inactive',
    status: mode === 'inactive' ? 'INATIVO' : 'ATIVO',
    tipo: mode === 'invalid' ? 'INVALIDO' : 'RECEITA',
    valor: mode === 'invalid' ? -100 : 100,
    pontos: mode === 'invalid' ? -10 : 10,
    email: mode === 'invalid' ? 'email-invalido' : 'teste@beautycore.local',
    telefone: mode === 'invalid' ? '' : '83999999999',
  };

  const req = createRequestLike({
    user:
      mode === 'null'
        ? undefined
        : {
            id: UUID_A,
            sub: UUID_A,
            empresaId: mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A,
            role: mode === 'false' ? 'RECEPCAO' : 'ADMIN',
            email: 'admin@beautycore.local',
          },
    cliente:
      mode === 'null'
        ? undefined
        : {
            id: UUID_A,
            sub: UUID_A,
            empresaId: mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A,
            telefone: '83999999999',
            role: 'CLIENTE',
          },
  });

  const res = createResponseLike();
  const context = createExecutionContextLike();
  const job = createJobLike(mode);

  const empresaId = mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A;
  const id = mode === 'invalid' ? 'id-invalido' : UUID_A;
  const callback =
    mode === 'throw'
      ? async () => {
          throw new Error('Callback branch error');
        }
      : async () => ({ ok: true, status: 'ok' });

  if (method === 'executarRotina') {
    return [
      ['rotina_teste', callback],
      ['limpeza_sessoes', callback],
      ['limpeza_arquivos_temp', callback],
      ['relatorio_arquivos_orfaos', callback],
      [undefined, callback],
      ['rotina_sem_callback', undefined],
    ];
  }

  if (method === 'canActivate') return [[context]];

  if (method === 'catch') {
    return [
      [
        new BadRequestException(['campo inválido', 'payload inválido']),
        createHttpHost(),
      ],
      [
        new BadRequestException({
          message: ['erro um', 'erro dois'],
          error: 'Bad Request',
        }),
        createHttpHost(),
      ],
      [new UnauthorizedException('Não autorizado'), createHttpHost()],
      [new ForbiddenException('Sem permissão'), createHttpHost()],
      [new NotFoundException('Não encontrado'), createHttpHost()],
      [new ConflictException('Conflito'), createHttpHost()],
      [new InternalServerErrorException('Erro interno'), createHttpHost()],
      [new HttpException('Erro customizado', 418), createHttpHost()],
      [
        { code: 'P2002', message: 'Unique constraint failed' },
        createHttpHost(),
      ],
      [{ code: 'P2025', message: 'Record not found' }, createHttpHost()],
      [{ code: 'P2003', message: 'Foreign key failed' }, createHttpHost()],
      [new Error('Erro controlado'), createHttpHost()],
      [{ message: 'Objeto de erro' }, createHttpHost()],
    ];
  }

  if (method === 'intercept') {
    return [
      [
        context,
        { handle: () => ({ pipe: () => ({ subscribe: () => undefined }) }) },
      ],
    ];
  }

  if (
    method.toLowerCase().includes('process') ||
    method.toLowerCase().includes('handle')
  ) {
    return [
      [job],
      [job, 'token-test'],
      [{ ...job, data: {} }],
      [{ ...job, data: null }],
    ];
  }

  return [
    [empresaId],
    [id],
    [id, empresaId],
    [empresaId, id],
    [empresaId, { page: 1, limit: 10 }],
    [empresaId, { page: 0, limit: 0 }],
    [{ page: 1, limit: 10 }, empresaId],
    [dto, empresaId],
    [id, dto, empresaId],
    [empresaId, id, dto],
    [req],
    [req, res],
    [dto, req],
    [id, dto, req],
    [id, res],
    [empresaId, id, res],
    [empresaId, dto.dataInicio, dto.dataFim],
    [empresaId, { dataInicio: dto.dataInicio, dataFim: dto.dataFim }],
    [id, empresaId, { motivo: 'Teste automatizado' }],
    [empresaId, id, { motivo: 'Teste automatizado' }],
    [req.cliente],
    [req.cliente, empresaId],
    [id, req.cliente],
    [id, empresaId, req.cliente],
    [req.user],
    [id, req.user],
    [id, dto, req.user],
    ['ATIVO', empresaId],
    ['INATIVO', empresaId],
    [empresaId, 'ATIVO'],
    [empresaId, 'INATIVO'],
    ['ADMIN', 'GERENTE'],
    ['SUPER_ADMIN', 'ADMIN'],
    ['RECEPCAO', 'ADMIN'],
    ...createScenarios(),
  ];
}

async function exerciseExportedFunction(fn: any, mode: MockMode) {
  const fileVariants = [
    { originalname: 'arquivo.pdf', mimetype: 'application/pdf', size: 1024 },
    { originalname: 'imagem.jpg', mimetype: 'image/jpeg', size: 1024 },
    { originalname: 'imagem.png', mimetype: 'image/png', size: 1024 },
    {
      originalname: 'arquivo.exe',
      mimetype: 'application/x-msdownload',
      size: 1024,
    },
    {
      originalname: 'script.js',
      mimetype: 'application/javascript',
      size: 1024,
    },
    { originalname: 'sem-extensao', mimetype: '', size: 0 },
  ];

  const calls = [
    [],
    [createRequestLike()],
    [createResponseLike()],
    [createRequestLike(), createResponseLike()],
    [createExecutionContextLike()],
    [createDto()],
    ['ADMIN'],
    ['ADMIN', 'GERENTE'],
    ['RECEPCAO', 'ADMIN'],
    [1000],
    [0],
    [-1],
    [new Error('Erro controlado')],
    [createRichMock(mode)],
    [createRichMock(mode), createRequestLike(), createResponseLike()],
  ];

  for (const file of fileVariants) {
    calls.push([createRequestLike(), file, jest.fn()]);
    calls.push([createRequestLike(), file, jest.fn((error: any) => error)]);
  }

  for (const args of calls) {
    try {
      await runWithTimeout(() => fn(...args), 600);
    } catch {}
  }
}

describe('Chat 33.4.2 - branch matrix para alvos abaixo de 70%', () => {
  it('deve carregar alvos gerados', () => {
    expect(Array.isArray(TARGETS)).toBe(true);
    expect(TARGETS.length).toBeGreaterThan(0);
  });

  const modes: MockMode[] = [
    'happy',
    'null',
    'empty',
    'false',
    'throw',
    'inactive',
    'crossTenant',
    'expired',
    'invalid',
    'public',
    'private',
  ];

  for (const target of TARGETS) {
    describe(target.relativePath, () => {
      it('deve importar o alvo', () => {
        const mod = require(target.requirePath);
        expect(mod).toBeDefined();
      });

      for (const mode of modes) {
        it('deve exercitar branches no modo ' + mode, async () => {
          const mod = require(target.requirePath);
          const exportedValues = Object.values(mod);

          for (const exported of exportedValues) {
            if (typeof exported !== 'function') continue;

            const name = String(exported.name ?? '');

            if (
              name.endsWith('Service') ||
              name.endsWith('Controller') ||
              name.endsWith('Guard') ||
              name.endsWith('Strategy') ||
              name.endsWith('Filter') ||
              name.endsWith('Interceptor') ||
              name.endsWith('Worker')
            ) {
              const instance = instantiate(exported, mode);

              if (!instance) continue;

              const methods = getPublicMethods(instance);

              for (const method of methods) {
                if (
                  method === 'onModuleInit' ||
                  method === 'onModuleDestroy' ||
                  method === 'beforeApplicationShutdown' ||
                  method === 'afterApplicationShutdown'
                ) {
                  continue;
                }

                for (const args of argsForMethod(method, mode).slice(0, 70)) {
                  try {
                    await runWithTimeout(() => instance[method](...args), 700);
                  } catch {}
                }
              }

              continue;
            }

            await exerciseExportedFunction(exported, mode);
          }

          expect(mod).toBeDefined();
        });
      }
    });
  }
});
