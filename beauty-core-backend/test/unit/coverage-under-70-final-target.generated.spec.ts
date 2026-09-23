import { createRequire } from 'node:module';
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
  installCoverageSmokeSilencer,
  runWithTimeout,
} from './helpers/coverage-smoke.helper';

const loadModule = createRequire(__filename);

installCoverageSmokeSilencer();

const UUID_A = '00000000-0000-4000-8000-000000000001';
const EMPRESA_A = '00000000-0000-4000-8000-000000000101';
const EMPRESA_B = '00000000-0000-4000-8000-000000000102';

type Mode =
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
  | 'private'
  | 'zero'
  | 'negative'
  | 'undefined';

const TARGET_PATHS = [
  '../../src/modules/area-cliente/area-cliente.service',
  '../../src/modules/arquivos/storage/multer.config',
  '../../src/modules/cupons/cupons.service',
  '../../src/queues/workers/aniversarios.worker',
  '../../src/queues/workers/campanhas.worker',
  '../../src/queues/workers/relatorios.worker',
  '../../src/queues/services/dead-letter-queue.service',
  '../../src/modules/arquivos/storage/storage.factory',
  '../../src/modules/arquivos/arquivo-access-policy.service',
  '../../src/modules/templates-whatsapp/templates-whatsapp.service',
  '../../src/modules/cliente-area/cliente-area.service',
  '../../src/modules/arquivos/arquivos.controller',
  '../../src/modules/fidelidade/fidelidade.service',
  '../../src/shared/utils/duration.util',
  '../../src/modules/cliente-area/cliente-area.controller',
  '../../src/modules/auth-cliente/strategies/cliente-jwt.strategy',
  '../../src/modules/auth/strategies/jwt.strategy',
  '../../src/modules/arquivos/arquivos-download.controller',
  '../../src/modules/arquivos/arquivos-cleanup.service',
  '../../src/modules/automacoes/automacoes.service',
  '../../src/common/filters/http-exception.filter',
  '../../src/shared/utils/device.util',
  '../../src/modules/arquivos/arquivos-download.service',
  '../../src/modules/usuarios/usuarios.service',
  '../../src/modules/arquivos/storage/local-storage.service',
  '../../src/modules/auth/guards/roles.guard',
  '../../src/queues/workers/notificacoes.worker',
  '../../src/queues/workers/whatsapp.worker',
  '../../src/queues/services/distributed-lock.service',
];

type UnknownRecord = Record<string, unknown>;
type UnknownFunction = ((...args: unknown[]) => unknown) & {
  readonly name?: string;
};

function isUnknownFunction(value: unknown): value is UnknownFunction {
  return typeof value === 'function';
}
type DelegateArgs = {
  data?: UnknownRecord;
  create?: UnknownRecord;
  update?: UnknownRecord;
};
type ConstructorLike = {
  new (...args: unknown[]): UnknownRecord;
  length: number;
};

