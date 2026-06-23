# Manual Multiempresa — Beauty Core 1.0

## 1. Objetivo

Este documento descreve o modelo multiempresa do Beauty Core 1.0, incluindo empresaId, Tenant Validation, SUPER_ADMIN, ADMIN, CLIENTE, slug, domínio, isolamento e proteções contra vazamento de dados.

O modelo multiempresa é um dos pilares centrais da plataforma, pois permite operar múltiplas empresas dentro da mesma base técnica com separação lógica, segurança e rastreabilidade.

---

## 2. Conceito de Tenant

Cada empresa cadastrada na plataforma representa um tenant.

Um tenant possui seus próprios dados operacionais, como clientes, usuários, serviços, unidades, agendamentos, financeiro, pacotes, arquivos, notificações, campanhas e configurações.

Conceito:

Beauty Core SaaS -> Empresa A -> Dados da Empresa A
Beauty Core SaaS -> Empresa B -> Dados da Empresa B
Beauty Core SaaS -> Empresa C -> Dados da Empresa C

A regra principal é simples: dados de uma empresa não podem ser acessados por usuários, clientes, jobs ou rotinas de outra empresa.

---

## 3. empresaId

empresaId é a chave principal de isolamento lógico da plataforma.

Entidades tenant-aware devem possuir empresaId, incluindo:

- Clientes.
- Usuários vinculados a empresa.
- Serviços.
- Unidades.
- Agendamentos.
- Financeiro.
- Pagamentos.
- Comissões.
- Fidelidade.
- Benefícios.
- Cupons.
- Pacotes.
- ClientePacote.
- Sessões de pacote.
- Arquivos.
- Notificações.
- Templates.
- Mensagens WhatsApp.
- Campanhas.
- Auditoria.
- Sessões de autenticação.

Regra obrigatória: toda query de entidade tenant-aware deve filtrar por empresaId ou passar por validação equivalente de tenant.

---

## 4. Tenant Validation

Tenant Validation é a camada que confirma se um recurso pertence à empresa do usuário autenticado.

Validação conceitual:

usuario.empresaId deve ser igual ao recurso.empresaId.

Essa validação deve ser aplicada antes de operações sensíveis, como:

- Consultar registros por ID.
- Atualizar registros.
- Excluir registros.
- Baixar arquivos privados.
- Gerar relatórios.
- Consumir sessões de pacote.
- Registrar movimentações financeiras.
- Enfileirar jobs relacionados a empresa.

O objetivo é impedir IDOR e vazamento lateral entre empresas.

---

## 5. SUPER_ADMIN

SUPER_ADMIN é o perfil global da plataforma.

Responsabilidades típicas:

- Gerenciar empresas.
- Acompanhar operação global.
- Executar suporte técnico.
- Consultar auditorias globais quando permitido.
- Acessar endpoints globais explicitamente autorizados.
- Apoiar diagnóstico de backup, health e operação.

Regras críticas:

- SUPER_ADMIN pode não pertencer a uma empresa específica.
- SUPER_ADMIN não deve ser tratado como ADMIN comum.
- Acesso global deve ser explícito por rota e política.
- Toda ação sensível de SUPER_ADMIN deve ser auditada.
- SUPER_ADMIN não deve abrir brecha para usuários comuns acessarem dados globais.

---

## 6. ADMIN

ADMIN é o perfil máximo dentro de uma empresa.

Permissões típicas:

- Gerenciar usuários da própria empresa.
- Gerenciar clientes da própria empresa.
- Gerenciar serviços e unidades.
- Gerenciar agendamentos.
- Gerenciar financeiro.
- Gerenciar pacotes e fidelidade.
- Acessar relatórios da própria empresa.
- Configurar comunicação e automações.

Restrições:

- Não acessa dados de outra empresa.
- Não cria SUPER_ADMIN.
- Não altera empresas globais.
- Não ignora Tenant Validation.

---

## 7. CLIENTE

CLIENTE é o usuário final autenticado no portal cliente.

Características:

- Login por telefone e código.
- Contexto vinculado a uma empresa.
- Acesso ao próprio perfil.
- Acesso aos próprios agendamentos.
- Acesso aos próprios pacotes.
- Acesso aos próprios pontos, benefícios e notificações.

Restrições:

- Não acessa área administrativa.
- Não consulta outro cliente.
- Não envia clienteId arbitrário para acessar dados.
- Não acessa financeiro interno da empresa.

---

## 8. Slug e Domínio

Slug e domínio são formas de identificar publicamente um tenant.

Exemplos de uso:

- Portal público por slug.
- Login público do cliente por tenant.
- Identidade white-label.
- Domínio customizado por empresa.
- Personalização futura de tema, logo e comunicação.

Rotas públicas devem validar o tenant antes de qualquer ação.

Fluxo conceitual:

Request pública -> slug/domínio -> valida empresa -> aplica contexto -> executa fluxo público.

---

## 9. Isolamento

O isolamento multiempresa ocorre em várias camadas.

- Banco: empresaId, índices e constraints.
- API: guards, roles e contexto autenticado.
- Services: queries filtradas por empresaId.
- TenantValidator: validação explícita de recurso.
- Storage: arquivos separados por empresa.
- Jobs: payloads com empresaId e idempotência.
- Scheduler: rotinas com escopo e locks.
- Auditoria: registro de empresaId, usuário e ação.
- Testes: validação de tentativas de acesso cruzado.

A proteção correta exige que todas essas camadas trabalhem juntas.

---

## 10. Proteções Contra Vazamento

Principais riscos:

- IDOR.
- Query sem empresaId.
- Endpoint público sem validação de slug.
- Upload privado exposto publicamente.
- Cliente tentando acessar dados de outro cliente.
- ADMIN tentando acessar outra empresa.
- Relatório agregando tenants indevidamente.
- Job processando payload sem empresaId.

Mitigações:

- Tenant Validation.
- JWT revalidado no banco.
- Queries compostas por id e empresaId.
- Policies de roles.
- DTOs seguros.
- Testes E2E negativos.
- Auditoria.
- Storage privado por empresa.

---

## 11. Padrão Seguro de Consulta

Padrão recomendado:

Buscar registros por id e empresaId.

Padrão inseguro:

Buscar registros apenas por id quando o recurso pertence a uma empresa.

Apenas SUPER_ADMIN pode executar consultas globais, e somente em rotas explicitamente autorizadas.

---

## 12. Checklist Multiempresa

- Toda entidade de negócio possui empresaId quando aplicável.
- Toda query tenant-aware filtra por empresaId.
- SUPER_ADMIN possui política explícita.
- ADMIN não acessa outra empresa.
- CLIENTE não acessa outro cliente.
- Slug público valida empresa ativa.
- Upload privado valida empresa.
- Relatórios filtram por tenant.
- Jobs carregam empresaId.
- Auditoria registra operações sensíveis.
- Testes cobrem IDOR e isolamento.

---

## 13. Conclusão

O modelo multiempresa do Beauty Core 1.0 é adequado para operação SaaS white-label, desde que toda evolução futura preserve empresaId, Tenant Validation, roles explícitas e validação rigorosa contra vazamento entre tenants.
