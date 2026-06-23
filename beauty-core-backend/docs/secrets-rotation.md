# Rotação de Secrets — Beauty Core 1.0

## Objetivo

Definir política de rotação segura para segredos operacionais.

## Regras gerais

- Nunca versionar secrets reais.
- Nunca enviar secrets por chat, issue, print ou documentação.
- Nunca registrar secrets em logs.
- Rotacionar imediatamente se houver suspeita de exposição.
- Atualizar ambiente antes de reiniciar serviço.
- Validar health após rotação.
- Registrar data, responsável e motivo.
- Invalidar sessões quando o secret afetar autenticação.
- Preservar evidências em incidentes de segurança.

## Secrets cobertos

- JWT secrets;
- refresh secrets;
- OTP secret;
- Redis password;
- database password;
- Grafana admin password;
- metrics token;
- health token.

## JWT secrets

### Variáveis

- `JWT_SECRET`
- `JWT_CLIENT_SECRET`

### Quando rotacionar

- exposição;
- troca de equipe;
- incidente de autenticação;
- rotina programada;
- suspeita de token forjado.

### Procedimento

1. Gerar novo secret forte.
2. Atualizar ambiente seguro.
3. Reiniciar API.
4. Invalidar sessões se houver exposição.
5. Validar login admin.
6. Validar login cliente.
7. Registrar rotação.

## Refresh secrets

### Variáveis

- `JWT_REFRESH_SECRET`
- `JWT_CLIENT_REFRESH_SECRET`

### Risco

Refresh tokens têm impacto maior porque permitem renovação de sessão.

### Procedimento

1. Declarar janela de rotação.
2. Gerar novo secret.
3. Atualizar ambiente.
4. Revogar sessões ativas se houver exposição.
5. Reiniciar API.
6. Validar login.
7. Validar refresh.
8. Monitorar erros de sessão.

## OTP secret

### Variável

- `OTP_SECRET`

### Procedimento

1. Gerar novo secret.
2. Atualizar ambiente.
3. Reiniciar API.
4. Invalidar códigos OTP pendentes se aplicável.
5. Validar solicitação de código.
6. Validar verificação de código.

## Redis password

### Variável

- `REDIS_PASSWORD`

### Procedimento

1. Programar janela.
2. Atualizar configuração do Redis.
3. Atualizar secret da API e workers.
4. Reiniciar Redis.
5. Reiniciar API.
6. Reiniciar workers se existirem separados.
7. Validar filas.
8. Validar health.
9. Monitorar DLQ.

## Database password

### Variáveis

- `DATABASE_URL`
- senha interna do PostgreSQL.

### Procedimento

1. Programar janela.
2. Criar ou alterar senha do usuário do banco.
3. Atualizar secret da aplicação.
4. Reiniciar API.
5. Validar `npm run prisma:validate`.
6. Validar `/health/ready`.
7. Validar login.
8. Validar leitura básica de dados.
9. Monitorar erros Prisma.

## Grafana admin password

### Variável

- `GRAFANA_ADMIN_PASSWORD`

### Procedimento

1. Alterar senha no provedor ou container.
2. Registrar responsável.
3. Confirmar login.
4. Revisar usuários administrativos.
5. Remover acessos desnecessários.
6. Registrar evidência.

## Metrics token

### Variável

- `METRICS_TOKEN`

### Procedimento

1. Gerar novo token.
2. Atualizar serviço consumidor.
3. Atualizar API.
4. Validar `/metrics`.
5. Confirmar coleta Prometheus.
6. Monitorar falhas de scraping.

## Health token

### Variável

- `HEALTH_TOKEN`

### Procedimento

1. Gerar novo token.
2. Atualizar monitoramento.
3. Atualizar API.
4. Validar endpoints protegidos.
5. Confirmar alertas funcionando.

## Frequência sugerida

| Secret | Frequência padrão |
|---|---:|
| JWT secrets | 90 a 180 dias |
| Refresh secrets | 90 dias |
| OTP secret | 180 dias |
| Redis password | 180 dias |
| Database password | 180 dias |
| Grafana admin password | 90 dias |
| Metrics token | 180 dias |
| Health token | 180 dias |

## Rotação emergencial

Aplicar imediatamente quando houver:

- commit acidental;
- print exposto;
- log com segredo;
- issue com segredo;
- chat com segredo;
- acesso indevido;
- alerta de secret scanning;
- suspeita de comprometimento.

## Critério de aceite

- secret antigo revogado;
- secret novo ativo;
- health OK;
- autenticação validada;
- filas funcionando, quando aplicável;
- métricas funcionando, quando aplicável;
- registro operacional criado;
- sessões invalidadas quando necessário.