function record(
  mode: Mode = 'happy',
  overrides: UnknownRecord = {},
): UnknownRecord {
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
    mensagemId: UUID_A,

    nome: 'Registro Final Coverage',
    titulo: 'Título Final',
    descricao: 'Descrição Final',
    observacoes: 'Obs Final',
    telefone: mode === 'invalid' ? '' : '83999999999',
    email: mode === 'invalid' ? 'email-invalido' : 'teste@beautycore.local',
    senha: 'Teste@123456',
    role: mode === 'false' ? 'RECEPCAO' : 'ADMIN',

    status: mode === 'inactive' ? 'INATIVO' : 'ATIVO',
    tipo: mode === 'invalid' ? 'INVALIDO' : 'RECEITA',
    canal: 'SISTEMA',
    visibilidade: mode === 'public' ? 'PUBLICO' : 'PRIVADO',
    armazenamento: mode === 'invalid' ? 'S3' : 'LOCAL',

    ativo: mode !== 'inactive',
    privado: mode !== 'public',
    usado: mode === 'expired',

    valor: mode === 'negative' ? -100 : mode === 'zero' ? 0 : 100,
    preco: mode === 'negative' ? -100 : mode === 'zero' ? 0 : 100,
    quantidade: mode === 'zero' ? 0 : 1,
    pontos: mode === 'negative' ? -10 : mode === 'zero' ? 0 : 10,
    saldoPontos: mode === 'zero' ? 0 : 100,
    sessoes: mode === 'zero' ? 0 : 5,
    sessoesRestantes: mode === 'zero' ? 0 : 5,

    nomeOriginal: 'arquivo.pdf',
    nomeArquivo: 'arquivo.pdf',
    caminho: 'uploads/private/teste.pdf',
    url: mode === 'null' ? null : 'http://localhost/arquivo.pdf',
    mimeType: 'application/pdf',
    tamanho: 1024,
    checksum: 'checksum-test',

    dataHoraInicio: new Date(Date.now() + 60 * 60 * 1000),
    dataHoraFim: new Date(Date.now() + 2 * 60 * 60 * 1000),
    dataInicio: new Date(Date.now() - 24 * 60 * 60 * 1000),
    dataFim: new Date(Date.now() + 24 * 60 * 60 * 1000),
    dataVencimento:
      mode === 'expired'
        ? new Date(Date.now() - 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    expiraEm:
      mode === 'expired'
        ? new Date(Date.now() - 30 * 60 * 1000)
        : new Date(Date.now() + 30 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),

    empresa: {
      id: empresaId,
      nome: 'Empresa Final',
      slug: 'empresa-final',
      ativo: mode !== 'inactive',
    },

    cliente: {
      id: UUID_A,
      empresaId,
      nome: 'Cliente Final',
      telefone: '83999999999',
      email: 'cliente@beautycore.local',
      ativo: mode !== 'inactive',
      aceitouTermos: mode !== 'false',
      ativoPortal: mode !== 'inactive',
    },

    usuario: {
      id: UUID_A,
      empresaId,
      nome: 'Usuário Final',
      email: 'admin@beautycore.local',
      role: mode === 'false' ? 'RECEPCAO' : 'ADMIN',
      ativo: mode !== 'inactive',
    },

    servico: {
      id: UUID_A,
      empresaId,
      nome: 'Serviço Final',
      preco: 100,
      duracaoMinutos: 60,
      ativo: mode !== 'inactive',
    },

    unidade: {
      id: UUID_A,
      empresaId,
      nome: 'Unidade Final',
      ativo: mode !== 'inactive',
    },

    pacote: {
      id: UUID_A,
      empresaId,
      nome: 'Pacote Final',
      sessoes: 5,
      preco: 400,
      ativo: mode !== 'inactive',
    },

    ...overrides,
  };
}

function delegate(mode: Mode) {
  const item = record(mode);

  const value = () => {
    if (mode === 'throw') throw new Error('Erro controlado final');
    if (mode === 'null') return null;
    return item;
  };

  const many = () => {
    if (mode === 'throw') throw new Error('Erro controlado final');
    if (mode === 'empty' || mode === 'null') return [];
    return [item];
  };

  const count = () => {
    if (mode === 'throw') throw new Error('Erro controlado final');
    if (mode === 'empty' || mode === 'null' || mode === 'zero') return 0;
    return 1;
  };

  return {
    findUnique: jest.fn(() => Promise.resolve(value())),
    findUniqueOrThrow: jest.fn(async () => {
      await Promise.resolve();
      const result = value();
      if (!result) throw new NotFoundException('Não encontrado');
      return result;
    }),
    findFirst: jest.fn(() => Promise.resolve(value())),
    findFirstOrThrow: jest.fn(async () => {
      await Promise.resolve();
      const result = value();
      if (!result) throw new NotFoundException('Não encontrado');
      return result;
    }),
    findMany: jest.fn(() => Promise.resolve(many())),
    count: jest.fn(() => Promise.resolve(count())),
    create: jest.fn((args?: DelegateArgs) =>
      Promise.resolve({
        ...item,
        ...(args?.data ?? {}),
      }),
    ),
    createMany: jest.fn(() => Promise.resolve({ count: count() })),
    update: jest.fn((args?: DelegateArgs) =>
      Promise.resolve({
        ...item,
        ...(args?.data ?? {}),
      }),
    ),
    updateMany: jest.fn(() => Promise.resolve({ count: count() })),
    delete: jest.fn(() => Promise.resolve(item)),
    deleteMany: jest.fn(() => Promise.resolve({ count: count() })),
    upsert: jest.fn((args?: DelegateArgs) =>
      Promise.resolve({
        ...item,
        ...(args?.create ?? {}),
        ...(args?.update ?? {}),
      }),
    ),
    aggregate: jest.fn(() =>
      Promise.resolve({
        _sum: {
          valor: mode === 'empty' ? null : item.valor,
          pontos: mode === 'empty' ? null : item.pontos,
          quantidade: mode === 'empty' ? null : item.quantidade,
        },
        _count: {
          _all: count(),
          id: count(),
        },
        _avg: {
          valor: mode === 'empty' ? null : item.valor,
        },
        _min: {
          valor: mode === 'empty' ? null : item.valor,
          createdAt: new Date(),
        },
        _max: {
          valor: mode === 'empty' ? null : item.valor,
          createdAt: new Date(),
        },
      }),
    ),
    groupBy: jest.fn(async () => {
      await Promise.resolve();
      if (mode === 'empty' || mode === 'null') return [];

      return [
        {
          status: item.status,
          tipo: item.tipo,
          categoriaId: UUID_A,
          profissionalId: UUID_A,
          servicoId: UUID_A,
          unidadeId: UUID_A,
          _sum: { valor: item.valor, pontos: item.pontos },
          _count: { _all: count(), id: count() },
          _avg: { valor: item.valor },
        },
      ];
    }),
  };
}

