import { SessoesModule } from '../sessoes/sessoes.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { PrismaModule } from '../../database/prisma/prisma.module';
import { TenantModule } from '../../shared/tenant';

import { AuditoriaModule } from '../auditoria/auditoria.module';

import { AuthClienteController } from './auth-cliente.controller';
import { AuthClientePublicoController } from './auth-cliente-publico.controller';
import { AuthClienteService } from './auth-cliente.service';
import { ClienteJwtStrategy } from './strategies/cliente-jwt.strategy';

@Module({
  imports: [
    SessoesModule,
    PrismaModule,
    TenantModule,
    AuditoriaModule,
    PassportModule,

    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('JWT_CLIENT_SECRET'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],

  controllers: [AuthClienteController, AuthClientePublicoController],

  providers: [AuthClienteService, ClienteJwtStrategy],

  exports: [AuthClienteService],
})
export class AuthClienteModule {}
