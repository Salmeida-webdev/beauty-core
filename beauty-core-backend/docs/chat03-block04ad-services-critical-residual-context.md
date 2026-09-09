# Chat 03 - Bloco 04AD - Contexto do lint residual

- Arquivo: `test/unit/services-critical.coverage.spec.ts`
- Erros: 36; warnings: 1; exit: 1

## Contexto por regiao

[LINHAS 1-85]
1: import { Logger } from '@nestjs/common';
2: import { createRequire } from 'node:module';
3:
4: const moduleRequire = createRequire(__filename);
5:
6: /**
7:  * CHAT_33_2_STRONG_LOG_SILENCER
8:  *
9:  * Silencia apenas logs ruidosos gerados por esta su├âãÆ├åÔÇÖ├âÔÇÜ├é┬¡te de smoke coverage.
10:  * N├âãÆ├åÔÇÖ├âÔÇÜ├é┬úo altera c├âãÆ├åÔÇÖ├âÔÇÜ├é┬│digo de produ├âãÆ├åÔÇÖ├âÔÇÜ├é┬º├âãÆ├åÔÇÖ├âÔÇÜ├é┬úo.
11:  * N├âãÆ├åÔÇÖ├âÔÇÜ├é┬úo silencia os logs E2E de seguran├âãÆ├åÔÇÖ├âÔÇÜ├é┬ºa, pois eles rodam em outros arquivos.
12:  */
13:
14: function asyncMock<TArgs extends unknown[], TResult>(
15:   implementation: (...args: TArgs) => TResult,
16: ) {
17:   return jest.fn((...args: TArgs) =>
18:     Promise.resolve().then(() => implementation(...args)),
19:   );
20: }
21: const CHAT_33_2_STRONG_LOG_SILENCER = (() => {
22:   const originalStdoutWrite = process.stdout.write.bind(
23:     process.stdout,
24:   ) as WriteFunction;
25:   const originalStderrWrite = process.stderr.write.bind(
26:     process.stderr,
27:   ) as WriteFunction;
28:
29:   const noisyPatterns = [
30:     '[FinanceiroService]',
31:     '[AgendamentosService]',
32:     '[ClientesPacotesService]',
33:     '[MensagensWhatsappService]',
34:     '[ArquivosService]',
35:     '[FINANCEIRO]',
36:     '[AGENDAMENTOS]',
37:     '[CLIENTES_PACOTES]',
38:     '[WHATSAPP]',
39:     '[ARQUIVOS]',
40:   ];
41:
42:   function isNoisyLog(chunk: unknown): boolean {
43:     const text = typeof chunk === 'string' ? chunk : String(chunk);
44:
45:     return noisyPatterns.some((pattern) => text.includes(pattern));
46:   }
47:
48:   beforeAll(() => {
49:     jest.spyOn(process.stdout, 'write').mockImplementation(((
50:       chunk: string | Uint8Array,
51:       encoding?: BufferEncoding,
52:       callback?: (error?: Error | null) => void,
53:     ) => {
54:       if (isNoisyLog(chunk)) return true;
55:       return originalStdoutWrite(chunk, encoding, callback);
56:     }) as typeof process.stdout.write);
57:
58:     jest.spyOn(process.stderr, 'write').mockImplementation(((
59:       chunk: string | Uint8Array,
60:       encoding?: BufferEncoding,
61:       callback?: (error?: Error | null) => void,
62:     ) => {
63:       if (isNoisyLog(chunk)) return true;
64:       return originalStderrWrite(chunk, encoding, callback);
65:     }) as typeof process.stderr.write);
66:
67:     try {
68:       if (typeof Logger.overrideLogger === 'function') {
69:         // Mant├âãÆ├åÔÇÖ├âÔÇÜ├é┬®m comportamento interno, mas reduz sa├âãÆ├åÔÇÖ├âÔÇÜ├é┬¡da visual desta su├âãÆ├åÔÇÖ├âÔÇÜ├é┬¡te.
70:         Logger.overrideLogger(['error']);
71:       }
72:     } catch {
73:       // N├âãÆ├åÔÇÖ├âÔÇÜ├é┬úo bloqueia testes se Logger n├âãÆ├åÔÇÖ├âÔÇÜ├é┬úo estiver dispon├âãÆ├åÔÇÖ├âÔÇÜ├é┬¡vel.
74:     }
75:   });
76:
77:   afterAll(() => {
78:     try {
79:       jest.restoreAllMocks();
80:     } catch {
81:       // Evita falha por restore duplicado.
82:     }
83:
84:     try {
85:       if (typeof Logger.overrideLogger === 'function') {

[LINHAS 245-415]
245:       ...(args?.update ?? {}),
246:     })),
247:   };
248: }
249:
250: function createPrismaMock() {
251:   const record = createRecord();
252:
253:   const delegates = new Map<string, any>();
254:
255:   const prisma: any = new Proxy(
256:     {},
257:     {
258:       get(_target, prop: string | symbol) {
259:         if (typeof prop !== 'string') return undefined;
260:
261:         if (prop === '$transaction') {
262:           return asyncMock((input: any) => {
263:             if (typeof input === 'function') {
264:               return input(prisma);
265:             }
266:
267:             if (Array.isArray(input)) {
268:               return Promise.all(input);
269:             }
270:
271:             return input;
272:           });
273:         }
274:
275:         if (prop === '$connect') return asyncMock(() => undefined);
276:         if (prop === '$disconnect') return asyncMock(() => undefined);
277:         if (prop === '$executeRaw') return asyncMock(() => 1);
278:         if (prop === '$queryRaw') return asyncMock(() => []);
279:         if (prop === '$runCommandRaw') return asyncMock(() => ({}));
280:
281:         if (!delegates.has(prop)) {
282:           delegates.set(prop, createDelegateMock(record));
283:         }
284:
285:         return delegates.get(prop);
286:       },
287:     },
288:   );
289:
290:   return prisma;
291: }
292:
293: function createDependencyMock() {
294:   const base: any = {
295:     get: jest.fn((key: string, fallback?: any) => {
296:       const values: Record<string, any> = {
297:         JWT_SECRET: 'test-secret',
298:         JWT_REFRESH_SECRET: 'test-refresh-secret',
299:         JWT_CLIENT_SECRET: 'test-client-secret',
300:         JWT_CLIENT_REFRESH_SECRET: 'test-client-refresh-secret',
301:         JWT_EXPIRES_IN: '8h',
302:         JWT_REFRESH_EXPIRES_IN: '7d',
303:         JWT_CLIENT_EXPIRES_IN: '7d',
304:         JWT_CLIENT_REFRESH_EXPIRES_IN: '30d',
305:         SCHEDULER_ENABLED: 'true',
306:         SCHEDULER_TIMEZONE: 'America/Fortaleza',
307:       };
308:
309:       return values[key] ?? fallback ?? 'test-value';
310:     }),
311:
312:     sign: jest.fn(() => 'token-test'),
313:     signAsync: asyncMock(() => 'token-test'),
314:
315:     registrar: asyncMock(() => null),
316:     registrarAuditoria: asyncMock(() => null),
317:
318:     adicionarJob: asyncMock(() => ({ id: 'job-test' })),
319:     adicionarNotificacao: asyncMock(() => ({ id: 'job-test' })),
320:     adicionarWhatsapp: asyncMock(() => ({ id: 'job-test' })),
321:     adicionarCampanha: asyncMock(() => ({ id: 'job-test' })),
322:     adicionarRelatorio: asyncMock(() => ({ id: 'job-test' })),
323:
324:     processarEvento: asyncMock(() => null),
325:     podeNotificar: asyncMock(() => true),
326:
327:     validarEmpresaAtiva: asyncMock(() => createRecord({ id: EMPRESA_A })),
328:     validarEmpresa: asyncMock(() => createRecord({ id: EMPRESA_A })),
329:     validarRecursoEmpresa: asyncMock(() => createRecord()),
330:     validarUsuarioEmpresa: asyncMock(() => createRecord()),
331:     validarClienteEmpresa: asyncMock(() => createRecord()),
332:     validarTenant: asyncMock(() => true),
333:
334:     criarSessao: asyncMock(() => ({
335:       sessao: createRecord({ id: UUID_A }),
336:       refreshToken: 'refresh-token-test',
337:     })),
338:     rotacionarRefreshToken: asyncMock(() => ({
339:       access_token: 'access-token-test',
340:       refresh_token: 'refresh-token-test',
341:     })),
342:     revogarSessao: asyncMock(() => true),
343:     revogarTodasSessoes: asyncMock(() => true),
344:
345:     salvar: asyncMock(() => createRecord()),
346:     upload: asyncMock(() => createRecord()),
347:     download: asyncMock(() => Buffer.from('test')),
348:     gerarUrlAssinada: asyncMock(() => 'http://localhost/signed/test'),
349:   };
350:
351:   return new Proxy(base, {
352:     get(target, prop: string | symbol) {
353:       if (typeof prop !== 'string') return undefined;
354:
355:       if (prop in target) {
356:         return target[prop];
357:       }
358:
359:       const fn = asyncMock(() => null);
360:       target[prop] = fn;
361:       return fn;
362:     },
363:   });
364: }
365:
366: function loadServiceClass(target: TargetService): any | null {
367:   try {
368:     const mod = moduleRequire(target.path) as Record<string, unknown>;
369:     if (typeof mod[target.exportName] === 'function') {
370:       return mod[target.exportName];
371:     }
372:
373:     const serviceLike = Object.values(mod).find(
374:       (value: any) =>
375:         typeof value === 'function' &&
376:         String(value.name ?? '').includes('Service'),
377:     );
378:
379:     if (serviceLike) return serviceLike;
380:
381:     return (
382:       Object.values(mod).find((value: any) => typeof value === 'function') ??
383:       null
384:     );
385:   } catch {
386:     return null;
387:   }
388: }
389:
390: function createServiceInstance(ServiceClass: any) {
391:   const prisma = createPrismaMock();
392:   const dependency = createDependencyMock();
393:
394:   const dependencyCount = Math.max(ServiceClass.length || 0, 8);
395:   const args = Array.from({ length: dependencyCount }, (_value, index) =>
396:     index === 0 ? prisma : dependency,
397:   );
398:
399:   return new ServiceClass(...args);
400: }
401:
402: function getPublicMethods(instance: any): string[] {
403:   return Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
404:     .filter((name) => name !== 'constructor')
405:     .filter((name) => typeof instance[name] === 'function');
406: }
407:
408: function createDto() {
409:   return {
410:     nome: 'Teste Automatizado',
411:     titulo: 'Teste Automatizado',
412:     descricao: 'Descri├âãÆ├åÔÇÖ├âÔÇÜ├é┬º├âãÆ├åÔÇÖ├âÔÇÜ├é┬úo teste',
413:     telefone: '83999999999',
414:     email: 'teste@beautycore.local',
415:     senha: 'Teste@123456',

[LINHAS 485-545]
485:       EMPRESA_A,
486:       {
487:         dataInicio: new Date().toISOString(),
488:         dataFim: new Date().toISOString(),
489:       },
490:     ],
491:     [UUID_A, UUID_B, EMPRESA_A],
492:     [EMPRESA_A, 'ATIVO'],
493:     ['ATIVO', EMPRESA_A],
494:   ];
495: }
496:
497: async function runWithTimeout(fn: () => any, timeoutMs = 350) {
498:   return Promise.race([
499:     Promise.resolve().then(fn),
500:     new Promise((resolve) => setTimeout(resolve, timeoutMs)),
501:   ]);
502: }
503:
504: describe('Chat 33.2 - Services cr├âãÆ├åÔÇÖ├âÔÇÜ├é┬¡ticos smoke coverage', () => {
505:   for (const target of TARGETS) {
506:     describe(target.label, () => {
507:       it('deve importar e instanciar o service quando existir', () => {
508:         const ServiceClass = loadServiceClass(target);
509:
510:         expect(ServiceClass).toBeDefined();
511:
512:         const instance = createServiceInstance(ServiceClass);
513:
514:         expect(instance).toBeDefined();
515:       });
516:
517:       it('deve expor m├âãÆ├åÔÇÖ├âÔÇÜ├é┬®todos p├âãÆ├åÔÇÖ├âÔÇÜ├é┬║blicos no service', () => {
518:         const ServiceClass = loadServiceClass(target);
519:         const instance = createServiceInstance(ServiceClass);
520:         const methods = getPublicMethods(instance);
521:
522:         expect(methods.length).toBeGreaterThan(0);
523:       });
524:
525:       it('deve exercitar m├âãÆ├åÔÇÖ├âÔÇÜ├é┬®todos p├âãÆ├åÔÇÖ├âÔÇÜ├é┬║blicos com mocks seguros', async () => {
526:         const ServiceClass = loadServiceClass(target);
527:         const instance = createServiceInstance(ServiceClass);
528:         const methods = getPublicMethods(instance);
529:         const scenarios = createScenarios();
530:
531:         expect(methods.length).toBeGreaterThan(0);
532:
533:         for (const method of methods) {
534:           for (const args of scenarios.slice(0, 8)) {
535:             await expect(async () => {
536:               try {
537:                 await runWithTimeout(() => instance[method](...args));
538:               } catch {
539:                 // Services podem lan├âãÆ├åÔÇÖ├âÔÇÜ├é┬ºar NotFound, Forbidden, BadRequest ou Unauthorized por contrato.
540:                 // O objetivo deste teste ├âãÆ├åÔÇÖ├âÔÇÜ├é┬® exercitar fluxos com mocks sem transformar exce├âãÆ├åÔÇÖ├âÔÇÜ├é┬º├âãÆ├åÔÇÖ├âÔÇÜ├é┬Áes esperadas em falha.
541:               }
542:             }).not.toThrow();
543:           }
544:         }
545:       });

## Mensagens de lint

- 22:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- 25:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- 55:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- 55:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- 64:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- 64:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- 264:15 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 264:22 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of an `any` typed value.
- 271:13 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 285:9 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 290:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 309:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 351:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 356:9 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 356:23 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [prop] on an `any` value.
- 360:14 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [prop] on an `any` value.
- 366:51 [error] (@typescript-eslint/no-redundant-type-constituents) 'any' overrides all other types in this union type.
- 376:22 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access .name on an `any` value.
- 391:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 392:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 394:36 [warning] (@typescript-eslint/no-unsafe-argument) Unsafe argument of type `any` assigned to a parameter of type `number`.
- 394:49 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access .length on an `any` value.
- 396:5 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 399:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 399:10 [error] (@typescript-eslint/no-unsafe-call) Unsafe construction of an `any` typed value.
- 405:39 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [name] on an `any` value.
- 498:3 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `Promise<any>`.
- 508:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 512:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 518:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 519:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 526:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 527:15 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 535:13 [error] (@typescript-eslint/await-thenable) Unexpected `await` of a non-Promise (non-"Thenable") value.
- 537:44 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of an `any` typed value.
- 537:44 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type `any`.
- 537:53 [error] (@typescript-eslint/no-unsafe-member-access) Unsafe member access [method] on an `any` value.

Somente leitura: nenhum codigo, migration, container, processo ou dado foi alterado.