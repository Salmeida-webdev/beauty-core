# Manual de APIs Cliente — Beauty Core 1.0

## 1. Objetivo

Este documento descreve as APIs do cliente final no Beauty Core 1.0, incluindo autenticação pública por tenant, login por código, JWT cliente, refresh token, sessões, portal cliente, permissões, exemplos de request, exemplos de response e regras de segurança.

A API Cliente foi projetada para ser consumida por portal web, aplicativo mobile e experiências white-label por empresa.

Swagger geral: /api/docs

---

## 2. Conceito da API Cliente

A API Cliente atende o cliente final da empresa, não o usuário administrativo.

O cliente final deve conseguir acessar apenas seus próprios dados dentro da empresa correta.

Principais capacidades:

- Identificar tenant por slug.
- Solicitar código de acesso.
- Verificar código de acesso.
- Criar sessão cliente.
- Retornar JWT cliente.
- Acessar dados do próprio perfil.
- Consultar dashboard pessoal.
- Consultar agendamentos.
- Consultar fidelidade.
- Consultar pacotes.
- Consultar notificações.
- Consultar mensagens e histórico.

---

## 3. Identificação Pública do Tenant

Antes de autenticar o cliente, a API precisa identificar a empresa.

Endpoint típico:

GET /public/tenant/:slug

Uso:

- Buscar dados públicos da empresa.
- Validar se o slug existe.
- Preparar portal cliente.
- Exibir nome, marca, domínio ou configurações públicas.

Response exemplo:

{
  "id": "uuid",
  "nome": "Clínica Exemplo",
  "slug": "clinica-exemplo",
  "dominio": "clinicaexemplo.com.br",
  "ativo": true
}

Regras:

- Slug inexistente deve retornar erro adequado.
- Empresa inativa não deve permitir fluxo público operacional.
- Dados sensíveis da empresa não devem ser expostos.

---

## 4. Solicitar Código de Acesso

Endpoint típico:

POST /public/:slug/auth-cliente/solicitar-codigo

Request exemplo:

{
  "telefone": "5583999999999"
}

Response exemplo:

{
  "message": "Código enviado com sucesso",
  "expiresIn": 300
}

Regras:

- Deve validar tenant por slug.
- Deve aplicar rate limit.
- Deve evitar enumeração de clientes.
- Deve gerar código com expiração.
- Deve registrar tentativa de forma segura.
- Pode criar ou identificar cliente conforme regra de negócio do produto.

---

## 5. Verificar Código de Acesso

Endpoint típico:

POST /public/:slug/auth-cliente/verificar-codigo

Request exemplo:

{
  "telefone": "5583999999999",
  "codigo": "123456"
}

Response exemplo:

{
  "access_token": "jwt-cliente-access-token",
  "refresh_token": "jwt-cliente-refresh-token",
  "expires_in": 604800,
  "cliente": {
    "id": "uuid",
    "nome": "Maria Cliente",
    "telefone": "5583999999999",
    "empresaId": "uuid"
  }
}

Regras:

- Código deve existir, estar ativo e não expirado.
- Código usado não deve ser reutilizado.
- Tenant do slug deve coincidir com o cliente.
- Sessão cliente deve ser criada.
- Refresh token deve ser salvo apenas como hash.

---

## 6. JWT Cliente

Após autenticação, o cliente usa JWT próprio.

Header padrão:

Authorization: Bearer {cliente_access_token}

Claims esperadas:

- sub ou clienteId.
- empresaId.
- role CLIENTE.
- sid.

Regras:

- JWT Cliente não deve acessar endpoints Admin.
- Strategy Cliente deve revalidar cliente e empresa no banco.
- Sessão revogada deve bloquear acesso.
- Cliente não deve trocar clienteId em URL para acessar outro cadastro.

---

## 7. Refresh Token Cliente

Endpoint típico:

POST /auth-cliente/refresh

Request exemplo:

{
  "refresh_token": "jwt-cliente-refresh-token"
}

Response exemplo:

{
  "access_token": "novo-jwt-cliente-access-token",
  "refresh_token": "novo-jwt-cliente-refresh-token",
  "expires_in": 604800
}

Regras:

- Refresh token deve ser validado contra sessão cliente.
- Deve haver rotação do refresh token.
- Sessão expirada ou revogada não deve renovar acesso.
- Operação deve ser auditável quando aplicável.

---

## 8. Portal Cliente

Base de endpoints autenticados do cliente:

