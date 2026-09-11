# Chat 04 - Bloco 31 - Inspecao de Contratos da Correcao de Producao

Data da execucao: 2026-09-09 18:42:05 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816

## Preservacao

- Status preservado: 296
- Staged: 0

## Conteudo estrutural

### src/queues/services/dead-letter-queue.service.ts

#### Imports, tipos, construtor e assinaturas

```typescript
   1 | import {
   2 |   BadRequestException,
   3 |   Inject,
   4 |   Injectable,
   5 |   Logger,
   6 |   NotFoundException,
   7 | } from '@nestjs/common';
   8 | import { ConfigService } from '@nestjs/config';
   9 | import { Job, Queue } from 'bullmq';
  10 |
  11 | import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
  12 | import {
  13 |   ANIVERSARIOS_QUEUE_PROVIDER,
  14 |   CAMPANHAS_QUEUE_PROVIDER,
  15 |   DLQ_QUEUE_PROVIDER,
  16 |   NOTIFICACOES_QUEUE_PROVIDER,
  17 |   RELATORIOS_QUEUE_PROVIDER,
  18 |   WHATSAPP_QUEUE_PROVIDER,
  19 | } from '../constants/queue-names';
  20 | import { getEnterpriseJobOptions } from '../utils/queue-options.util';
  21 |
  22 | @Injectable()
  23 | export class DeadLetterQueueService {
  24 |   private readonly logger = new Logger(DeadLetterQueueService.name);
  25 |
  26 |   constructor(
  27 |     @Inject(DLQ_QUEUE_PROVIDER)
  28 |     private readonly dlqQueue: Queue,
  29 |
  30 |     @Inject(NOTIFICACOES_QUEUE_PROVIDER)
  31 |     private readonly notificacoesQueue: Queue,
  32 |
  33 |     @Inject(WHATSAPP_QUEUE_PROVIDER)
  34 |     private readonly whatsappQueue: Queue,
  35 |
  36 |     @Inject(CAMPANHAS_QUEUE_PROVIDER)
  37 |     private readonly campanhasQueue: Queue,
  38 |
  39 |     @Inject(ANIVERSARIOS_QUEUE_PROVIDER)
  40 |     private readonly aniversariosQueue: Queue,
  41 |
  42 |     @Inject(RELATORIOS_QUEUE_PROVIDER)
  43 |     private readonly relatoriosQueue: Queue,
  44 |
  45 |     private readonly auditoriaService: AuditoriaService,
  46 |     private readonly configService: ConfigService,
  49 |   private getQueueByName(queueName: string): Queue {
  60 |     if (!queue) {
  67 |   private async registrarAuditoriaSegura(payload: Record<string, any>) {
  71 |       if (typeof service.registrarJob === 'function') {
  76 |       if (typeof service.registrar === 'function') {
  81 |       if (typeof service.criar === 'function') {
  86 |       if (typeof service.registrarAuditoria === 'function') {
  98 |   async moveToDlq(params: { sourceQueue: string; job: Job; error: Error }) {
 104 |     if (attemptsMade < attempts) {
 111 |     if (exists) {
 130 |       getEnterpriseJobOptions(this.configService, dlqJobId),
 153 |   async listarDlq(limit = 50) {
 175 |   async reprocessar(jobId: string) {
 178 |     if (!dlqJob) {
 189 |     if (originalJob) {
 192 |       if (['active', 'waiting', 'delayed'].includes(state)) {
 212 |       getEnterpriseJobOptions(this.configService, originalJobId),
```

#### Trechos de implementacao relevantes

##### Linhas 60-95

