# Beauty Core — lote B167

- Data: 2026-09-22
- Arquivo tratado: `test/unit/tenant-services.coverage.spec.ts`.
- Baseline: B166 — 7 erros e 2 avisos ESLint neste arquivo.
- Contratos lidos antes da edição: `TenantPublicService`, `TenantValidatorService`, `TenantModule`, `PrismaService`, `PrismaService` de teste, modelos `Empresa`/`Cliente` e os contratos dos controllers públicos de clientes/tenant.
- Nenhum módulo de produção foi alterado.

## Correção semântica

- Imports estáticos dos serviços e tipos Prisma, sem `require` ou `any`.
- Removida a descoberta dinâmica de classes e a instanciação insegura.
- Adicionados cenários reais para resolução pública por slug/domínio, tenant ausente, empresa ativa, cliente pertencente ao tenant, identificador obrigatório e recurso fora da empresa.
- Uso de `PrismaService` não conectado com spies tipados nos delegates, preservando o isolamento unitário e o comportamento multiempresa.
- Assertions verificam consultas, filtros de empresa, normalização e exceções de domínio.

## Validações

| Etapa | Resultado |
|---|---|
| Prettier | PASS — exit 0 |
| ESLint isolado | PASS — exit 0; 0 erros e 0 avisos |
| Jest unitário isolado | PASS — 1 suíte e 4 testes |

Comparação do arquivo: `7 erros / 2 avisos` → `0 erros / 0 avisos`.

## Restrições

- Não executados: E2E, stage, commit, push, migration, build ou deploy.
