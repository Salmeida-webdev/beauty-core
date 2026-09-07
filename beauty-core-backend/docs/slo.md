# SLO — Service Level Objectives

## Objetivo

Definir objetivos internos de confiabilidade para operação do Beauty Core.

SLOs são metas internas usadas para operação, melhoria contínua e avaliação de qualidade. Eles não necessariamente representam obrigações comerciais, salvo quando incorporados em contrato.

## Disponibilidade

| Serviço | SLO inicial |
|---|---:|
| API `/health/live` | 99,9% |
| API `/health/ready` | 99,5% |
| Autenticação admin | 99,5% |
| Autenticação cliente | 99,5% |
| Área do cliente | 99,5% |
| PostgreSQL | 99,5% |
| Redis/BullMQ | 99,0% |
| Métricas `/metrics` | 99,0% |

## Latência

| Operação | SLO inicial |
|---|---:|
| Health live | p95 abaixo de 200ms |
| Health ready | p95 abaixo de 500ms |
| Login admin | p95 abaixo de 800ms |
| Login cliente/OTP | p95 abaixo de 1.000ms |
| Listagens administrativas | p95 abaixo de 1.200ms |
| Dashboard | p95 abaixo de 1.500ms |
| Operações públicas por tenant | p95 abaixo de 1.000ms |
| Download protegido de arquivo | p95 conforme storage |

## Taxa de erro

| Área | SLO inicial |
|---|---:|
| API geral | erro 5xx abaixo de 1% |
| Autenticação | erro 5xx abaixo de 0,5% |
| Área do cliente | erro 5xx abaixo de 1% |
| Jobs BullMQ | sucesso acima de 98% |
| Backups agendados | sucesso acima de 99% |
| Schedulers críticos | sucesso acima de 99% |
| Upload/download protegido | erro 5xx abaixo de 1% |

## Backup e restore

| Indicador | SLO inicial |
|---|---:|
| Backup PostgreSQL diário | 99% |
| Backup uploads | 99% |
| Backup Redis quando aplicável | 99% |
| RPO | até 24h |
| RTO | até 4h |
| Teste de restore | mensal |
| Validação de restore | obrigatória antes de produção premium |

## Filas BullMQ

| Indicador | SLO inicial |
|---|---:|
| Jobs críticos processados | 98% |
| Jobs não críticos processados | 95% |
| DLQ crítica | investigação como SEV2 ou SEV1 |
| DLQ não crítica | investigar em até 1 dia útil |
| Backlog persistente | alerta após crescimento contínuo |
| Scheduler crítico | execução única por janela esperada |

## Operação

| Severidade | SLO de resposta |
|---|---:|
| SEV1 | até 15 minutos |
| SEV2 | até 1 hora |
| SEV3 | até 4 horas úteis |
| SEV4 | até 1 dia útil |

## Segurança

| Indicador | SLO inicial |
|---|---:|
| CodeQL em PR | obrigatório |
| npm audit produção | obrigatório |
| Dependabot | semanal |
| Rotação emergencial de secret exposto | imediata |
| Revisão de incidente SEV1 | obrigatória |

## Revisão

SLOs devem ser revisados após:

- mudança de escala;
- entrada de cliente enterprise;
- incidente relevante;
- alteração arquitetural;
- mudança de infraestrutura;
- alteração em filas, backup ou autenticação.
