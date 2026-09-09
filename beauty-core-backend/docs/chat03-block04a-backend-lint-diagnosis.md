# Chat 03 - Bloco 04A - Diagnostico do backend lint

Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
Diagnostico somente leitura. Nenhum codigo foi alterado.
A saida foi resumida; nenhum valor de secret foi incluido.

## Resumo

| Status | Escopo | Exit code | Arquivos | Erros | Warnings |
|---|---|---:|---:|---:|---:|
| BLOCKER | src | 1 | 277 | 1232 | 125 |
| BLOCKER | test | 1 | 67 | 1009 | 165 |
| PASS | arquivos Chat 03 | 0 | 0 | 0 | 0 |

## Arquivos com mais erros

- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\analytics.service.ts: erros=309, warnings=13
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\financeiro.service.ts: erros=198, warnings=2
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\services-critical.coverage.spec.ts: erros=106, warnings=5
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\coverage-under-70-branch-matrix.generated.spec.ts: erros=103, warnings=6
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\helpers\coverage-smoke.helper.ts: erros=101, warnings=4
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\coverage-under-70-targeted.generated.spec.ts: erros=96, warnings=6
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\coverage-under-70-final-target.generated.spec.ts: erros=96, warnings=4
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.service.ts: erros=87, warnings=0
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\chat36-lgpd.coverage.spec.ts: erros=49, warnings=13
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\seeds\test-seed.ts: erros=49, warnings=1
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\unit\tenant-validator.spec.ts: erros=42, warnings=1
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth\auth.service.ts: erros=41, warnings=5
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\services\dead-letter-queue.service.ts: erros=38, warnings=2
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts: erros=36, warnings=2
- C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\test\e2e\uploads.e2e-spec.ts: erros=36, warnings=7

## Regras encontradas

@typescript-eslint/await-thenable, @typescript-eslint/no-base-to-string, @typescript-eslint/no-floating-promises, @typescript-eslint/no-misused-promises, @typescript-eslint/no-redundant-type-constituents, @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-function-type, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unused-vars, @typescript-eslint/require-await, @typescript-eslint/unbound-method, no-empty, no-sparse-arrays

## Interpretacao

- Erros somente em testes legados nao autorizam desativar regras globalmente.
- Erros em src ou nos arquivos do Chat 03 devem ser corrigidos antes do gate final.
- O proximo bloco deve aplicar apenas uma correcao comprovada e repetir o lint focado.
