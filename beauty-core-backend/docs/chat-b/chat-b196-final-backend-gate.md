# B196 — Gate técnico final do backend Beauty Core

Data: 2026-09-22

## Classificação

`BLOCKED`

O gate foi executado sem alterações de código. ESLint de produção, ESLint dos testes, Jest unitário global e `git diff --check` passaram. O typecheck falhou com exit code 2, portanto o backend não está pronto para a próxima fase.

## Configuração e comandos identificados

Foram lidos `package.json`, `jest.config.js`, `tsconfig.json`, `tsconfig.build.json`, `eslint.config.mjs` e os scripts disponíveis.

- O ESLint usa flat config, `typescript-eslint` com type-checking, `sourceType: 'commonjs'` e `projectService: true`.
- O Jest usa `jest.config.js`, ambiente Node, `ts-jest`, `--runInBand` e `testMatch` limitado a `test/unit/**/*.spec.ts`; portanto o Jest global executado neste gate não incluiu E2E.
- O `package.json` não declara script `typecheck`.
- O script `build` é `nest build`, mas não foi executado porque este bloco proíbe build.
- Como equivalente de typecheck sem emissão foi executado `node --max-old-space-size=6144 node_modules/typescript/bin/tsc --noEmit`.

## 1. ESLint de produção (`src/`)

Foram enumerados somente arquivos `.ts` ativos sob `src/`, excluindo `node_modules`, `coverage` e `dist`.

Comando:

```text
node --max-old-space-size=6144 node_modules/eslint/bin/eslint.js <arquivos .ts de src> --format json --no-cache
```

Resultado:

| Métrica | Resultado |
| --- | ---: |
| CANDIDATES | 281 |
| RESULTS | 281 |
| UNIQUE_PATHS | 281 |
| Erros | 0 |
| Avisos | 0 |
| Arquivos com diagnósticos | 0 |
| Falhas de processo | 0 |
| Exit code global | 0 |
| Fallback por arquivo | Não utilizado |

O processo global não abortou e não retornou exit code 134.

## 2. ESLint dos testes ativos

Foram analisados exatamente os 70 arquivos `.ts` ativos de `test/`, excluindo `node_modules`, `coverage` e `dist`.

Comando:

```text
node --max-old-space-size=6144 node_modules/eslint/bin/eslint.js <70 arquivos .ts de test> --format json --no-cache
```

Resultado:

| Métrica | Resultado |
| --- | ---: |
| CANDIDATES | 70 |
| RESULTS | 70 |
| UNIQUE_PATHS | 70 |
| Erros | 0 |
| Avisos | 0 |
| Arquivos com diagnósticos | 0 |
| Arquivos sem diagnósticos | 70 |
| Exit code | 0 |

## 3. TypeScript

Comando executado:

```text
node --max-old-space-size=6144 node_modules/typescript/bin/tsc --noEmit
```

Exit code: `2`.

Saída completa:

```text
src/modules/arquivos/storage/providers/s3-storage.service.ts(156,7): error TS2353: Object literal may only specify known properties, and 'url' does not exist in type 'Promise<SignedUrlResult>'.
test/e2e/cliente-area.e2e-spec.ts(21,42): error TS2345: Argument of type 'unknown' is not assignable to parameter of type 'string'.
test/unit/agendamentos-concurrency.spec.ts(15,10): error TS2694: Namespace '"C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/node_modules/.prisma/client/index".Prisma' has no exported member 'Agendamento'.
test/unit/analytics-performance-limits.spec.ts(69,13): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(75,24): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(76,27): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(79,24): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(80,27): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(83,28): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(91,24): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(94,24): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(95,26): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/analytics-performance-limits.spec.ts(96,27): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/area-cliente-privacy.spec.ts(59,7): error TS2353: Object literal may only specify known properties, and 'empresaId' does not exist in type 'PortalPointMovementItem'.
test/unit/area-cliente-privacy.spec.ts(70,7): error TS2353: Object literal may only specify known properties, and 'empresaId' does not exist in type 'PortalWhatsappMessageItem'.
test/unit/chat03-bullmq-retention.spec.ts(76,18): error TS2339: Property 'completedRemoved' does not exist on type '{ job: string; status: string; cutoff: string; deletedCount: number; } | { job: string; status: string; retentionDays: number; removedCount: number; } | { job: string; status: "SIMULADO"; retentionCompletedJobsDays: number; retentionFailedJobsDays: number; message: string; } | { ...; }'.
test/unit/chat03-bullmq-retention.spec.ts(77,18): error TS2339: Property 'failedRemoved' does not exist on type '{ job: string; status: string; cutoff: string; deletedCount: number; } | { job: string; status: string; retentionDays: number; removedCount: number; } | { job: string; status: "SIMULADO"; retentionCompletedJobsDays: number; retentionFailedJobsDays: number; message: string; } | { ...; }'.
test/unit/chat36-backup.coverage.spec.ts(92,19): error TS2339: Property 'results' does not exist on type '{ job: BackupJobName; status: string; timestamp: string; executionEnabled: boolean; message: string; scripts: string[]; } | { job: BackupJobName; status: string; ... 4 more ...; results: BackupScriptResult[]; }'.
test/unit/chat36-backup.coverage.spec.ts(107,19): error TS2339: Property 'results' does not exist on type '{ job: BackupJobName; status: string; timestamp: string; executionEnabled: boolean; message: string; scripts: string[]; } | { job: BackupJobName; status: string; ... 4 more ...; results: BackupScriptResult[]; }'.
test/unit/chat36-lgpd.coverage.spec.ts(74,5): error TS2322: Type '{ id: string; role: string; empresaId: string; }' is not assignable to type '{ id?: string | undefined; sub?: string | undefined; usuarioId?: string | undefined; role?: string | undefined; empresaId?: string | null | undefined; } & { [key: string]: string | undefined; ... 9 more ...; nome: string; }'.
test/unit/chat36-lgpd.coverage.spec.ts(168,48): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(206,48): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(222,48): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(224,30): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(225,30): error TS2345: Argument of type '{ id: string; }[]' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(234,48): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(237,7): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(247,48): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(248,45): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(313,48): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(315,7): error TS2345: Argument of type '{ id: string; empresaId: string; nome: string; telefone: string; email: string; cpf: string; dataNascimento: Date; endereco: string; observacoes: string; senha: string; refreshToken: string; refreshTokenHash: string; token: string; codigoAcesso: string; codigoHash: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(318,7): error TS2345: Argument of type 'Error' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(327,48): error TS2345: Argument of type 'null' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(336,7): error TS2345: Argument of type '{ id: string; empresaId: string; }' is not assignable to parameter of type 'never'.
test/unit/chat36-lgpd.coverage.spec.ts(345,48): error TS2345: Argument of type '{ id: string; empresaId: string; }' is not assignable to parameter of type 'never'.
test/unit/cliente-area-compatibility.spec.ts(42,26): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/cliente-area-compatibility.spec.ts(43,29): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(117,13): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(122,13): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(127,13): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(130,13): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(147,15): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(152,15): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(190,15): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/clientes-pacotes-concurrency.spec.ts(193,29): error TS2743: No overload expects 1 type arguments, but overloads do exist that expect either 0 or 2 type arguments.
test/unit/controllers-expanded.coverage.spec.ts(45,54): error TS2345: Argument of type 'UnknownRecord | null' is not assignable to parameter of type 'UnknownRecord'.
test/unit/coverage-under-70-branch-matrix.generated.spec.ts(392,13): error TS2322: Type 'string | undefined' is not assignable to type 'string'.
test/unit/coverage-under-70-branch-matrix.generated.spec.ts(392,29): error TS2367: This comparison appears to be unintentional because the types '"private" | "public" | "false" | "happy" | "empty" | "throw" | "inactive" | "crossTenant" | "expired" | "invalid"' and '"null"' have no overlap.
test/unit/coverage-under-70-branch-matrix.generated.spec.ts(939,44): error TS2345: Argument of type 'Function' is not assignable to parameter of type 'UnknownFunction'.
  Type 'Function' provides no match for the signature '(...args: unknown[]): unknown'.
test/unit/coverage-under-70-final-target.generated.spec.ts(988,46): error TS2345: Argument of type 'Function' is not assignable to parameter of type 'ConstructorLike'.
  Type 'Function' provides no match for the signature 'new (...args: unknown[]): UnknownRecord'.
test/unit/coverage-under-70-targeted.generated.spec.ts(615,42): error TS2345: Argument of type 'Function' is not assignable to parameter of type 'UnknownFunction'.
  Type 'Function' provides no match for the signature '(...args: unknown[]): unknown'.
test/unit/helpers/coverage-smoke.helper.ts(730,17): error TS2783: 'id' is specified more than once, so this usage will be overwritten.
test/unit/helpers/coverage-smoke.helper.ts(731,17): error TS2783: 'status' is specified more than once, so this usage will be overwritten.
test/unit/infrastructure-expanded.coverage.spec.ts(89,21): error TS18046: 'instance.canActivate' is of type 'unknown'.
test/unit/infrastructure-expanded.coverage.spec.ts(101,21): error TS18046: 'instance.catch' is of type 'unknown'.
test/unit/infrastructure-expanded.coverage.spec.ts(118,21): error TS18046: 'instance.intercept' is of type 'unknown'.
test/unit/meta-whatsapp-worker-flow.spec.ts(43,5): error TS2345: Argument of type 'StatusMensagemWhatsApp' is not assignable to parameter of type '"PENDENTE" | undefined'.
  Type '"ENVIADA"' is not assignable to type '"PENDENTE"'.
test/unit/modules-services-expanded.coverage.spec.ts(48,54): error TS2345: Argument of type 'UnknownRecord | null' is not assignable to parameter of type 'UnknownRecord'.
  Type 'null' is not assignable to type 'UnknownRecord'.
test/unit/services-critical.coverage.spec.ts(342,22): error TS2739: Type '{}' is missing the following properties from type 'ServiceConstructor': length, name
test/unit/services-critical.coverage.spec.ts(488,48): error TS2345: Argument of type 'ServiceConstructor | null' is not assignable to parameter of type 'ServiceConstructor'.
  Type 'null' is not assignable to type 'ServiceConstructor'.
test/unit/services-critical.coverage.spec.ts(495,48): error TS2345: Argument of type 'ServiceConstructor | null' is not assignable to parameter of type 'ServiceConstructor'.
  Type 'null' is not assignable to type 'ServiceConstructor'.
test/unit/services-critical.coverage.spec.ts(503,48): error TS2345: Argument of type 'ServiceConstructor | null' is not assignable to parameter of type 'ServiceConstructor'.
  Type 'null' is not assignable to type 'ServiceConstructor'.
test/unit/tenant-validator.spec.ts(106,45): error TS2345: Argument of type '{ id: string; empresaId: string; ativo: boolean; status: string; }' is not assignable to parameter of type 'never'.
test/unit/tenant-validator.spec.ts(107,44): error TS2345: Argument of type '{ id: string; empresaId: string; ativo: boolean; status: string; }' is not assignable to parameter of type 'never'.
test/unit/tenant-validator.spec.ts(108,44): error TS2345: Argument of type '{ id: string; empresaId: string; ativo: boolean; status: string; }[]' is not assignable to parameter of type 'never'.
test/unit/tenant-validator.spec.ts(111,49): error TS2345: Argument of type '{ id: string; slug: string; ativo: boolean; }' is not assignable to parameter of type 'never'.
test/unit/tenant-validator.spec.ts(112,48): error TS2345: Argument of type '{ id: string; slug: string; ativo: boolean; }' is not assignable to parameter of type 'never'.
```