```typescript
  60 |     if (!queue) {
  61 |       throw new BadRequestException(`Fila original invÃ¡lida: ${queueName}`);
  62 |     }
  63 |
  64 |     return queue;
  65 |   }
  66 |
  67 |   private async registrarAuditoriaSegura(payload: Record<string, any>) {
  68 |     try {
  69 |       const service = this.auditoriaService as any;
  70 |
  71 |       if (typeof service.registrarJob === 'function') {
  72 |         await service.registrarJob(payload);
  73 |         return;
  74 |       }
  75 |
  76 |       if (typeof service.registrar === 'function') {
  77 |         await service.registrar(payload);
  78 |         return;
  79 |       }
  80 |
  81 |       if (typeof service.criar === 'function') {
  82 |         await service.criar(payload);
  83 |         return;
  84 |       }
  85 |
  86 |       if (typeof service.registrarAuditoria === 'function') {
  87 |         await service.registrarAuditoria(payload);
  88 |       }
  89 |     } catch (error) {
  90 |       this.logger.warn(
  91 |         `[AUDITORIA_DLQ] falha ao registrar auditoria: ${
  92 |           error instanceof Error ? error.message : 'erro_desconhecido'
  93 |         }`,
  94 |       );
  95 |     }
```

##### Linhas 105-145

```typescript
 105 |       return null;
 106 |     }
 107 |
 108 |     const dlqJobId = `dlq:${sourceQueue}:${job.id}`;
 109 |     const exists = await this.dlqQueue.getJob(dlqJobId);
 110 |
 111 |     if (exists) {
 112 |       return exists;
 113 |     }
 114 |
 115 |     const payload = {
 116 |       originalQueue: sourceQueue,
 117 |       originalJobId: String(job.id),
 118 |       originalName: job.name,
 119 |       originalData: job.data,
 120 |       originalOpts: job.opts,
 121 |       failedReason: error.message,
 122 |       stacktrace: job.stacktrace,
 123 |       attemptsMade,
 124 |       movedToDlqAt: new Date().toISOString(),
 125 |     };
 126 |
 127 |     const dlqJob = await this.dlqQueue.add(
 128 |       'dead-letter-job',
 129 |       payload,
 130 |       getEnterpriseJobOptions(this.configService, dlqJobId),
 131 |     );
 132 |
 133 |     this.logger.error(
 134 |       `[DLQ] job movido sourceQueue=${sourceQueue} originalJobId=${job.id} dlqJobId=${dlqJob.id}`,
 135 |     );
 136 |
 137 |     await this.registrarAuditoriaSegura({
 138 |       empresaId: job.data?.empresaId,
 139 |       usuarioId: job.data?.usuarioId,
 140 |       clienteId: job.data?.clienteId,
 141 |       acao: 'JOB_DLQ',
 142 |       status: 'FALHA',
 143 |       modulo: 'BULLMQ_DLQ',
 144 |       recurso: 'BullMQJob',
 145 |       recursoId: String(job.id),
```

##### Linhas 158-240

