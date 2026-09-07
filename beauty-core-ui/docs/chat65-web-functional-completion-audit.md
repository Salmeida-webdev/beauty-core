# BEAUTY CORE 1.0 — CHAT 65
# Auditoria-Mãe e Blueprint Funcional Final

## Baseline

- Branch: `chat32-bullmq-enterprise`
- HEAD: `a71097e0913603990fdea3e68e1d689b5cf08598`
- Parent: `c3867d5362e138aae559253de27968ae15bace14`
- Commit: `feat(portal): finalize client portal 1.0`

## Critério de auditoria

Foram considerados somente arquivos ativos de `beauty-core-backend/src` e arquivos Prisma fora de backups, dist, coverage, uploads e node_modules.

## Domínios ativos encontrados

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\dto\create-agendamento.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\dto\list-agendamentos-query.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\dto\update-agendamento.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\dto\agendamentos-analytics.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\dto\fidelidade-analytics.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\dto\profissionais-analytics.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\dto\servicos-analytics.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\dto\unidades-analytics.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\dto\whatsapp-analytics.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\dto\update-perfil-cliente.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\types\cliente-auth-user.type.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivo-access-policy.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-cleanup.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\dto\upload-documento-privado.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\guards\jwt-or-cliente-auth.guard.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\local-storage.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\multer.config.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\providers\.gitkeep`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.factory.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.interface.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.controller.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.service.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\dto\create-beneficio.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\dto\update-beneficio.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.controller.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.service.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\dto\create-cliente-pacote.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\dto\usar-sessao.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\adicionar-pontos.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\create-fidelidade.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\pontuar-por-valor.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\resgatar-pontos.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.controller.spec.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\dto\create-mensagem-whatsapp.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\dto\enviar-mensagem-whatsapp.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\constants\scheduler-times.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\dto\create-servico.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\dto\update-servico.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\dto\create-unidade.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\dto\update-unidade.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\jobs\whatsapp.job.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\workers\whatsapp.worker.ts`

