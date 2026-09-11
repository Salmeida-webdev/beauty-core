# BEAUTY CORE 1.0 - CHAT 04 - BLOCO 14 - DIAGNOSTICO DO LINT GLOBAL LEGADO

- Data/hora: 2026-09-09 16:09:03 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: f76d658f4cd05f1c7e151ce513a83e26c120872e
- origin/main: f76d658f4cd05f1c7e151ce513a83e26c120872e

> Diagnostico somente leitura. O ESLint foi executado sem --fix.
> Nenhum arquivo fonte, teste, configuracao ou artefato foi alterado.

## 1. Resultado global

| Indicador | Resultado |
|---|---:|
| Exit code ESLint | 1 |
| Arquivos analisados | 347 |
| Arquivos com findings | 115 |
| Erros | 1597 |
| Warnings | 269 |
| Total de findings | 1866 |

## 2. Classificacao inicial

| Grupo | Findings |
|---|---:|
| Codigo de producao | 827 |
| Testes e helpers | 806 |
| Gerados/relatorios | 233 |

## 3. Top regras

| Regra | Findings |
|---|---:|
| @typescript-eslint/no-unsafe-member-access | 590 |
| @typescript-eslint/no-unsafe-assignment | 397 |
| @typescript-eslint/no-unsafe-argument | 268 |
| @typescript-eslint/no-unsafe-return | 171 |
| @typescript-eslint/no-unsafe-call | 132 |
| @typescript-eslint/require-await | 131 |
| @typescript-eslint/no-require-imports | 53 |
| @typescript-eslint/no-unused-vars | 35 |
| no-empty | 23 |
| @typescript-eslint/no-base-to-string | 18 |
| @typescript-eslint/no-misused-promises | 15 |
| prettier/prettier | 12 |
| @typescript-eslint/no-unsafe-function-type | 9 |
| @typescript-eslint/unbound-method | 4 |
| @typescript-eslint/await-thenable | 3 |
| no-sparse-arrays | 2 |
| @typescript-eslint/no-unnecessary-type-assertion | 2 |
| @typescript-eslint/no-floating-promises | 1 |

## 4. Top arquivos

| Arquivo | Findings | Grupo |
|---|---:|---|
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/coverage-under-70-branch-matrix.generated.spec.ts | 109 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/helpers/coverage-smoke.helper.ts | 105 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/coverage-under-70-targeted.generated.spec.ts | 102 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/coverage-under-70-final-target.generated.spec.ts | 100 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/area-cliente/area-cliente.service.ts | 87 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/chat36-lgpd.coverage.spec.ts | 62 | GENERATED_OR_REPORT |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/seeds/test-seed.ts | 50 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auth/auth.service.ts | 46 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/tenant-validator.spec.ts | 43 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/queues/services/dead-letter-queue.service.ts | 40 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/arquivos/arquivos.service.ts | 38 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/auth-cliente/auth-cliente.service.ts | 36 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/modules/mensagens-whatsapp/mensagens-whatsapp.service.ts | 35 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/infrastructure-expanded.coverage.spec.ts | 34 | GENERATED_OR_REPORT |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/lgpd/lgpd.service.ts | 33 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/auth-cliente.e2e-spec.ts | 32 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/src/common/interceptors/audit-log.interceptor.ts | 31 | PRODUCTION_SOURCE |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/e2e/uploads.e2e-spec.ts | 31 | TESTS_AND_HELPERS |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/unit/micro-boost.coverage.spec.ts | 30 | GENERATED_OR_REPORT |
| C:/Users/cmted/Desktop/Plataformas Saas/Beauty-Core/beauty-core-backend/test/helpers/auth.helper.ts | 29 | TESTS_AND_HELPERS |

## 5. Escopo da correcao

A correcao sera dividida em grupos revisaveis: primeiro exclusao correta de artefatos gerados da entrada do lint, depois codigo de producao prioritario, e por fim testes/helpers. Nenhuma regra sera desativada para mascarar findings.

**READY-FOR-LINT-GLOBAL-CLASSIFICATION-AND-SELECTIVE-FIX-AUTHORIZATION**