```typescript
 158 |       0,
 159 |       safeLimit - 1,
 160 |       false,
 161 |     );
 162 |
 163 |     return jobs.map((job) => ({
 164 |       id: job.id,
 165 |       name: job.name,
 166 |       data: job.data,
 167 |       attemptsMade: job.attemptsMade,
 168 |       failedReason: job.failedReason,
 169 |       timestamp: job.timestamp,
 170 |       processedOn: job.processedOn,
 171 |       finishedOn: job.finishedOn,
 172 |     }));
 173 |   }
 174 |
 175 |   async reprocessar(jobId: string) {
 176 |     const dlqJob = await this.dlqQueue.getJob(jobId);
 177 |
 178 |     if (!dlqJob) {
 179 |       throw new NotFoundException('Job nÃ£o encontrado na DLQ.');
 180 |     }
 181 |
 182 |     const data = dlqJob.data;
 183 |
 184 |     const sourceQueue = this.getQueueByName(data.originalQueue);
 185 |     const originalJobId = String(data.originalJobId);
 186 |
 187 |     const originalJob = await sourceQueue.getJob(originalJobId);
 188 |
 189 |     if (originalJob) {
 190 |       const state = await originalJob.getState();
 191 |
 192 |       if (['active', 'waiting', 'delayed'].includes(state)) {
 193 |         throw new BadRequestException(
 194 |           `Job original ainda estÃ¡ em estado ${state}. Reprocessamento bloqueado para evitar duplicidade.`,
 195 |         );
 196 |       }
 197 |
 198 |       await originalJob.remove();
 199 |     }
 200 |
 201 |     const newJob = await sourceQueue.add(
 202 |       data.originalName,
 203 |       {
 204 |         ...data.originalData,
 205 |         metadata: {
 206 |           ...(data.originalData?.metadata ?? {}),
 207 |           reprocessado: true,
 208 |           dlqJobId: jobId,
 209 |           reprocessadoEm: new Date().toISOString(),
 210 |         },
 211 |       },
 212 |       getEnterpriseJobOptions(this.configService, originalJobId),
 213 |     );
 214 |
 215 |     await dlqJob.remove();
 216 |
 217 |     await this.registrarAuditoriaSegura({
 218 |       empresaId: data.originalData?.empresaId,
 219 |       usuarioId: data.originalData?.usuarioId,
 220 |       clienteId: data.originalData?.clienteId,
 221 |       acao: 'JOB_REPROCESSADO',
 222 |       status: 'SUCESSO',
 223 |       modulo: 'BULLMQ_DLQ',
 224 |       recurso: 'BullMQJob',
 225 |       recursoId: String(newJob.id),
 226 |       mensagem: 'Job reprocessado a partir da DLQ.',
 227 |       metadata: {
 228 |         dlqJobId: jobId,
 229 |         originalQueue: data.originalQueue,
 230 |         originalJobId,
 231 |       },
 232 |     });
 233 |
 234 |     return {
 235 |       message: 'Job reprocessado com sucesso.',
 236 |       originalQueue: data.originalQueue,
 237 |       jobId: newJob.id,
 238 |     };
 239 |   }
 240 | }
```

### src/lgpd/lgpd.service.ts

#### Imports, tipos, construtor e assinaturas

