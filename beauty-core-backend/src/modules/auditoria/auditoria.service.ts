import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  AcaoAuditoria,
  Prisma,
  StatusAuditoria,
  TipoUsuarioAuditoria,
} from '@prisma/client';

import { PrismaService } from '../../database/prisma/prisma.service';

import { CreateAuditoriaDto } from './dto/create-auditoria.dto';
import { FiltrosAuditoriaDto } from './dto/filtros-auditoria.dto';

type JsonSeguro =
  | string
  | number
  | boolean
  | null
  | JsonSeguro[]
  | {
      [key: string]: JsonSeguro;
    };

function stringifyAuditValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value) ?? '';
    } catch {
      return '[unserializable]';
    }
  }

  if (
    typeof value === 'number' ||
    typeof value === 'boolean' ||
    typeof value === 'bigint'
  ) {
    return value.toString();
  }

  if (typeof value === 'symbol') {
    return value.description ?? '';
  }

  return '';
}

@Injectable()
export class AuditoriaService {
  private readonly logger = new Logger(AuditoriaService.name);

  private readonly maxDepth = 6;
  private readonly maxArrayItems = 50;
  private readonly maxObjectKeys = 80;
  private readonly maxStringLength = 5000;

  private readonly camposSensiveis = [
    'senha',
    'password',
    'hash',
    'token',
    'tokens',
    'access_token',
    'refresh_token',
    'accesstoken',
    'refreshtoken',
    'jwt',
    'authorization',
    'auth',
    'bearer',
    'secret',
    'segredo',
    'clientsecret',
    'client_secret',
    'otp',
    'codigo',
    'codigoacesso',
    'codigo_acesso',
    'pin',
  ];

  private readonly camposTecnicosBloqueados = [
    'client',
    'clients',
    'connection',
    'connections',
    'connector',
    'stream',
    'streams',
    'scripts',
    'commandqueue',
    'offlinequeue',
    'autopipelines',
    'runningautopipelines',
    'events',
    '_events',
    '_eventscount',
    '_maxlisteners',
    '_readablestate',
    '_writablestate',
    'socket',
    'sockets',
    'redis',
    'ioredis',
    'subscriber',
    'blockingconnection',
    'repeat',
    'jobschdulers',
    'jobschedulers',
    'queue',
    'queues',
    'worker',
    'workers',
    'processor',
    'processors',
    'listeners',
    'domain',
    'parent',
    '_parent',
    'server',
    '_server',
  ];

  constructor(private readonly prisma: PrismaService) {}

