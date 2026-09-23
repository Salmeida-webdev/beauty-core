# Beauty Core - Chat B - B25 - Auditoria do escopo dos testes gerados

- Inicio: 2026-09-13T12:43:23.6424370-03:00
- Fim: 2026-09-13T12:43:28.3291651-03:00
- Script: B25-v1
- Modo: somente leitura; o relatorio e o unico artefato criado.
- Pasta unica de relatorios do Chat B: `beauty-core-backend\docs\chat-b\`

## Objetivo

- Confirmar se os arquivos gerados estao versionados e descobertos pelo Jest.
- Inspecionar a configuracao oficial do backend, incluindo ESLint, Jest, TypeScript e package.json.
- Nao alterar arquivos, configuracoes ou historico Git.

## Arquivos avaliados

- `test\unit\coverage-under-70-branch-matrix.generated.spec.ts`
- `test\unit\coverage-under-70-targeted.generated.spec.ts`
- `test\unit\coverage-under-70-final-target.generated.spec.ts`

## Referencias na configuracao do backend

- Configuracao `.backup-chat39\.gitignore` linha 19: /coverage
- Configuracao `.backup-chat39\.gitignore` linha 106: # Coverage local pode ser regenerado e enviado como artifact no CI
- Configuracao `.backup-chat39\.gitignore` linha 107: coverage/
- Configuracao `.backup-chat39\package.json` linha 18: "test:cov": "jest --config ./jest.config.js --coverage",
- Configuracao `.backup-chat39\package.json` linha 31: "test:e2e:cov": "jest --config ./test/jest-e2e.coverage.js --runInBand",
- Configuracao `.backup-chat39\package.json` linha 32: "test:all:cov": "jest --config ./test/jest-all-json.coverage.js --runInBand",
- Configuracao `.backup-chat39\package.json` linha 57: "coverage:check": "node scripts/ci/check-coverage.js",
- Configuracao `.chat34-backup-20260620-115659\.gitignore` linha 19: /coverage
- Configuracao `.chat34-backup-20260620-115659\package.json` linha 18: "test:cov": "jest --config ./jest.config.js --coverage",
- Configuracao `.chat34-backup-20260620-115659\package.json` linha 31: "test:e2e:cov": "jest --config ./test/jest-e2e.coverage.js --runInBand",
- Configuracao `.chat34-backup-20260620-115659\package.json` linha 32: "test:all:cov": "jest --config ./test/jest-all.coverage.js --runInBand"
- Configuracao `.chat35-backup-npm-20260620192023\package.json` linha 18: "test:cov": "jest --config ./jest.config.js --coverage",
- Configuracao `.chat35-backup-npm-20260620192023\package.json` linha 31: "test:e2e:cov": "jest --config ./test/jest-e2e.coverage.js --runInBand",
- Configuracao `.chat35-backup-npm-20260620192023\package.json` linha 32: "test:all:cov": "jest --config ./test/jest-all.coverage.js --runInBand",
- Configuracao `.gitignore` linha 19: /coverage
- Configuracao `.gitignore` linha 108: # Coverage local pode ser regenerado e enviado como artifact no CI
- Configuracao `.gitignore` linha 109: coverage/
- Configuracao `backups\.gitignore` linha 2: !.gitignore
- Configuracao `eslint.config.mjs` linha 9: ignores: ['eslint.config.mjs'],
- Configuracao `jest.config.js` linha 6: testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
- Configuracao `jest.config.js` linha 12: collectCoverageFrom: [
- Configuracao `jest.config.js` linha 26: coverageDirectory: './coverage',
- Configuracao `jest.config.js` linha 27: coverageReporters: ['text', 'lcov', 'html'],
- Configuracao `logs\backups\.gitignore` linha 2: !.gitignore
- Configuracao `package.json` linha 18: "test:cov": "jest --config ./jest.config.js --coverage --runInBand",
- Configuracao `package.json` linha 31: "test:e2e:cov": "jest --config ./test/jest-e2e.coverage.js --runInBand",
- Configuracao `package.json` linha 32: "test:all:cov": "jest --config ./test/jest-all-json.coverage.js --runInBand",
- Configuracao `package.json` linha 57: "coverage:check": "node scripts/ci/check-coverage.js",
- Nenhuma referencia direta aos nomes dos arquivos foi encontrada.

## Estado Git dos arquivos gerados

- Rastreado: `test/unit/coverage-under-70-branch-matrix.generated.spec.ts`
- Rastreado: `test/unit/coverage-under-70-final-target.generated.spec.ts`
- Rastreado: `test/unit/coverage-under-70-targeted.generated.spec.ts`
- Nenhuma alteracao Git especifica foi retornada para os tres arquivos.

## Leitura operacional

- Arquivos gerados nao devem ser corrigidos manualmente sem confirmar o mecanismo de geracao.
- Qualquer exclusao do lint deve ser aplicada somente com justificativa e escopo explicito.
- A descoberta automatica pelo Jest depende da configuracao efetiva e nao apenas de referencias nominais.

## Operacoes nao executadas

- Nenhum arquivo foi alterado.
- Nenhum teste, build, E2E, migration ou workflow foi executado.
- Nenhum stage, commit, push, merge, tag, release ou deploy foi executado.
- Nenhum segredo ou valor de ambiente foi lido ou impresso.

## Classificacao final do B25

- `PASS_WITH_ATTENTION` - escopo dos arquivos gerados auditado; a decisao de correcao ou exclusao deve usar estas evidencias.

## Integridade

- Este relatorio foi gerado automaticamente pelo script B25.
- O script nao altera o projeto.