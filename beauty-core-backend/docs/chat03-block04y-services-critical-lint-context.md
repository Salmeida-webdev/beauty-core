# Chat 03 - Bloco 04Y - Contexto do lint dos servicos criticos

- Arquivo: `test/unit/services-critical.coverage.spec.ts`
- Escopo: somente leitura; nenhum codigo foi alterado.
- Erros: 106
- Warnings: 5
- Exit code bruto do ESLint: 1

## Regras

- @typescript-eslint/require-await: 43
- @typescript-eslint/no-unsafe-member-access: 18
- @typescript-eslint/no-unsafe-return: 16
- @typescript-eslint/no-unsafe-assignment: 15
- @typescript-eslint/no-unsafe-call: 7
- @typescript-eslint/no-unsafe-argument: 5
- @typescript-eslint/no-require-imports: 3
- @typescript-eslint/no-unused-vars: 2
- @typescript-eslint/await-thenable: 1
- @typescript-eslint/no-redundant-type-constituents: 1

## Mensagens

- test/unit/services-critical.coverage.spec.ts:8:7 [error] @typescript-eslint/no-unused-vars - 'CHAT_33_2_STRONG_LOG_SILENCER' is assigned a value but never used.
  Codigo: const CHAT_33_2_STRONG_LOG_SILENCER = (() => {
- test/unit/services-critical.coverage.spec.ts:9:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const originalStdoutWrite = process.stdout.write.bind(process.stdout);
- test/unit/services-critical.coverage.spec.ts:10:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const originalStderrWrite = process.stderr.write.bind(process.stderr);
- test/unit/services-critical.coverage.spec.ts:32:60 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `((str: string | Uint8Array<ArrayBufferLike>, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | null | undefined) => void) | undefined) => boolean) | undefined`.
  Codigo: jest.spyOn(process.stdout, 'write').mockImplementation(((
- test/unit/services-critical.coverage.spec.ts:40:7 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return originalStdoutWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:40:14 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: return originalStdoutWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:43:60 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `((str: string | Uint8Array<ArrayBufferLike>, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | null | undefined) => void) | undefined) => boolean) | undefined`.
  Codigo: jest.spyOn(process.stderr, 'write').mockImplementation(((
- test/unit/services-critical.coverage.spec.ts:51:7 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return originalStderrWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:51:14 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: return originalStderrWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:55:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:55:22 [error] @typescript-eslint/no-require-imports - A `require()` style import is forbidden.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:56:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:56:29 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .Logger on an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:58:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: if (Logger && typeof Logger.overrideLogger === 'function') {
- test/unit/services-critical.coverage.spec.ts:60:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: Logger.overrideLogger(['error']);
- test/unit/services-critical.coverage.spec.ts:60:16 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: Logger.overrideLogger(['error']);
- test/unit/services-critical.coverage.spec.ts:75:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:75:22 [error] @typescript-eslint/no-require-imports - A `require()` style import is forbidden.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:76:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:76:29 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .Logger on an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:78:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: if (Logger && typeof Logger.overrideLogger === 'function') {
- test/unit/services-critical.coverage.spec.ts:79:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: Logger.overrideLogger(true);
- test/unit/services-critical.coverage.spec.ts:79:16 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: Logger.overrideLogger(true);
- test/unit/services-critical.coverage.spec.ts:91:7 [error] @typescript-eslint/no-unused-vars - 'EMPRESA_B' is assigned a value but never used.
  Codigo: const EMPRESA_B = '00000000-0000-4000-8000-000000000102';
- test/unit/services-critical.coverage.spec.ts:199:34 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: findUnique: jest.fn(async () => record),
- test/unit/services-critical.coverage.spec.ts:200:33 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: findFirst: jest.fn(async () => record),
- test/unit/services-critical.coverage.spec.ts:201:32 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: findMany: jest.fn(async () => [record]),
- test/unit/services-critical.coverage.spec.ts:202:29 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: count: jest.fn(async () => 1),
- test/unit/services-critical.coverage.spec.ts:203:33 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: aggregate: jest.fn(async () => ({
- test/unit/services-critical.coverage.spec.ts:208:31 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: groupBy: jest.fn(async () => [
- test/unit/services-critical.coverage.spec.ts:216:40 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: create: jest.fn(async (args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:216:44 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: create: jest.fn(async (args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:218:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .data on an `any` value.
  Codigo: ...(args?.data ?? {}),
- test/unit/services-critical.coverage.spec.ts:220:34 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: createMany: jest.fn(async () => ({ count: 1 })),
- test/unit/services-critical.coverage.spec.ts:221:40 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: update: jest.fn(async (args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:221:44 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: update: jest.fn(async (args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:223:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .data on an `any` value.
  Codigo: ...(args?.data ?? {}),
- test/unit/services-critical.coverage.spec.ts:225:34 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: updateMany: jest.fn(async () => ({ count: 1 })),
- test/unit/services-critical.coverage.spec.ts:226:30 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: delete: jest.fn(async () => record),
- test/unit/services-critical.coverage.spec.ts:227:34 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: deleteMany: jest.fn(async () => ({ count: 1 })),
- test/unit/services-critical.coverage.spec.ts:228:40 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: upsert: jest.fn(async (args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:228:44 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: upsert: jest.fn(async (args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:230:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .create on an `any` value.
  Codigo: ...(args?.create ?? {}),
- test/unit/services-critical.coverage.spec.ts:231:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .update on an `any` value.
  Codigo: ...(args?.update ?? {}),
- test/unit/services-critical.coverage.spec.ts:250:15 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return input(prisma);
- test/unit/services-critical.coverage.spec.ts:250:22 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: return input(prisma);
- test/unit/services-critical.coverage.spec.ts:257:13 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return input;
- test/unit/services-critical.coverage.spec.ts:261:58 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: if (prop === '$connect') return jest.fn(async () => undefined);
- test/unit/services-critical.coverage.spec.ts:262:61 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: if (prop === '$disconnect') return jest.fn(async () => undefined);
- test/unit/services-critical.coverage.spec.ts:263:61 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: if (prop === '$executeRaw') return jest.fn(async () => 1);
- test/unit/services-critical.coverage.spec.ts:264:59 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: if (prop === '$queryRaw') return jest.fn(async () => []);
- test/unit/services-critical.coverage.spec.ts:265:64 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: if (prop === '$runCommandRaw') return jest.fn(async () => ({}));
- test/unit/services-critical.coverage.spec.ts:271:9 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return delegates.get(prop);
- test/unit/services-critical.coverage.spec.ts:276:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return prisma;
- test/unit/services-critical.coverage.spec.ts:295:7 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return values[key] ?? fallback ?? 'test-value';
- test/unit/services-critical.coverage.spec.ts:299:33 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: signAsync: jest.fn(async () => 'token-test'),
- test/unit/services-critical.coverage.spec.ts:301:33 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: registrar: jest.fn(async () => null),
- test/unit/services-critical.coverage.spec.ts:302:42 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: registrarAuditoria: jest.fn(async () => null),
- test/unit/services-critical.coverage.spec.ts:304:36 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: adicionarJob: jest.fn(async () => ({ id: 'job-test' })),
- test/unit/services-critical.coverage.spec.ts:305:44 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: adicionarNotificacao: jest.fn(async () => ({ id: 'job-test' })),
- test/unit/services-critical.coverage.spec.ts:306:41 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: adicionarWhatsapp: jest.fn(async () => ({ id: 'job-test' })),
- test/unit/services-critical.coverage.spec.ts:307:41 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: adicionarCampanha: jest.fn(async () => ({ id: 'job-test' })),
- test/unit/services-critical.coverage.spec.ts:308:42 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: adicionarRelatorio: jest.fn(async () => ({ id: 'job-test' })),
- test/unit/services-critical.coverage.spec.ts:310:39 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: processarEvento: jest.fn(async () => null),
- test/unit/services-critical.coverage.spec.ts:311:37 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: podeNotificar: jest.fn(async () => true),
- test/unit/services-critical.coverage.spec.ts:313:43 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: validarEmpresaAtiva: jest.fn(async () => createRecord({ id: EMPRESA_A })),
- test/unit/services-critical.coverage.spec.ts:314:38 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: validarEmpresa: jest.fn(async () => createRecord({ id: EMPRESA_A })),
- test/unit/services-critical.coverage.spec.ts:315:45 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: validarRecursoEmpresa: jest.fn(async () => createRecord()),
- test/unit/services-critical.coverage.spec.ts:316:45 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: validarUsuarioEmpresa: jest.fn(async () => createRecord()),
- test/unit/services-critical.coverage.spec.ts:317:45 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: validarClienteEmpresa: jest.fn(async () => createRecord()),
- test/unit/services-critical.coverage.spec.ts:318:37 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: validarTenant: jest.fn(async () => true),
- test/unit/services-critical.coverage.spec.ts:320:35 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: criarSessao: jest.fn(async () => ({
- test/unit/services-critical.coverage.spec.ts:324:46 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: rotacionarRefreshToken: jest.fn(async () => ({
- test/unit/services-critical.coverage.spec.ts:328:37 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: revogarSessao: jest.fn(async () => true),
- test/unit/services-critical.coverage.spec.ts:329:43 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: revogarTodasSessoes: jest.fn(async () => true),
- test/unit/services-critical.coverage.spec.ts:331:30 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: salvar: jest.fn(async () => createRecord()),
- test/unit/services-critical.coverage.spec.ts:332:30 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: upload: jest.fn(async () => createRecord()),
- test/unit/services-critical.coverage.spec.ts:333:32 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: download: jest.fn(async () => Buffer.from('test')),
- test/unit/services-critical.coverage.spec.ts:334:40 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: gerarUrlAssinada: jest.fn(async () => 'http://localhost/signed/test'),
- test/unit/services-critical.coverage.spec.ts:337:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return new Proxy(base, {
- test/unit/services-critical.coverage.spec.ts:342:9 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return target[prop];
- test/unit/services-critical.coverage.spec.ts:342:23 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [prop] on an `any` value.
  Codigo: return target[prop];
- test/unit/services-critical.coverage.spec.ts:345:35 [error] @typescript-eslint/require-await - Async arrow function has no 'await' expression.
  Codigo: const fn = jest.fn(async () => null);
- test/unit/services-critical.coverage.spec.ts:346:14 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [prop] on an `any` value.
  Codigo: target[prop] = fn;
- test/unit/services-critical.coverage.spec.ts:352:51 [error] @typescript-eslint/no-redundant-type-constituents - 'any' overrides all other types in this union type.
  Codigo: function loadServiceClass(target: TargetService): any | null {
- test/unit/services-critical.coverage.spec.ts:354:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const mod = require(target.path);
- test/unit/services-critical.coverage.spec.ts:354:17 [error] @typescript-eslint/no-require-imports - A `require()` style import is forbidden.
  Codigo: const mod = require(target.path);
- test/unit/services-critical.coverage.spec.ts:356:20 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [target.exportName] on an `any` value.
  Codigo: if (typeof mod[target.exportName] === 'function') {
- test/unit/services-critical.coverage.spec.ts:357:18 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [target.exportName] on an `any` value.
  Codigo: return mod[target.exportName];
- test/unit/services-critical.coverage.spec.ts:360:39 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
  Codigo: const serviceLike = Object.values(mod).find(
- test/unit/services-critical.coverage.spec.ts:363:22 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .name on an `any` value.
  Codigo: String(value.name ?? '').includes('Service'),
- test/unit/services-critical.coverage.spec.ts:369:21 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
  Codigo: Object.values(mod).find((value: any) => typeof value === 'function') ??
- test/unit/services-critical.coverage.spec.ts:378:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const prisma = createPrismaMock();
- test/unit/services-critical.coverage.spec.ts:379:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const dependency = createDependencyMock();
- test/unit/services-critical.coverage.spec.ts:381:36 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `number`.
  Codigo: const dependencyCount = Math.max(ServiceClass.length || 0, 8);
- test/unit/services-critical.coverage.spec.ts:381:49 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .length on an `any` value.
  Codigo: const dependencyCount = Math.max(ServiceClass.length || 0, 8);
- test/unit/services-critical.coverage.spec.ts:383:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: index === 0 ? prisma : dependency,
- test/unit/services-critical.coverage.spec.ts:386:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return new ServiceClass(...args);
- test/unit/services-critical.coverage.spec.ts:386:10 [error] @typescript-eslint/no-unsafe-call - Unsafe construction of an `any` typed value.
  Codigo: return new ServiceClass(...args);
- test/unit/services-critical.coverage.spec.ts:392:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [name] on an `any` value.
  Codigo: .filter((name) => typeof instance[name] === 'function');
- test/unit/services-critical.coverage.spec.ts:485:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `Promise<any>`.
  Codigo: return Promise.race([
- test/unit/services-critical.coverage.spec.ts:495:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const ServiceClass = loadServiceClass(target);
- test/unit/services-critical.coverage.spec.ts:499:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const instance = createServiceInstance(ServiceClass);
- test/unit/services-critical.coverage.spec.ts:505:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const ServiceClass = loadServiceClass(target);
- test/unit/services-critical.coverage.spec.ts:506:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const instance = createServiceInstance(ServiceClass);
- test/unit/services-critical.coverage.spec.ts:513:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const ServiceClass = loadServiceClass(target);
- test/unit/services-critical.coverage.spec.ts:514:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const instance = createServiceInstance(ServiceClass);
- test/unit/services-critical.coverage.spec.ts:522:13 [error] @typescript-eslint/await-thenable - Unexpected `await` of a non-Promise (non-"Thenable") value.
  Codigo: await expect(async () => {
- test/unit/services-critical.coverage.spec.ts:524:44 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: await runWithTimeout(() => instance[method](...args));
- test/unit/services-critical.coverage.spec.ts:524:44 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: await runWithTimeout(() => instance[method](...args));
- test/unit/services-critical.coverage.spec.ts:524:53 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [method] on an `any` value.
  Codigo: await runWithTimeout(() => instance[method](...args));
