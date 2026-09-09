# Chat 03 - Bloco 04AG - Contexto do lint final

- Arquivo: `test/unit/services-critical.coverage.spec.ts`
- Erros: 9; warnings: 0; exit: 1

## Contexto por regiao

[LINHAS 1-75]
1: import { Logger } from '@nestjs/common';
2: import { createRequire } from 'node:module';
3:
4: const moduleRequire = createRequire(__filename);
5:
6: /**
7:  * CHAT_33_2_STRONG_LOG_SILENCER
8:  *
9:  * Silencia apenas logs ruidosos gerados por esta su├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬¡te de smoke coverage.
10:  * N├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬úo altera c├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬│digo de produ├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬º├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬úo.
11:  * N├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬úo silencia os logs E2E de seguran├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬ºa, pois eles rodam em outros arquivos.
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
24:   ) as unknown as WriteFunction;
25:   const originalStderrWrite = process.stderr.write.bind(
26:     process.stderr,
27:   ) as unknown as WriteFunction;
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
69:         // Mant├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬®m comportamento interno, mas reduz sa├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬¡da visual desta su├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬¡te.
70:         Logger.overrideLogger(['error']);
71:       }
72:     } catch {
73:       // N├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬úo bloqueia testes se Logger n├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬úo estiver dispon├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬¡vel.
74:     }
75:   });

[LINHAS 275-290]
275:         if (prop === '$executeRaw') return asyncMock<[], number>(() => 1);
276:         if (prop === '$queryRaw') return asyncMock<[], unknown[]>(() => []);
277:         if (prop === '$runCommandRaw')
278:           return asyncMock<[], HarnessRecord>(() => ({}));
279:
280:         if (!delegates.has(prop)) {
281:           delegates.set(
282:             prop,
283:             createDelegateMock(record) as unknown as HarnessRecord,
284:           );
285:         }
286:
287:         return delegates.get(prop);
288:       },
289:     },
290:   );

[LINHAS 400-415]
400:   const dependencyCount = Math.max(ServiceClass.length || 0, 8);
401:   const args: unknown[] = Array.from(
402:     { length: dependencyCount },
403:     (_value, index) => (index === 0 ? prisma : dependency),
404:   );
405:   return new ServiceClass(...args);
406: }
407:
408: function getPublicMethods(instance: object): string[] {
409:   const prototype = Object.getPrototypeOf(instance);
410:   if (prototype === null) return [];
411:   const instanceRecord = instance as Record<string, unknown>;
412:   return Object.getOwnPropertyNames(prototype)
413:     .filter((name) => name !== 'constructor')
414:     .filter((name) => typeof instanceRecord[name] === 'function');
415: }

[LINHAS 540-555]
540:       it('deve expor m├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬®todos p├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬║blicos no service', () => {
541:         const ServiceClass = loadServiceClass(target);
542:         const instance = createServiceInstance(ServiceClass);
543:         const methods = getPublicMethods(instance);
544:
545:         expect(methods.length).toBeGreaterThan(0);
546:       });
547:
548:       it('deve exercitar m├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬®todos p├âãÆ├åÔÇÖ├âÔÇá├óÔé¼Ôäó├âãÆ├óÔé¼┼í├âÔÇÜ├é┬║blicos com mocks seguros', async () => {
549:         const ServiceClass = loadServiceClass(target);
550:         const instance = createServiceInstance(ServiceClass);
551:         const methods = getPublicMethods(instance);
552:         const scenarios = createScenarios();
553:
554:         expect(methods.length).toBeGreaterThan(0);
555:

## Mensagens de lint

- 22:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- 25:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an error typed value.
- 55:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- 55:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- 64:7 [error] (@typescript-eslint/no-unsafe-return) Unsafe return of a value of type error.
- 64:14 [error] (@typescript-eslint/no-unsafe-call) Unsafe call of a type that could not be resolved.
- 283:13 [error] (@typescript-eslint/no-unnecessary-type-assertion) This assertion is unnecessary since the receiver accepts the original type of the expression.
- 409:9 [error] (@typescript-eslint/no-unsafe-assignment) Unsafe assignment of an `any` value.
- 548:86 [error] (@typescript-eslint/require-await) Async arrow function has no 'await' expression.

Somente leitura: nenhum codigo, migration, container, processo ou dado foi alterado.