Principais causas prováveis observadas: incompatibilidade de tipos gerados/consumidos pelo Prisma, contratos de retorno que não discriminam variantes, assinaturas de mocks inferidas como `never`, e tipos de testes mais estritos que as APIs atuais. Nenhuma correção foi aplicada.

## 4. Jest unitário global

Comando:

```text
node --max-old-space-size=6144 node_modules/jest/bin/jest.js --config ./jest.config.js --runInBand --json --outputFile <temporário>
```

Resultado final do relatório JSON:

| Métrica | Resultado |
| --- | ---: |
| Suítes totais | 38 |
| Suítes aprovadas | 38 |
| Suítes falhas | 0 |
| Testes totais | 1511 |
| Testes aprovados | 1511 |
| Testes falhos | 0 |
| `success` | `true` |
| Exit code efetivo | 0 |

O log do Jest registrou uma mensagem de erro esperada de cenário (`AuditoriaService`) e uma mensagem informativa de serviço, mas não houve falha de suíte ou teste. Duas tentativas do wrapper PowerShell não expuseram o `$LASTEXITCODE` no retorno da ferramenta; a segunda produziu o relatório JSON válido acima (`success=true`, consistente com exit 0). Isso foi uma anomalia de captura do wrapper, não uma falha do Jest.