- GET /cliente-area/me
- GET /cliente-area/dashboard
- GET /cliente-area/agendamentos
- GET /cliente-area/proximos-agendamentos
- GET /cliente-area/ultimo-agendamento
- GET /cliente-area/fidelidade
- GET /cliente-area/pontos
- GET /cliente-area/beneficios
- GET /cliente-area/pacotes
- GET /cliente-area/pacotes/:pacoteId
- GET /cliente-area/notificacoes
- GET /cliente-area/notificacoes/nao-lidas
- PATCH /cliente-area/notificacoes/:id/lida
- GET /cliente-area/mensagens-whatsapp
- GET /cliente-area/historico

Regras:

- Todos exigem JWT Cliente.
- Todos operam no contexto do próprio cliente.
- Não devem aceitar clienteId arbitrário.
- Devem respeitar empresaId da sessão.

---

> **Compatibilidade:** o namespace `/cliente-area` está depreciado e permanece
> apenas para compatibilidade com clientes antigos. Novos consumidores devem
> usar exclusivamente `/area-cliente`, que é a API canônica do Portal Cliente.

## 9. Endpoint /cliente-area/me (deprecated)

Objetivo: retornar o perfil autenticado do cliente.

Endpoint:

GET /cliente-area/me

Response exemplo:

{
  "id": "uuid",
  "nome": "Maria Cliente",
  "telefone": "5583999999999",
  "empresaId": "uuid"
}

Regras:

- Retorna somente dados do cliente autenticado.
- Não expõe dados administrativos.
- Não retorna dados sensíveis de sessão.

---

## 10. Dashboard Cliente

Endpoint:

GET /cliente-area/dashboard

Informações esperadas:

- Dados básicos do cliente.
- Próximo agendamento.
- Último agendamento.
- Pontos de fidelidade.
- Benefícios disponíveis.
- Pacotes ativos.
- Notificações relevantes.

Regras:

- Dados sempre filtrados por cliente autenticado.
- Dados sempre filtrados por empresaId.
- Não deve misturar dados de tenants.

---

## 11. Agendamentos Cliente

Endpoints:

- GET /cliente-area/agendamentos
- GET /cliente-area/proximos-agendamentos
- GET /cliente-area/ultimo-agendamento

Dados esperados:

- Serviço.
- Profissional quando aplicável.
- Unidade.
- Data e horário.
- Status.
- Histórico.

Regras:

- Cliente visualiza apenas seus próprios agendamentos.
- Agendamentos devem pertencer à mesma empresa.
- Status deve ser apresentado de forma segura e amigável.

---

## 12. Fidelidade e Benefícios

Endpoints:

- GET /cliente-area/fidelidade
- GET /cliente-area/pontos
- GET /cliente-area/beneficios

Dados esperados:

- Saldo de pontos.
- Histórico de pontos.
- Nível atual.
- Benefícios disponíveis.
- Regras de uso.

Regras:

- Pontos devem pertencer ao cliente autenticado.
- Benefícios devem respeitar configuração da empresa.
- Nenhum dado de outro cliente deve aparecer.

---

## 13. Pacotes Cliente

Endpoints:

- GET /cliente-area/pacotes
- GET /cliente-area/pacotes/:pacoteId

Dados esperados:

- Pacotes ativos.
- Pacotes expirados.
- Total de sessões.
- Sessões utilizadas.
- Sessões restantes.
- Validade.
- Histórico de consumo.

Regras:

- pacoteId deve pertencer ao cliente autenticado.
- Pacote deve pertencer à empresa correta.
- Consulta por ID deve proteger contra IDOR.

---

## 14. Notificações e Mensagens

Endpoints:

- GET /cliente-area/notificacoes
- GET /cliente-area/notificacoes/nao-lidas
- PATCH /cliente-area/notificacoes/:id/lida
- GET /cliente-area/mensagens-whatsapp

Regras:

- Cliente acessa apenas suas notificações.
- Marcação como lida deve validar propriedade.
- Mensagens devem respeitar cliente e empresa.
- Comunicação sensível deve respeitar LGPD.

---

## 15. Histórico

Endpoint:

GET /cliente-area/historico

Pode consolidar:

- Agendamentos.
- Pacotes.
- Sessões utilizadas.
- Pontos.
- Benefícios.
- Notificações.
- Mensagens.

Regras:

- Histórico sempre limitado ao cliente autenticado.
- Histórico sempre limitado ao tenant.
- Dados internos da empresa não devem ser expostos.

---

## 16. Erros Padrão

- 400: dados inválidos.
- 401: cliente não autenticado.
- 403: cliente sem permissão.
- 404: recurso não encontrado ou inacessível.
- 409: conflito de regra de negócio.
- 429: rate limit.
- 500: erro interno.

Erros devem evitar enumeração de telefone, cliente, empresa ou recursos internos.

---

## 17. Conclusão

A API Cliente do Beauty Core 1.0 está preparada para portal web e aplicativo mobile, com autenticação pública por tenant, JWT cliente, sessões, refresh token, isolamento por empresa e proteção contra acesso cruzado.
