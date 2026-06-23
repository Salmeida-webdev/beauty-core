# Beauty Core 1.0 — Matriz de Criticidade de Dados

## Objetivo

Classificar os dados e componentes do Beauty Core 1.0 para backup, restore, LGPD, disaster recovery e continuidade operacional.

## Níveis de criticidade

| Nível | Definição | Estratégia |
|---|---|---|
| Crítico | Dados essenciais para operação, segurança, financeiro, clientes e conformidade | Backup obrigatório e restore validado |
| Importante | Dados relevantes para rastreabilidade, automações e experiência | Backup recomendado e retenção definida |
| Recuperável | Dados que podem ser reconstruídos | Backup opcional |
| Volátil | Dados temporários sem necessidade de restauração | Sem backup obrigatório |

## PostgreSQL

| Dado | Criticidade | Motivo |
|---|---:|---|
| Empresa | Crítico | Base do multiempresa e tenant |
| Usuario | Crítico | Acesso administrativo, roles e segurança |
| Cliente | Crítico | Dados pessoais, LGPD, agendamentos e fidelidade |
| Agendamento | Crítico | Operação principal da clínica |
| Financeiro | Crítico | Receita, pagamentos, fluxo de caixa e comissões |
| Sessao | Crítico operacional | Refresh token, logout, segurança |
| Arquivo | Crítico | Metadados de uploads públicos e privados |
| AuditoriaSistema | Crítico | Rastreabilidade, segurança e evidência |
| Notificações | Importante | Histórico operacional |
| Mensagens WhatsApp | Importante | Comunicação e campanhas |
| Configurações | Crítico | Comportamento operacional por empresa |

## Redis

| Dado | Criticidade | Motivo |
|---|---:|---|
| Jobs BullMQ pendentes | Importante | Afetam automações |
| DLQ | Importante | Diagnóstico e reprocessamento |
| Cache Redis | Recuperável | Pode ser reconstruído |
| Locks distribuídos | Volátil | Estado temporário |
| Métricas temporárias | Recuperável | Observabilidade auxiliar |

## Uploads

| Caminho | Criticidade | Estratégia |
|---|---:|---|
| uploads/public | Importante | Backup diário |
| uploads/private | Crítico | Backup diário e acesso restrito |
| uploads/temp | Volátil | Limpeza automática |

## Logs e Auditoria

| Dado | Criticidade | Estratégia |
|---|---:|---|
| Logs de aplicação | Importante | Retenção curta |
| Logs de backup | Crítico operacional | Guardar histórico |
| AuditoriaSistema | Crítico | Retenção longa |
| Eventos LGPD | Crítico | Registrar exportações e anonimizações |
| Eventos de backup | Crítico | Registrar início, sucesso e falha |

## Recovery Objectives iniciais

| Indicador | Valor |
|---|---:|
| RPO | 24 horas |
| RTO | 4 horas |