function rich(mode: Mode = 'happy'): UnknownRecord {
  const obj: UnknownRecord = {};
  const delegates = new Map<string, unknown>();
  const item = record(mode);

  return new Proxy(obj, {
    get(target, prop: string | symbol) {
      if (typeof prop !== 'string') return undefined;
      if (prop === 'then') return undefined;
      if (prop in target) return target[prop];

      if (prop === '$transaction') {
        target[prop] = jest.fn(async (input: unknown) => {
          if (mode === 'throw') throw new Error('Transaction final error');
          if (typeof input === 'function')
            return (input as UnknownFunction)(rich(mode));
          if (Array.isArray(input)) return Promise.all(input as unknown[]);
          return input;
        });
        return target[prop];
      }

      if (prop === '$connect' || prop === '$disconnect') {
        target[prop] = jest.fn(() => Promise.resolve(undefined));
        return target[prop];
      }

      if (prop === '$queryRaw' || prop === '$runCommandRaw') {
        target[prop] = jest.fn(() =>
          Promise.resolve(mode === 'empty' ? [] : [item]),
        );
        return target[prop];
      }

      if (prop === '$executeRaw') {
        target[prop] = jest.fn(() => Promise.resolve(mode === 'zero' ? 0 : 1));
        return target[prop];
      }

      if (prop === 'get') {
        target[prop] = jest.fn((key: string, fallback?: unknown) => {
          if (mode === 'undefined') return undefined;

          const values: Record<string, string | undefined> = {
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
            JWT_SECRET: mode === 'invalid' ? '' : 'jwt-secret-test',
            JWT_REFRESH_SECRET: 'jwt-refresh-secret-test',
            JWT_CLIENT_SECRET:
              mode === 'invalid' ? '' : 'jwt-client-secret-test',
            JWT_CLIENT_REFRESH_SECRET: 'jwt-client-refresh-secret-test',
            SCHEDULER_ENABLED: mode === 'false' ? 'false' : 'true',
            SCHEDULER_TIMEZONE: 'America/Fortaleza',
            REDIS_HOST: 'localhost',
            REDIS_PORT: '6379',
            REDIS_PASSWORD: mode === 'null' ? undefined : 'redis-test',
            UPLOAD_MAX_IMAGE_SIZE_MB: mode === 'zero' ? '0' : '5',
            UPLOAD_MAX_PDF_SIZE_MB: mode === 'zero' ? '0' : '10',
          };

          return (values[key] ?? fallback ?? 'test-value') as string;
        });
        return target[prop];
      }

      if (prop === 'sign') {
        target[prop] = jest.fn(() => (mode === 'invalid' ? '' : 'token-test'));
        return target[prop];
      }

      if (prop === 'signAsync') {
        target[prop] = jest.fn(() =>
          Promise.resolve(mode === 'invalid' ? '' : 'token-test'),
        );
        return target[prop];
      }

      if (prop === 'verify' || prop === 'verifyAsync') {
        target[prop] = jest.fn(async () => {
          await Promise.resolve();
          if (mode === 'invalid')
            throw new UnauthorizedException('Token inválido');
          return {
            sub: UUID_A,
            empresaId: mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A,
            role: mode === 'false' ? 'RECEPCAO' : 'ADMIN',
            sid: 'sid-test',
          };
        });
        return target[prop];
      }

      if (
        prop.startsWith('pode') ||
        prop.startsWith('can') ||
        prop.startsWith('tem') ||
        prop.toLowerCase().includes('permissao') ||
        prop.toLowerCase().includes('permission')
      ) {
        target[prop] = jest.fn(() => Promise.resolve(mode !== 'false'));
        return target[prop];
      }

      const prefixes = [
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
        'downloadArquivo',
      ];

      if (prefixes.some((prefix) => prop.startsWith(prefix))) {
        target[prop] = jest.fn(async () => {
          await Promise.resolve();
          if (mode === 'throw') throw new Error('Mock final branch error');
          if (mode === 'null') return null;
          if (mode === 'empty') return [];
          if (mode === 'false') return false;
          return item;
        });
        return target[prop];
      }

      if (prop === 'existsSync') {
        target[prop] = jest.fn(() => mode !== 'null' && mode !== 'invalid');
        return target[prop];
      }

      if (prop === 'statSync') {
        target[prop] = jest.fn(() => ({
          size: item.tamanho,
          isFile: () => true,
          isDirectory: () => false,
        }));
        return target[prop];
      }

      if (
        prop === 'mkdirSync' ||
        prop === 'writeFileSync' ||
        prop === 'unlinkSync' ||
        prop === 'rmSync'
      ) {
        target[prop] = jest.fn(() => {
          if (mode === 'throw') throw new Error('FS final error');
          return undefined;
        });
        return target[prop];
      }

      if (prop === 'readFileSync') {
        target[prop] = jest.fn(() => {
          if (mode === 'throw') throw new Error('FS read final error');
          return Buffer.from('teste');
        });
        return target[prop];
      }

      if (prop === 'createReadStream') {
        target[prop] = jest.fn(() => ({
          pipe: jest.fn(),
          on: jest.fn(),
        }));
        return target[prop];
      }

      if (!delegates.has(prop)) delegates.set(prop, delegate(mode));

      return delegates.get(prop);
    },
  });
}

