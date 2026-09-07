# Swagger Audit — Beauty Core 1.0

## 1. Objetivo
Este documento registra a auditoria documental do Swagger/OpenAPI do Beauty Core 1.0.

## 2. Referência
A documentação executável da API deve estar disponível em /api/docs quando a aplicação estiver em execução.

## 3. Itens Auditados
- Tags por módulo.
- DTOs documentados.
- Exemplos de request.
- Exemplos de response.
- Schemas.
- Autenticação Bearer.
- Separação Admin e Cliente.
- Erros comuns.

## 4. Tags Esperadas
- Auth.
- Auth Cliente.
- Cliente Area.
- Empresas.
- Usuários.
- Clientes.
- Serviços.
- Unidades.
- Agendamentos.
- Financeiro.
- Comissões.
- Fidelidade.
- Pacotes.
- Arquivos.
- Auditoria.
- WhatsApp.
- Queues.
- Scheduler.
- Health.
- Backup.
- LGPD.

## 5. Autenticação
Swagger deve documentar Bearer Auth para endpoints Admin e Cliente.

Endpoints públicos por slug não devem exigir Bearer Auth, mas devem documentar claramente o parâmetro slug.

## 6. DTOs
DTOs devem conter validações, tipos, exemplos e campos obrigatórios/opcionais.

Campos sensíveis como senha, hash, refreshTokenHash e secrets não devem aparecer em responses.

## 7. Pendências Recomendadas
- Conferir se todos os controllers possuem tag Swagger.
- Conferir se todos os DTOs possuem exemplos.
- Conferir se endpoints protegidos exibem Bearer Auth.
- Conferir se erros 400, 401, 403, 404 e 500 estão documentados nos módulos críticos.
- Conferir se endpoints Cliente estão separados dos endpoints Admin.
- Conferir se uploads documentam multipart/form-data.
- Conferir se endpoints LGPD deixam claro o escopo de permissão.

## 8. Status
Auditoria documental criada. A conferência visual final deve ser feita com a aplicação rodando em /api/docs.
