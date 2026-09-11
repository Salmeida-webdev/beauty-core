# Chat 04 - Bloco 30 - Contexto Lint Producao

Data da execucao: 2026-09-09 18:38:06 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816

## Preservacao

- Status preservado: 296
- Staged: 0
- git diff --check: exit 0
- git diff --cached --check: exit 0

## Findings e contexto

### src/queues/services/dead-letter-queue.service.ts

Findings: 40

- linha 69, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 71, coluna 26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarJob on an `any` value.
- linha 72, coluna 15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 72, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarJob on an `any` value.
- linha 76, coluna 26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrar on an `any` value.
- linha 77, coluna 15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 77, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrar on an `any` value.
- linha 81, coluna 26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .criar on an `any` value.
- linha 82, coluna 15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 82, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .criar on an `any` value.
- linha 86, coluna 26 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarAuditoria on an `any` value.
- linha 87, coluna 15 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 87, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .registrarAuditoria on an `any` value.
- linha 119, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 138, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 138, coluna 28 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .empresaId on an `any` value.
- linha 139, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 139, coluna 28 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .usuarioId on an `any` value.
- linha 140, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 140, coluna 28 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .clienteId on an `any` value.
- linha 166, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 182, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 184, coluna 45 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `string`.
- linha 184, coluna 50 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalQueue on an `any` value.
- linha 185, coluna 39 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalJobId on an `any` value.
- linha 202, coluna 7 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `string`.
- linha 202, coluna 12 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalName on an `any` value.
- linha 204, coluna 17 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- linha 205, coluna 9 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 206, coluna 20 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- linha 218, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 218, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- linha 219, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 219, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- linha 220, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 220, coluna 23 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalData on an `any` value.
- linha 229, coluna 9 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 229, coluna 29 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalQueue on an `any` value.
- linha 236, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 236, coluna 27 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .originalQueue on an `any` value.

#### Trechos

```typescript
    67 |   private async registrarAuditoriaSegura(payload: Record<string, any>) {
    68 |     try {
>>  69 |       const service = this.auditoriaService as any;
    70 |
    71 |       if (typeof service.registrarJob === 'function') {
```

```typescript
    69 |       const service = this.auditoriaService as any;
    70 |
>>  71 |       if (typeof service.registrarJob === 'function') {
    72 |         await service.registrarJob(payload);
    73 |         return;
```

```typescript
    70 |
    71 |       if (typeof service.registrarJob === 'function') {
>>  72 |         await service.registrarJob(payload);
    73 |         return;
    74 |       }
```

```typescript
    74 |       }
    75 |
>>  76 |       if (typeof service.registrar === 'function') {
    77 |         await service.registrar(payload);
    78 |         return;
```

```typescript
    75 |
    76 |       if (typeof service.registrar === 'function') {
>>  77 |         await service.registrar(payload);
    78 |         return;
    79 |       }
```

```typescript
    79 |       }
    80 |
>>  81 |       if (typeof service.criar === 'function') {
    82 |         await service.criar(payload);
    83 |         return;
```

```typescript
    80 |
    81 |       if (typeof service.criar === 'function') {
>>  82 |         await service.criar(payload);
    83 |         return;
    84 |       }
```

```typescript
    84 |       }
    85 |
>>  86 |       if (typeof service.registrarAuditoria === 'function') {
    87 |         await service.registrarAuditoria(payload);
    88 |       }
```

```typescript
    85 |
    86 |       if (typeof service.registrarAuditoria === 'function') {
>>  87 |         await service.registrarAuditoria(payload);
    88 |       }
    89 |     } catch (error) {
```

```typescript
   117 |       originalJobId: String(job.id),
   118 |       originalName: job.name,
>> 119 |       originalData: job.data,
   120 |       originalOpts: job.opts,
   121 |       failedReason: error.message,
```

```typescript
   136 |
   137 |     await this.registrarAuditoriaSegura({
>> 138 |       empresaId: job.data?.empresaId,
   139 |       usuarioId: job.data?.usuarioId,
   140 |       clienteId: job.data?.clienteId,
```

