# SLA — Service Level Agreement

## Objetivo

Definir compromissos iniciais de nível de serviço para o Beauty Core 1.0 em operação premium.

Este documento representa uma base técnica interna. Contratos comerciais finais podem ajustar metas, exclusões, horários de suporte, janelas de manutenção e compensações.

## Escopo coberto

- API backend;
- autenticação administrativa;
- autenticação do cliente final;
- PostgreSQL;
- Redis e BullMQ;
- jobs críticos;
- backup e restore;
- resposta operacional;
- documentação de governança.

## Metas iniciais

| Área | Meta inicial |
|---|---:|
| Disponibilidade mensal da API | 99,5% |
| Tempo de resposta inicial SEV1 | até 15 minutos |
| Tempo de resposta inicial SEV2 | até 1 hora |
| Tempo de resposta inicial SEV3 | até 4 horas úteis |
| Backup PostgreSQL | diário |
| Backup uploads | diário ou conforme volume |
| RPO inicial | até 24 horas |
| RTO inicial | até 4 horas |
| Restore testado | mensal em ambiente controlado |
| Correção de vulnerabilidade crítica explorável | prioridade máxima |

## Disponibilidade

A disponibilidade deve ser medida com base nos endpoints de health, métricas de infraestrutura e evidências de logs.

Critérios recomendados:

- `/health/live` para vida do processo;
- `/health/ready` para prontidão operacional;
- `/health/full` para dependências;
- `/metrics` para observabilidade;
- logs de container e pipeline para incidentes.

## Exclusões típicas

- falha de provedor externo;
- queda de internet do cliente;
- indisponibilidade de WhatsApp, gateway de pagamento ou serviço terceiro;
- mau uso administrativo;
- manutenção programada comunicada;
- falha causada por alteração manual fora do processo;
- ambiente sem recursos mínimos contratados;
- problema causado por credenciais inválidas fornecidas pelo cliente;
- domínio ou DNS gerenciado fora do escopo contratado.

## Janela de manutenção

Manutenções planejadas devem ser comunicadas previamente quando impactarem produção.

Recomendação inicial:

- janela preferencial fora do horário comercial do cliente;
- validação antes e depois da manutenção;
- plano de rollback definido antes da execução;
- registro do resultado.

## Critério de violação

Uma violação de SLA deve ser avaliada com base em:

- horário de início;
- horário de recuperação;
- logs;
- métricas;
- health checks;
- escopo do impacto;
- tenants afetados;
- exclusões aplicáveis;
- ações tomadas.

## Modelo comercial recomendado

Para venda premium do Beauty Core, recomenda-se separar planos:

| Plano | Perfil |
|---|---|
| Standard | suporte básico, menor compromisso formal |
| Pro | suporte prioritário, monitoramento básico e backups |
| Enterprise | SLA formal, runbooks dedicados, resposta prioritária e governança |
| Enterprise Premium | SLA formal, incident response, auditoria, restore testado e relatórios |

## Observação

Este SLA é ponto de partida técnico. Antes de assumir contrato enterprise real, validar infraestrutura, provedor, monitoramento, alertas, restore e processo de suporte.