## Controllers e rotas ativas

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\app.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\backup\backup.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\metrics\metrics.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\lgpd\lgpd.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\analytics.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auditoria\auditoria.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth\auth.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\auth-cliente-publico.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\auth-cliente.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\automacoes\automacoes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\campanhas-whatsapp\campanhas-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\categorias-financeiras\categorias-financeiras.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cliente-area\cliente-area.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cliente-area\cliente-area.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes\clientes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\comissoes\comissoes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-fidelidade\configuracao-fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-whatsapp\configuracao-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracoes-notificacao\configuracoes-notificacao.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cupons\cupons.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\empresas\empresas.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\financeiro.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\health\enterprise-health.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\health\health.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\niveis-fidelidade\niveis-fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\notificacoes\notificacoes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\pacotes\pacotes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\templates-whatsapp\templates-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\tenant-publico\public-tenant.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\tenant-publico\tenant-publico.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\usuarios.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\queues.controller.ts`

## Segurança, tenant e ownership

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\app.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\backup\backup.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\backup\backup.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\backup\backup.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\context\request-context.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\context\request-context.types.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\filters\http-exception.filter.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\interceptors\audit-log.interceptor.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\logger\structured-logger.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\common\utils\audit-request.util.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\database\prisma\prisma.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\database\prisma\prisma.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\database\prisma\prisma.service.ts.chat33.bak`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\lgpd\lgpd.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\lgpd\lgpd.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\lgpd\lgpd.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\lgpd\dto\lgpd-cliente-export-response.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\agendamentos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\dto\create-agendamento.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\dto\list-agendamentos-query.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\agendamentos\dto\update-agendamento.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\analytics.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\analytics.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\analytics\analytics.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\area-cliente.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\area-cliente\types\cliente-auth-user.type.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivo-access-policy.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-cleanup.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos-download.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\arquivos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\dto\upload-documento-privado.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\guards\jwt-or-cliente-auth.guard.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\local-storage.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.factory.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\arquivos\storage\storage.interface.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auditoria\auditoria.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auditoria\auditoria.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auditoria\auditoria.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auditoria\dto\create-auditoria.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auditoria\dto\filtros-auditoria.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth\auth.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth\auth.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth\auth.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth\strategies\jwt.strategy.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\auth-cliente-publico.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\auth-cliente.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\auth-cliente.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\auth-cliente.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\guards\cliente-auth.guard.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\auth-cliente\strategies\cliente-jwt.strategy.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\automacoes\automacoes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\automacoes\automacoes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\automacoes\automacoes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\automacoes\dto\processar-evento.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\beneficios\beneficios.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\campanhas-whatsapp\campanhas-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\campanhas-whatsapp\campanhas-whatsapp.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\campanhas-whatsapp\campanhas-whatsapp.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\campanhas-whatsapp\dto\create-campanha-whatsapp.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\categorias-financeiras\categorias-financeiras.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\categorias-financeiras\categorias-financeiras.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\categorias-financeiras\categorias-financeiras.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\categorias-financeiras\dto\create-categoria-financeira.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cliente-area\cliente-area.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cliente-area\cliente-area.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cliente-area\cliente-area.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes\clientes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes\clientes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes\clientes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\clientes-pacotes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\clientes-pacotes\dto\create-cliente-pacote.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\comissoes\comissoes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\comissoes\comissoes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\comissoes\comissoes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-fidelidade\configuracao-fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-fidelidade\configuracao-fidelidade.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-fidelidade\configuracao-fidelidade.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-whatsapp\configuracao-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-whatsapp\configuracao-whatsapp.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-whatsapp\configuracao-whatsapp.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracao-whatsapp\dto\create-configuracao-whatsapp.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracoes-notificacao\configuracoes-notificacao.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracoes-notificacao\configuracoes-notificacao.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\configuracoes-notificacao\configuracoes-notificacao.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cupons\cupons.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cupons\cupons.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cupons\cupons.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cupons\dto\create-cupom.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\cupons\dto\update-cupom.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\empresas\empresas.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\empresas\empresas.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\empresas\empresas.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\empresas\dto\create-empresa.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\empresas\dto\update-empresa.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\fidelidade.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\adicionar-pontos.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\create-fidelidade.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\pontuar-por-valor.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\fidelidade\dto\resgatar-pontos.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\financeiro.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\financeiro.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\financeiro.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\dto\create-movimentacao.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\dto\list-movimentacoes-query.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\financeiro\dto\registrar-pagamento.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\health\health.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\health\health.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\health\health.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\mensagens-whatsapp.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\mensagens-whatsapp\dto\create-mensagem-whatsapp.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\niveis-fidelidade\niveis-fidelidade.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\niveis-fidelidade\niveis-fidelidade.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\niveis-fidelidade\niveis-fidelidade.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\notificacoes\notificacoes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\notificacoes\notificacoes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\notificacoes\notificacoes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\notificacoes\dto\create-notificacao.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\notificacoes\dto\update-notificacao.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\pacotes\pacotes.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\pacotes\pacotes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\pacotes\pacotes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\scheduler\scheduler.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\servicos\servicos.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\sessoes\sessoes.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\sessoes\sessoes.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\templates-whatsapp\templates-whatsapp.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\templates-whatsapp\templates-whatsapp.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\templates-whatsapp\templates-whatsapp.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\templates-whatsapp\dto\create-template-whatsapp.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\tenant-publico\public-tenant.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\unidades\unidades.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\usuarios.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\usuarios.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\usuarios.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\dto\create-usuario.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\dto\list-usuarios-query.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\dto\update-usuario.dto.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\modules\usuarios\policies\usuario-role.policy.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\queues.controller.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\jobs\aniversarios.job.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\jobs\campanhas.job.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\jobs\notificacoes.job.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\jobs\relatorios.job.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\jobs\whatsapp.job.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\services\dead-letter-queue.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\services\queues.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\utils\queue-job-id.util.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\workers\aniversarios.worker.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\workers\campanhas.worker.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\workers\notificacoes.worker.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\workers\relatorios.worker.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\queues\workers\whatsapp.worker.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\shared\tenant\tenant-public.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\shared\tenant\tenant-validator.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\shared\tenant\tenant.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\shared\utils\get-empresa-id.ts`

## Arquivos Prisma

- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\schema.chat30.backup.prisma`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\schema.prisma`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\seed.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\migrations\20260620132053_initial_current_schema\migration.sql`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\prisma\migrations\20260621184000_chat39_secure_otp\migration.sql`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\database\prisma\prisma.module.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\database\prisma\prisma.service.ts`
- `C:\Users\cmted\Desktop\Plataformas Saas\Beauty-Core\beauty-core-backend\src\database\prisma\prisma.service.ts.chat33.bak`

## Matriz preliminar dos Blocos 02–15

