# Beauty Core - Chat B - B125 - Diagnostico test-seed

- Inicio: 2026-09-15T14:31:31.1459378-03:00
- Script: B125-v2
- Modo: somente leitura; nenhum arquivo de codigo sera alterado.
- Pasta de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Diagnosticar exclusivamente `test/seeds/test-seed.ts`.
- Consolidar regras, severidades, linhas e mensagens do ESLint.
- Nao executar `--fix`, Prettier, Jest, build, E2E, migration ou workflow.

## Diagnosticos do ESLint

- ESLint exit code: 1
- Diagnosticos: 50
- Erros: 49
- Avisos: 1

## Regras encontradas

- @typescript-eslint/no-unsafe-argument: 1 ocorrencia(s)
- @typescript-eslint/no-unsafe-assignment: 34 ocorrencia(s)
- @typescript-eslint/no-unsafe-call: 1 ocorrencia(s)
- @typescript-eslint/no-unsafe-member-access: 11 ocorrencia(s)
- @typescript-eslint/no-unsafe-return: 2 ocorrencia(s)
- @typescript-eslint/require-await: 1 ocorrencia(s)

## Detalhamento por linha

- Linha 72, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 72, coluna 44; regra @typescript-eslint/no-unsafe-argument; severidade warning; mensagem: Unsafe argument of type `any` assigned to a parameter of type `string`.
- Linha 76, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 117, coluna 1; regra @typescript-eslint/require-await; severidade error; mensagem: Async function 'createModel' has no 'await' expression.
- Linha 125, coluna 3; regra @typescript-eslint/no-unsafe-return; severidade error; mensagem: Unsafe return of a value of type `any`.
- Linha 125, coluna 10; regra @typescript-eslint/no-unsafe-call; severidade error; mensagem: Unsafe call of an `any` typed value.
- Linha 125, coluna 26; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access [delegate] on an `any` value.
- Linha 137, coluna 3; regra @typescript-eslint/no-unsafe-return; severidade error; mensagem: Unsafe return of a value of type `Promise<any>`.
- Linha 145, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 155, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 165, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 175, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 176, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 176, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 185, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 186, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 186, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 195, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 196, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 196, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 205, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 206, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 206, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 215, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 216, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 216, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 226, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 227, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 227, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 234, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 235, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 235, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 244, coluna 9; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 245, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 245, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 255, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 255, coluna 25; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 256, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 256, coluna 24; regra @typescript-eslint/no-unsafe-member-access; severidade error; mensagem: Unsafe member access .id on an `any` value.
- Linha 265, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 266, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 268, coluna 7; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 269, coluna 7; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 270, coluna 7; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 271, coluna 7; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 272, coluna 7; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 274, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 275, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 276, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.
- Linha 277, coluna 5; regra @typescript-eslint/no-unsafe-assignment; severidade error; mensagem: Unsafe assignment of an `any` value.

## Operacoes nao executadas

- Nenhum arquivo de codigo foi alterado.
- Prettier, Jest, build, E2E, migration e workflow nao foram executados.
- Nenhum stage, commit, push, merge, tag, release, reset, checkout ou stash foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B125

- `PASS_WITH_ATTENTION` - diagnostico coletado para a proxima correcao seletiva.

## Integridade

- Este relatorio foi gerado pelo script B125.
- O script nao altera o projeto.

Status: PASS_WITH_ATTENTION
