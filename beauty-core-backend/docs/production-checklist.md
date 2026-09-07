# Checklist de Produção — Beauty Core 1.0

## 1. Objetivo
Este checklist consolida os critérios mínimos para colocar o Beauty Core 1.0 em produção com segurança, estabilidade, rastreabilidade e capacidade de recuperação.

## 2. Infraestrutura
- Servidor ou VPS provisionado.
- Docker instalado.
- Docker Compose instalado.
- Firewall configurado.
- Domínio configurado.
- HTTPS configurado.
- Volumes persistentes definidos.
- Logs acessíveis.

## 3. Segurança
- .env fora do Git.
- Secrets fortes configurados.
- JWT secrets fortes.
- Refresh token secrets fortes.
- CORS revisado.
- Rate limit ativo.
- ValidationPipe ativo.
- Upload privado não exposto.
- Docker sem usuário root quando aplicável.

## 4. Banco de Dados
- PostgreSQL configurado.
- DATABASE_URL validada.
- Migrations aplicadas.
- Prisma validate aprovado.
- Backup configurado.
- Restore testado.
- Acesso público bloqueado.

## 5. Redis
- Redis configurado.
- Senha configurada.
- Acesso público bloqueado.
- Health check validado.
- Uso de memória monitorado.

## 6. BullMQ
- Filas registradas.
- Workers ativos.
- Retry configurado.
- Backoff configurado.
- DLQ ativa.
- Health de filas validado.
- Jobs críticos idempotentes.

## 7. Docker
- Dockerfile validado.
- docker-compose.prod.yml revisado.
- Volumes persistentes.
- Health checks ativos.
- Restart policy configurada.
- Logs validados.

## 8. Backup
- Backup PostgreSQL configurado.
- Backup Redis avaliado.
- Backup uploads configurado.
- Retenção definida.
- Restore testado.
- Logs de backup monitorados.

## 9. Observabilidade
- /health OK.
- /health/live OK.
- /health/ready OK.
- /health/full OK.
- /health/queues OK.
- /metrics OK.
- Prometheus configurado quando aplicável.
- Grafana configurado quando aplicável.

## 10. CI/CD
- GitHub Actions configurado.
- CI passando.
- Docker workflow passando.
- Staging validado.
- Production workflow revisado.
- Quality gates ativos.
- Smoke tests disponíveis.

## 11. LGPD
- Exportação de dados validada.
- Anonimização validada.
- Retenção documentada.
- Auditoria ativa.
- Política de privacidade planejada.

## 12. Deploy
- Build aprovado.
- Testes aprovados.
- Coverage aprovado.
- Migrations aplicadas.
- Health checks OK.
- Smoke tests OK.
- Logs sem erro crítico.

## 13. Status
Produção só deve ser liberada quando todos os itens críticos estiverem validados.
