# Beauty Core - Meta WhatsApp - Bloco 01F - Integracao do service

- Campos Meta integrados no create/update de ConfiguracaoWhatsApp.
- empresaId continua sendo recebido pelo service a partir do controller/JWT.
- Token bruto nao foi criado nem exibido; somente metaAccessTokenRef e aceito.
- Prisma validate: `0`
```text
Loaded Prisma config from prisma.config.ts.
System.Management.Automation.RemoteException
Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma
The schema at prisma\schema.prisma is valid ­ƒÜÇ
```
- npm run build: `1`
```text

> beauty-core-backend@0.0.1 build
> nest build

[96msrc/modules/configuracao-whatsapp/configuracao-whatsapp.service.ts[0m:[93m45[0m:[93m7[0m - [91merror[0m[90m TS2353: [0mObject literal may only specify known properties, and 'metaWabaId' does not exist in type 'Without<ConfiguracaoWhatsAppCreateInput, ConfiguracaoWhatsAppUncheckedCreateInput> & ConfiguracaoWhatsAppUncheckedCreateInput'.
System.Management.Automation.RemoteException
[7m45[0m       metaWabaId: dto.metaWabaId,
[7m  [0m [91m      ~~~~~~~~~~[0m
System.Management.Automation.RemoteException
  [96mnode_modules/.prisma/client/index.d.ts[0m:[93m31781[0m:[93m5[0m
    [7m31781[0m     data: XOR<ConfiguracaoWhatsAppCreateInput, ConfiguracaoWhatsAppUncheckedCreateInput>
    [7m     [0m [96m    ~~~~[0m
    The expected type comes from property 'data' which is declared here on type '{ select?: ConfiguracaoWhatsAppSelect<DefaultArgs> | null | undefined; omit?: ConfiguracaoWhatsAppOmit<DefaultArgs> | null | undefined; include?: ConfiguracaoWhatsAppInclude<...> | ... 1 more ... | undefined; data: (Without<...> & ConfiguracaoWhatsAppUncheckedCreateInput) | (Without<...> & ConfiguracaoWhatsAppCreate...'
System.Management.Automation.RemoteException
Found 1 error(s).

```
- Provider Meta, worker, stage, commit, push, deploy e envio real: NAO EXECUTADOS.
- Status: `BLOCKED`