  async registrar(dto: CreateAuditoriaDto) {
    try {
      return await this.prisma.auditoriaSistema.create({
        data: {
          empresaId: this.normalizarUuidOpcional(dto.empresaId),
          usuarioId: this.normalizarUuidOpcional(dto.usuarioId),
          clienteId: this.normalizarUuidOpcional(dto.clienteId),
          tipoUsuario: this.normalizarTipoUsuarioAuditoria(dto.tipoUsuario),
          acao: this.normalizarAcaoAuditoria(dto.acao, 'OUTRO'),
          modulo: dto.modulo,
          rota: dto.rota,
          metodoHttp: dto.metodoHttp,
          ip: dto.ip,
          userAgent: dto.userAgent,
          recurso: dto.recurso,
          recursoId: this.normalizarUuidOpcional(dto.recursoId),
          dadosAntes: this.sanitizarJson(dto.dadosAntes),
          dadosDepois: this.sanitizarJson(dto.dadosDepois),
          metadata: this.sanitizarJson(dto.metadata),
          status: this.normalizarStatusAuditoria(dto.status, 'SUCESSO'),
          mensagem: dto.mensagem,
        },
      });
    } catch (error) {
      this.logger.error(
        `[AUDITORIA] falha ao registrar auditoria: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );

      return null;
    }
  }

  async registrarSucesso(dto: CreateAuditoriaDto) {
    return this.registrar({
      ...dto,
      status: 'SUCESSO',
    });
  }

  async registrarFalha(dto: CreateAuditoriaDto) {
    return this.registrar({
      ...dto,
      status: 'FALHA',
    });
  }

  async registrarLoginAdmin(data: CreateAuditoriaDto) {
    return this.registrar({
      ...data,
      acao: 'LOGIN_ADMIN',
      modulo: data.modulo ?? 'AUTH',
      status: data.status ?? 'SUCESSO',
    });
  }

  async registrarLoginCliente(data: CreateAuditoriaDto) {
    return this.registrar({
      ...data,
      acao: 'LOGIN_CLIENTE',
      modulo: data.modulo ?? 'AUTH_CLIENTE',
      tipoUsuario: data.tipoUsuario ?? 'CLIENTE',
      status: data.status ?? 'SUCESSO',
    });
  }

  async registrarCriacao(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'CRIAR',
    });
  }

  async registrarAtualizacao(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'ATUALIZAR',
    });
  }

  async registrarExclusao(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'EXCLUIR',
    });
  }

  async registrarInativacao(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'INATIVAR',
    });
  }

  async registrarCancelamento(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'CANCELAR',
    });
  }

  async registrarConclusao(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'CONCLUIR',
    });
  }

  async registrarPagamento(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'PAGAR',
    });
  }

  async registrarUpload(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'UPLOAD',
    });
  }

  async registrarDownload(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'DOWNLOAD',
    });
  }

  async registrarVisualizacao(data: CreateAuditoriaDto) {
    return this.registrarSucesso({
      ...data,
      acao: 'VISUALIZAR',
    });
  }

  async registrarJob(data: CreateAuditoriaDto) {
    return this.registrar({
      ...data,
      modulo: data.modulo ?? 'BULLMQ',
      tipoUsuario: data.tipoUsuario ?? 'SISTEMA',
      acao: this.normalizarAcaoAuditoria(data.acao, 'PROCESSAR_JOB'),
      status: this.normalizarStatusAuditoria(data.status, 'SUCESSO'),
    });
  }

  async registrarCron(data: CreateAuditoriaDto) {
    return this.registrar({
      ...data,
      modulo: data.modulo ?? 'SCHEDULER',
      tipoUsuario: data.tipoUsuario ?? 'SISTEMA',
      acao: this.normalizarAcaoAuditoria(data.acao, 'CRON_EXECUTADO'),
      status: this.normalizarStatusAuditoria(data.status, 'SUCESSO'),
    });
  }

  async findAll(
    empresaId: string,
    filtros: FiltrosAuditoriaDto & {
      usuarioId?: string;
      clienteId?: string;
      recurso?: string;
      recursoId?: string;
    },
  ) {
    const page = Math.max(Number(filtros.page ?? 1), 1);
    const limit = Math.min(Math.max(Number(filtros.limit ?? 10), 1), 100);
    const skip = (page - 1) * limit;

    const where = this.montarWhere(empresaId, filtros);

    const [data, total] = await Promise.all([
      this.prisma.auditoriaSistema.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.auditoriaSistema.count({
        where,
      }),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(empresaId: string, id: string) {
    const auditoria = await this.prisma.auditoriaSistema.findFirst({
      where: {
        id,
        empresaId,
      },
    });

    if (!auditoria) {
      throw new NotFoundException('Registro de auditoria não encontrado.');
    }

    return auditoria;
  }

  async findByRecurso(
    empresaId: string,
    recurso: string,
    recursoId: string,
    filtros: FiltrosAuditoriaDto,
  ) {
    return this.findAll(empresaId, {
      ...filtros,
      recurso,
      recursoId,
    });
  }

  async findByUsuario(
    empresaId: string,
    usuarioId: string,
    filtros: FiltrosAuditoriaDto,
  ) {
    return this.findAll(empresaId, {
      ...filtros,
      usuarioId,
    });
  }

  async findByCliente(
    empresaId: string,
    clienteId: string,
    filtros: FiltrosAuditoriaDto,
  ) {
    return this.findAll(empresaId, {
      ...filtros,
      clienteId,
    });
  }

  async findByModulo(
    empresaId: string,
    modulo: string,
    filtros: FiltrosAuditoriaDto,
  ) {
    return this.findAll(empresaId, {
      ...filtros,
      modulo,
    });
  }

  async findByAcao(
    empresaId: string,
    acao: string,
    filtros: FiltrosAuditoriaDto,
  ) {
    return this.findAll(empresaId, {
      ...filtros,
      acao: this.normalizarAcaoAuditoria(acao, 'OUTRO'),
    });
  }

  private montarWhere(
    empresaId: string,
    filtros: FiltrosAuditoriaDto & {
      usuarioId?: string;
      clienteId?: string;
      recurso?: string;
      recursoId?: string;
    },
  ): Prisma.AuditoriaSistemaWhereInput {
    const where: Prisma.AuditoriaSistemaWhereInput = {
      empresaId,
    };

    if (filtros.modulo) {
      where.modulo = filtros.modulo;
    }

    if (filtros.acao) {
      where.acao = this.normalizarAcaoAuditoria(filtros.acao, 'OUTRO');
    }

    if (filtros.status) {
      where.status = this.normalizarStatusAuditoria(filtros.status, 'SUCESSO');
    }

    if (filtros.tipoUsuario) {
      where.tipoUsuario = this.normalizarTipoUsuarioAuditoria(
        filtros.tipoUsuario,
      );
    }

    if (filtros.usuarioId) {
      where.usuarioId = this.normalizarUuidOpcional(filtros.usuarioId);
    }

    if (filtros.clienteId) {
      where.clienteId = this.normalizarUuidOpcional(filtros.clienteId);
    }

    if (filtros.recurso) {
      where.recurso = filtros.recurso;
    }

    if (filtros.recursoId) {
      where.recursoId = this.normalizarUuidOpcional(filtros.recursoId);
    }

    if (filtros.ip) {
      where.ip = filtros.ip;
    }

    if (filtros.dataInicio || filtros.dataFim) {
      where.createdAt = {};

      if (filtros.dataInicio) {
        where.createdAt.gte = new Date(filtros.dataInicio);
      }

      if (filtros.dataFim) {
        where.createdAt.lte = new Date(filtros.dataFim);
      }
    }

    return where;
  }

  private normalizarUuidOpcional(valor?: string | null): string | undefined {
    if (!valor) {
      return undefined;
    }

    const valorLimpo = stringifyAuditValue(valor).trim();

    if (
      !valorLimpo ||
      valorLimpo === '-' ||
      valorLimpo.toLowerCase() === 'null' ||
      valorLimpo.toLowerCase() === 'undefined' ||
      valorLimpo === 'SCHEDULER_GLOBAL'
    ) {
      return undefined;
    }

    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (!uuidRegex.test(valorLimpo)) {
      return undefined;
    }

    return valorLimpo;
  }

  private normalizarAcaoAuditoria(
    valor: unknown,
    fallback: string,
  ): AcaoAuditoria {
    return this.normalizarValorEnum(AcaoAuditoria, valor, fallback, 'OUTRO');
  }

  private normalizarStatusAuditoria(
    valor: unknown,
    fallback: string,
  ): StatusAuditoria {
    return this.normalizarValorEnum(
      StatusAuditoria,
      valor,
      fallback,
      'SUCESSO',
    );
  }

  private normalizarTipoUsuarioAuditoria(
    valor: unknown,
  ): TipoUsuarioAuditoria | undefined {
    if (!valor) {
      return undefined;
    }

    const valoresPermitidos = Object.values(TipoUsuarioAuditoria) as string[];
    const valorNormalizado = stringifyAuditValue(valor).trim();

    if (!valoresPermitidos.includes(valorNormalizado)) {
      return undefined;
    }

    return valorNormalizado as TipoUsuarioAuditoria;
  }

  private normalizarValorEnum<T extends Record<string, string>>(
    enumObject: T,
    valor: unknown,
    fallbackPrincipal: string,
    fallbackSecundario: string,
  ): T[keyof T] {
    const valoresPermitidos = Object.values(enumObject);

    const valorNormalizado =
      valor === undefined || valor === null
        ? undefined
        : stringifyAuditValue(valor).trim();

    if (valorNormalizado && valoresPermitidos.includes(valorNormalizado)) {
      return valorNormalizado as T[keyof T];
    }

    if (valoresPermitidos.includes(fallbackPrincipal)) {
      return fallbackPrincipal as T[keyof T];
    }

    if (valoresPermitidos.includes(fallbackSecundario)) {
      return fallbackSecundario as T[keyof T];
    }

    return valoresPermitidos[0] as T[keyof T];
  }

  private sanitizarJson(payload: unknown): Prisma.InputJsonValue | undefined {
    const sanitizado = this.sanitizar(payload, new WeakSet<object>(), 0);

    if (sanitizado === undefined || sanitizado === null) {
      return undefined;
    }

    return sanitizado;
  }

  private sanitizar(
    payload: unknown,
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro | undefined {
    if (payload === undefined) {
      return undefined;
    }

    if (payload === null) {
      return null;
    }

    if (typeof payload === 'string') {
      return this.limitarString(payload);
    }

    if (typeof payload === 'number') {
      return Number.isFinite(payload) ? payload : null;
    }

    if (typeof payload === 'boolean') {
      return payload;
    }

    if (typeof payload === 'bigint') {
      return payload.toString();
    }

    if (typeof payload === 'function' || typeof payload === 'symbol') {
      return undefined;
    }

    if (payload instanceof Date) {
      return payload.toISOString();
    }

    if (payload instanceof Error) {
      return this.sanitizarError(payload, visitados, profundidade);
    }

    if (profundidade >= this.maxDepth) {
      return '[LIMITE_PROFUNDIDADE]';
    }

    if (typeof payload !== 'object') {
      return stringifyAuditValue(payload);
    }

    if (visitados.has(payload)) {
      return '[REFERENCIA_CIRCULAR]';
    }

    visitados.add(payload);

    if (Array.isArray(payload)) {
      return this.sanitizarArray(payload, visitados, profundidade);
    }

    if (payload instanceof Map) {
      return this.sanitizarMap(payload, visitados, profundidade);
    }

    if (payload instanceof Set) {
      return this.sanitizarSet(payload, visitados, profundidade);
    }

    const objeto = payload as Record<string, unknown>;

    if (this.pareceBullMqJob(objeto)) {
      return this.resumirBullMqJob(objeto, visitados, profundidade);
    }

    if (this.pareceBullMqQueue(objeto)) {
      return this.resumirBullMqQueue(objeto);
    }

    return this.sanitizarObjeto(objeto, visitados, profundidade);
  }

  private sanitizarArray(
    payload: unknown[],
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro[] {
    const itens = payload.slice(0, this.maxArrayItems);

    const resultado = itens
      .map((item) => this.sanitizar(item, visitados, profundidade + 1))
      .filter((item): item is JsonSeguro => item !== undefined);

    if (payload.length > this.maxArrayItems) {
      resultado.push(`[ARRAY_TRUNCADO_TOTAL_${payload.length}_ITENS]`);
    }

    return resultado;
  }

  private sanitizarMap(
    payload: Map<unknown, unknown>,
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro {
    const objeto: Record<string, unknown> = {};
    let contador = 0;

    for (const [key, value] of payload.entries()) {
      if (contador >= this.maxObjectKeys) {
        objeto.__truncado = `MAP_TRUNCADO_TOTAL_${payload.size}_ITENS`;
        break;
      }

      objeto[String(key)] = value;
      contador += 1;
    }

    return this.sanitizarObjeto(objeto, visitados, profundidade + 1);
  }

  private sanitizarSet(
    payload: Set<unknown>,
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro[] {
    return this.sanitizarArray(
      Array.from(payload),
      visitados,
      profundidade + 1,
    );
  }

  private sanitizarError(
    error: Error,
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro {
    const errorComCause = error as Error & {
      cause?: unknown;
      code?: unknown;
      status?: unknown;
      response?: unknown;
    };

    const objeto: Record<string, unknown> = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: errorComCause.code,
      status: errorComCause.status,
      response: errorComCause.response,
      cause: errorComCause.cause,
    };

    return this.sanitizarObjeto(objeto, visitados, profundidade + 1);
  }

  private sanitizarObjeto(
    payload: Record<string, unknown>,
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro {
    const resultado: Record<string, JsonSeguro> = {};

    const entradas = Object.entries(payload).slice(0, this.maxObjectKeys);

    for (const [key, value] of entradas) {
      const keyNormalizada = this.normalizarChave(key);

      if (this.deveRemoverCampoTecnico(keyNormalizada)) {
        resultado[key] = '[REMOVIDO_CAMPO_TECNICO]';
        continue;
      }

      if (this.deveMascararCampoSensivel(keyNormalizada)) {
        resultado[key] = '[REMOVIDO]';
        continue;
      }

      const valorSanitizado = this.sanitizar(
        value,
        visitados,
        profundidade + 1,
      );

      if (valorSanitizado !== undefined) {
        resultado[key] = valorSanitizado;
      }
    }

    const quantidadeTotal = Object.keys(payload).length;

    if (quantidadeTotal > this.maxObjectKeys) {
      resultado.__truncado = `OBJETO_TRUNCADO_TOTAL_${quantidadeTotal}_CHAVES`;
    }

    return resultado;
  }

  private pareceBullMqJob(payload: Record<string, unknown>): boolean {
    return (
      'id' in payload &&
      'name' in payload &&
      'data' in payload &&
      ('attemptsMade' in payload ||
        'queueName' in payload ||
        'opts' in payload ||
        'failedReason' in payload ||
        'stacktrace' in payload)
    );
  }

  private pareceBullMqQueue(payload: Record<string, unknown>): boolean {
    return (
      'name' in payload &&
      ('qualifiedName' in payload ||
        'jobsOpts' in payload ||
        'client' in payload ||
        'scripts' in payload ||
        'toKey' in payload)
    );
  }

  private resumirBullMqJob(
    payload: Record<string, unknown>,
    visitados: WeakSet<object>,
    profundidade: number,
  ): JsonSeguro {
    const resumo: Record<string, unknown> = {
      id: this.obterCampoSeguro(payload, 'id'),
      name: this.obterCampoSeguro(payload, 'name'),
      queueName:
        this.obterCampoSeguro(payload, 'queueName') ??
        this.obterNomeFilaDoJob(payload),
      attemptsMade: this.obterCampoSeguro(payload, 'attemptsMade'),
      attemptsStarted: this.obterCampoSeguro(payload, 'attemptsStarted'),
      progress: this.obterCampoSeguro(payload, 'progress'),
      delay: this.obterCampoSeguro(payload, 'delay'),
      timestamp: this.obterCampoSeguro(payload, 'timestamp'),
      processedOn: this.obterCampoSeguro(payload, 'processedOn'),
      finishedOn: this.obterCampoSeguro(payload, 'finishedOn'),
      failedReason: this.obterCampoSeguro(payload, 'failedReason'),
      stacktrace: this.obterCampoSeguro(payload, 'stacktrace'),
      data: this.obterCampoSeguro(payload, 'data'),
      opts: this.obterCampoSeguro(payload, 'opts'),
      returnvalue: this.obterCampoSeguro(payload, 'returnvalue'),
    };

    return this.sanitizarObjeto(resumo, visitados, profundidade + 1);
  }

  private resumirBullMqQueue(payload: Record<string, unknown>): JsonSeguro {
    return {
      name: this.converterParaJsonSeguroSimples(
        this.obterCampoSeguro(payload, 'name'),
      ),
      qualifiedName: this.converterParaJsonSeguroSimples(
        this.obterCampoSeguro(payload, 'qualifiedName'),
      ),
      prefix: this.converterParaJsonSeguroSimples(
        this.obterCampoSeguro(payload, 'prefix'),
      ),
      status: this.converterParaJsonSeguroSimples(
        this.obterCampoSeguro(payload, 'status'),
      ),
      tipo: 'BULLMQ_QUEUE_RESUMIDA',
    };
  }

  private obterNomeFilaDoJob(
    payload: Record<string, unknown>,
  ): string | undefined {
    const queue = this.obterCampoSeguro(payload, 'queue');

    if (!queue || typeof queue !== 'object') {
      return undefined;
    }

    const queueRecord = queue as Record<string, unknown>;
    const name = this.obterCampoSeguro(queueRecord, 'name');

    return typeof name === 'string' ? name : undefined;
  }

  private obterCampoSeguro(
    payload: Record<string, unknown>,
    campo: string,
  ): unknown {
    try {
      return payload[campo];
    } catch {
      return undefined;
    }
  }

  private converterParaJsonSeguroSimples(valor: unknown): JsonSeguro {
    if (valor === undefined || valor === null) {
      return null;
    }

    if (
      typeof valor === 'string' ||
      typeof valor === 'number' ||
      typeof valor === 'boolean'
    ) {
      return valor;
    }

    if (typeof valor === 'bigint') {
      return valor.toString();
    }

    return stringifyAuditValue(valor);
  }

  private limitarString(valor: string): string {
    if (valor.length <= this.maxStringLength) {
      return valor;
    }

    return `${valor.slice(0, this.maxStringLength)}...[STRING_TRUNCADA_TOTAL_${
      valor.length
    }_CARACTERES]`;
  }

  private normalizarChave(key: string): string {
    return key
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, '')
      .trim();
  }

  private deveMascararCampoSensivel(keyNormalizada: string): boolean {
    return this.camposSensiveis.some((campo) => keyNormalizada.includes(campo));
  }

  private deveRemoverCampoTecnico(keyNormalizada: string): boolean {
    return this.camposTecnicosBloqueados.includes(keyNormalizada);
  }
}
