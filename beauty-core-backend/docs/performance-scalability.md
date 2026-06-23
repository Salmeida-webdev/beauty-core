# Performance e Escalabilidade - Beauty Core 1.0

## Limites oficiais

- Listagens administrativas devem usar paginacao.
- O limite padrao de pagina e 20 itens.
- O limite maximo de pagina e 100 itens.
- Auditoria tambem deve respeitar limite maximo 100.
- Exportacoes LGPD usam LGPD_EXPORT_MAX_ITEMS por secao, com padrao 5000 e teto interno 10000.

## Analytics

- Endpoints de analytics devem receber periodo quando aplicavel.
- Consultas agregadas devem priorizar count, groupBy e filtros por empresaId.
- Rankings e listas internas devem usar take explicito.
- Relatorios muito pesados devem ser movidos futuramente para workers/filas.

## Estrategia futura API / Workers / Scheduler

- API HTTP: autenticacao, autorizacao, validacao, CRUDs, consultas paginadas e dashboards leves.
- Workers BullMQ: relatorios pesados, exportacoes grandes, campanhas, processamento assíncrono e jobs demorados.
- Scheduler: gatilhos recorrentes, limpeza, backups, lembretes e rotinas operacionais.
- Banco: indices por empresaId, periodo e entidades de alto volume.

## Criterio de aceite

- Nenhuma listagem publica/admin deve retornar volume ilimitado.
- Nenhuma exportacao LGPD deve fazer findMany sem take.
- Nenhum relatorio pesado deve bloquear a API indefinidamente.
- Qualquer processamento longo deve ser candidato a fila/worker.


## Limites configuraveis de analytics - Chat 39

ANALYTICS_TOP_LIMIT controla rankings e listas curtas de analytics. Padrao recomendado: 10. Teto interno: 50.

ANALYTICS_SCAN_LIMIT controla varreduras internas necessarias para calculos agregados quando nao houver alternativa direta via count/groupBy. Padrao recomendado: 5000. Teto interno: 10000.

Relatorios que ultrapassarem esses limites devem ser movidos para BullMQ Workers, com geracao assíncrona, status de processamento e download posterior.
