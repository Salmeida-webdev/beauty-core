# SLI — Service Level Indicators

## Objetivo

Definir indicadores mensuráveis para acompanhar os SLOs do Beauty Core.

SLIs são métricas reais usadas para medir disponibilidade, latência, erro, backup, filas, segurança e isolamento multiempresa.

## Indicadores de disponibilidade

| SLI | Fonte sugerida |
|---|---|
| API live disponível | `/health/live` |
| API ready disponível | `/health/ready` |
| Health full por dependência | `/health/full` |
| PostgreSQL disponível | health interno |
| Redis disponível | health interno |
| Filas disponíveis | `/health/queues` |
| Métricas disponíveis | `/metrics` |

## Indicadores de latência

| SLI | Fonte sugerida |
|---|---|
| Latência HTTP p50 | Prometheus |
| Latência HTTP p95 | Prometheus |
| Latência HTTP p99 | Prometheus |
| Latência por rota | métricas HTTP |
| Latência de dependências | health full |
| Tempo de execução de job | métricas BullMQ |
| Tempo de resposta de dashboard | métrica por rota |
| Tempo de download protegido | logs/métricas de arquivos |

## Indicadores de erro

| SLI | Fonte sugerida |
|---|---|
| Taxa de HTTP 5xx | Prometheus |
| Taxa de HTTP 4xx relevante | Prometheus/logs |
| Erros por módulo | logs estruturados |
| Falhas de autenticação | auditoria/logs |
| Falhas de autorização | auditoria/logs |
| Falhas em jobs | BullMQ metrics |
| Crescimento da DLQ | BullMQ/DLQ |
| Falhas de upload/download | logs/métricas |

## Indicadores de backup

| SLI | Fonte sugerida |
|---|---|
| Último backup PostgreSQL válido | status de backup |
| Último backup uploads válido | status de backup |
| Último backup Redis válido | status de backup |
| Duração do backup | logs/métricas |
| Falha de backup | logs/métricas |
| Tamanho do backup | storage/logs |
| Último restore testado | registro operacional |

## Indicadores de segurança

| SLI | Fonte sugerida |
|---|---|
| CodeQL executado | GitHub Actions |
| npm audit executado | GitHub Actions |
| Dependabot PR aberto | GitHub |
| Dependabot PR resolvido | GitHub |
| Secrets rotacionados | registro operacional |
| Sessões revogadas em incidente | auditoria |
| Vulnerabilidades críticas abertas | GitHub/security audit |
| Tempo de correção de vulnerabilidade crítica | relatório operacional |

## Indicadores multi-tenant

| SLI | Fonte sugerida |
|---|---|
| Erros por empresa | logs com `empresaId` |
| Incidentes por tenant | incident response |
| Validação de isolamento | testes e2e |
| Ações SUPER_ADMIN | auditoria |
| Falhas de autorização cruzada | auditoria/testes |
| Uso por tenant | métricas e relatórios |

## Indicadores de filas

| SLI | Fonte sugerida |
|---|---|
| Jobs aguardando | BullMQ |
| Jobs ativos | BullMQ |
| Jobs concluídos | BullMQ |
| Jobs falhos | BullMQ |
| Jobs em DLQ | DLQ |
| Tempo médio por job | métricas |
| Backlog por fila | métricas |
| Taxa de retry | métricas |

## Fórmulas recomendadas

### Disponibilidade

`disponibilidade = tempo_ok / tempo_total`

### Taxa de erro

`taxa_erro = respostas_5xx / total_respostas`

### Sucesso de jobs

`sucesso_jobs = jobs_concluidos / jobs_processados`

### Sucesso de backup

`sucesso_backup = backups_ok / backups_agendados`

### Backlog de fila

`backlog = waiting + delayed + failed`

### DLQ growth

`crescimento_dlq = dlq_atual - dlq_periodo_anterior`

## Frequência de revisão

| Área | Frequência |
|---|---|
| Operação | semanal |
| Produto | mensal |
| Cliente enterprise | mensal |
| Pós-incidente | imediatamente após RCA |
| Segurança | semanal ou sob alerta |
