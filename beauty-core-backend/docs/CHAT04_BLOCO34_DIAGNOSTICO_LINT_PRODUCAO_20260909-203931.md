# Chat 04 - Bloco 34 - Diagnostico Lint de Producao V3

Data: 2026-09-09 20:39:31 -03:00
- Projeto: C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core
- Branch: main
- HEAD: 219dd066492ea23eadab10cb089957dd521cb816
- origin/main: 219dd066492ea23eadab10cb089957dd521cb816
- Status preservado: 309
- Staged antes/depois: 0/0

## Coleta

- Arquivos src candidatos: 280
- Tamanho dos lotes: 8
- Total de lotes: 35
- Lotes com falha: 0
- Exit code maximo: 1

## Findings de producao

- Arquivos com findings: 228
- Erros: 170
- Warnings: 58
- Total: 228

## Top arquivos

- src/modules/mensagens-whatsapp/dto/create-mensagem-whatsapp.dto.ts: 1 findings (1 erros, 0 warnings)
- src/modules/health/health.service.ts: 1 findings (1 erros, 0 warnings)
- src/modules/health/health.controller.ts: 1 findings (1 erros, 0 warnings)
- src/modules/mensagens-whatsapp/meta-whatsapp-webhook.types.ts: 1 findings (1 erros, 0 warnings)
- src/modules/niveis-fidelidade/dto/update-nivel-fidelidade.dto.ts: 1 findings (1 erros, 0 warnings)
- src/modules/niveis-fidelidade/dto/create-nivel-fidelidade.dto.ts: 1 findings (0 erros, 1 warnings)
- src/modules/mensagens-whatsapp/providers/meta-whatsapp-cloud.provider.ts: 1 findings (1 erros, 0 warnings)
- src/modules/financeiro/financeiro.controller.ts: 1 findings (1 erros, 0 warnings)
- src/modules/financeiro/dto/update-movimentacao.dto.ts: 1 findings (1 erros, 0 warnings)
- src/modules/financeiro/dto/registrar-pagamento.dto.ts: 1 findings (1 erros, 0 warnings)
- src/modules/financeiro/financeiro.module.ts: 1 findings (1 erros, 0 warnings)
- src/modules/health/enterprise-health.service.ts: 1 findings (1 erros, 0 warnings)
- src/modules/health/enterprise-health.controller.ts: 1 findings (1 erros, 0 warnings)
- src/modules/financeiro/financeiro.service.ts: 1 findings (1 erros, 0 warnings)
- src/modules/notificacoes/notificacoes.service.ts: 1 findings (1 erros, 0 warnings)
- src/modules/notificacoes/notificacoes.module.ts: 1 findings (0 erros, 1 warnings)
- src/modules/notificacoes/notificacoes.controller.ts: 1 findings (1 erros, 0 warnings)
- src/modules/pacotes/dto/create-pacote.dto.ts: 1 findings (0 erros, 1 warnings)
- src/modules/pacotes/pacotes.controller.ts: 1 findings (1 erros, 0 warnings)
- src/modules/pacotes/pacotes.controller.spec.ts: 1 findings (1 erros, 0 warnings)
- src/modules/pacotes/dto/update-pacote.dto.ts: 1 findings (1 erros, 0 warnings)
- src/modules/niveis-fidelidade/niveis-fidelidade.module.ts: 1 findings (0 erros, 1 warnings)
- src/modules/niveis-fidelidade/niveis-fidelidade.controller.ts: 1 findings (1 erros, 0 warnings)
- src/modules/niveis-fidelidade/niveis-fidelidade.controller.spec.ts: 1 findings (0 erros, 1 warnings)
- src/modules/niveis-fidelidade/niveis-fidelidade.service.spec.ts: 1 findings (1 erros, 0 warnings)

## Top regras

- @typescript-eslint/no-unsafe-member-access: 77
- @typescript-eslint/no-unsafe-argument: 58
- @typescript-eslint/no-unsafe-assignment: 28
- prettier/prettier: 19
- @typescript-eslint/no-unsafe-return: 11
- @typescript-eslint/no-unused-vars: 11
- @typescript-eslint/no-unsafe-call: 7
- @typescript-eslint/no-base-to-string: 6
- @typescript-eslint/require-await: 5
- @typescript-eslint/no-misused-promises: 3
- no-sparse-arrays: 2
- @typescript-eslint/no-unnecessary-type-assertion: 1

## Gate: READY-FOR-NEXT-SELECTIVE-LINT-GROUP

Nenhuma alteracao de codigo, dependencia ou estado Git foi executada.
