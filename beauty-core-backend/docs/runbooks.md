# Runbooks Operacionais — Beauty Core 1.0

## Objetivo

Este documento define procedimentos operacionais para diagnóstico, contenção e recuperação de falhas comuns no Beauty Core.

## Convenções de severidade

| Severidade | Definição | Exemplo |
|---|---|---|
| SEV1 | Indisponibilidade crítica ou risco de dados | API fora do ar, banco indisponível, vazamento de segredo |
| SEV2 | Degradação relevante | Redis indisponível, DLQ crescendo, backups falhando |
| SEV3 | Problema localizado | Tenant específico com falha, job isolado falhando |
| SEV4 | Baixo impacto | alerta informativo, documentação ou ajuste menor |

---

## 1. API fora do ar

### Sintomas

- `/health/live` não responde.
- Container reiniciando.
- Usuários não conseguem autenticar.
- Load balancer retorna 502, 503 ou 504.
- Logs indicam erro crítico no bootstrap da aplicação.

### Diagnóstico seguro

```powershell
docker compose ps
docker compose logs api --tail 100
docker compose logs postgres --tail 50
docker compose logs redis --tail 50
```

### Contenção

1. Congelar deploys.
2. Identificar se a falha começou após release, migration, alteração de `.env` ou reinício.
3. Validar dependências críticas: PostgreSQL, Redis e variáveis obrigatórias.
4. Se a falha começou após deploy, preparar rollback.

### Recuperação

```powershell
docker compose restart api
docker compose ps
docker compose logs api --tail 100
```

### Critério de normalização

- `/health/live` responde.
- `/health/ready` responde.
- Login admin funciona.
- Métricas voltam a ser coletadas.
- Não há loop de restart no container.

---

## 2. Banco indisponível

### Sintomas

- `/health/full` indica PostgreSQL indisponível.
- Erros Prisma de conexão.
- Login, dashboard e consultas falham.
- Logs exibem timeout, conexão recusada ou autenticação inválida no banco.

### Diagnóstico seguro

```powershell
docker compose ps postgres
docker compose logs postgres --tail 100
docker compose exec postgres pg_isready
```

### Contenção

1. Suspender deploys.
2. Não executar migrations manuais sem revisão.
3. Verificar se volume do banco existe.
4. Preservar logs.
5. Confirmar se é falha de credencial, rede, volume ou disponibilidade.

### Recuperação

```powershell
docker compose restart postgres
docker compose restart api
docker compose ps
```

### Critério de normalização

- `pg_isready` retorna aceitando conexões.
- `npm run prisma:validate` passa.
- `/health/ready` passa.
- Fluxo de login e leitura de dados funciona.

---

## 3. Redis indisponível

### Sintomas

- Filas paradas.
- Scheduler falhando.
- Workers com erro de conexão.
- `/health/queues` ou `/health/full` indica falha relacionada ao Redis.
- DLQ pode começar a crescer.

### Diagnóstico seguro

```powershell
docker compose ps redis
docker compose logs redis --tail 100
docker compose logs api --tail 100
```

### Contenção

1. Pausar campanhas e rotinas não críticas.
2. Evitar reprocessamento manual enquanto Redis estiver instável.
3. Confirmar se o problema é senha, rede, memória, volume ou indisponibilidade do container.
4. Monitorar filas após retorno.

### Recuperação

```powershell
docker compose restart redis
docker compose restart api
docker compose ps
```

### Critério de normalização

- Redis responde.
- API reconecta.
- Workers processam jobs.
- Scheduler volta a executar.
- DLQ não cresce de forma anormal.

---

## 4. DLQ crescendo

### Sintomas

- Métricas indicam aumento contínuo de dead letter queue.
- Jobs de WhatsApp, notificações, campanhas, aniversários ou relatórios falham repetidamente.
- Logs mostram erro recorrente para o mesmo tipo de payload.

### Diagnóstico

1. Identificar fila de origem.
2. Identificar erro dominante.
3. Verificar se a falha é:
   - dependência externa;
   - payload inválido;
   - regra de negócio;
   - bug de código;
   - ausência de configuração;
   - indisponibilidade de Redis ou banco.
4. Classificar impacto por criticidade.

### Contenção

1. Não reprocessar em massa antes de corrigir a causa raiz.
2. Pausar jobs não críticos se estiverem gerando ruído.
3. Priorizar jobs financeiros, LGPD, sessão, backup e comunicação crítica.
4. Registrar evidência do erro dominante.

### Recuperação

1. Corrigir configuração, payload, dependência ou código.
2. Reprocessar em lotes pequenos.
3. Monitorar taxa de sucesso.
4. Encerrar incidente somente após estabilização.

### Critério de normalização

- DLQ estabilizada.
- Novos jobs processam com sucesso.
- Erro raiz documentado.
- Não há crescimento contínuo após reprocessamento.

---

## 5. Backup falhando

### Sintomas

