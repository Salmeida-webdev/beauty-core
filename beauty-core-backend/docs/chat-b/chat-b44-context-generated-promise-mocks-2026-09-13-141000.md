# Beauty Core - Chat B - B44 - Contexto dos mocks Promise gerados

- Inicio: 2026-09-13T14:10:00.8503024-03:00
- Fim: 2026-09-13T14:10:01.0245403-03:00
- Script: B44-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Identificar mocks `async` sem `await` e retornos dinamicos ainda dependentes de `any`.
- Registrar os trechos reais dos dois arquivos antes de uma correcao compartilhada.
- Nao alterar codigo, configuracao ou historico Git.

## test\unit\coverage-under-70-branch-matrix.generated.spec.ts

- Linhas totais: 893
- Linhas com mock ou callback async: 30
- Linhas com ny: 15

### Mocks e callbacks async

- 201:   return {
- 202:     findUnique: jest.fn(async () => {
- 203:       maybeThrow();
- 205:     }),
- 206:     findUniqueOrThrow: jest.fn(async () => {
- 207:       maybeThrow();
- 210:     }),
- 211:     findFirst: jest.fn(async () => {
- 212:       maybeThrow();
- 214:     }),
- 215:     findFirstOrThrow: jest.fn(async () => {
- 216:       maybeThrow();
- 219:     }),
- 220:     findMany: jest.fn(async () => {
- 221:       maybeThrow();
- 223:     }),
- 224:     count: jest.fn(async () => {
- 225:       maybeThrow();
- 227:     }),
- 228:     create: jest.fn(async (args?: any) => {
- 229:       maybeThrow();
- 231:     }),
- 232:     createMany: jest.fn(async () => {
- 233:       maybeThrow();
- 235:     }),
- 236:     update: jest.fn(async (args?: any) => {
- 237:       maybeThrow();
- 239:     }),
- 240:     updateMany: jest.fn(async () => {
- 241:       maybeThrow();
- 243:     }),
- 244:     delete: jest.fn(async () => {
- 245:       maybeThrow();
- 247:     }),
- 248:     deleteMany: jest.fn(async () => {
- 249:       maybeThrow();
- 251:     }),
- 252:     upsert: jest.fn(async (args?: any) => {
- 253:       maybeThrow();
- 255:     }),
- 256:     aggregate: jest.fn(async () => {
- 257:       maybeThrow();
- 282:     }),
- 283:     groupBy: jest.fn(async () => {
- 284:       maybeThrow();
- 316:       if (prop === '$transaction') {
- 317:         obj[prop] = jest.fn(async (input: any) => {
- 318:           if (mode === 'throw') throw new Error('Transaction branch error');
- 326:       if (prop === '$connect' || prop === '$disconnect') {
- 327:         obj[prop] = jest.fn(async () => undefined);
- 328:         return obj[prop];
- 331:       if (prop === '$executeRaw') {
- 332:         obj[prop] = jest.fn(async () => (mode === 'empty' ? 0 : 1));
- 333:         return obj[prop];
- 336:       if (prop === '$queryRaw' || prop === '$runCommandRaw') {
- 337:         obj[prop] = jest.fn(async () => (mode === 'empty' ? [] : [record]));
- 338:         return obj[prop];
- 378:       if (prop === 'signAsync') {
- 379:         obj[prop] = jest.fn(async () =>
- 380:           mode === 'invalid' ? '' : '[sensitive data omitted]
- 385:       if (prop === 'verify' || prop === 'verifyAsync') {
- 386:         obj[prop] = jest.fn(async () => {
- 387:           if (mode === 'invalid')
- 404:       ) {
- 405:         obj[prop] = jest.fn(async () => mode !== 'false');
- 406:         return obj[prop];
- 443:       if (recordPrefixes.some((prefix) => prop.startsWith(prefix))) {
- 444:         obj[prop] = jest.fn(async () => {
- 445:           if (mode === 'throw') throw new Error('Mock branch error');
- 584:     progress: 0,
- 585:     updateProgress: jest.fn(async () => undefined),
- 586:     log: jest.fn(async () => undefined),
- 585:     updateProgress: jest.fn(async () => undefined),
- 586:     log: jest.fn(async () => undefined),
- 587:     moveToFailed: jest.fn(async () => undefined),
- 586:     log: jest.fn(async () => undefined),
- 587:     moveToFailed: jest.fn(async () => undefined),
- 588:     moveToCompleted: jest.fn(async () => undefined),
- 587:     moveToFailed: jest.fn(async () => undefined),
- 588:     moveToCompleted: jest.fn(async () => undefined),
- 589:   };
- 652:     mode === 'throw'
- 653:       ? async () => {
- 654:           throw new Error('Callback branch error');
- 655:         }
- 656:       : async () => ({ ok: true, status: 'ok' });
- 657: 
- 838:       for (const mode of modes) {
- 839:         it('deve exercitar branches no modo ' + mode, async () => {
- 840:           const mod = require(target.requirePath);

### Linhas com any

- 70:   overrides: Record<string, any> = {},
- 228:     create: jest.fn(async (args?: any) => {
- 236:     update: jest.fn(async (args?: any) => {
- 252:     upsert: jest.fn(async (args?: any) => {
- 306:   const target: Record<string, any> = {};
- 307:   const delegates = new Map<string, any>();
- 310:   const proxy: any = new Proxy(target, {
- 317:         obj[prop] = jest.fn(async (input: any) => {
- 342:         obj[prop] = jest.fn((key: string, fallback?: any) => {
- 345:           const values: Record<string, any> = {
- 489: function patchInstance(instance: any, mode: MockMode) {
- 547: function instantiate(Exported: any, mode: MockMode) {
- 563: function getPublicMethods(instance: any) {
- 761: async function exerciseExportedFunction(fn: any, mode: MockMode) {
- 799:     calls.push([createRequestLike(), file, jest.fn((error: any) => error)]);

## test\unit\coverage-under-70-final-target.generated.spec.ts

- Linhas totais: 983
- Linhas com mock ou callback async: 30
- Linhas com ny: 17

### Mocks e callbacks async

- 222:   return {
- 223:     findUnique: jest.fn(async () => value()),
- 224:     findUniqueOrThrow: jest.fn(async () => {
- 223:     findUnique: jest.fn(async () => value()),
- 224:     findUniqueOrThrow: jest.fn(async () => {
- 225:       const result = value();
- 228:     }),
- 229:     findFirst: jest.fn(async () => value()),
- 230:     findFirstOrThrow: jest.fn(async () => {
- 229:     findFirst: jest.fn(async () => value()),
- 230:     findFirstOrThrow: jest.fn(async () => {
- 231:       const result = value();
- 234:     }),
- 235:     findMany: jest.fn(async () => many()),
- 236:     count: jest.fn(async () => count()),
- 235:     findMany: jest.fn(async () => many()),
- 236:     count: jest.fn(async () => count()),
- 237:     create: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 236:     count: jest.fn(async () => count()),
- 237:     create: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 238:     createMany: jest.fn(async () => ({ count: count() })),
- 237:     create: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 238:     createMany: jest.fn(async () => ({ count: count() })),
- 239:     update: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 238:     createMany: jest.fn(async () => ({ count: count() })),
- 239:     update: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 240:     updateMany: jest.fn(async () => ({ count: count() })),
- 239:     update: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 240:     updateMany: jest.fn(async () => ({ count: count() })),
- 241:     delete: jest.fn(async () => item),
- 240:     updateMany: jest.fn(async () => ({ count: count() })),
- 241:     delete: jest.fn(async () => item),
- 242:     deleteMany: jest.fn(async () => ({ count: count() })),
- 241:     delete: jest.fn(async () => item),
- 242:     deleteMany: jest.fn(async () => ({ count: count() })),
- 243:     upsert: jest.fn(async (args?: any) => ({
- 242:     deleteMany: jest.fn(async () => ({ count: count() })),
- 243:     upsert: jest.fn(async (args?: any) => ({
- 244:       ...item,
- 247:     })),
- 248:     aggregate: jest.fn(async () => ({
- 249:       _sum: {
- 269:     })),
- 270:     groupBy: jest.fn(async () => {
- 271:       if (mode === 'empty' || mode === 'null') return [];
- 301:       if (prop === '$transaction') {
- 302:         target[prop] = jest.fn(async (input: any) => {
- 303:           if (mode === 'throw') throw new Error('Transaction final error');
- 311:       if (prop === '$connect' || prop === '$disconnect') {
- 312:         target[prop] = jest.fn(async () => undefined);
- 313:         return target[prop];
- 316:       if (prop === '$queryRaw' || prop === '$runCommandRaw') {
- 317:         target[prop] = jest.fn(async () => (mode === 'empty' ? [] : [item]));
- 318:         return target[prop];
- 321:       if (prop === '$executeRaw') {
- 322:         target[prop] = jest.fn(async () => (mode === 'zero' ? 0 : 1));
- 323:         return target[prop];
- 365:       if (prop === 'signAsync') {
- 366:         target[prop] = jest.fn(async () =>
- 367:           mode === 'invalid' ? '' : '[sensitive data omitted]
- 372:       if (prop === 'verify' || prop === 'verifyAsync') {
- 373:         target[prop] = jest.fn(async () => {
- 374:           if (mode === 'invalid')
- 392:       ) {
- 393:         target[prop] = jest.fn(async () => mode !== 'false');
- 394:         return target[prop];
- 432:       if (prefixes.some((prefix) => prop.startsWith(prefix))) {
- 433:         target[prop] = jest.fn(async () => {
- 434:           if (mode === 'throw') throw new Error('Mock final branch error');
- 597:     progress: 0,
- 598:     updateProgress: jest.fn(async () => undefined),
- 599:     log: jest.fn(async () => undefined),
- 598:     updateProgress: jest.fn(async () => undefined),
- 599:     log: jest.fn(async () => undefined),
- 600:     moveToFailed: jest.fn(async () => undefined),
- 599:     log: jest.fn(async () => undefined),
- 600:     moveToFailed: jest.fn(async () => undefined),
- 601:     moveToCompleted: jest.fn(async () => undefined),
- 600:     moveToFailed: jest.fn(async () => undefined),
- 601:     moveToCompleted: jest.fn(async () => undefined),
- 602:   };
- 737:   if (method === 'executarRotina') {
- 738:     const ok = async () => ({ ok: true });
- 739:     const fail = async () => {
- 738:     const ok = async () => ({ ok: true });
- 739:     const fail = async () => {
- 740:       throw new Error('Callback final error');
- 922:       for (const mode of modes) {
- 923:         it('deve exercitar alvo em modo ' + mode, async () => {
- 924:           const mod = require(modulePath);

### Linhas com any

- 78: function record(mode: Mode = 'happy', overrides: Record<string, any> = {}) {
- 237:     create: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 239:     update: jest.fn(async (args?: any) => ({ ...item, ...(args?.data ?? {}) })),
- 243:     upsert: jest.fn(async (args?: any) => ({
- 291:   const obj: Record<string, any> = {};
- 292:   const delegates = new Map<string, any>();
- 302:         target[prop] = jest.fn(async (input: any) => {
- 327:         target[prop] = jest.fn((key: string, fallback?: any) => {
- 330:           const values: Record<string, any> = {
- 493: function patch(instance: any, mode: Mode) {
- 552: function instantiate(Exported: any, mode: Mode) {
- 568: function allMethods(instance: any) {
- 723:     return [[context], [httpHost(mode) as any]];
- 811: function walkFunctions(value: any, seen = new Set<any>()): Function[] {
- 832: async function exercisePlainFunction(fn: any, mode: Mode) {
- 858:   const calls: any[][] = [
- 880:     calls.push([createRequestLike(), file, jest.fn((error: any) => error)]);

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum teste, build, E2E, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B44

- `PASS_WITH_ATTENTION` - contexto dos dois arquivos coletado para uma correcao seletiva.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B44.
- O script nao altera o projeto.