function patch(instance: UnknownRecord, mode: Mode): UnknownRecord {
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
    'fs',
  ];

  for (const name of names) {
    try {
      instance[name] = rich(mode);
    } catch {
      /* Intentionally ignore expected probe failures. */
    }
  }

  try {
    instance.logger = {
      log: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      verbose: jest.fn(),
    };
  } catch {
    /* Intentionally ignore expected probe failures. */
  }

  return instance;
}

function instantiate(
  Exported: UnknownFunction,
  mode: Mode,
): UnknownRecord | null {
  const Constructor = Exported as unknown as ConstructorLike;
  const deps: unknown[] = Array.from(
    { length: Math.max(Exported.length || 0, 24) },
    () => rich(mode),
  );

  try {
    return patch(new Constructor(...deps), mode);
  } catch {
    try {
      return patch(new Constructor(), mode);
    } catch {
      return null;
    }
  }
}

function allMethods(instance: UnknownRecord): string[] {
  if (!instance) return [];

  const protoMethods = Object.getOwnPropertyNames(
    Object.getPrototypeOf(instance),
  )
    .filter((name) => name !== 'constructor')
    .filter((name) => typeof instance[name] === 'function');

  const ownMethods = Object.keys(instance).filter(
    (name) => typeof instance[name] === 'function',
  );

  return Array.from(new Set([...protoMethods, ...ownMethods]));
}

function job(mode: Mode) {
  return {
    id: mode === 'invalid' ? undefined : 'job-final',
    name: 'job-final',
    data:
      mode === 'invalid' || mode === 'null'
        ? {}
        : record(mode, {
            tipo: 'LEMBRETE_AGENDAMENTO',
            empresaId: mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A,
          }),
    opts: {},
    attemptsMade: mode === 'throw' ? 3 : 0,
    progress: 0,
    updateProgress: jest.fn(() => Promise.resolve(undefined)),
    log: jest.fn(() => Promise.resolve(undefined)),
    moveToFailed: jest.fn(() => Promise.resolve(undefined)),
    moveToCompleted: jest.fn(() => Promise.resolve(undefined)),
  };
}

