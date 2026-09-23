# Beauty Core - Chat B - B64 - Callbacks Promise final-target

- Inicio: 2026-09-13T15:03:38.6316279-03:00
- Fim: 2026-09-13T15:03:48.4354414-03:00
- Script: B64-v1
- Modo: correcao seletiva; o relatorio e o unico artefato adicional criado pelo script.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Remover `require-await` somente dos callbacks simples confirmados no B63.
- Preservar retornos, excecoes e comportamento dos mocks.
- Revalidar Prettier e ESLint somente no final-target.

## Pre-condicoes

- findUniqueOrThrow com await: 1 ocorrencia(s)
- findFirstOrThrow com await: 1 ocorrencia(s)
- groupBy com await: 1 ocorrencia(s)
- callbacks Proxy com await: 2 ocorrencia(s)
- callback fail com await: 1 ocorrencia(s)
- callback ok Promise: 1 ocorrencia(s)

## Alteracao aplicada

- Arquivo alterado: `test\unit\coverage-under-70-final-target.generated.spec.ts`
- Callbacks de leitura e agrupamento receberam await controlado.
- Callbacks verify/prefix receberam await controlado.
- Callbacks ok/fail preservaram o contrato Promise.
- SHA256 antes: BB26A3351F945AB3B35B87F98A55E99A495F72BB58AC52A7C462B48925BAF830
- SHA256 depois: 042E9632EA15D853704D3E3390BA103F93D036FE8174741A087FF7171A8447A7

## Validacao

- Prettier exit code: 0
- ESLint exit code: 1
- Saida resumida do ESLint:
  - 
  - C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\coverage-under-70-final-target.generated.spec.ts
  -   235:40  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   235:44  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   235:65  error    Unsafe member access .data on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
  -   237:40  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   237:44  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   237:65  error    Unsafe member access .data on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
  -   241:40  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   241:44  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   243:17  error    Unsafe member access .create on an `any` value                                                                           @typescript-eslint/no-unsafe-member-access
  -   244:17  error    Unsafe member access .update on an `any` value                                                                           @typescript-eslint/no-unsafe-member-access
  -   246:33  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   298:27  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   303:44  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   303:51  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  -   305:11  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   307:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   312:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   316:41  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   317:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   321:41  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   322:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   354:11  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   356:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   361:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   365:41  error    Async arrow function has no 'await' expression                                                                           @typescript-eslint/require-await
  -   368:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   383:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   394:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   441:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   446:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   455:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   468:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   476:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   484:9   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   489:7   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   495:18  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   532:16  error    Unsafe member access [name] on an `any` value                                                                            @typescript-eslint/no-unsafe-member-access
  -   539:14  error    Unsafe member access .logger on an `any` value                                                                           @typescript-eslint/no-unsafe-member-access
  -   550:3   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   554:46  warning  Unsafe argument of type `any` assigned to a parameter of type `number`                                                   @typescript-eslint/no-unsafe-argument
  -   554:55  error    Unsafe member access .length on an `any` value                                                                           @typescript-eslint/no-unsafe-member-access
  -   559:5   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   559:18  error    Unsafe construction of an `any` typed value                                                                              @typescript-eslint/no-unsafe-call
  -   562:7   error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   562:20  error    Unsafe construction of an `any` typed value                                                                              @typescript-eslint/no-unsafe-call
  -   576:39  error    Unsafe member access [name] on an `any` value                                                                            @typescript-eslint/no-unsafe-member-access
  -   578:34  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                                       @typescript-eslint/no-unsafe-argument
  -   579:31  error    Unsafe member access [name] on an `any` value                                                                            @typescript-eslint/no-unsafe-member-access
  -   640:26  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   686:9   error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -   813:60  error    The `Function` type accepts any function-like value.
  - Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  -   817:36  error    Unsafe return of a value of type `any[]`                                                                                 @typescript-eslint/no-unsafe-return
  -   821:17  error    The `Function` type accepts any function-like value.
  - Prefer explicitly defining any function parameters and return type  @typescript-eslint/no-unsafe-function-type
  -   823:33  warning  Unsafe argument of type `any` assigned to a parameter of type `{}`                                                       @typescript-eslint/no-unsafe-argument
  -   825:42  error    Unsafe member access [key] on an `any` value                                                                             @typescript-eslint/no-unsafe-member-access
  -   882:68  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   888:34  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   888:34  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  -   920:15  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -   920:21  error    A `require()` style import is forbidden                                                                                  @typescript-eslint/no-require-imports
  -   926:17  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -   926:23  error    A `require()` style import is forbidden                                                                                  @typescript-eslint/no-require-imports
  -   927:40  warning  Unsafe argument of type `any` assigned to a parameter of type `ArrayLike<unknown> | { [s: string]: unknown; }`           @typescript-eslint/no-unsafe-argument
  -   942:23  error    Unsafe assignment of an `any` value                                                                                      @typescript-eslint/no-unsafe-assignment
  -   959:31  error    Unsafe return of a value of type `any`                                                                                   @typescript-eslint/no-unsafe-return
  -   959:31  error    Unsafe call of an `any` typed value                                                                                      @typescript-eslint/no-unsafe-call
  -   959:40  error    Unsafe member access [method] on an `any` value                                                                          @typescript-eslint/no-unsafe-member-access
  - 
  - Ô£û 67 problems (63 errors, 4 warnings)
  - 

## Operacoes nao executadas

- Nenhum outro arquivo foi alterado.
- Nenhum teste, build, E2E, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B64

- `BLOCKED` - a correcao ou uma das validacoes falhou.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B64.
- A alteracao, quando aplicada, ficou limitada ao final-target.