- Jobs de backup falham.
- Logs indicam erro de permissão, espaço, credencial ou conexão.
- Status de backup indica degradação.
- Arquivos esperados não são gerados.

### Diagnóstico seguro

```powershell
docker compose ps
docker compose logs api --tail 150
```

Verificar:

- espaço em disco;
- permissão dos diretórios de backup;
- conexão PostgreSQL;
- volume de uploads;
- variáveis de ambiente;
- data e tamanho do último backup válido.

### Contenção

1. Não apagar backups antigos até entender a causa.
2. Suspender limpeza automática se houver risco de perda.
3. Gerar backup manual se possível.
4. Registrar o último backup válido conhecido.

### Recuperação

1. Corrigir permissão, caminho, espaço ou credencial.
2. Executar backup manual.
3. Validar arquivo gerado.
4. Confirmar próxima execução agendada.

### Critério de normalização

- Backup manual passa.
- Próximo backup agendado passa.
- Arquivo de backup possui tamanho coerente.
- Logs não exibem erro recorrente.

---

## 6. Restore emergencial

### Sintomas

- Corrupção de dados.
- Exclusão indevida.
- Incidente grave de banco.
- Necessidade de retorno a ponto anterior.
- Migração destrutiva aplicada incorretamente.

### Procedimento

1. Declarar SEV1.
2. Congelar deploys.
3. Preservar evidências.
4. Identificar backup alvo.
5. Restaurar primeiro em ambiente isolado.
6. Validar integridade.
7. Aprovar janela de restore.
8. Executar restore em produção.
9. Validar health, login, dados críticos, auditoria e filas.

### Critério de normalização

- Dados críticos recuperados.
- Health completo OK.
- Smoke test manual aprovado.
- Incidente documentado.
- Causa raiz registrada.

---

## 7. Deploy com falha

### Sintomas

- CI/CD falha.
- Container não sobe.
- Healthcheck falha após release.
- Migration falha.
- Build local ou remoto quebra.

### Diagnóstico seguro

```powershell
git status --short
npm run prisma:validate
npm run build
docker build -t beauty-core-api:debug .
```

### Contenção

1. Bloquear promoção para produção.
2. Manter versão anterior rodando.
3. Não aplicar migrations manualmente sem revisão.
4. Comparar release atual com última versão estável.

### Recuperação

1. Corrigir erro.
2. Rodar suite obrigatória.
3. Recriar imagem.
4. Reexecutar deploy.
5. Validar health e smoke test.

### Critério de normalização

- Pipeline aprovado.
- Docker build aprovado.
- Health OK.
- Smoke test aprovado.

---

## 8. Rollback

### Quando aplicar

- Deploy causa indisponibilidade.
- Bug crítico em produção.
- Falha de migration.
- Regressão de autenticação.
- Falha em multiempresa.
- Aumento anormal de erro 5xx após release.

### Procedimento

1. Identificar última versão estável.
2. Parar promoção da versão problemática.
3. Restaurar imagem anterior.
4. Validar variáveis compatíveis.
5. Validar banco.
6. Executar smoke test.
7. Comunicar status.

### Critério de normalização

- API opera na versão anterior.
- Dados preservados.
- Health passa.
- Smoke test passa.
- Incidente registrado.

---

## 9. Vazamento de segredo

### Sintomas

- Secret exposto em log, commit, print, issue, documentação ou chat.
- Uso indevido de token.
- Alerta de secret scanning.
- Suspeita de acesso indevido.

### Contenção imediata

1. Declarar SEV1.
2. Revogar secret exposto.
3. Gerar novo secret.
4. Atualizar ambiente.
5. Reiniciar serviços dependentes.
6. Invalidar sessões se JWT ou refresh secret foi afetado.
7. Preservar evidências.

### Recuperação

1. Confirmar que secret antigo não funciona.
2. Validar autenticação.
3. Validar health.
4. Revisar logs de acesso.
5. Avaliar impacto LGPD.
6. Documentar incidente.

### Critério de normalização

- Secret antigo revogado.
- Novo secret ativo.
- Serviços saudáveis.
- Sessões invalidadas quando necessário.
- Evidência preservada.

---

## 10. Tenant com problema

### Sintomas

- Apenas uma empresa relata falha.
- Dados inconsistentes em um tenant.
- Erro relacionado a `empresaId`, slug, domínio ou configuração.
- Usuário de uma empresa não consegue acessar recurso específico.

### Diagnóstico

1. Confirmar tenant afetado.
2. Validar `empresaId`, slug e domínio.
3. Verificar permissões dos usuários.
4. Verificar configuração do tenant.
5. Confirmar se outros tenants estão normais.
6. Preservar auditoria.

### Contenção

1. Não executar correção global sem prova de impacto global.
2. Não alterar dados de outro tenant.
3. Corrigir somente o escopo afetado.
4. Registrar evidência.

### Critério de normalização

- Tenant afetado volta a operar.
- Outros tenants seguem íntegros.
- Ação registrada em auditoria ou relatório operacional.