## 5. Integridade

### `git diff --check`

Resultado: passou, exit code `0`.

O Git emitiu somente avisos informativos de que arquivos LF poderão ser convertidos para CRLF no próximo toque; não houve erro de whitespace.

### `git status --short`

O status contém alterações locais pré-existentes e arquivos não rastreados, preservados integralmente. Principais itens:

```text
M .env.example
M package-lock.json
M package.json
M prisma/schema.prisma
M src/backup/backup.service.ts
M src/modules/arquivos/arquivos.module.ts
M src/modules/arquivos/storage/storage.factory.ts
M src/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts
M src/modules/configuracao-whatsapp/dto/create-configuracao-whatsapp.dto.ts
M src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts
M src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts
M test/e2e/
M test/helpers/
M test/seeds/test-seed.ts
M test/unit/
?? docs/
?? prisma/migrations/20260911150000_meta_whatsapp_tenant_connection/
?? scripts/backup/
?? scripts/uploads/
?? src/modules/arquivos/storage/providers/s3-storage.service.ts
?? test/integration/
?? test/unit/backup-external-upload.spec.ts
?? test/unit/s3-storage.service.spec.ts
```

Nenhum arquivo de código foi alterado pelo B196.

## Falhas de processo

- ESLint `src`: nenhuma falha de processo; execução global concluída com exit 0.
- ESLint `test`: nenhuma falha de processo; execução concluída com exit 0.
- TypeScript: processo concluído com exit 2 por diagnósticos de compilação listados acima.
- Jest: a captura inicial do wrapper não expôs o exit code e não produziu relatório; a repetição produziu relatório JSON completo com 38/38 suítes, 1511/1511 testes e `success=true`. Não há falha funcional do Jest.
- Integridade Git: `git diff --check` concluído com exit 0.

## Operações não executadas

Não foram executados correções automáticas, `--fix`, build de produção (`nest build`), testes E2E, Jest E2E, stage, commit, push, migration, deploy ou qualquer alteração de configuração.

## Conclusão

`BLOCKED`: o backend não está pronto para a próxima fase porque o typecheck completo falha com exit 2. Os gates de lint, testes unitários e integridade passaram, mas o bloqueio de TypeScript deve ser resolvido em um bloco posterior e validado novamente.

Relatório: `beauty-core-backend/docs/chat-b/chat-b196-final-backend-gate.md`