```typescript
   137 |     await this.registrarAuditoriaSegura({
   138 |       empresaId: job.data?.empresaId,
>> 139 |       usuarioId: job.data?.usuarioId,
   140 |       clienteId: job.data?.clienteId,
   141 |       acao: 'JOB_DLQ',
```

```typescript
   138 |       empresaId: job.data?.empresaId,
   139 |       usuarioId: job.data?.usuarioId,
>> 140 |       clienteId: job.data?.clienteId,
   141 |       acao: 'JOB_DLQ',
   142 |       status: 'FALHA',
```

```typescript
   164 |       id: job.id,
   165 |       name: job.name,
>> 166 |       data: job.data,
   167 |       attemptsMade: job.attemptsMade,
   168 |       failedReason: job.failedReason,
```

```typescript
   180 |     }
   181 |
>> 182 |     const data = dlqJob.data;
   183 |
   184 |     const sourceQueue = this.getQueueByName(data.originalQueue);
```

```typescript
   182 |     const data = dlqJob.data;
   183 |
>> 184 |     const sourceQueue = this.getQueueByName(data.originalQueue);
   185 |     const originalJobId = String(data.originalJobId);
   186 |
```

```typescript
   183 |
   184 |     const sourceQueue = this.getQueueByName(data.originalQueue);
>> 185 |     const originalJobId = String(data.originalJobId);
   186 |
   187 |     const originalJob = await sourceQueue.getJob(originalJobId);
```

```typescript
   200 |
   201 |     const newJob = await sourceQueue.add(
>> 202 |       data.originalName,
   203 |       {
   204 |         ...data.originalData,
```

```typescript
   202 |       data.originalName,
   203 |       {
>> 204 |         ...data.originalData,
   205 |         metadata: {
   206 |           ...(data.originalData?.metadata ?? {}),
```

```typescript
   203 |       {
   204 |         ...data.originalData,
>> 205 |         metadata: {
   206 |           ...(data.originalData?.metadata ?? {}),
   207 |           reprocessado: true,
```

```typescript
   204 |         ...data.originalData,
   205 |         metadata: {
>> 206 |           ...(data.originalData?.metadata ?? {}),
   207 |           reprocessado: true,
   208 |           dlqJobId: jobId,
```

```typescript
   216 |
   217 |     await this.registrarAuditoriaSegura({
>> 218 |       empresaId: data.originalData?.empresaId,
   219 |       usuarioId: data.originalData?.usuarioId,
   220 |       clienteId: data.originalData?.clienteId,
```

```typescript
   217 |     await this.registrarAuditoriaSegura({
   218 |       empresaId: data.originalData?.empresaId,
>> 219 |       usuarioId: data.originalData?.usuarioId,
   220 |       clienteId: data.originalData?.clienteId,
   221 |       acao: 'JOB_REPROCESSADO',
```

```typescript
   218 |       empresaId: data.originalData?.empresaId,
   219 |       usuarioId: data.originalData?.usuarioId,
>> 220 |       clienteId: data.originalData?.clienteId,
   221 |       acao: 'JOB_REPROCESSADO',
   222 |       status: 'SUCESSO',
```

```typescript
   227 |       metadata: {
   228 |         dlqJobId: jobId,
>> 229 |         originalQueue: data.originalQueue,
   230 |         originalJobId,
   231 |       },
```

```typescript
   234 |     return {
   235 |       message: 'Job reprocessado com sucesso.',
>> 236 |       originalQueue: data.originalQueue,
   237 |       jobId: newJob.id,
   238 |     };
```

#### Ocorrencias textuais de any

