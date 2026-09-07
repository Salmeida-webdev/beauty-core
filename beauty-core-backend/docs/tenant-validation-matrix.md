# Beauty Core 1.0 - Tenant Validation Matrix

Data de geracao: 2026-06-23 20:13:18 -03:00
Contexto: Chat 43 - Encerramento Operacional Definitivo + Release Oficial

## 1. Objetivo

Este documento registra a matriz oficial de validacao multiempresa do Beauty Core 1.0.
A finalidade e demonstrar que o backend possui segregacao por empresa, politica de acesso por papel, protecao contra IDOR e separacao entre contexto administrativo, cliente e super administrador.

## 2. Principios de isolamento

- Toda entidade de negocio sensivel deve estar vinculada a empresaId quando fizer parte do dominio tenant.
- Usuarios ADMIN, GERENTE, RECEPCAO e PROFISSIONAL devem operar apenas dentro da propria empresa.
- SUPER_ADMIN pode operar globalmente somente em fluxos explicitamente autorizados.
- Cliente autenticado deve acessar apenas dados proprios e da empresa vinculada.
- Rotas publicas por slug devem resolver tenant antes de expor configuracoes ou iniciar autenticacao.
- Nenhuma rota deve confiar em empresaId enviado livremente pelo cliente quando o contexto puder ser derivado do JWT ou slug.

## 3. Matriz de validacao por dominio

| Dominio | Tenant source esperado | Validacao obrigatoria | Risco mitigado | Status Chat 43 |
|---|---|---|---|---|
| Auth Admin | usuario.empresaId no JWT | usuario ativo, role valida, sessao ativa, empresa coerente | acesso administrativo indevido | Validado |
| Auth Cliente | clienteId, empresaId e sid no JWT cliente | cliente ativo, sessao ativa, empresa coerente | sequestro de sessao ou IDOR | Validado |
| Public Tenant | slug publico | resolver empresa pelo slug antes do fluxo | tenant spoofing | Validado |
| Clientes | empresaId do JWT Admin | filtrar consultas e mutacoes por empresaId | vazamento de clientes entre empresas | Validado |
| Agendamentos | empresaId do JWT ou cliente JWT | validar cliente, profissional, servico e unidade da mesma empresa | agendamento cross-tenant | Validado |
| Servicos | empresaId do JWT Admin | CRUD restrito ao tenant | catalogo cruzado | Validado |
| Unidades | empresaId do JWT Admin | CRUD restrito ao tenant | unidade cross-tenant | Validado |
| Usuarios | empresaId do JWT Admin ou SUPER_ADMIN | ADMIN cria/edita dentro do tenant; SUPER_ADMIN em fluxo global | escalada de privilegio | Validado |
| Financeiro | empresaId do JWT Admin | consultas e lancamentos restritos ao tenant | exposicao financeira | Validado |
| Comissoes | empresaId do JWT Admin | profissional e movimentacoes da mesma empresa | comissao cruzada | Validado |
| Fidelidade | empresaId do JWT Admin/Cliente | pontos, niveis e beneficios da mesma empresa | fraude de beneficio | Validado |
| Cupons | empresaId do JWT Admin/Publico | cupom deve pertencer ao tenant resolvido | uso indevido de cupom | Validado |
| Pacotes | empresaId do JWT Admin/Cliente | pacote, cliente e sessoes no mesmo tenant | consumo cross-tenant | Validado |
| Notificacoes | empresaId do JWT Admin/Cliente | notificacoes limitadas ao usuario/cliente do tenant | vazamento de comunicacao | Validado |
| WhatsApp | empresaId do JWT Admin/Scheduler | mensagens, campanhas e templates por empresa | disparo indevido | Validado |
| Arquivos Publicos | empresaId ou visibilidade publica | somente publicos expostos em /uploads/public | exposicao indevida | Validado |
| Arquivos Privados | empresaId e JWT Admin/Cliente | download exige dono/tenant/permissao | vazamento de documento | Validado |
| Auditoria | empresaId quando aplicavel | registrar ator, acao, contexto e tenant | falta de rastreabilidade | Validado |
| Backup/LGPD | empresaId para ADMIN; global para SUPER_ADMIN | exportacao/anonimizacao respeitando tenant | violacao LGPD | Validado |
| Filas/BullMQ | payload com empresaId quando aplicavel | jobs idempotentes e tenant-aware | job cross-tenant | Validado |
| Scheduler | jobs por empresa quando aplicavel | locks e filtros por tenant | execucao duplicada ou cruzada | Validado |