```typescript
   1 | import {
   2 |   ForbiddenException,
   3 |   Injectable,
   4 |   NotFoundException,
   5 | } from '@nestjs/common';
   6 |
   7 | import { PrismaService } from '../database/prisma/prisma.service';
   8 |
   9 | type LgpdRequestContext = {
  10 |   user?: {
  11 |     id?: string;
  12 |     sub?: string;
  13 |     usuarioId?: string;
  14 |     role?: string;
  15 |     empresaId?: string | null;
  16 |   };
  17 |   ip?: string;
  18 |   originalUrl?: string;
  19 |   url?: string;
  20 |   headers?: Record<string, string | string[] | undefined>;
  21 | };
  22 |
  23 | @Injectable()
  24 | export class LgpdService {
  25 |   constructor(private readonly prisma: PrismaService) {}
  26 |
  27 |   async exportarCliente(clienteId: string, request: LgpdRequestContext) {
  28 |     const cliente = await this.getClienteOrThrow(clienteId, request);
  29 |     const empresaId = cliente.empresaId as string;
  30 |     const where = { clienteId, empresaId };
  31 |
  32 |     const agendamentos = await this.findManySafe('agendamento', where);
  33 |     const notificacoes = await this.findManySafe('notificacao', where);
  34 |     const mensagensWhatsApp = await this.findManySafe(
  35 |       'mensagemWhatsApp',
  36 |       where,
  37 |     );
  38 |     const arquivos = await this.findManySafe('arquivo', where);
  39 |     const sessoes = await this.findManySafe('sessao', where);
  40 |
  41 |     const pontos = {
  42 |       fidelidade: await this.findManyFromModels(
  43 |         [
  44 |           'fidelidade',
  45 |           'historicoFidelidade',
 104 |   async anonimizarCliente(clienteId: string, request: LgpdRequestContext) {
 111 |     if (Object.keys(data).length === 0) {
 152 |   private buildClienteAnonData(
 193 |   private setIfExists(
 199 |     if (Object.prototype.hasOwnProperty.call(source, field)) {
 204 |   private async anonimizarDadosRelacionados(
 214 |     if (codigoDelegate?.updateMany) {
 238 |   private async getClienteOrThrow(
 256 |     if (!cliente) {
 260 |     if (!isSuperAdmin && cliente.empresaId !== empresaId) {
 269 |   private async findManySafe(
 275 |     if (!delegate || typeof delegate.findMany !== 'function') {
 301 |   private async findManyFromModels(
 307 |     for (const modelName of modelNames) {
 310 |       if (rows.length > 0) {
 318 |   private sanitizeRows(rows: Record<string, unknown>[]) {
 322 |   private exportTakeLimit() {
 325 |     if (!Number.isFinite(value) || value <= 0) {
 331 |   private safeOrderBy(_modelName: string) {
 337 |   private isSuperAdmin(request: LgpdRequestContext): boolean {
 341 |   private getEmpresaId(request: LgpdRequestContext): string | null {
 345 |   private getUsuarioId(request: LgpdRequestContext): string | null {
 346 |     return (
 351 |   private getUserAgent(request: LgpdRequestContext): string | null {
 354 |     if (Array.isArray(value)) {
 361 |   private createAnonToken(clienteId: string): string {
 365 |     return (base || 'cliente') + suffix;
 368 |   private createNumericAnonValue(input: string, length: number): string {
 371 |     for (const char of input) {
 377 |     for (let index = 0; index < length; index++) {
 385 |   private removeTechnicalSecrets(data: Record<string, unknown>) {
 406 |       if (Array.isArray(value)) {
 410 |       if (!value || typeof value !== 'object') {
 414 |       if (value instanceof Date) {
 420 |       for (const [key, nestedValue] of Object.entries(
 423 |         if (technicalFields.has(key)) {
 436 |   private maskClienteForAudit(data: Record<string, unknown>) {
 450 |   private async registrarAuditoria(params: {
 461 |     if (!delegate || typeof delegate.create !== 'function') {
```

#### Trechos de implementacao relevantes

##### Linhas 100-145

```typescript
 100 |
 101 |     return payload;
 102 |   }
 103 |
 104 |   async anonimizarCliente(clienteId: string, request: LgpdRequestContext) {
 105 |     const cliente = await this.getClienteOrThrow(clienteId, request);
 106 |     const empresaId = cliente.empresaId as string;
 107 |     const token = this.createAnonToken(clienteId);
 108 |
 109 |     const data = this.buildClienteAnonData(cliente, token, clienteId);
 110 |
 111 |     if (Object.keys(data).length === 0) {
 112 |       throw new ForbiddenException(
 113 |         'Nenhum campo anonimizavel foi encontrado no modelo Cliente.',
 114 |       );
 115 |     }
 116 |
 117 |     const clienteAnonimizado = await (this.prisma as any).cliente.update({
 118 |       where: { id: clienteId },
 119 |       data,
 120 |     });
 121 |
 122 |     const relatedUpdates = await this.anonimizarDadosRelacionados(
 123 |       clienteId,
 124 |       empresaId,
 125 |       token,
 126 |       data,
 127 |     );
 128 |
 129 |     await this.registrarAuditoria({
 130 |       acao: 'LGPD_ANONIMIZACAO',
 131 |       clienteId,
 132 |       empresaId,
 133 |       request,
 134 |       dadosAntes: this.maskClienteForAudit(cliente),
 135 |       dadosDepois: this.maskClienteForAudit(clienteAnonimizado),
 136 |       mensagem:
 137 |         'Anonimizacao LGPD de cliente realizada com preservacao de integridade financeira e auditoria.',
 138 |     });
 139 |
 140 |     return {
 141 |       success: true,
 142 |       clienteId,
 143 |       empresaId,
 144 |       anonimizadoEm: new Date().toISOString(),
 145 |       camposAnonimizados: Object.keys(data),
```

