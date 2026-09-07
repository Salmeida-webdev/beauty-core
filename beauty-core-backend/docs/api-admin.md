# Manual de APIs Admin — Beauty Core 1.0

## 1. Objetivo

Este documento descreve a API administrativa do Beauty Core 1.0, incluindo autenticação, permissões, famílias de endpoints, exemplos de request, exemplos de response, erros, JWT e regras de acesso.

A referência executável da API é o Swagger disponível na aplicação.

Swagger: /api/docs

---

## 2. Autenticação Admin

A API Admin utiliza JWT com refresh token e sessões.

Fluxo principal:

1. Usuário administrativo realiza login.
2. API valida credenciais, usuário, empresa e role.
3. API cria sessão.
4. API retorna access token e refresh token.
5. Cliente envia access token no header Authorization.
6. Refresh token renova sessão quando necessário.
7. Logout revoga sessão.

Header padrão:

Authorization: Bearer {access_token}

---

## 3. Login Admin

Endpoint típico:

POST /auth/login

Request exemplo:

{
  "email": "admin@empresa.com",
  "senha": "senha-segura"
}

Response exemplo:

{
  "access_token": "jwt-access-token",
  "refresh_token": "jwt-refresh-token",
  "expires_in": 28800,
  "usuario": {
    "id": "uuid",
    "nome": "Admin",
    "email": "admin@empresa.com",
    "role": "ADMIN",
    "empresaId": "uuid"
  }
}

Regras:

- Credenciais inválidas retornam erro de autenticação.
- Usuário inativo não autentica.
- Empresa inativa não deve permitir autenticação operacional.
- Login deve respeitar rate limit.
- Operação deve ser auditável.

---

## 4. Refresh Token Admin

Endpoint típico:

POST /auth/refresh

Request exemplo:

{
  "refresh_token": "jwt-refresh-token"
}

Response exemplo:

{
  "access_token": "novo-access-token",
  "refresh_token": "novo-refresh-token",
  "expires_in": 28800
}

Regras:

- Refresh token deve ser validado contra sessão ativa.
- Refresh token deve ser rotacionado.
- Sessão revogada não renova token.
- Sessão expirada não renova token.
- Hash do refresh token não deve ser exposto.

---

## 5. Sessões Admin

Endpoints típicos:

- GET /auth/sessoes
- DELETE /auth/sessoes/:sessaoId
- POST /auth/logout
- POST /auth/logout-all

Uso:

- Listar sessões ativas.
- Revogar uma sessão específica.
- Encerrar sessão atual.
- Encerrar todas as sessões do usuário.

Campos esperados em sessão:

- id.
- empresaId.
- usuarioId.
- dispositivo.
- ip.
- userAgent.
- ultimaAtividade.
- expiraEm.
- revogada.

---

## 6. Permissões Admin

Perfis administrativos:

- SUPER_ADMIN.
- ADMIN.
- GERENTE.
- RECEPCAO.
- PROFISSIONAL.

Regras gerais:

- SUPER_ADMIN possui acesso global apenas onde explicitamente permitido.
- ADMIN acessa recursos da própria empresa.
- GERENTE acessa recursos operacionais conforme política.
- RECEPCAO acessa rotinas de atendimento e agenda conforme política.
- PROFISSIONAL acessa rotinas ligadas à agenda e execução de serviços conforme política.
- Nenhum perfil comum deve acessar dados de outra empresa.

---

## 7. Empresas

Família de endpoints administrativos para gestão de tenants.

Endpoints típicos:

- GET /empresas
- GET /empresas/:id
- POST /empresas
- PATCH /empresas/:id
- DELETE /empresas/:id

Permissão esperada:

- SUPER_ADMIN para operações globais.

Campos comuns:

- nome.
- slug.
- dominio.
- status.
- configurações.

---

## 8. Usuários

Família de endpoints para usuários administrativos.

Endpoints típicos:

- GET /usuarios
- GET /usuarios/:id
- POST /usuarios
- PATCH /usuarios/:id
- DELETE /usuarios/:id

Regras:

- ADMIN gerencia usuários da própria empresa.
- ADMIN não cria SUPER_ADMIN.
- SUPER_ADMIN pode executar operações globais autorizadas.
- Senha e hash nunca devem ser retornados.

---

## 9. Clientes

Família de endpoints para clientes finais da empresa.

Endpoints típicos:

- GET /clientes
- GET /clientes/:id
- POST /clientes
- PATCH /clientes/:id
- DELETE /clientes/:id

