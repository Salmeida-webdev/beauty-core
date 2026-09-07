# Manual BullMQ — Beauty Core 1.0

## 1. Objetivo
Este documento descreve a camada BullMQ do Beauty Core 1.0, incluindo filas, workers, DLQ, retry, backoff, locks, idempotência, health checks, monitoramento e troubleshooting.

## 2. Papel do BullMQ
BullMQ processa tarefas assíncronas fora do ciclo HTTP, melhorando performance, resiliência e escalabilidade.

Fluxo conceitual: Service -> Queue -> Worker -> Sucesso ou Retry -> DLQ.

## 3. Redis
BullMQ depende do Redis para armazenar filas, estados, jobs, tentativas e metadados.

Requisitos de produção: Redis com senha, rede privada, health check, monitoramento de memória e persistência conforme criticidade.

## 4. Filas
- notificacoes.
- whatsapp.
- campanhas.
- aniversarios.
- relatorios.
- dlq.

## 5. Workers
Workers consomem jobs das filas e devem validar payload, respeitar empresaId, registrar sucesso/falha e evitar vazamento de dados nos logs.

## 6. DLQ
DLQ significa Dead Letter Queue. Ela recebe jobs que falharam definitivamente após as tentativas configuradas.

Objetivos da DLQ: preservar falhas, permitir diagnóstico, permitir reprocessamento controlado e evitar perda silenciosa.

## 7. Retry e Backoff
Retry permite novas tentativas em falhas transitórias. Backoff controla o intervalo entre tentativas.

Boas práticas: não usar retry infinito, aplicar backoff progressivo e enviar falhas definitivas para DLQ.

## 8. Idempotência
Idempotência evita duplicidade em mensagens, campanhas, aniversários, relatórios e operações críticas.

Estratégias: jobId determinístico, chave por empresa/recurso, validação de estado antes do processamento e registro de execução.

## 9. Locks Distribuídos
Locks distribuídos evitam execução concorrente de rotinas críticas em múltiplas instâncias.

Devem possuir TTL, liberação ao final da rotina, logs e tratamento de falha.

## 10. Health e Monitoramento
Indicadores: jobs aguardando, ativos, concluídos, falhos, em delay, tamanho da DLQ, latência e erros por fila.

Endpoint relacionado: /health/queues.

## 11. Troubleshooting
- Redis indisponível.
- Senha Redis incorreta.
- Worker não iniciado.
- Jobs acumulando.
- DLQ crescendo.
- Job sem empresaId.
- Lock expirando cedo demais.

Ações: verificar health, logs, conexão Redis, variáveis de ambiente e causa da DLQ antes de reprocessar.

## 12. Checklist BullMQ
- Redis protegido.
- Filas registradas.
- Workers ativos.
- Retry configurado.
- Backoff configurado.
- DLQ ativa.
- Jobs críticos idempotentes.
- Locks em rotinas críticas.
- Health de filas ativo.
- Logs sem dados sensíveis.

## 13. Conclusão
A camada BullMQ do Beauty Core 1.0 fornece processamento assíncrono resiliente para operação SaaS profissional.