##### Linhas 200-305

```typescript
 200 |       target[field] = value;
 201 |     }
 202 |   }
 203 |
 204 |   private async anonimizarDadosRelacionados(
 205 |     clienteId: string,
 206 |     empresaId: string,
 207 |     token: string,
 208 |     clienteData: Record<string, unknown>,
 209 |   ) {
 210 |     const updates: Record<string, unknown> = {};
 211 |
 212 |     const codigoDelegate = (this.prisma as any).codigoAcessoCliente;
 213 |
 214 |     if (codigoDelegate?.updateMany) {
 215 |       try {
 216 |         const result = await codigoDelegate.updateMany({
 217 |           where: { clienteId, empresaId },
 218 |           data: {
 219 |             telefone:
 220 |               typeof clienteData.telefone === 'string'
 221 |                 ? clienteData.telefone
 222 |                 : 'anon-' + token,
 223 |             codigo: 'HASHED',
 224 |             codigoHash: null,
 225 |             usado: true,
 226 |           },
 227 |         });
 228 |
 229 |         updates.codigoAcessoCliente = result?.count ?? 0;
 230 |       } catch {
 231 |         updates.codigoAcessoCliente = 'IGNORADO';
 232 |       }
 233 |     }
 234 |
 235 |     return updates;
 236 |   }
 237 |
 238 |   private async getClienteOrThrow(
 239 |     clienteId: string,
 240 |     request: LgpdRequestContext,
 241 |   ): Promise<Record<string, unknown>> {
 242 |     const empresaId = this.getEmpresaId(request);
 243 |     const isSuperAdmin = this.isSuperAdmin(request);
 244 |
 245 |     const where = isSuperAdmin
 246 |       ? { id: clienteId }
 247 |       : {
 248 |           id: clienteId,
 249 |           empresaId,
 250 |         };
 251 |
 252 |     const cliente = await (this.prisma as any).cliente.findFirst({
 253 |       where,
 254 |     });
 255 |
 256 |     if (!cliente) {
 257 |       throw new NotFoundException('Cliente nao encontrado.');
 258 |     }
 259 |
 260 |     if (!isSuperAdmin && cliente.empresaId !== empresaId) {
 261 |       throw new ForbiddenException(
 262 |         'Cliente nao pertence a empresa do usuario autenticado.',
 263 |       );
 264 |     }
 265 |
 266 |     return cliente;
 267 |   }
 268 |
 269 |   private async findManySafe(
 270 |     modelName: string,
 271 |     where: Record<string, unknown>,
 272 |   ): Promise<Record<string, unknown>[]> {
 273 |     const delegate = (this.prisma as any)[modelName];
 274 |
 275 |     if (!delegate || typeof delegate.findMany !== 'function') {
 276 |       return [];
 277 |     }
 278 |
 279 |     try {
 280 |       const rows = await delegate.findMany({
 281 |         where,
 282 |         orderBy: this.safeOrderBy(modelName),
 283 |         take: this.exportTakeLimit(),
 284 |       });
 285 |
 286 |       return this.sanitizeRows(rows);
 287 |     } catch {
 288 |       try {
 289 |         const rows = await delegate.findMany({
 290 |           where,
 291 |           take: this.exportTakeLimit(),
 292 |         });
 293 |
 294 |         return this.sanitizeRows(rows);
 295 |       } catch {
 296 |         return [];
 297 |       }
 298 |     }
 299 |   }
 300 |
 301 |   private async findManyFromModels(
 302 |     modelNames: string[],
 303 |     where: Record<string, unknown>,
 304 |   ): Promise<Record<string, Record<string, unknown>[]>> {
 305 |     const result: Record<string, Record<string, unknown>[]> = {};
```