- 67: private async registrarAuditoriaSegura(payload: Record<string, any>) {
- 69: const service = this.auditoriaService as any;

### src/lgpd/lgpd.service.ts

Findings: 33

- linha 117, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 117, coluna 38 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 117, coluna 59 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .cliente on an `any` value.
- linha 135, coluna 45 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `Record<string, unknown>`.
- linha 212, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 212, coluna 49 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .codigoAcessoCliente on an `any` value.
- linha 214, coluna 25 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .updateMany on an `any` value.
- linha 216, coluna 15 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 216, coluna 30 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 216, coluna 45 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .updateMany on an `any` value.
- linha 229, coluna 47 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .count on an `any` value.
- linha 252, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 252, coluna 27 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 252, coluna 48 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .cliente on an `any` value.
- linha 260, coluna 34 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .empresaId on an `any` value.
- linha 266, coluna 5 [@typescript-eslint/no-unsafe-return] Unsafe return of a value of type `any`.
- linha 273, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 273, coluna 43 [@typescript-eslint/no-unsafe-member-access] Unsafe member access [modelName] on an `any` value.
- linha 275, coluna 38 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .findMany on an `any` value.
- linha 280, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 280, coluna 26 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 280, coluna 35 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .findMany on an `any` value.
- linha 286, coluna 32 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `Record<string, unknown>[]`.
- linha 289, coluna 15 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 289, coluna 28 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 289, coluna 37 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .findMany on an `any` value.
- linha 294, coluna 34 [@typescript-eslint/no-unsafe-argument] Unsafe argument of type `any` assigned to a parameter of type `Record<string, unknown>[]`.
- linha 331, coluna 23 [@typescript-eslint/no-unused-vars] '_modelName' is defined but never used.
- linha 459, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 459, coluna 43 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .auditoriaSistema on an `any` value.
- linha 461, coluna 38 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .create on an `any` value.
- linha 466, coluna 13 [@typescript-eslint/no-unsafe-call] Unsafe call of an `any` typed value.
- linha 466, coluna 22 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .create on an `any` value.

#### Trechos

```typescript
   115 |     }
   116 |
>> 117 |     const clienteAnonimizado = await (this.prisma as any).cliente.update({
   118 |       where: { id: clienteId },
   119 |       data,
```

```typescript
   133 |       request,
   134 |       dadosAntes: this.maskClienteForAudit(cliente),
>> 135 |       dadosDepois: this.maskClienteForAudit(clienteAnonimizado),
   136 |       mensagem:
   137 |         'Anonimizacao LGPD de cliente realizada com preservacao de integridade financeira e auditoria.',
```

```typescript
   210 |     const updates: Record<string, unknown> = {};
   211 |
>> 212 |     const codigoDelegate = (this.prisma as any).codigoAcessoCliente;
   213 |
   214 |     if (codigoDelegate?.updateMany) {
```

```typescript
   212 |     const codigoDelegate = (this.prisma as any).codigoAcessoCliente;
   213 |
>> 214 |     if (codigoDelegate?.updateMany) {
   215 |       try {
   216 |         const result = await codigoDelegate.updateMany({
```

```typescript
   214 |     if (codigoDelegate?.updateMany) {
   215 |       try {
>> 216 |         const result = await codigoDelegate.updateMany({
   217 |           where: { clienteId, empresaId },
   218 |           data: {
```

```typescript
   227 |         });
   228 |
>> 229 |         updates.codigoAcessoCliente = result?.count ?? 0;
   230 |       } catch {
   231 |         updates.codigoAcessoCliente = 'IGNORADO';
```

```typescript
   250 |         };
   251 |
>> 252 |     const cliente = await (this.prisma as any).cliente.findFirst({
   253 |       where,
   254 |     });
```

```typescript
   258 |     }
   259 |
>> 260 |     if (!isSuperAdmin && cliente.empresaId !== empresaId) {
   261 |       throw new ForbiddenException(
   262 |         'Cliente nao pertence a empresa do usuario autenticado.',
```

```typescript
   264 |     }
   265 |
>> 266 |     return cliente;
   267 |   }
   268 |
```

```typescript
   271 |     where: Record<string, unknown>,
   272 |   ): Promise<Record<string, unknown>[]> {
>> 273 |     const delegate = (this.prisma as any)[modelName];
   274 |
   275 |     if (!delegate || typeof delegate.findMany !== 'function') {
```

```typescript
   273 |     const delegate = (this.prisma as any)[modelName];
   274 |
>> 275 |     if (!delegate || typeof delegate.findMany !== 'function') {
   276 |       return [];
   277 |     }
```

```typescript
   278 |
   279 |     try {
>> 280 |       const rows = await delegate.findMany({
   281 |         where,
   282 |         orderBy: this.safeOrderBy(modelName),
```

```typescript
   284 |       });
   285 |
>> 286 |       return this.sanitizeRows(rows);
   287 |     } catch {
   288 |       try {
```

```typescript
   287 |     } catch {
   288 |       try {
>> 289 |         const rows = await delegate.findMany({
   290 |           where,
   291 |           take: this.exportTakeLimit(),
```

```typescript
   292 |         });
   293 |
>> 294 |         return this.sanitizeRows(rows);
   295 |       } catch {
   296 |         return [];
```

```typescript
   329 |     return Math.min(Math.floor(value), 10000);
   330 |   }
>> 331 |   private safeOrderBy(_modelName: string) {
   332 |     return {
   333 |       createdAt: 'desc',
```

```typescript
   457 |     mensagem: string;
   458 |   }) {
>> 459 |     const delegate = (this.prisma as any).auditoriaSistema;
   460 |
   461 |     if (!delegate || typeof delegate.create !== 'function') {
```

```typescript
   459 |     const delegate = (this.prisma as any).auditoriaSistema;
   460 |
>> 461 |     if (!delegate || typeof delegate.create !== 'function') {
   462 |       return;
   463 |     }
```

```typescript
   464 |
   465 |     try {
>> 466 |       await delegate.create({
   467 |         data: {
   468 |           empresaId: params.empresaId,
```

#### Ocorrencias textuais de any

- 117: const clienteAnonimizado = await (this.prisma as any).cliente.update({
- 212: const codigoDelegate = (this.prisma as any).codigoAcessoCliente;
- 252: const cliente = await (this.prisma as any).cliente.findFirst({
- 273: const delegate = (this.prisma as any)[modelName];
- 459: const delegate = (this.prisma as any).auditoriaSistema;

### src/common/interceptors/audit-log.interceptor.ts

Findings: 31

- linha 43, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 50, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 50, coluna 29 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .empresaId on an `any` value.
- linha 52, coluna 58 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .role on an `any` value.
- linha 54, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 54, coluna 53 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .sub on an `any` value.
- linha 54, coluna 66 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .id on an `any` value.
- linha 55, coluna 11 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 56, coluna 16 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .clienteId on an `any` value.
- linha 56, coluna 35 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .sub on an `any` value.
- linha 56, coluna 48 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .id on an `any` value.
- linha 57, coluna 15 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .clienteId on an `any` value.
- linha 69, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 70, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 71, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 72, coluna 7 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 72, coluna 19 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .role on an `any` value.
- linha 95, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 96, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 97, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 99, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 127, coluna 20 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .message on an `any` value.
- linha 133, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 134, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 135, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 137, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 147, coluna 15 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 147, coluna 34 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .status on an `any` value.
- linha 150, coluna 13 [@typescript-eslint/no-unsafe-assignment] Unsafe assignment of an `any` value.
- linha 150, coluna 30 [@typescript-eslint/no-unsafe-member-access] Unsafe member access .message on an `any` value.
- linha 154, coluna 33 [@typescript-eslint/no-unsafe-return] Unsafe return of a value of type `any`.

#### Trechos

```typescript
    41 |     const startedAt = Date.now();
    42 |
>>  43 |     const user = getRequestUser(request);
    44 |
    45 |     const rota = getRequestRoute(request);
```

```typescript
    48 |     const userAgent = getRequestUserAgent(request);
    49 |
>>  50 |     const empresaId = user?.empresaId;
    51 |     const tipoUsuario = getTipoUsuarioAuditoria(user);
    52 |     const isCliente = tipoUsuario === 'CLIENTE' || user?.role === 'CLIENTE';
```

```typescript
    50 |     const empresaId = user?.empresaId;
    51 |     const tipoUsuario = getTipoUsuarioAuditoria(user);
>>  52 |     const isCliente = tipoUsuario === 'CLIENTE' || user?.role === 'CLIENTE';
    53 |
    54 |     const usuarioId = isCliente ? undefined : user?.sub || user?.id;
```

```typescript
    52 |     const isCliente = tipoUsuario === 'CLIENTE' || user?.role === 'CLIENTE';
    53 |
>>  54 |     const usuarioId = isCliente ? undefined : user?.sub || user?.id;
    55 |     const clienteId = isCliente
    56 |       ? (user?.clienteId ?? user?.sub ?? user?.id)
```

```typescript
    53 |
    54 |     const usuarioId = isCliente ? undefined : user?.sub || user?.id;
>>  55 |     const clienteId = isCliente
    56 |       ? (user?.clienteId ?? user?.sub ?? user?.id)
    57 |       : user?.clienteId;
```

```typescript
    54 |     const usuarioId = isCliente ? undefined : user?.sub || user?.id;
    55 |     const clienteId = isCliente
>>  56 |       ? (user?.clienteId ?? user?.sub ?? user?.id)
    57 |       : user?.clienteId;
    58 |
```

```typescript
    55 |     const clienteId = isCliente
    56 |       ? (user?.clienteId ?? user?.sub ?? user?.id)
>>  57 |       : user?.clienteId;
    58 |
    59 |     const contextData = this.requestContext.getContext();
```

```typescript
    67 |       requestId,
    68 |       correlationId,
>>  69 |       empresaId,
    70 |       usuarioId,
    71 |       clienteId,
```

```typescript
    68 |       correlationId,
    69 |       empresaId,
>>  70 |       usuarioId,
    71 |       clienteId,
    72 |       role: user?.role,
```

```typescript
    69 |       empresaId,
    70 |       usuarioId,
>>  71 |       clienteId,
    72 |       role: user?.role,
    73 |       method: metodoHttp,
```

```typescript
    70 |       usuarioId,
    71 |       clienteId,
>>  72 |       role: user?.role,
    73 |       method: metodoHttp,
    74 |       route: rota,
```

```typescript
    93 |         if (this.deveAuditar(rota, metodoHttp)) {
    94 |           void this.auditoriaService.registrarSucesso({
>>  95 |             empresaId,
    96 |             usuarioId,
    97 |             clienteId,
```

```typescript
    94 |           void this.auditoriaService.registrarSucesso({
    95 |             empresaId,
>>  96 |             usuarioId,
    97 |             clienteId,
    98 |             tipoUsuario,
```

```typescript
    95 |             empresaId,
    96 |             usuarioId,
>>  97 |             clienteId,
    98 |             tipoUsuario,
    99 |             acao: this.mapearAcao(metodoHttp, rota),
```

```typescript
    97 |             clienteId,
    98 |             tipoUsuario,
>>  99 |             acao: this.mapearAcao(metodoHttp, rota),
   100 |             modulo: this.mapearModulo(rota),
   101 |             rota,
```

```typescript
   125 |             clienteId ?? '-'
   126 |           } status=FALHA tempoMs=${tempoMs} erro=${
>> 127 |             error?.message ?? 'Erro desconhecido'
   128 |           }`,
   129 |         );
```

```typescript
   131 |         if (this.deveAuditar(rota, metodoHttp)) {
   132 |           void this.auditoriaService.registrarFalha({
>> 133 |             empresaId,
   134 |             usuarioId,
   135 |             clienteId,
```

```typescript
   132 |           void this.auditoriaService.registrarFalha({
   133 |             empresaId,
>> 134 |             usuarioId,
   135 |             clienteId,
   136 |             tipoUsuario,
```

```typescript
   133 |             empresaId,
   134 |             usuarioId,
>> 135 |             clienteId,
   136 |             tipoUsuario,
   137 |             acao: this.mapearAcao(metodoHttp, rota),
```

```typescript
   135 |             clienteId,
   136 |             tipoUsuario,
>> 137 |             acao: this.mapearAcao(metodoHttp, rota),
   138 |             modulo: this.mapearModulo(rota),
   139 |             rota,
```

```typescript
   145 |               correlationId: correlationId ?? null,
   146 |               tempoMs,
>> 147 |               statusCode: error?.status,
   148 |             },
   149 |             tempoMs,
```

```typescript
   148 |             },
   149 |             tempoMs,
>> 150 |             mensagem: error?.message ?? 'Falha durante requisição HTTP.',
   151 |           });
   152 |         }
```

```typescript
   152 |         }
   153 |
>> 154 |         return throwError(() => error);
   155 |       }),
   156 |     );
```

#### Ocorrencias textuais de any

- 38: intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
- 199: private mapearAcao(metodoHttp: string, rota: string): any {

**READY-FOR-TYPED-PRODUCTION-CORRECTION**

- Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
