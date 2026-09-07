# Coverage e Quality Gate — Beauty Core 1.0

## 1. Objetivo

Este documento define a politica de cobertura de testes e quality gate do backend Beauty Core 1.0.

Coverage e usado como criterio objetivo para reduzir regressao, validar maturidade tecnica e impedir homologacao de releases com queda de qualidade.

## 2. Scripts de coverage

| Script | Finalidade |
|---|---|
| npm run test:all:cov | Executa coverage combinado unit + E2E |
| npm run coverage:check | Valida thresholds minimos |

## 3. Arquivos de configuracao

| Arquivo | Uso |
|---|---|
| test/jest-all.coverage.js | Configuracao de coverage combinado |
| test/jest-all-json.coverage.js | Configuracao de coverage com json-summary |
| scripts/ci/check-coverage.js | Quality gate de cobertura |

## 4. Thresholds minimos

Os thresholds oficiais encontrados na auditoria Chat 41 sao:

| Metrica | Minimo |
|---|---:|
| Statements | 80% |
| Branches | 70% |
| Functions | 90% |
| Lines | 80% |

## 5. Saida esperada

O comando npm run test:all:cov deve gerar coverage-summary.json dentro de coverage/.

O comando npm run coverage:check deve localizar coverage-summary.json, ler a chave total e validar as metricas statements, branches, functions e lines.

## 6. Falhas bloqueantes

Uma release deve ser bloqueada se:

- coverage-summary.json nao existir.
- chave total estiver ausente.
- qualquer metrica obrigatoria estiver ausente.
- statements ficar abaixo de 80%.
- branches ficar abaixo de 70%.
- functions ficar abaixo de 90%.
- lines ficar abaixo de 80%.

## 7. Politica de manutencao

- Nao reduzir thresholds sem ADR ou decisao tecnica formal.
- Nao excluir arquivos criticos apenas para inflar cobertura.
- Priorizar cobertura em seguranca, tenant, LGPD, auth, filas, scheduler, uploads e financeiro.
- Coverage deve ser executado em CI antes de staging/producao.

## 8. Criterio de aceite

Coverage e considerado aprovado quando:

- npm run test:all:cov passa.
- npm run coverage:check retorna sucesso.
- Todas as metricas atingem os thresholds minimos.
