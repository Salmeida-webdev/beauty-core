# Beauty Core — lote B159

- Data: 2026-09-22
- Baseline: B157 (inventário global) e B158 (detalhamento de `utils.coverage.spec.ts`); B151 usado como referência histórica.
- Escopo: quatro testes unitários ativos; nenhuma alteração de produção.

## Arquivos tratados

1. `test/unit/utils.coverage.spec.ts`
2. `test/unit/usuario-role-policy.coverage.spec.ts` — 16 erros no B157
3. `test/unit/auth-guards.coverage.spec.ts` — 15 erros no B157
4. `test/unit/infrastructure-expanded.coverage.spec.ts` — 14 erros no B157

`queue-utils.spec.ts` também tinha 14 erros; o desempate preservou a ordem do inventário B157, que lista `infrastructure-expanded.coverage.spec.ts` antes dele.

## Correções

- `utils.coverage.spec.ts`: preservada a versão local já corrigida, com imports estáticos e contratos sem `any`/`Function`.
- `usuario-role-policy.coverage.spec.ts`: substituído smoke genérico por cobertura direta das matrizes de criação/gestão/atualização, exceções e regras de empresa.
- `auth-guards.coverage.spec.ts`: imports estáticos dos três guards e instanciação concreta.
- `infrastructure-expanded.coverage.spec.ts`: carregamento via `createRequire` tipado, callable explícito, sem `any`, sem catches vazios e com o smoke coverage existente preservado.

## Validações isoladas

| Arquivo | Prettier | ESLint isolado | Jest isolado |
|---|---|---|---|
| `utils.coverage.spec.ts` | PASS | PASS | 1 suíte, 7 testes |
| `usuario-role-policy.coverage.spec.ts` | PASS | PASS | 1 suíte, 4 testes |
| `auth-guards.coverage.spec.ts` | PASS | PASS | 1 suíte, 1 teste |
| `infrastructure-expanded.coverage.spec.ts` | PASS | PASS | 1 suíte, 96 testes |

## ESLint global dos testes

- Heap: 6144 MB.
- Candidatos: 70.
- Resultados JSON: 70.
- Caminhos únicos: 70.
- Conjuntos de caminhos idênticos: PASS.
- Resultado: 100 erros / 92 avisos.
- B157: 204 erros / 129 avisos.
- Variação B157 → B159: -104 erros / -37 avisos.

## Jest unitário global do backend

- 38/38 suítes aprovadas.
- 1509/1509 testes aprovados.

## Integridade

- `git diff --check`: PASS (exit 0; apenas avisos de normalização LF/CRLF do Git).
- `git status --short`: executado; alterações locais preexistentes preservadas.
- Não executados: stage, commit, push, migration, build, E2E e deploy.
