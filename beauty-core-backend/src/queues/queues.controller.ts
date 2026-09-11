import { Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../shared/decorators/roles.decorator';
import { DeadLetterQueueService } from './services/dead-letter-queue.service';
import { QueueMetricsService } from './services/queue-metrics.service';
import { QueueMonitorService } from './services/queue-monitor.service';

@ApiTags('Queues')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SUPER_ADMIN)
@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queueMonitorService: QueueMonitorService,
    private readonly deadLetterQueueService: DeadLetterQueueService,
    private readonly queueMetricsService: QueueMetricsService,
  ) {}

  @Get('status')
  @ApiOperation({ summary: 'Status operacional das filas BullMQ' })
  getStatus() {
    return this.queueMonitorService.getStatus();
  }

  @Get('metrics')
  @ApiOperation({ summary: 'MÃ©tricas operacionais das filas BullMQ' })
  getMetrics() {
    return this.queueMetricsService.getMetrics();
  }

  @Get('dlq')
  @ApiOperation({ summary: 'Listar jobs mortos na Dead Letter Queue' })
  getDlq(@Query('limit') limit?: string) {
    return this.deadLetterQueueService.listarDlq(Number(limit ?? 50));
  }

  @Post('dlq/:jobId/reprocessar')
  @ApiOperation({ summary: 'Reprocessar job morto da DLQ' })
  reprocessar(@Param('jobId') jobId: string) {
    return this.deadLetterQueueService.reprocessar(jobId);
  }
}