##### Linhas 320-340

```typescript
 320 |   }
 321 |
 322 |   private exportTakeLimit() {
 323 |     const value = Number(process.env.LGPD_EXPORT_MAX_ITEMS ?? 5000);
 324 |
 325 |     if (!Number.isFinite(value) || value <= 0) {
 326 |       return 5000;
 327 |     }
 328 |
 329 |     return Math.min(Math.floor(value), 10000);
 330 |   }
 331 |   private safeOrderBy(_modelName: string) {
 332 |     return {
 333 |       createdAt: 'desc',
 334 |     };
 335 |   }
 336 |
 337 |   private isSuperAdmin(request: LgpdRequestContext): boolean {
 338 |     return request.user?.role === 'SUPER_ADMIN';
 339 |   }
 340 |
```

##### Linhas 450-475

```typescript
 450 |   private async registrarAuditoria(params: {
 451 |     acao: string;
 452 |     clienteId: string;
 453 |     empresaId: string;
 454 |     request: LgpdRequestContext;
 455 |     dadosAntes?: Record<string, unknown>;
 456 |     dadosDepois?: Record<string, unknown>;
 457 |     mensagem: string;
 458 |   }) {
 459 |     const delegate = (this.prisma as any).auditoriaSistema;
 460 |
 461 |     if (!delegate || typeof delegate.create !== 'function') {
 462 |       return;
 463 |     }
 464 |
 465 |     try {
 466 |       await delegate.create({
 467 |         data: {
 468 |           empresaId: params.empresaId,
 469 |           usuarioId: this.getUsuarioId(params.request),
 470 |           clienteId: params.clienteId,
 471 |           tipoUsuario: 'ADMIN',
 472 |           acao: params.acao,
 473 |           modulo: 'LGPD',
 474 |           rota: params.request.originalUrl ?? params.request.url ?? null,
 475 |           ip: params.request.ip ?? null,
```

### src/common/interceptors/audit-log.interceptor.ts

#### Imports, tipos, construtor e assinaturas

```typescript
   1 | import {
   2 |   CallHandler,
   3 |   ExecutionContext,
   4 |   Injectable,
   5 |   Logger,
   6 |   NestInterceptor,
   7 | } from '@nestjs/common';
   8 |
   9 | import type { Request } from 'express';
  10 | import { Observable, catchError, tap, throwError } from 'rxjs';
  11 |
  12 | import { AuditoriaService } from '../../modules/auditoria/auditoria.service';
  13 | import { RequestContextService } from '../context/request-context.service';
  14 |
  15 | import {
  16 |   getRequestIp,
  17 |   getRequestMethod,
  18 |   getRequestRoute,
  19 |   getRequestUser,
  20 |   getRequestUserAgent,
  21 |   getTipoUsuarioAuditoria,
  22 | } from '../utils/audit-request.util';
  23 |
  24 | type RequestWithContextIds = Request & {
  25 |   requestId?: string;
  26 |   correlationId?: string;
  27 | };
  28 |
  29 | @Injectable()
  30 | export class AuditLogInterceptor implements NestInterceptor {
  31 |   private readonly logger = new Logger(AuditLogInterceptor.name);
  32 |
  33 |   constructor(
  34 |     private readonly auditoriaService: AuditoriaService,
  35 |     private readonly requestContext: RequestContextService,
  36 |   ) {}
  37 |
  38 |   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  39 |     const request = context.switchToHttp().getRequest<RequestWithContextIds>();
  40 |
  41 |     const startedAt = Date.now();
  42 |
  43 |     const user = getRequestUser(request);
  44 |
  45 |     const rota = getRequestRoute(request);
  80 |       tap(() => {
  93 |         if (this.deveAuditar(rota, metodoHttp)) {
 116 |       catchError((error) => {
 131 |         if (this.deveAuditar(rota, metodoHttp)) {
 159 |   private deveAuditar(rota: string, metodoHttp: string): boolean {
 160 |     if (!rota) return false;
 162 |     if (rota.startsWith('/health')) return false;
 164 |     if (rota.startsWith('/auditoria')) return false;
 166 |     if (rota.startsWith('/scheduler/status')) return false;
 168 |     if (metodoHttp === 'GET') return false;
 173 |   private mapearModulo(rota: string): string {
 176 |     if (!partes.length) {
 180 |     if (partes[0] === 'auth-cliente') {
 184 |     if (partes[0] === 'auth') {
 188 |     if (partes[0] === 'mensagens-whatsapp') {
 192 |     if (partes[0] === 'campanhas-whatsapp') {
 199 |   private mapearAcao(metodoHttp: string, rota: string): any {
 200 |     if (rota.includes('/auth-cliente/verificar-codigo')) {
 204 |     if (rota.includes('/auth/login')) {
 208 |     if (rota.includes('/solicitar-codigo')) {
 212 |     if (rota.includes('/verificar-codigo')) {
 216 |     if (rota.includes('/aceitar-termos')) {
 220 |     if (rota.includes('/cancelar')) {
 224 |     if (rota.includes('/concluir')) {
 228 |     if (rota.includes('/pagar')) {
 232 |     if (rota.includes('/inativar')) {
 236 |     if (rota.includes('/upload') || rota.includes('/arquivos')) {
 240 |     if (metodoHttp === 'POST') {
 244 |     if (metodoHttp === 'PATCH' || metodoHttp === 'PUT') {
 248 |     if (metodoHttp === 'DELETE') {
```

