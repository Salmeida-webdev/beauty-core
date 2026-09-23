# Beauty Core - Chat B - B103 - Faixas finais coverage-smoke.helper.ts

- Inicio: 2026-09-13T18:25:52.0545660-03:00
- Fim: 2026-09-13T18:26:02.1287054-03:00
- Script: B103-v1
- Modo: somente leitura; nenhum arquivo foi alterado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Faixas estruturais

### Linhas 628-642
- 628:                 SCHEDULER_ENABLED: 'true',
- 629:                 SCHEDULER_TIMEZONE: 'America/Fortaleza',
- 630: 
- 631:                 STORAGE_PROVIDER: 'LOCAL',
- 632:                 SIGNED_URL_SECRET=[redacted],
- 633:                 SIGNED_URL_EXPIRES_IN_SECONDS: '900',
- 634:               };
- 635: 
- 636:               return values[key] ?? fallback ?? 'test-value';
- 637:             }),
- 638:           );
- 639:         }
- 640: 
- 641:         return methods.get(prop);
- 642:       }

### Linhas 786-800
- 786:       if (!delegates.has(prop)) {
- 787:         delegates.set(prop, createDelegateMock(record));
- 788:       }
- 789: 
- 790:       return delegates.get(prop);
- 791:     },
- 792:   });
- 793: 
- 794:   return proxy;
- 795: }
- 796: 
- 797: export function createDto(overrides: Record<string, any> = {}) {
- 798:   return {
- 799:     nome: 'Teste Automatizado',
- 800:     titulo: 'Teste Automatizado',

### Linhas 986-1015
- 986:     const mod = requireModule(filePath) as UnknownRecord;
- 987: 
- 988:     return Object.values(mod).filter((value): value is UnknownFunction => {
- 989:       return (
- 990:         typeof value === 'function' &&
- 991:         String(
- 992:           (value as UnknownFunction & { name?: unknown }).name ?? '',
- 993:         ).endsWith(suffix)
- 994:       );
- 995:     });
- 996:   } catch {
- 997:     return [];
- 998:   }
- 999: }
- 1000: 
- 1001: export function createInstance(ClassRef: unknown): UnknownRecord | null {
- 1002:   if (typeof ClassRef !== 'function') return null;
- 1003:   const Constructor = ClassRef as ConstructorLike;
- 1004:   const dependencyCount = Math.max(Constructor.length || 0, 12);
- 1005:   const dependencies = Array.from({ length: dependencyCount }, () =>
- 1006:     createUniversalMock(),
- 1007:   );
- 1008: 
- 1009:   try {
- 1010:     return new Constructor(...dependencies);
- 1011:   } catch {
- 1012:     return null;
- 1013:   }
- 1014: }
- 1015: 

### Linhas 1018-1030
- 1018:     !instance ||
- 1019:     (typeof instance !== 'object' && typeof instance !== 'function')
- 1020:   )
- 1021:     return [];
- 1022:   const object = instance as UnknownRecord;
- 1023:   const prototype = Object.getPrototypeOf(object);
- 1024:   if (!prototype) return [];
- 1025: 
- 1026:   return Object.getOwnPropertyNames(prototype)
- 1027:     .filter((name) => name !== 'constructor')
- 1028:     .filter((name) => typeof object[name] === 'function');
- 1029: }
- 1030: 

## Diagnostico ESLint

- ESLint exit code: 1
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\helpers\coverage-smoke.helper.ts
-    636:15  error    Unsafe return of a value of type `any`                                                                                                              @typescript-eslint/no-unsafe-return
-    794:3   error    Unsafe return of a value of type `any`                                                                                                              @typescript-eslint/no-unsafe-return
-    992:11  error    '(value as UnknownFunction & { name?: unknown }).name ?? ''' will use Object's default stringification format ('[object Object]') when stringified  @typescript-eslint/no-base-to-string
-   1006:5   error    Unsafe return of a value of type `any`                                                                                                              @typescript-eslint/no-unsafe-return
-   1010:28  warning  Unsafe spread of an `any[]` array type                                                                                                              @typescript-eslint/no-unsafe-argument
-   1023:9   error    Unsafe assignment of an `any` value                                                                                                                 @typescript-eslint/no-unsafe-assignment
- Ô£û 6 problems (5 errors, 1 warning)

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum --fix, Jest, E2E, coverage, build, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, reset, checkout ou stash foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B103

- `PASS_WITH_ATTENTION` - faixas finais coletadas para correcao limitada.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B103.
- O script nao altera o projeto.

Status: PASS_WITH_ATTENTION
Relatorio salvo em: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\docs\chat-b\chat-b103-context-coverage-smoke-last-ranges-20260913-182552.md