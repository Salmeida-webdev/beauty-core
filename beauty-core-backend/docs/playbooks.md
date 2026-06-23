# Playbooks de Incidente — Beauty Core 1.0

## Objetivo

Playbooks são fluxos objetivos para resposta a incidentes. Enquanto runbooks detalham operação, playbooks orientam decisão, comunicação, severidade e encerramento.

## Papéis

| Papel | Responsabilidade |
|---|---|
| Incident Commander | Coordena o incidente |
| Tech Lead | Diagnostica causa técnica |
| Operator | Executa comandos controlados |
| Communicator | Atualiza stakeholders |
| Reviewer | Valida normalização e pós-incidente |

---

## Playbook SEV1 — Indisponibilidade crítica

### Gatilhos

- API indisponível para todos.
- Banco indisponível.
- Vazamento de segredo.
- Perda ou corrupção de dados.
- Falha de autenticação global.
- Vazamento entre tenants.

### Ações

1. Declarar SEV1.
2. Congelar deploys.
3. Registrar horário de início.
4. Identificar último evento relevante.
5. Avaliar rollback.
6. Executar contenção.
7. Validar recuperação.
8. Registrar causa preliminar.
9. Emitir pós-incidente.

### Comunicação

Comunicar a cada marco relevante:

- incidente identificado;
- causa provável;
- contenção aplicada;
- serviço recuperado;
- RCA pendente ou concluído.

---

## Playbook SEV2 — Degradação relevante

### Gatilhos

- Redis indisponível sem derrubar API.
- DLQ crescendo.
- Backup falhando.
- Latência acima do SLO.
- Erro elevado em módulo crítico.
- Scheduler falhando.

### Ações

1. Declarar SEV2.
2. Verificar impacto em clientes.
3. Priorizar contenção.
4. Corrigir causa raiz.
5. Monitorar por pelo menos um ciclo operacional.
6. Documentar.

---

## Playbook SEV3 — Tenant específico

### Gatilhos

- Falha em uma empresa.
- Configuração incorreta.
- Dados inconsistentes localizados.
- Erro de permissão isolado.
- Slug ou domínio com comportamento incorreto.

### Ações

1. Confirmar tenant afetado.
2. Validar que outros tenants não foram afetados.
3. Corrigir somente escopo necessário.
4. Registrar evidência.
5. Comunicar resolução.

---

## Playbook de rollback

### Pré-condições

- Versão anterior disponível.
- Banco compatível ou plano de reversão definido.
- Variáveis de ambiente compatíveis.
- Docker image anterior identificada.

### Ações

1. Bloquear nova promoção.
2. Selecionar imagem anterior.
3. Restaurar serviço.
4. Validar health.
5. Validar login.
6. Validar fluxo crítico.
7. Registrar motivo do rollback.

---

## Playbook de vazamento de segredo

### Ações imediatas

1. Declarar SEV1.
2. Identificar secret.
3. Revogar imediatamente.
4. Gerar novo secret.
5. Atualizar ambiente.
6. Reiniciar serviços.
7. Invalidar sessões se necessário.
8. Revisar logs.
9. Registrar incidente.

---

## Playbook de DLQ

### Ações

1. Identificar fila e erro dominante.
2. Classificar impacto.
3. Corrigir causa raiz.
4. Reprocessar em lote pequeno.
5. Monitorar sucesso.
6. Escalar se DLQ continuar crescendo.

---

## Playbook de backup/restore

### Backup falhando

1. Declarar SEV2.
2. Validar espaço.
3. Validar permissão.
4. Validar conexão com banco.
5. Executar backup manual.
6. Confirmar arquivo gerado.

### Restore emergencial

1. Declarar SEV1.
2. Congelar escrita se necessário.
3. Restaurar backup em ambiente isolado.
4. Validar integridade.
5. Aprovar restore produção.
6. Executar janela.
7. Validar smoke test.

---

## Encerramento de incidente

Todo incidente deve gerar:

- severidade;
- horário de início;
- horário de normalização;
- causa raiz;
- impacto;
- ações executadas;
- prevenção futura;
- links para logs, PRs ou relatórios.
