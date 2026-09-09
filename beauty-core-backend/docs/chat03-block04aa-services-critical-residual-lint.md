# Chat 03 - Bloco 04AA - Lint residual dos servicos criticos

- Arquivo: `test/unit/services-critical.coverage.spec.ts`
- Escopo: somente leitura; nenhum codigo foi alterado.
- Erros: 61
- Warnings: 5
- Exit code bruto do ESLint: 1

## Regras

- @typescript-eslint/no-unsafe-member-access: 18
- @typescript-eslint/no-unsafe-return: 16
- @typescript-eslint/no-unsafe-assignment: 15
- @typescript-eslint/no-unsafe-call: 7
- @typescript-eslint/no-unsafe-argument: 5
- @typescript-eslint/no-require-imports: 3
- @typescript-eslint/await-thenable: 1
- @typescript-eslint/no-redundant-type-constituents: 1

## Mensagens

- test/unit/services-critical.coverage.spec.ts:17:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const originalStdoutWrite = process.stdout.write.bind(process.stdout);
- test/unit/services-critical.coverage.spec.ts:18:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const originalStderrWrite = process.stderr.write.bind(process.stderr);
- test/unit/services-critical.coverage.spec.ts:40:60 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `((str: string | Uint8Array<ArrayBufferLike>, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | null | undefined) => void) | undefined) => boolean) | undefined`.
  Codigo: jest.spyOn(process.stdout, 'write').mockImplementation(((
- test/unit/services-critical.coverage.spec.ts:48:7 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return originalStdoutWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:48:14 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: return originalStdoutWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:51:60 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `((str: string | Uint8Array<ArrayBufferLike>, encoding?: BufferEncoding | undefined, cb?: ((err?: Error | null | undefined) => void) | undefined) => boolean) | undefined`.
  Codigo: jest.spyOn(process.stderr, 'write').mockImplementation(((
- test/unit/services-critical.coverage.spec.ts:59:7 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return originalStderrWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:59:14 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: return originalStderrWrite(chunk as any, ...(args as any));
- test/unit/services-critical.coverage.spec.ts:63:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:63:22 [error] @typescript-eslint/no-require-imports - A `require()` style import is forbidden.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:64:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:64:29 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .Logger on an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:66:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: if (Logger && typeof Logger.overrideLogger === 'function') {
- test/unit/services-critical.coverage.spec.ts:68:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: Logger.overrideLogger(['error']);
- test/unit/services-critical.coverage.spec.ts:68:16 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: Logger.overrideLogger(['error']);
- test/unit/services-critical.coverage.spec.ts:83:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:83:22 [error] @typescript-eslint/no-require-imports - A `require()` style import is forbidden.
  Codigo: const common = require('@nestjs/common');
- test/unit/services-critical.coverage.spec.ts:84:13 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:84:29 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .Logger on an `any` value.
  Codigo: const Logger = common.Logger;
- test/unit/services-critical.coverage.spec.ts:86:35 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: if (Logger && typeof Logger.overrideLogger === 'function') {
- test/unit/services-critical.coverage.spec.ts:87:9 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: Logger.overrideLogger(true);
- test/unit/services-critical.coverage.spec.ts:87:16 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .overrideLogger on an `any` value.
  Codigo: Logger.overrideLogger(true);
- test/unit/services-critical.coverage.spec.ts:226:40 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: create: asyncMock((args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:228:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .data on an `any` value.
  Codigo: ...(args?.data ?? {}),
- test/unit/services-critical.coverage.spec.ts:231:40 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: update: asyncMock((args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:233:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .data on an `any` value.
  Codigo: ...(args?.data ?? {}),
- test/unit/services-critical.coverage.spec.ts:238:40 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: upsert: asyncMock((args?: any) => ({
- test/unit/services-critical.coverage.spec.ts:240:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .create on an `any` value.
  Codigo: ...(args?.create ?? {}),
- test/unit/services-critical.coverage.spec.ts:241:17 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .update on an `any` value.
  Codigo: ...(args?.update ?? {}),
- test/unit/services-critical.coverage.spec.ts:260:15 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return input(prisma);
- test/unit/services-critical.coverage.spec.ts:260:22 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: return input(prisma);
- test/unit/services-critical.coverage.spec.ts:267:13 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return input;
- test/unit/services-critical.coverage.spec.ts:281:9 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return delegates.get(prop);
- test/unit/services-critical.coverage.spec.ts:286:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return prisma;
- test/unit/services-critical.coverage.spec.ts:305:7 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return values[key] ?? fallback ?? 'test-value';
- test/unit/services-critical.coverage.spec.ts:347:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return new Proxy(base, {
- test/unit/services-critical.coverage.spec.ts:352:9 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return target[prop];
- test/unit/services-critical.coverage.spec.ts:352:23 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [prop] on an `any` value.
  Codigo: return target[prop];
- test/unit/services-critical.coverage.spec.ts:356:14 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [prop] on an `any` value.
  Codigo: target[prop] = fn;
- test/unit/services-critical.coverage.spec.ts:362:51 [error] @typescript-eslint/no-redundant-type-constituents - 'any' overrides all other types in this union type.
  Codigo: function loadServiceClass(target: TargetService): any | null {
- test/unit/services-critical.coverage.spec.ts:364:11 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const mod = require(target.path);
- test/unit/services-critical.coverage.spec.ts:364:17 [error] @typescript-eslint/no-require-imports - A `require()` style import is forbidden.
  Codigo: const mod = require(target.path);
- test/unit/services-critical.coverage.spec.ts:366:20 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [target.exportName] on an `any` value.
  Codigo: if (typeof mod[target.exportName] === 'function') {
- test/unit/services-critical.coverage.spec.ts:367:18 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [target.exportName] on an `any` value.
  Codigo: return mod[target.exportName];
- test/unit/services-critical.coverage.spec.ts:370:39 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
  Codigo: const serviceLike = Object.values(mod).find(
- test/unit/services-critical.coverage.spec.ts:373:22 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .name on an `any` value.
  Codigo: String(value.name ?? '').includes('Service'),
- test/unit/services-critical.coverage.spec.ts:379:21 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `{ [s: string]: unknown; } | ArrayLike<unknown>`.
  Codigo: Object.values(mod).find((value: any) => typeof value === 'function') ??
- test/unit/services-critical.coverage.spec.ts:388:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const prisma = createPrismaMock();
- test/unit/services-critical.coverage.spec.ts:389:9 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const dependency = createDependencyMock();
- test/unit/services-critical.coverage.spec.ts:391:36 [warning] @typescript-eslint/no-unsafe-argument - Unsafe argument of type `any` assigned to a parameter of type `number`.
  Codigo: const dependencyCount = Math.max(ServiceClass.length || 0, 8);
- test/unit/services-critical.coverage.spec.ts:391:49 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access .length on an `any` value.
  Codigo: const dependencyCount = Math.max(ServiceClass.length || 0, 8);
- test/unit/services-critical.coverage.spec.ts:393:5 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: index === 0 ? prisma : dependency,
- test/unit/services-critical.coverage.spec.ts:396:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: return new ServiceClass(...args);
- test/unit/services-critical.coverage.spec.ts:396:10 [error] @typescript-eslint/no-unsafe-call - Unsafe construction of an `any` typed value.
  Codigo: return new ServiceClass(...args);
- test/unit/services-critical.coverage.spec.ts:402:39 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [name] on an `any` value.
  Codigo: .filter((name) => typeof instance[name] === 'function');
- test/unit/services-critical.coverage.spec.ts:495:3 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `Promise<any>`.
  Codigo: return Promise.race([
- test/unit/services-critical.coverage.spec.ts:505:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const ServiceClass = loadServiceClass(target);
- test/unit/services-critical.coverage.spec.ts:509:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const instance = createServiceInstance(ServiceClass);
- test/unit/services-critical.coverage.spec.ts:515:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const ServiceClass = loadServiceClass(target);
- test/unit/services-critical.coverage.spec.ts:516:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const instance = createServiceInstance(ServiceClass);
- test/unit/services-critical.coverage.spec.ts:523:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const ServiceClass = loadServiceClass(target);
- test/unit/services-critical.coverage.spec.ts:524:15 [error] @typescript-eslint/no-unsafe-assignment - Unsafe assignment of an `any` value.
  Codigo: const instance = createServiceInstance(ServiceClass);
- test/unit/services-critical.coverage.spec.ts:532:13 [error] @typescript-eslint/await-thenable - Unexpected `await` of a non-Promise (non-"Thenable") value.
  Codigo: await expect(async () => {
- test/unit/services-critical.coverage.spec.ts:534:44 [error] @typescript-eslint/no-unsafe-call - Unsafe call of an `any` typed value.
  Codigo: await runWithTimeout(() => instance[method](...args));
- test/unit/services-critical.coverage.spec.ts:534:44 [error] @typescript-eslint/no-unsafe-return - Unsafe return of a value of type `any`.
  Codigo: await runWithTimeout(() => instance[method](...args));
- test/unit/services-critical.coverage.spec.ts:534:53 [error] @typescript-eslint/no-unsafe-member-access - Unsafe member access [method] on an `any` value.
  Codigo: await runWithTimeout(() => instance[method](...args));
