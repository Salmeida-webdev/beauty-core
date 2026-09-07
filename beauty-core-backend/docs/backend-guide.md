# Manual Técnico do Backend — Beauty Core 1.0

## 1. Objetivo

Este documento descreve a estrutura técnica do backend Beauty Core 1.0, incluindo módulos, controllers, services, DTOs, guards, strategies, interceptors, filters, middleware, Prisma e fluxos internos.

O backend é a camada central da plataforma e concentra as regras de negócio, segurança, multiempresa, auditoria, filas, scheduler, storage, backup, LGPD e observabilidade.

---

## 2. Stack Backend

- NestJS.
- TypeScript.
- Prisma ORM.
- PostgreSQL.
- Redis.
- BullMQ.
- JWT.
- Jest.
- Swagger.
- Docker.

---

## 3. Estrutura de Módulos

A aplicação é organizada por módulos de domínio. Cada módulo deve concentrar suas regras de negócio, endpoints, DTOs, validações, integrações e testes.

Módulos principais:

- Auth Admin: login, refresh token, logout e sessões administrativas.
- Auth Cliente: autenticação pública de cliente por tenant.
- Cliente Area: endpoints autenticados do portal cliente.
- Empresas: gestão de tenants e empresas.
- Usuários: gestão de usuários internos.
- Clientes: gestão de clientes finais.
- Serviços: catálogo de serviços.
- Unidades: unidades físicas ou operacionais.
- Agendamentos: agenda, status e histórico.
- Financeiro: movimentações, pagamentos, resumo e fluxo de caixa.
- Comissões: controle de comissões profissionais.
- Fidelidade: pontos, níveis, benefícios e regras.
- Pacotes: pacotes contratados, sessões e consumo.
- Arquivos: uploads, storage, downloads e URLs assinadas.
- Auditoria: rastreabilidade de ações.
- WhatsApp: mensagens, templates e campanhas.
- Queues: filas BullMQ.
- Scheduler: rotinas automáticas.
- Health: endpoints de saúde.
- Backup: status e execução operacional.
- LGPD: exportação e anonimização de dados.

Estrutura conceitual de um módulo:

src/modulo/
  modulo.module.ts
  modulo.controller.ts
  modulo.service.ts
  dto/
  guards/
  policies/
  tests/

---

## 4. Controllers

Controllers expõem endpoints HTTP e devem ser mantidos finos.

Responsabilidades:

- Definir rotas.
- Receber DTOs.
- Aplicar guards.
- Declarar permissões.
- Documentar Swagger.
- Encaminhar dados para services.
- Retornar respostas previsíveis.

Controllers não devem concentrar regra de negócio pesada.

Boas práticas:

- Não confiar em empresaId enviado pelo cliente.
- Não aceitar clienteId arbitrário em rotas do portal cliente.
- Não retornar senhas, hashes, refresh tokens ou segredos.
- Usar guards apropriados para Admin, Cliente e SUPER_ADMIN.

---

## 5. Services

Services concentram regras de negócio e integração com Prisma, filas, storage, auditoria e validações de tenant.

Responsabilidades:

- Validar existência de entidades.
- Aplicar empresaId.
- Chamar TenantValidator quando necessário.
- Executar transações Prisma.
- Disparar auditoria.
- Enfileirar jobs.
- Tratar erros de negócio.
- Sanitizar retornos.

Regras críticas:

- Toda operação tenant-aware deve respeitar empresaId.
- Operações financeiras devem preservar consistência.
- Upload privado deve validar acesso antes de download.
- Jobs críticos devem ser idempotentes.
- Operações sensíveis devem ser auditadas.

---

## 6. DTOs

DTOs padronizam entrada de dados, validação e documentação.

Requisitos esperados:

- Usar class-validator.
- Usar class-transformer quando necessário.
- Validar campos obrigatórios.
- Validar enums.
- Validar UUIDs.
- Validar datas.
- Validar números positivos.
- Validar tamanho de strings.
- Documentar exemplos no Swagger.

DTOs não devem expor campos internos perigosos como hash de senha, refreshTokenHash ou tenant arbitrário sem validação.

---

## 7. Guards

Guards protegem endpoints e garantem autenticação, autorização e permissões por perfil.

Tipos principais:

