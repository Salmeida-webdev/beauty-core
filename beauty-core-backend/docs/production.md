# Beauty Core 1.0 ? Deploy Produ??o

## Objetivo

Definir estrat?gia m?nima para rodar o Beauty Core 1.0 em VPS/cloud com Docker, Redis protegido, PostgreSQL protegido, proxy reverso, SSL, firewall, backups e rollback.

## Requisitos m?nimos da VPS

Recomendado inicial:

- 2 vCPU.
- 4 GB RAM.
- 40 GB SSD.
- Ubuntu LTS.
- Docker.
- Docker Compose Plugin.
- Firewall ativo.
- Dom?nio configurado.

## Portas p?blicas

Produ??o deve expor apenas:

- 80.
- 443.

Opcional:

- 22 com chave SSH.

N?o expor:

- 5432.
- 6379.

## Subir produ??o

```bash
cp .env.prod.example .env.prod
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build
```

## Migration

Produ??o n?o usa `prisma db push`.

Usar:

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod --profile tools run --rm migrate
```

## Proxy reverso

A API deve ficar atr?s de proxy:

```txt
https://api.seudominio.com -> http://127.0.0.1:3000
```

## Nginx

```nginx
server {
    listen 80;
    server_name api.seudominio.com;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## Caddy

```caddyfile
api.seudominio.com {
    reverse_proxy 127.0.0.1:3000
    request_body {
        max_size 20MB
    }
}
```

## Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80
sudo ufw allow 443
sudo ufw deny 5432
sudo ufw deny 6379
sudo ufw enable
sudo ufw status
```

## Logs

```bash
docker compose -f docker-compose.prod.yml --env-file .env.prod logs -f api
docker compose -f docker-compose.prod.yml --env-file .env.prod logs -f postgres
docker compose -f docker-compose.prod.yml --env-file .env.prod logs -f redis
```

## Health

```bash
curl -f http://127.0.0.1:3000/health
curl -f http://127.0.0.1:3000/health/database
curl -f http://127.0.0.1:3000/health/redis
curl -f http://127.0.0.1:3000/health/queues
```

## Seguran?a

- `.env.prod` nunca deve ir para Git.
- Swagger deve ficar desativado.
- CORS deve ser restrito.
- JWT secrets devem ser longos.
- Redis deve ter senha forte.
- Postgres deve ter senha forte.
- Secrets devem ser rotacion?veis.