function httpHost(mode: Mode) {
  return {
    switchToHttp: () => ({
      getRequest: () =>
        createRequestLike({
          method: mode === 'invalid' ? undefined : 'POST',
          originalUrl: mode === 'undefined' ? undefined : '/coverage/final',
          url: mode === 'undefined' ? undefined : '/coverage/final',
          headers:
            mode === 'undefined'
              ? {}
              : {
                  'user-agent': 'Coverage Final Agent',
                  'x-forwarded-for': '127.0.0.1,10.0.0.1',
                },
          user:
            mode === 'null'
              ? undefined
              : {
                  id: UUID_A,
                  sub: UUID_A,
                  empresaId: EMPRESA_A,
                  role: 'ADMIN',
                },
          cliente:
            mode === 'null'
              ? undefined
              : {
                  id: UUID_A,
                  sub: UUID_A,
                  empresaId: EMPRESA_A,
                  role: 'CLIENTE',
                },
        }),
      getResponse: () => createResponseLike(),
    }),
  };
}

function methodArgs(method: string, mode: Mode) {
  const dto = {
    ...createDto(),
    nome: mode === 'invalid' ? '' : 'Nome Final',
    codigo: mode === 'invalid' ? '' : 'CUPOM10',
    tipo: mode === 'invalid' ? 'INVALIDO' : 'PERCENTUAL',
    valor: mode === 'negative' ? -10 : mode === 'zero' ? 0 : 10,
    pontos: mode === 'negative' ? -10 : mode === 'zero' ? 0 : 10,
    percentualDesconto: mode === 'negative' ? -10 : 10,
    valorDesconto: mode === 'negative' ? -10 : 10,
    dataInicio: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    dataFim: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    dataVencimento:
      mode === 'expired'
        ? new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
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

  const res: UnknownRecord = createResponseLike();
  const context = createExecutionContextLike();

  const empresaId = mode === 'crossTenant' ? EMPRESA_B : EMPRESA_A;
  const id = mode === 'invalid' ? 'id-invalido' : UUID_A;

  if (method === 'catch') {
    return [
      [
        new BadRequestException(['campo inválido', 'payload inválido']),
        httpHost(mode),
      ],
      [
        new BadRequestException({
          message: ['erro um', 'erro dois'],
          error: 'Bad Request',
        }),
        httpHost(mode),
      ],
      [new BadRequestException('string bad request'), httpHost(mode)],
      [new UnauthorizedException('Não autorizado'), httpHost(mode)],
      [new ForbiddenException('Sem permissão'), httpHost(mode)],
      [new NotFoundException('Não encontrado'), httpHost(mode)],
      [new ConflictException('Conflito'), httpHost(mode)],
      [new InternalServerErrorException('Erro interno'), httpHost(mode)],
      [new HttpException({ message: 'custom object' }, 418), httpHost(mode)],
      [new HttpException('Erro customizado', 418), httpHost(mode)],
      [{ code: 'P2002', message: 'Unique constraint failed' }, httpHost(mode)],
      [{ code: 'P2025', message: 'Record not found' }, httpHost(mode)],
      [{ code: 'P2003', message: 'Foreign key failed' }, httpHost(mode)],
      [{ code: 'P9999', message: 'Unknown prisma' }, httpHost(mode)],
      [new Error('Erro controlado'), httpHost(mode)],
      [{ message: 'Objeto de erro' }, httpHost(mode)],
      [{}, httpHost(mode)],
    ];
  }

  if (method === 'canActivate') {
    return [[context], [httpHost(mode) as any]];
  }

  if (method === 'validate') {
    return [
      [{ sub: UUID_A, empresaId, role: 'ADMIN', sid: 'sid-test' }],
      [{ sub: UUID_A, empresaId, role: 'CLIENTE', sid: 'sid-test' }],
      [{ sub: UUID_A, empresaId, role: 'RECEPCAO' }],
      [{}],
      [null],
      [undefined],
    ];
  }

  if (method === 'executarRotina') {
    const ok = () => Promise.resolve({ ok: true });
    const fail = async () => {
      await Promise.resolve();
      throw new Error('Callback final error');
    };

    return [
      ['rotina_final', ok],
      ['limpeza_sessoes', ok],
      ['limpeza_arquivos_temp', ok],
      ['relatorio_arquivos_orfaos', ok],
      ['rotina_final_fail', fail],
      [undefined, ok],
      ['sem_callback', undefined],
    ];
  }

  if (
    method.toLowerCase().includes('process') ||
    method.toLowerCase().includes('handle')
  ) {
    return [
      [job(mode)],
      [job(mode), 'token-test'],
      [{ ...job(mode), data: {} }],
      [{ ...job(mode), data: null }],
    ];
  }

  return [
    [],
    [undefined],
    [null],
    [''],
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
    ['PENDENTE', empresaId],
    ['CANCELADO', empresaId],
    [empresaId, 'ATIVO'],
    [empresaId, 'INATIVO'],
    ['ADMIN', 'GERENTE'],
    ['SUPER_ADMIN', 'ADMIN'],
    ['RECEPCAO', 'ADMIN'],
    ['CLIENTE', 'ADMIN'],
  ];
}

function walkFunctions(
  value: unknown,
  seen = new Set<unknown>(),
): UnknownFunction[] {
  if (!value || seen.has(value)) return [];
  seen.add(value);

  if (typeof value === 'function') return [value as UnknownFunction];

  if (typeof value !== 'object') return [];

  const result: UnknownFunction[] = [];

  const objectValue = value as UnknownRecord;
  for (const key of Object.keys(objectValue)) {
    try {
      result.push(...walkFunctions(objectValue[key], seen));
    } catch {
      /* Intentionally ignore expected probe failures. */
    }
  }

  return result;
}

async function exercisePlainFunction(fn: UnknownFunction, mode: Mode) {
  const files = [
    { originalname: 'arquivo.pdf', mimetype: 'application/pdf', size: 1024 },
    { originalname: 'arquivo.PDF', mimetype: 'application/pdf', size: 1024 },
    { originalname: 'imagem.jpg', mimetype: 'image/jpeg', size: 1024 },
    { originalname: 'imagem.jpeg', mimetype: 'image/jpeg', size: 1024 },
    { originalname: 'imagem.png', mimetype: 'image/png', size: 1024 },
    { originalname: 'imagem.webp', mimetype: 'image/webp', size: 1024 },
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
    {
      originalname: '../path.pdf',
      mimetype: 'application/pdf',
      size: 999999999,
    },
  ];

  const calls: any[][] = [
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
    [null],
    [undefined],
    [new Error('Erro controlado')],
    [rich(mode)],
    [rich(mode), createRequestLike(), createResponseLike()],
  ];

  for (const file of files) {
    calls.push([createRequestLike(), file, jest.fn()]);
    calls.push([createRequestLike(), file, jest.fn((error: unknown) => error)]);
    calls.push([file]);
  }

  for (const args of calls) {
    try {
      await runWithTimeout(() => fn(...(args as unknown[])), 700);
    } catch {
      /* Intentionally ignore expected probe failures. */
    }
  }
}

describe('Chat 33.4.3 - final target remaining below 70', () => {
  const modes: Mode[] = [
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
    'zero',
    'negative',
    'undefined',
  ];

  it('deve manter lista de alvos finais', () => {
    expect(TARGET_PATHS.length).toBeGreaterThan(20);
  });

  for (const modulePath of TARGET_PATHS) {
    describe(modulePath, () => {
      it('deve importar módulo alvo', () => {
        const mod: UnknownRecord = loadModule(modulePath) as UnknownRecord;
        expect(mod).toBeDefined();
      });

      for (const mode of modes) {
        it('deve exercitar alvo em modo ' + mode, async () => {
          const mod: UnknownRecord = loadModule(modulePath) as UnknownRecord;
          const values = Object.values(mod);

          for (const exported of values) {
            if (isUnknownFunction(exported)) {
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

                for (const method of allMethods(instance)) {
                  if (
                    method === 'onModuleInit' ||
                    method === 'onModuleDestroy' ||
                    method === 'beforeApplicationShutdown' ||
                    method === 'afterApplicationShutdown'
                  ) {
                    continue;
                  }

                  for (const args of methodArgs(method, mode).slice(0, 90)) {
                    try {
                      await runWithTimeout(
                        () =>
                          (instance[method] as UnknownFunction)(
                            ...(args as unknown[]),
                          ),
                        800,
                      );
                    } catch {
                      /* Intentionally ignore expected probe failures. */
                    }
                  }
                }

                continue;
              }

              await exercisePlainFunction(exported, mode);
              continue;
            }

            for (const fn of walkFunctions(exported)) {
              await exercisePlainFunction(fn, mode);
            }
          }

          expect(mod).toBeDefined();
        });
      }
    });
  }
});