| Capacidade | Evidência ativa | Decisão |
|---|---|---|
| Agendamentos | Verificar módulo agendamentos | Definir contrato Portal |
| Disponibilidade | Verificar agenda/scheduler | Definir contrato Portal |
| Fidelidade | Verificar módulo fidelidade | Reutilizar regras existentes |
| Benefícios | Verificar módulo beneficios | Definir elegibilidade |
| Pacotes | Verificar clientes-pacotes | Definir consulta e consumo |
| Documentos | Verificar arquivos e policies | Preservar ownership |
| Mensagens | Verificar WhatsApp existente | Avaliar envio seguro |
| Prisma | Verificar schema real | Alterar somente se comprovado |

## Restrições

- Nenhuma feature implementada.
- Nenhum backend ou frontend funcional alterado.
- Nenhuma migration, dependência, teste global ou build executado.
- Nenhum stage, commit, push, tag ou deploy executado.
- Backups, uploads e artefatos históricos foram excluídos da evidência ativa.

## 10. Decisão final da Auditoria-Mãe

### APPOINTMENTS

Consulta de agendamentos já existe no módulo canônico AreaCliente. Criação, cancelamento e reagendamento pelo cliente ainda não possuem contrato Portal comprovado.

### AVAILABILITY

Não há contrato Portal comprovado para disponibilidade. Deve ser auditada a regra autoritativa de agenda antes da implementação.

### CREATE

Não existe rota AreaCliente comprovada para criação de agendamento. Necessário criar o menor contrato seguro somente após reutilizar as regras autoritativas do domínio.

### CANCEL

Não existe rota AreaCliente comprovada para cancelamento de agendamento pelo cliente.

### RESCHEDULE

Não existe rota AreaCliente comprovada para reagendamento pelo cliente.

### LOYALTY

Consulta de saldo, níveis, benefícios elegíveis e movimentações já existe. Resgate pelo cliente ainda não possui contrato Portal comprovado.

### BENEFITS

Listagem e elegibilidade já são calculadas pelo AreaClienteService. Registro de resgate e histórico de benefícios utilizados ainda não estão comprovados no Portal.

### PACKAGES

Listagem e detalhes dos pacotes já existem com ownership, validade, status e saldo de sessões. Consumo de sessão pelo cliente ainda não possui contrato Portal.

### CONSUMPTION

O domínio administrativo possui usarSessao, mas não existe contrato AreaCliente comprovado. A operação exige ownership, validade, status ativo e proteção contra concorrência.

### DOCUMENTS

O backend possui módulo de arquivos, download protegido e policy de acesso. A exposição de documentos ao cliente deve ser implementada somente após confirmar ownership cliente/empresa e escopo de documentos.

### MESSAGE SEND

O Portal possui somente leitura de mensagens WhatsApp. Envio pelo cliente não está autorizado nesta etapa até confirmação de política de negócio, antiabuso, fila e integração segura.

### DATABASE CHANGES

Não há necessidade comprovada de alteração no Prisma neste momento. Os modelos existentes aparentam cobrir os domínios; qualquer mudança dependerá de gap confirmado durante os blocos de implementação.

### BACKEND CONTRACTS TO CREATE

- Disponibilidade do cliente;
- Criação de agendamento pelo cliente;
- Cancelamento de agendamento pelo cliente;
- Reagendamento de agendamento pelo cliente;
- Consumo seguro de sessão de pacote pelo cliente, se aprovado;
- Resgate de benefício pelo cliente, se o domínio permitir;
- Listagem/download/preview de documentos com ownership comprovado, se aprovado.

## 11. Matriz final dos Blocos 02–15

| Bloco | Escopo | Tipo |
|---|---|---|
| 02 | Auditoria autoritativa de agendamentos e disponibilidade | Backend/domínio |
| 03 | Contratos de disponibilidade e consulta | Backend + frontend |
| 04 | Criação, cancelamento e reagendamento | Backend + frontend |
| 05 | Fidelidade e extrato | Portal + contratos |
| 06 | Benefícios, elegibilidade e resgate | Portal + contratos |
| 07 | Pacotes, detalhes e validade | Portal + contratos |
| 08 | Consumo de sessões e concorrência | Backend + frontend |
| 09 | Arquivos e documentos | Backend + segurança |
| 10 | Download e preview seguro | Backend + frontend |
| 11 | Decisão e eventual envio de mensagens | Backend + frontend |
| 12 | Segurança, ownership, tenant e privacidade | Auditoria |
| 13 | Testes focados e integração | Qualidade |
| 14 | Release candidate e documentação | Release engineering |
| 15 | Auditoria final, normalização e commit | Release engineering |

## 12. Status do Bloco 01

APROVÁVEL: baseline, inventário, módulo canônico, contratos existentes, gaps funcionais e matriz de execução foram identificados com evidências.

Nenhuma feature foi implementada neste bloco.
