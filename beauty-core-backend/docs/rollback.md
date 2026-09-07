# Beauty Core 1.0 ? Estrat?gia de Rollback

## Objetivo

Definir procedimentos para voltar a vers?o anterior da aplica??o em caso de falha no deploy, migration, imagem Docker, configura??o ou dados.

## Tipos de rollback

1. Rollback de imagem Docker.
2. Rollback de compose.
3. Restore de banco.
4. Restore de uploads.
5. Rollback de configura??o `.env`.
6. Rollback de proxy reverso.

## Antes de qualquer deploy

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod ps
docker compose -f docker-compose.prod.yml --env-file .env.prod logs --tail=100 api
docker exec beauty-core-prod-postgres pg_dump -U postgres beauty_core > pre-deploy-backup.sql
docker run --rm -v beauty_core_prod_uploads:/data -v $(pwd):/backup alpine tar czf /backup/pre-deploy-uploads.tar.gz /data
```

## Rollback de aplica??o

```bash
git log --oneline -5
git checkout COMMIT_ANTERIOR
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## Rollback de banco

Aten??o: migrations destrutivas podem ser irrevers?veis.

```bash
cat pre-deploy-backup.sql | docker exec -i beauty-core-prod-postgres psql -U postgres beauty_core
```

## Rollback de uploads

```bash
docker run --rm -v beauty_core_prod_uploads:/data -v $(pwd):/backup alpine sh -c "cd / && tar xzf /backup/pre-deploy-uploads.tar.gz"
```

## Verifica??es p?s-rollback

```bash
curl -f http://127.0.0.1:3000/health
curl -f http://127.0.0.1:3000/health/database
curl -f http://127.0.0.1:3000/health/redis
curl -f http://127.0.0.1:3000/health/queues
docker compose -f docker-compose.prod.yml --env-file .env.prod logs --tail=200 api
```

## Riscos

- Migration com `DROP COLUMN`, `DROP TABLE` ou altera??o destrutiva pode exigir restore completo.
- Rollback de c?digo sem rollback de banco pode quebrar compatibilidade.
- Uploads privados precisam ser restaurados junto com o banco quando h? depend?ncia de arquivos.
- Redis pode conter jobs pendentes incompat?veis com a vers?o anterior.
