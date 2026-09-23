# B191 — Correção ESLint de `test/e2e/health.e2e-spec.ts`

Data: 2026-09-22

## Escopo e contratos revisados

Foi tratado exclusivamente `test/e2e/health.e2e-spec.ts`. Antes da edição foram lidos o teste integral, `test/setup-e2e.ts`, `test/helpers/auth.helper.ts`, `src/modules/health/health.controller.ts`, `health.service.ts`, `enterprise-health.controller.ts`, `enterprise-health.service.ts`, `health.module.ts` e a inclusão do `HealthModule`/configuração global no `AppModule`.

Os contratos confirmam que `/health` e `/health/live` são públicos, `/health/ready` pode responder 200 ou 503 conforme dependências, e os endpoints detalhados (`database`, `redis`, `summary`, `queues` e `full`) exigem JWT Admin e podem responder 200 ou 503 conforme a disponibilidade real.

## Diagnóstico ESLint

| Métrica | Antes | Depois |
| --- | ---: | ---: |
| Erros | 1 | 0 |
| Avisos | 6 | 0 |

Correções aplicadas:

- substituição do import `require('supertest')` por import default;
- tipagem explícita do app HTTP como `INestApplication<Server>`;
- uso do app HTTP tipado no helper de login e em todas as chamadas SuperTest;
- preservação dos endpoints, autenticação, status 200/401/503 e cenários de disponibilidade existentes.

## Validações executadas

- Prettier no arquivo: passou (`exit 0`), sem mudanças adicionais;
- ESLint isolado, sem `--fix` e sem cache: passou (`exit 0`, 0 erros, 0 avisos);
- `git diff --check -- test/e2e/health.e2e-spec.ts`: passou (`exit 0`). O Git exibiu somente aviso informativo de normalização LF/CRLF.

## Arquivos alterados

- `test/e2e/health.e2e-spec.ts`;
- este relatório B191.

## Operações não executadas

Não foram executados Jest, testes E2E, stage, commit, push, migration, build ou deploy.