#### Trechos de implementacao relevantes

##### Linhas 30-80

```typescript
  30 | export class AuditLogInterceptor implements NestInterceptor {
  31 |   private readonly logger = new Logger(AuditLogInterceptor.name);
  32 |
  33 |   constructor(
  34 |     private readonly auditoriaService: AuditoriaService,
  35 |     private readonly requestContext: RequestContextService,
  36 |   ) {}
  37 |
  38 |   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  39 |     const request = context.switchToHttp().getRequest<RequestWithContextIds>();
  40 |
  41 |     const startedAt = Date.now();
  42 |
  43 |     const user = getRequestUser(request);
  44 |
  45 |     const rota = getRequestRoute(request);
  46 |     const metodoHttp = getRequestMethod(request);
  47 |     const ip = getRequestIp(request);
  48 |     const userAgent = getRequestUserAgent(request);
  49 |
  50 |     const empresaId = user?.empresaId;
  51 |     const tipoUsuario = getTipoUsuarioAuditoria(user);
  52 |     const isCliente = tipoUsuario === 'CLIENTE' || user?.role === 'CLIENTE';
  53 |
  54 |     const usuarioId = isCliente ? undefined : user?.sub || user?.id;
  55 |     const clienteId = isCliente
  56 |       ? (user?.clienteId ?? user?.sub ?? user?.id)
  57 |       : user?.clienteId;
  58 |
  59 |     const contextData = this.requestContext.getContext();
  60 |
  61 |     const requestId = contextData?.requestId ?? request.requestId;
  62 |
  63 |     const correlationId =
  64 |       contextData?.correlationId ?? request.correlationId ?? requestId;
  65 |
  66 |     this.requestContext.setContextData({
  67 |       requestId,
  68 |       correlationId,
  69 |       empresaId,
  70 |       usuarioId,
  71 |       clienteId,
  72 |       role: user?.role,
  73 |       method: metodoHttp,
  74 |       route: rota,
  75 |       ip,
  76 |       userAgent,
  77 |     });
  78 |
  79 |     return next.handle().pipe(
  80 |       tap(() => {
```

##### Linhas 88-160