- JWT Admin.
- JWT Cliente.
- Roles Guard.
- SUPER_ADMIN Guard ou política equivalente.
- Rate limit via Throttler.
- Guards específicos de domínio quando necessário.

Regras:

- ADMIN acessa apenas a própria empresa.
- GERENTE, RECEPCAO e PROFISSIONAL seguem permissões internas.
- CLIENTE acessa apenas seu próprio contexto.
- SUPER_ADMIN acessa recursos globais apenas quando a rota permitir explicitamente.

---

## 8. Strategies

Strategies JWT devem revalidar dados no banco e impedir uso de token válido para usuário inválido, inativo ou sessão revogada.

Strategy Admin:

- Valida assinatura do token.
- Extrai sub, role, empresaId e sid.
- Revalida usuário no banco.
- Revalida empresa quando aplicável.
- Verifica status e permissões.
- Bloqueia sessão revogada quando houver sid.

Strategy Cliente:

- Valida assinatura do token cliente.
- Extrai clienteId, empresaId e sid.
- Revalida cliente no banco.
- Revalida empresa.
- Impede acesso cruzado entre clientes.

---

## 9. Interceptors

Interceptors podem capturar fluxo de request e response para auditoria, métricas e padronização.

Uso principal:

- Auditoria HTTP.
- Logs operacionais.
- Métricas.
- Correlação de request.
- Sanitização de dados sensíveis.

O interceptor de auditoria deve evitar persistir senhas, tokens, hashes e dados técnicos sensíveis.

---

## 10. Filters

Exception filters padronizam respostas de erro e evitam exposição indevida de detalhes internos.

Responsabilidades:

- Capturar exceptions HTTP.
- Retornar estrutura consistente.
- Evitar stack trace em produção.
- Registrar erros relevantes.
- Separar erro de validação, erro de regra de negócio e erro inesperado.

---

## 11. Middleware

Middleware pode ser usado para enriquecer a request antes de chegar aos controllers.

Usos esperados:

- Request ID.
- Correlation ID.
- Captura de IP.
- Captura de user-agent.
- Segurança de headers quando configurado.

---

## 12. Prisma

Prisma é a camada de acesso ao banco PostgreSQL.

Regras críticas:

- Toda entidade tenant-aware deve possuir empresaId.
- Toda query tenant-aware deve filtrar por empresaId.
- IDs de request devem ser validados contra tenant.
- Operações financeiras devem usar transações quando houver múltiplas escritas relacionadas.
- Migrations devem ser aplicadas por processo controlado.
- Dados sensíveis não devem ser retornados para clients.

Padrão seguro conceitual:

Buscar recurso usando id + empresaId, e não apenas id.

---

## 13. Fluxos Internos

Fluxo de autenticação admin:

Credenciais -> AuthController -> AuthService -> valida usuário -> cria sessão -> retorna access token e refresh token.

Fluxo de refresh token:

Refresh token -> valida sessão -> compara hash -> rotaciona token -> atualiza sessão -> retorna novos tokens.

Fluxo de cliente público:

Slug -> valida tenant -> solicita código -> verifica código -> cria sessão cliente -> retorna JWT cliente.

Fluxo de upload privado:

Request autenticada -> valida arquivo -> storage provider -> checksum -> registro no banco -> download protegido ou URL assinada.

Fluxo de jobs:

Service -> adiciona job com jobId idempotente -> BullMQ -> Worker -> sucesso ou DLQ após falha final.

---

## 14. Padrões de Erro

- 400: entrada inválida.
- 401: não autenticado.
- 403: sem permissão.
- 404: recurso inexistente ou inacessível.
- 409: conflito de negócio.
- 422: regra de negócio inválida.
- 500: erro inesperado.

Erros não devem revelar stack trace, segredos, tokens, queries sensíveis ou detalhes internos em produção.

---

## 15. Boas Práticas Obrigatórias

- Não alterar banco sem migration.
- Não retornar dados sensíveis.
- Não aceitar empresaId arbitrário sem validação.
- Não processar arquivo privado como público.
- Não executar job crítico sem idempotência.
- Não executar scheduler crítico sem lock.
- Não desativar testes para passar build.
- Não expor .env.
- Não misturar lógica de controller com regra pesada de negócio.
- Não permitir IDOR.

---

## 16. Conclusão

O backend do Beauty Core 1.0 possui estrutura enterprise, modular, segura e preparada para operação SaaS white-label real.
