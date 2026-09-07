# Capacity Planning — Beauty Core 1.0

## Objetivo

Planejar crescimento operacional do Beauty Core em cenários de 10, 100, 1.000 e 10.000 empresas.

Este documento é uma estimativa inicial. Métricas reais de produção devem substituir premissas conforme o uso real.

## Premissas

Cada empresa pode gerar:

- usuários administrativos;
- clientes finais;
- agendamentos;
- movimentações financeiras;
- notificações;
- mensagens WhatsApp;
- arquivos;
- auditoria;
- jobs recorrentes;
- sessões;
- relatórios.

## Cenário 1 — 10 empresas

### Perfil

- baixo volume;
- operação inicial;
- poucos workers;
- banco único;
- Redis único;
- backup simples.

### PostgreSQL

- instância pequena ou média;
- índices multi-tenant suficientes;
- backup diário;
- monitoramento básico de conexão.

### Redis/BullMQ

- Redis único;
- concorrência baixa;
- monitorar DLQ semanalmente;
- locks distribuídos já devem permanecer ativos.

### Uploads

- storage local pode ser aceitável em ambiente controlado;
- produção premium deve preferir storage externo;
- limpeza de temporários ativada.

### Workers e scheduler

- workers na mesma infraestrutura podem atender;
- schedulers com locks;
- concorrência conservadora.

### API

- uma instância pode atender;
- health checks obrigatórios;
- rate limit ativo.

### Backup

- PostgreSQL diário;
- uploads diário ou conforme volume;
- restore testado antes de produção real.

### Observabilidade

- Prometheus/Grafana básico;
- logs por container;
- alertas mínimos.

## Cenário 2 — 100 empresas

### Perfil

- operação comercial ativa;
- maior volume de agendamentos;
- campanhas e notificações mais frequentes;
- suporte começa a ser relevante.

### PostgreSQL

- revisar índices;
- monitorar queries lentas;
- considerar aumento de CPU/RAM;
- backup diário obrigatório;
- restore mensal testado;
- avaliar pool de conexão.

### Redis/BullMQ

- Redis com senha forte;
- persistência avaliada;
- workers separados por fila quando necessário;
- concorrência configurada por tipo de job;
- alertas para DLQ.

### Uploads

- storage externo recomendado;
- política de retenção;
- limpeza de temporários;
- URL assinada para privados.

### Workers e scheduler

- concorrência ajustada por fila;
- campanhas e relatórios podem exigir fila dedicada;
- scheduler com locks obrigatório.

### API

- considerar duas réplicas;
- load balancer;
- deploy com rollback rápido;
- monitoramento por rota.

### Backup

- backup diário;
- validação do último backup;
- restore mensal em ambiente isolado.

### Observabilidade

- alertas para erro 5xx, latência, Redis, DB, filas e backup.

## Cenário 3 — 1.000 empresas

### Perfil

- operação SaaS consolidada;
- alto volume de clientes finais;
- automações e campanhas relevantes;
- necessidade de suporte e relatórios operacionais.

### PostgreSQL

- instância dedicada;
- read replica para relatórios;
- tuning de conexões;
- pool de conexão;
- análise de particionamento para tabelas grandes;
- análise de crescimento de auditoria;
- retenção por criticidade.

### Redis/BullMQ

- Redis gerenciado recomendado;
- separar filas críticas e não críticas;
- workers escaláveis horizontalmente;
- alertas de backlog e DLQ;
- controle de jobs por tenant para evitar abuso.

### Uploads

- storage externo obrigatório;
- CDN para arquivos públicos;
- arquivos privados com URL assinada;
- ciclo de vida e retenção;
- segregação lógica por tenant.

### Workers e scheduler

- workers separados da API;
- escalabilidade horizontal;
- filas por criticidade;
- reprocessamento controlado;
- scheduler em instância coordenada com lock.

### API

- múltiplas réplicas;
- autoscaling;
- rate limit por tenant;
- observabilidade por rota e tenant;
- estratégia de rollback madura.

### Backup

- backup com retenção por camadas;
- restore testado com frequência;
- cópia fora da região quando possível.

### Observabilidade

- dashboard executivo;
- dashboard técnico;
- alertas por SLO;
- relatório mensal para clientes premium.

## Cenário 4 — 10.000 empresas

### Perfil

- escala enterprise real;
- múltiplas regiões podem ser necessárias;
- suporte dedicado;
- contratos formais;
- governança de release obrigatória.

### PostgreSQL

- arquitetura avançada:
  - particionamento;
  - read replicas;
  - possível sharding por grupo de tenants;
  - pool externo;
  - análise de multi-region;
  - retenção agressiva de auditoria fria;
  - estratégia de arquivamento.

### Redis/BullMQ

- Redis cluster ou gerenciado enterprise;
- filas por criticidade;
- workers isolados;
- DLQ com classificação automática;
- limitação por tenant para evitar noisy neighbor;
- métricas por fila e prioridade.

### Uploads

- storage cloud obrigatório;
- lifecycle policy;
- criptografia;
- CDN;
- segregação por tenant;
- varredura de malware se aplicável;
- retenção por plano.

### Workers e scheduler

- workers autoscaláveis;
- particionamento de execução por tenant/lote;
- janela operacional para rotinas pesadas;
- idempotência obrigatória;
- limitação de campanhas por tenant.

### API

- autoscaling;
- blue/green ou canary deploy;
- circuit breakers para integrações;
- rate limit adaptativo;
- observabilidade distribuída;
- autenticação e sessão com monitoramento dedicado.

### Backup/DR

- RPO menor que 24h para planos enterprise;
- RTO menor que 4h para planos premium;
- restore automatizado testado;
- DR em região alternativa;
- cópias criptografadas;
- processo formal de disaster recovery.

### Observabilidade

- APM recomendado;
- tracing distribuído;
- alertas por tenant enterprise;
- relatórios mensais de SLA;
- correlação entre logs, métricas e traces.

## Gargalos esperados

| Área | Gargalo provável | Mitigação |
|---|---|---|
| PostgreSQL | queries sem índice, auditoria grande | índices, particionamento, read replica |
| Redis | backlog, memória, locks | Redis gerenciado, TTL, filas separadas |
| BullMQ | jobs lentos | workers dedicados e concorrência |
| Uploads | crescimento de disco | storage externo e lifecycle |
| API | latência e CPU | réplicas, cache e rate limit |
| Scheduler | execução duplicada ou pesada | locks, lotes e idempotência |
| Backup | tempo e armazenamento | retenção, storage externo e testes |
| Observabilidade | cardinalidade alta | labels controladas |
| Multi-tenant | noisy neighbor | limites por tenant e filas por prioridade |

## Recomendações por maturidade

### Agora

- manter documentação;
- monitorar métricas;
- validar backup;
- rodar testes antes de release;
- manter workflows de segurança ativos.

### Próximo nível

- storage externo;
- alertas reais;
- workers isolados;
- restore mensal testado;
- branch protection;
- required checks.

### Enterprise real

- alta disponibilidade de banco;
- Redis gerenciado;
- autoscaling;
- blue/green deploy;
- contratos SLA formais;
- disaster recovery testado;
- relatórios mensais de confiabilidade.