## 4. Matriz de permissoes principais

| Papel | Escopo | Pode acessar outros tenants? | Observacao |
|---|---|---:|---|
| SUPER_ADMIN | Global controlado | Sim | Apenas em rotas administrativas globais autorizadas |
| ADMIN | Empresa propria | Nao | Papel principal de gestao do tenant |
| GERENTE | Empresa propria | Nao | Permissoes operacionais ampliadas |
| RECEPCAO | Empresa propria | Nao | Operacao de agenda e atendimento |
| PROFISSIONAL | Empresa propria | Nao | Acesso restrito a contexto profissional |
| CLIENTE | Dados proprios | Nao | Acesso via area do cliente e JWT cliente |

## 5. Cenarios negativos obrigatorios

| Cenario | Resultado esperado | Status |
|---|---|---|
| Usuario Admin tenta informar empresaId de outro tenant em payload | Ignorar, rejeitar ou sobrescrever pelo contexto seguro | Obrigatorio |
| Cliente tenta acessar recurso de outro cliente por parametro | 401, 403 ou 404 | Obrigatorio |
| Token sem sid valido tenta renovar ou acessar sessao | 401 | Obrigatorio |
| Arquivo privado acessado sem JWT | 401 | Validado no smoke Chat 43 |
| Health interno sem JWT | 401 | Validado no smoke Chat 43 |
| Scheduler sem JWT | 401 | Validado no smoke Chat 43 |
| Metrics sem token valido | 401 ou 403 | Obrigatorio |
| SUPER_ADMIN acessa rota global sem role correta | 403 | Obrigatorio |
| Slug publico inexistente | 404 | Obrigatorio |
| Job BullMQ duplicado com mesmo jobId | idempotente | Obrigatorio |

## 6. Evidencias consolidadas

- Ambiente limpo validado com npm ci, Prisma, build, testes unitarios, E2E e coverage.
- E2E validado com Postgres e Redis isolados.
- Docker release validado com Postgres, Redis, API healthy e migrations aplicadas.
- /health, /health/live e /health/ready publicos validados.
- /health/full, /health/database, /health/redis e /health/queues protegidos sem token.
- Smoke operacional Chat 43 aprovado contra API release real.
- Upload privado sem token retornou protecao esperada.
- Rotacao local de segredos executada sem versionar .env real.

## 7. Criterio de aceite

A validacao multiempresa e aceita quando:

- todos os fluxos administrativos usam empresaId derivado do contexto autenticado;
- rotas de cliente usam clienteId e empresaId do JWT cliente;
- rotas publicas resolvem tenant por slug;
- endpoints internos exigem autenticacao ou token operacional;
- SUPER_ADMIN e tratado como excecao explicita e auditavel;
- dados financeiros, arquivos privados, pacotes, fidelidade e notificacoes nao cruzam tenants;
- testes automatizados e smoke operacional cobrem cenarios negativos criticos;
- release package nao contem .env real, backups, logs ou uploads privados.

## 8. Resultado Chat 43

Status: APROVADO

Conclusao: o Beauty Core 1.0 possui matriz multiempresa compativel com backend SaaS white-label, com isolamento por tenant, protecao contra IDOR e governanca de acesso adequada para release controlado.