Regras:

- Consultas devem respeitar empresaId.
- Telefone pode ter unicidade por empresa.
- Dados pessoais devem respeitar LGPD.
- Exportação e anonimização devem ser feitas por endpoints próprios.

Request exemplo:

{
  "nome": "Maria Cliente",
  "telefone": "5583999999999",
  "dataNascimento": "1990-01-01"
}

---

## 10. Serviços e Unidades

Serviços representam ofertas da empresa. Unidades representam locais físicos ou operacionais.

Endpoints típicos de serviços:

- GET /servicos
- GET /servicos/:id
- POST /servicos
- PATCH /servicos/:id
- DELETE /servicos/:id

Endpoints típicos de unidades:

- GET /unidades
- GET /unidades/:id
- POST /unidades
- PATCH /unidades/:id
- DELETE /unidades/:id

Regras:

- Serviço pertence a uma empresa.
- Unidade pertence a uma empresa.
- Agendamentos devem validar serviço e unidade do mesmo tenant.

---

## 11. Agendamentos

Família de endpoints para agenda operacional.

Endpoints típicos:

- GET /agendamentos
- GET /agendamentos/:id
- POST /agendamentos
- PATCH /agendamentos/:id
- DELETE /agendamentos/:id

Regras:

- Cliente, serviço, unidade e profissional devem pertencer à mesma empresa.
- Status deve seguir enum controlado.
- Alterações relevantes devem ser auditadas.
- Jobs de notificação podem ser disparados conforme regra de negócio.

---

## 12. Financeiro e Comissões

Família de endpoints para controle financeiro, pagamentos, fluxo de caixa, categorias e comissões.

Áreas cobertas:

- Categorias financeiras.
- Movimentações financeiras.
- Pagamentos.
- Resumo financeiro.
- Fluxo de caixa.
- Comissões profissionais.

Regras:

- Todas as operações devem ser filtradas por empresaId.
- Operações críticas devem usar transação quando necessário.
- Valores monetários devem ser validados.
- Relatórios não podem misturar tenants.
- Auditoria é obrigatória para ações sensíveis.

---

## 13. Fidelidade, Benefícios, Cupons e Pacotes

Família de endpoints para retenção e monetização.

Áreas cobertas:

- Pontos de fidelidade.
- Histórico de pontos.
- Benefícios.
- Níveis de fidelidade.
- Configuração de fidelidade.
- Cupons.
- Pacotes.
- ClientePacote.
- Sessões de pacote.

Regras:

- Cliente e pacote devem pertencer à mesma empresa.
- Consumo de sessões deve preservar consistência.
- Benefícios devem respeitar regras do tenant.
- Operações relevantes devem ser auditadas.

---

## 14. Arquivos

Família de endpoints para uploads, downloads e gestão de arquivos.

Recursos esperados:

- Upload público.
- Upload privado.
- Download protegido.
- URL assinada.
- Registro de checksum.
- Controle de visibilidade.
- Limpeza de arquivos órfãos.

Regras:

- Arquivo privado não deve ter URL pública direta.
- Download privado exige autenticação e tenant validation.
- Arquivo deve pertencer à empresa correta.
- Tamanho e tipo devem ser validados.

---

## 15. Auditoria, Health, Backup e LGPD

Famílias administrativas críticas:

- Auditoria: consulta de rastros operacionais.
- Health: status da aplicação e dependências.
- Backup: status e execução controlada de backup.
- LGPD: exportação e anonimização de cliente.

Regras:

- Endpoints sensíveis exigem ADMIN ou SUPER_ADMIN conforme escopo.
- Exportação LGPD deve validar tenant para ADMIN.
- SUPER_ADMIN pode operar globalmente onde permitido.
- Ações de backup e LGPD devem ser auditadas.

---

## 16. Erros Padrão

- 400: dados inválidos.
- 401: token ausente, inválido ou expirado.
- 403: permissão insuficiente.
- 404: recurso não encontrado ou inacessível.
- 409: conflito de regra de negócio.
- 422: regra de negócio não processável.
- 429: rate limit.
- 500: erro interno.

Erros não devem revelar segredos, hashes, tokens, stack trace ou detalhes internos sensíveis.

---

## 17. Conclusão

A API Admin do Beauty Core 1.0 fornece a base operacional da plataforma, protegida por JWT, sessões, roles, tenant validation, auditoria e boas práticas de segurança.
