# Beauty Core - Meta WhatsApp - Bloco 01G - Prisma Client e build

- Objetivo: sincronizar o Prisma Client apos a alteracao do schema e revalidar o backend.
- prisma generate: `0`
```text
Loaded Prisma config from prisma.config.ts.
System.Management.Automation.RemoteException
Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma

Ô£ö Generated Prisma Client (v6.19.3) to .\node_modules\@prisma\client in 331ms

Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)

Tip: Need your database queries to be 1000x faster? Accelerate offers you that and more: https://pris.ly/tip-2-accelerate

```
- prisma validate: `0`
```text
Loaded Prisma config from prisma.config.ts.
System.Management.Automation.RemoteException
Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid ­ƒÜÇ
```
- npm run build: `0`
```text

> beauty-core-backend@0.0.1 build
> nest build

```
- Nenhuma migration nova foi criada.
- Stage, commit, push, deploy e envio Meta real: NAO EXECUTADOS.
- Status: `PASS`