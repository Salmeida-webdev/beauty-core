import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HealthService } from './health.service';

@ApiTags('Health')
@UseGuards(JwtAuthGuard)
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Verificar status geral da API',
    description:
      'Retorna um resumo operacional da API, banco de dados, Redis, Scheduler e BullMQ.',
  })
  @ApiOkResponse({
    description: 'Health check geral retornado com sucesso.',
    schema: {
      example: {
        api: 'ok',
        database: 'ok',
        redis: 'ok',
        scheduler: 'ok',
        bullmq: 'ok',
        timestamp: '2026-06-15T14:30:00.000Z',
      },
    },
  })
  checkHealth() {
    return this.healthService.checkHealth();
  }

  @Get('database')
  @ApiOperation({
    summary: 'Verificar status do banco de dados',
    description:
      'Verifica a conexÃ£o da aplicaÃ§Ã£o com o PostgreSQL usando Prisma.',
  })
  @ApiOkResponse({
    description: 'Banco de dados conectado e operacional.',
    schema: {
      example: {
        status: 'ok',
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Banco de dados indisponÃ­vel.',
    schema: {
      example: {
        status: 'error',
        message: 'Database indisponÃ­vel',
      },
    },
  })
  checkDatabase() {
    return this.healthService.checkDatabase();
  }

  @Get('redis')
  @ApiOperation({
    summary: 'Verificar status do Redis',
    description:
      'Verifica a conexÃ£o da aplicaÃ§Ã£o com o Redis. Endpoint usado para health check, diagnÃ³stico de infraestrutura, filas BullMQ, workers e scheduler.',
  })
  @ApiOkResponse({
    description: 'Redis conectado e operacional.',
    schema: {
      example: {
        status: 'ok',
      },
    },
  })
  @ApiResponse({
    status: 503,
    description: 'Redis indisponÃ­vel ou falha na conexÃ£o.',
    schema: {
      example: {
        status: 'error',
        message: 'Redis indisponÃ­vel',
      },
    },
  })
  checkRedis() {
    return this.healthService.checkRedis();
  }

  @Get('summary')
  @ApiOperation({
    summary: 'Verificar status detalhado da infraestrutura',
    description:
      'Retorna status detalhado da API, PostgreSQL, Redis, Scheduler e BullMQ.',
  })
  @ApiOkResponse({
    description: 'Health check completo retornado com sucesso.',
    schema: {
      example: {
        status: 'ok',
        services: {
          api: {
            status: 'ok',
          },
          database: {
            status: 'ok',
          },
          redis: {
            status: 'ok',
          },
          scheduler: {
            status: 'ok',
          },
          bullmq: {
            status: 'ok',
          },
        },
        timestamp: '2026-06-15T14:30:00.000Z',
      },
    },
  })
  checkFullHealth() {
    return this.healthService.checkFullHealth();
  }


  @Get('queues')
  healthQueues() {
    return this.healthService.checkQueues();
  }

}


