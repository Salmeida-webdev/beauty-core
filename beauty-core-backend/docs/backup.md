# Beauty Core 1.0 ? Backup e Restore Operacional

## Objetivo

Definir comandos operacionais para backup e restore de PostgreSQL, uploads e Redis.

## Regras cr?ticas

- Nunca rodar restore em produ??o sem backup recente.
- Nunca sobrescrever banco real sem janela de manuten??o.
- Sempre validar health ap?s restore.
- Manter c?pias externas ao servidor.
- Backups devem ser criptografados quando armazenados fora da VPS.

## Backup PostgreSQL

### Dev

```bash
docker exec beauty-core-dev-postgres pg_dump -U postgres beauty_core > backup-dev-$(date +%Y%m%d-%H%M%S).sql
```

### Staging

```bash
docker exec beauty-core-staging-postgres pg_dump -U postgres beauty_core > backup-staging-$(date +%Y%m%d-%H%M%S).sql
```

### Produ??o

```bash
docker exec beauty-core-prod-postgres pg_dump -U postgres beauty_core > backup-prod-$(date +%Y%m%d-%H%M%S).sql
```

## Restore PostgreSQL

```bash
cat backup.sql | docker exec -i beauty-core-prod-postgres psql -U postgres beauty_core
```

## Backup uploads

### Produ??o

```bash
docker run --rm -v beauty_core_prod_uploads:/data -v $(pwd):/backup alpine tar czf /backup/uploads-prod-backup.tar.gz /data
```

## Restore uploads

```bash
docker run --rm -v beauty_core_prod_uploads:/data -v $(pwd):/backup alpine sh -c "cd / && tar xzf /backup/uploads-prod-backup.tar.gz"
```

## Backup Redis

```bash
docker exec beauty-core-prod-redis redis-cli -a "$REDIS_PASSWORD" BGSAVE
```

## Verifica??o p?s-backup

```bash
curl -f http://127.0.0.1:3000/health
curl -f http://127.0.0.1:3000/health/database
curl -f http://127.0.0.1:3000/health/redis
curl -f http://127.0.0.1:3000/health/queues
```