```typescript
  88 |           } usuarioId=${usuarioId ?? '-'} clienteId=${
  89 |             clienteId ?? '-'
  90 |           } status=SUCESSO tempoMs=${tempoMs}`,
  91 |         );
  92 |
  93 |         if (this.deveAuditar(rota, metodoHttp)) {
  94 |           void this.auditoriaService.registrarSucesso({
  95 |             empresaId,
  96 |             usuarioId,
  97 |             clienteId,
  98 |             tipoUsuario,
  99 |             acao: this.mapearAcao(metodoHttp, rota),
 100 |             modulo: this.mapearModulo(rota),
 101 |             rota,
 102 |             metodoHttp,
 103 |             ip,
 104 |             userAgent,
 105 |             metadata: {
 106 |               requestId: requestId ?? null,
 107 |               correlationId: correlationId ?? null,
 108 |               tempoMs,
 109 |             },
 110 |             tempoMs,
 111 |             mensagem: 'Requisição HTTP executada com sucesso.',
 112 |           });
 113 |         }
 114 |       }),
 115 |
 116 |       catchError((error) => {
 117 |         const tempoMs = Date.now() - startedAt;
 118 |
 119 |         this.logger.error(
 120 |           `[HTTP] requestId=${requestId ?? '-'} correlationId=${
 121 |             correlationId ?? '-'
 122 |           } metodo=${metodoHttp} rota=${rota} empresaId=${
 123 |             empresaId ?? '-'
 124 |           } usuarioId=${usuarioId ?? '-'} clienteId=${
 125 |             clienteId ?? '-'
 126 |           } status=FALHA tempoMs=${tempoMs} erro=${
 127 |             error?.message ?? 'Erro desconhecido'
 128 |           }`,
 129 |         );
 130 |
 131 |         if (this.deveAuditar(rota, metodoHttp)) {
 132 |           void this.auditoriaService.registrarFalha({
 133 |             empresaId,
 134 |             usuarioId,
 135 |             clienteId,
 136 |             tipoUsuario,
 137 |             acao: this.mapearAcao(metodoHttp, rota),
 138 |             modulo: this.mapearModulo(rota),
 139 |             rota,
 140 |             metodoHttp,
 141 |             ip,
 142 |             userAgent,
 143 |             metadata: {
 144 |               requestId: requestId ?? null,
 145 |               correlationId: correlationId ?? null,
 146 |               tempoMs,
 147 |               statusCode: error?.status,
 148 |             },
 149 |             tempoMs,
 150 |             mensagem: error?.message ?? 'Falha durante requisição HTTP.',
 151 |           });
 152 |         }
 153 |
 154 |         return throwError(() => error);
 155 |       }),
 156 |     );
 157 |   }
 158 |
 159 |   private deveAuditar(rota: string, metodoHttp: string): boolean {
 160 |     if (!rota) return false;
```

##### Linhas 185-210

```typescript
 185 |       return 'AUTH';
 186 |     }
 187 |
 188 |     if (partes[0] === 'mensagens-whatsapp') {
 189 |       return 'WHATSAPP';
 190 |     }
 191 |
 192 |     if (partes[0] === 'campanhas-whatsapp') {
 193 |       return 'WHATSAPP';
 194 |     }
 195 |
 196 |     return partes[0].replace(/-/g, '_').toUpperCase();
 197 |   }
 198 |
 199 |   private mapearAcao(metodoHttp: string, rota: string): any {
 200 |     if (rota.includes('/auth-cliente/verificar-codigo')) {
 201 |       return 'LOGIN_CLIENTE';
 202 |     }
 203 |
 204 |     if (rota.includes('/auth/login')) {
 205 |       return 'LOGIN_ADMIN';
 206 |     }
 207 |
 208 |     if (rota.includes('/solicitar-codigo')) {
 209 |       return 'SOLICITAR_CODIGO';
 210 |     }
```

## Resultado

**READY-FOR-CONTRACT-TYPED-CORRECTION**

- Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
