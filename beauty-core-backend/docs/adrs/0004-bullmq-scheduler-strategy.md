# ADR 0004 — BullMQ and Scheduler Strategy

## Status

Aceito.

## Contexto

O Beauty Core executa tarefas assíncronas e recorrentes, incluindo notificações, WhatsApp, campanhas, aniversários, relatórios, limpeza operacional e rotinas de backup.

Essas rotinas não devem bloquear a API nem gerar execução duplicada em múltiplas instâncias.

## Decisão

A estratégia oficial usa:

- BullMQ para filas assíncronas;
- Redis como backend de filas;
- workers separados por domínio;
- retry com backoff;
- DLQ para falhas finais;
- jobId determinístico quando houver necessidade de idempotência;
- locks distribuídos para schedulers;
- métricas e health checks de filas;
- endpoints administrativos protegidos para inspeção/reprocessamento quando aplicável.

## Consequências

### Positivas

- API permanece responsiva.
- Falhas são isoladas em filas.
- DLQ melhora diagnóstico.
- Locks reduzem execução duplicada.
- Workers podem escalar separadamente da API.

### Negativas

- Redis vira componente crítico.
- DLQ exige monitoramento ativo.
- Workers mal dimensionados podem acumular backlog.
- Jobs precisam ser idempotentes para evitar efeitos duplicados.

## Controles obrigatórios

- filas devem ter retry/backoff padronizados;
- falhas finais devem ir para DLQ;
- schedulers críticos devem usar lock;
- jobs financeiros ou de comunicação devem ser idempotentes;
- métricas de fila devem ser expostas;
- crescimento de DLQ deve gerar incidente operacional.

## Critérios de aceite

- Redis indisponível aparece em health check.
- DLQ crescente tem runbook.
- Jobs não executam duplicados em cenário multi-instância.
- Workers suportam configuração de concorrência.
