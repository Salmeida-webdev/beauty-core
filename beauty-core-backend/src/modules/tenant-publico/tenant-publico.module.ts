import { Module } from '@nestjs/common';

import { TenantModule } from '../../shared/tenant';

import { PublicTenantController } from './public-tenant.controller';
import { TenantPublicoController } from './tenant-publico.controller';

@Module({
  imports: [
    TenantModule,
  ],

  controllers: [
    TenantPublicoController,
    PublicTenantController,
  ],
})
export class TenantPublicoModule {}