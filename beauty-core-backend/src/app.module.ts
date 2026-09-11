import { LgpdModule } from './lgpd/lgpd.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';

import { PrismaModule } from './database/prisma/prisma.module';

import { AuthModule } from './modules/auth/auth.module';
import { EmpresasModule } from './modules/empresas/empresas.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ClientesModule } from './modules/clientes/clientes.module';
import { ServicosModule } from './modules/servicos/servicos.module';
import { UnidadesModule } from './modules/unidades/unidades.module';
import { AgendamentosModule } from './modules/agendamentos/agendamentos.module';
import { FidelidadeModule } from './modules/fidelidade/fidelidade.module';
import { CuponsModule } from './modules/cupons/cupons.module';
import { BeneficiosModule } from './modules/beneficios/beneficios.module';
import { NiveisFidelidadeModule } from './modules/niveis-fidelidade/niveis-fidelidade.module';
import { ConfiguracaoFidelidadeModule } from './modules/configuracao-fidelidade/configuracao-fidelidade.module';
import { PacotesModule } from './modules/pacotes/pacotes.module';
import { ClientesPacotesModule } from './modules/clientes-pacotes/clientes-pacotes.module';
import { CategoriasFinanceirasModule } from './modules/categorias-financeiras/categorias-financeiras.module';
import { FinanceiroModule } from './modules/financeiro/financeiro.module';
import { ComissoesModule } from './modules/comissoes/comissoes.module';
import { NotificacoesModule } from './modules/notificacoes/notificacoes.module';
import { ConfiguracoesNotificacaoModule } from './modules/configuracoes-notificacao/configuracoes-notificacao.module';
import { AutomacoesModule } from './modules/automacoes/automacoes.module';

import { ConfiguracaoWhatsappModule } from './modules/configuracao-whatsapp/configuracao-whatsapp.module';
import { TemplatesWhatsappModule } from './modules/templates-whatsapp/templates-whatsapp.module';
import { MensagensWhatsappModule } from './modules/mensagens-whatsapp/mensagens-whatsapp.module';
import { CampanhasWhatsappModule } from './modules/campanhas-whatsapp/campanhas-whatsapp.module';

import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ArquivosModule } from './modules/arquivos/arquivos.module';

import { AreaClienteModule } from './modules/area-cliente/area-cliente.module';
import { ClienteAreaModule } from './modules/cliente-area/cliente-area.module';
import { AuthClienteModule } from './modules/auth-cliente/auth-cliente.module';

import { AuditoriaModule } from './modules/auditoria/auditoria.module';
import { HealthModule } from './modules/health/health.module';
import { SchedulerModule } from './modules/scheduler/scheduler.module';
import { TenantPublicoModule } from './modules/tenant-publico/tenant-publico.module';

import { validateEnv } from './config/env.validation';
import { QueuesModule } from './queues/queues.module';
import { RequestContextModule } from './common/context/request-context.module';
import { StructuredLoggerModule } from './common/logger/structured-logger.module';
import { MetricsModule } from './common/metrics/metrics.module';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { MetricsMiddleware } from './common/metrics/middleware/metrics.middleware';

import { AuditLogInterceptor } from './common/interceptors/audit-log.interceptor';
import { BackupModule } from './backup/backup.module';

@Module({
  imports: [
    LgpdModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 100,
      },
    ]),

    ScheduleModule.forRoot(),

    RequestContextModule,
    StructuredLoggerModule,
    MetricsModule,

    PrismaModule,

    AuthModule,
    EmpresasModule,
    UsuariosModule,
    ClientesModule,
    ServicosModule,
    UnidadesModule,
    AgendamentosModule,
    FidelidadeModule,
    CuponsModule,
    BeneficiosModule,
    NiveisFidelidadeModule,
    ConfiguracaoFidelidadeModule,
    PacotesModule,
    ClientesPacotesModule,
    CategoriasFinanceirasModule,
    FinanceiroModule,
    ComissoesModule,
    NotificacoesModule,
    ConfiguracoesNotificacaoModule,
    AutomacoesModule,

    ConfiguracaoWhatsappModule,
    TemplatesWhatsappModule,
    MensagensWhatsappModule,
    CampanhasWhatsappModule,

    AnalyticsModule,
    ArquivosModule,

    AreaClienteModule,
    // Compatibility namespace only; its service delegates to AreaClienteService.
    ClienteAreaModule,
    AuthClienteModule,

    TenantPublicoModule,
    QueuesModule,
    HealthModule,
    AuditoriaModule,
    SchedulerModule,
    BackupModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditLogInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
