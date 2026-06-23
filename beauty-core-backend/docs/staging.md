# Beauty Core 1.0 ? Deploy Staging

## Objetivo

Ambiente de staging serve para validar deploy, migrations, Redis protegido, filas, scheduler, health checks, Swagger e smoke tests antes da produ??o.

## Subir staging

```bash
cp .env.staging.example .env.staging
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d --build
```

## Rodar migrations

```bash
docker compose -f docker-compose.staging.yml --env-file .env.staging --profile tools run --rm migrate
```

## Validar status

```bash
docker compose -f docker-compose.staging.yml --env-file .env.staging ps
docker compose -f docker-compose.staging.yml --env-file .env.staging run --rm api npx prisma migrate status
```

## Health

```bash
curl -f http://127.0.0.1:3001/health
curl -f http://127.0.0.1:3001/health/database
curl -f http://127.0.0.1:3001/health/redis
curl -f http://127.0.0.1:3001/health/queues
```

## Redis com senha

```bash
docker exec -it beauty-core-staging-redis redis-cli -a "$REDIS_PASSWORD" ping
```

## Seed

Seed em staging pode ser usado para dados de demonstra??o, desde que n?o seja destrutivo:

```bash
docker compose -f docker-compose.staging.yml --env-file .env.staging --profile tools run --rm seed
```

## Valida??es obrigat?rias

- API healthy.
- Postgres healthy.
- Redis healthy.
- Redis com senha.
- Postgres sem porta p?blica.
- Redis sem porta p?blica.
- Migration aplicada.
- Swagger habilitado apenas se necess?rio.
