# B175 — Correção de `agendamentos-concurrency.spec.ts`

- Data: 2026-09-22
- Baseline ESLint: B174
- Arquivo tratado: `test/unit/agendamentos-concurrency.spec.ts`

## Contratos analisados

Foram lidos integralmente o teste e `src/modules/agendamentos/agendamentos.service.ts`, incluindo `assertNoScheduleConflict`, `Prisma.TransactionClient`, `Prisma.Agendamento`, `StatusAgendamento` e a estrutura real da consulta Prisma. O mock foi modelado somente com o método `agendamento.findFirst` consumido pelo método testado.

## Correções semânticas

- Removido o acesso ao serviço por `as any`; foi criada uma interface de teste específica para o método privado exercitado.
- Tipados os parâmetros de conflito, o registro retornado, a transação reduzida e a consulta Prisma.
- Substituído o mock inferido por uma função Jest com assinatura `ConflictFinder` e captura tipada da última consulta.
- Removidos acessos inseguros a `mock.calls` e matchers genéricos que produziam `no-unsafe-assignment`/`no-unsafe-member-access`.
- Mantida a verificação do intervalo sobreposto, do profissional/empresa, da seleção Prisma e dos status ocupados.
- A segunda garantia agora valida exatamente `PENDENTE`, `CONFIRMADO` e `EM_ANDAMENTO`, excluindo semanticamente `CANCELADO`.

## Validações

- Prettier isolado: executado com sucesso.
- ESLint isolado, sem `--fix` e sem cache: 0 erros e 0 avisos.
- Jest unitário isolado: 1 suíte aprovada, 2 testes aprovados.
- E2E: não executado.
- Não executados: stage, commit, push, migration, build ou deploy.

## Comparação com B174

| Métrica | B174 | B175 | Variação |
|---|---:|---:|---:|
| Erros no arquivo | 6 | 0 | -6 |
| Avisos no arquivo | 0 | 0 | 0 |

