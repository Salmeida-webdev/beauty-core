# Beauty Core 1.0 ? Deploy Docker

## Ambientes

O projeto possui ambientes Docker separados:

- Dev: `docker-compose.dev.yml`
- Staging: `docker-compose.staging.yml`
- Produ??o: `docker-compose.prod.yml`

Cada ambiente possui `name:` pr?prio no Docker Compose para evitar mistura de containers, redes e volumes.

## Dev

```bash
cp .env.dev.example .env.dev
docker compose -f docker-compose.dev.yml --env-file .env.dev up -d --build
docker compose -f docker-compose.dev.yml --env-file .env.dev run --rm api npx prisma migrate deploy
```

Dev pode expor:

- API: 3000
- Postgres: 5432
- Redis: 6379

## Staging

```bash
cp .env.staging.example .env.staging
docker compose -f docker-compose.staging.yml --env-file .env.staging up -d --build
docker compose -f docker-compose.staging.yml --env-file .env.staging --profile tools run --rm migrate
```

Staging exp?e apenas a API em localhost.

Postgres e Redis ficam internos na rede Docker.

## Produ??o

```bash
cp .env.prod.example .env.prod
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
docker compose -f docker-compose.prod.yml --env-file .env.prod --profile tools run --rm migrate
```

Produ??o deve expor apenas a API para proxy reverso local:

```txt
127.0.0.1:3000
```

Em valida??o local deste projeto, a porta usada foi:

```txt
127.0.0.1:3002 -> 3000
```

## Regra de migrations

Produ??o e staging n?o usam:

```bash
npx prisma db push
```

Usam:

```bash
npx prisma migrate deploy
```

## Ordem profissional de deploy

1. Backup do banco.
2. Backup dos uploads.
3. Pull do c?digo.
4. Build Docker.
5. Migration com `migrate deploy`.
6. Subir API.
7. Validar health.
8. Validar smoke tests.
9. Monitorar logs.
10. Manter plano de rollback pronto.
