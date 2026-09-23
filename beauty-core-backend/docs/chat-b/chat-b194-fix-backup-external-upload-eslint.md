# B194 — Correção do teste de upload externo de backup

Data: 2026-09-22

## Escopo

O trabalho foi limitado ao arquivo `test/unit/backup-external-upload.spec.ts`, além deste relatório solicitado.

Não foram executados Jest global, testes E2E, stage, commit, push, migration, build ou deploy.

## Diagnóstico antes

O arquivo tinha exatamente um erro ESLint:

| Arquivo | Erros | Avisos | Diagnóstico |
| --- | ---: | ---: | --- |
| `test/unit/backup-external-upload.spec.ts` | 1 | 0 | `@typescript-eslint/no-require-imports` |

O helper real `scripts/backup/backup-external-upload.js` é CommonJS: usa `'use strict'`, importa dependências com `require`, exporta as funções por `module.exports` e só executa `main()` quando `require.main === module`. Portanto, o teste precisa consumir o módulo exportado, sem substituir ou mockar o helper.

O Jest principal usa `jest.config.js` em CommonJS, com `ts-jest` para arquivos `.ts` e sem configuração ESM. O `tsconfig.json` usa `module`/`moduleResolution` `nodenext`, mas o runtime efetivo deste teste continua sendo Jest CommonJS. Por isso, `createRequire(import.meta.url)` não é compatível: o código transformado pelo `ts-jest` é avaliado em CommonJS e não pode interpretar `import.meta` nesse contexto.

## Solução adotada

O `require(...)` foi substituído por import estático TypeScript:

```ts
import helperModule from '../../scripts/backup/backup-external-upload.js';
```

O teste mantém um contrato local explícito, com as assinaturas reais de `encryptFile`, `decryptFile`, `sha256File` e `collectRecent`, e faz uma asserção de tipo direcionada para esse contrato:

```ts
const helper = helperModule as BackupExternalUploadHelper;
```

Essa solução usa a interoperabilidade CommonJS configurada pelo TypeScript (`esModuleInterop`), é transformável pelo `ts-jest` no Jest CommonJS, carrega o arquivo real e mantém os dois cenários existentes: round-trip AES-256-GCM com preservação de SHA-256 e coleta de artefatos elegíveis recentes. Não foram usados `any`, `Function`, `eslint-disable`, mock artificial ou alteração de configuração global.

## Validações

### Prettier

Comando:

```text
npx prettier --write test/unit/backup-external-upload.spec.ts
```

Resultado: passou, arquivo já estava formatado (`exit 0`).

### ESLint isolado

Comando:

```text
npx eslint test/unit/backup-external-upload.spec.ts --no-fix --no-cache
```

Resultado: passou sem erros ou avisos (`exit 0`). O diagnóstico `@typescript-eslint/no-require-imports` foi eliminado.

### Jest isolado

Comando:

```text
npx jest --config ./jest.config.js --runInBand test/unit/backup-external-upload.spec.ts
```

Resultado: passou (`exit 0`).

```text
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

### `git diff --check`

Comando:

```text
git diff --check -- test/unit/backup-external-upload.spec.ts
```

Resultado: passou sem problemas (`exit 0`).

## Resultado final

O arquivo `test/unit/backup-external-upload.spec.ts` foi aprovado e não precisou ser restaurado.

Relatório: `beauty-core-backend/docs/chat-b/chat-b194-fix-backup-external-upload-eslint.md`
