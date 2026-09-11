import type { Response } from 'express';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EnterpriseHealthService } from './enterprise-health.service';

@Controller('health')
export class EnterpriseHealthController {
  constructor(
    private readonly enterpriseHealthService: EnterpriseHealthService,
  ) {}

  @Get('live')
  live() {
    return this.enterpriseHealthService.live();
  }

  @Get('ready')
  async ready(@Res({ passthrough: true }) response: Response) {
    const result = await this.enterpriseHealthService.ready();

    if (!this.enterpriseHealthService.isReady(result)) {
      response.status(503);
    }

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @Get('full')
  async full(@Res({ passthrough: true }) response: Response) {
    const result = await this.enterpriseHealthService.full();

    if (this.enterpriseHealthService.shouldReturnUnavailable(result)) {
      response.status(503);
    }

    return result;
  }
}
