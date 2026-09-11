import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import * as express from 'express';
import type { NextFunction, Request, Response } from 'express';

import { randomUUID } from 'node:crypto';
import { join } from 'path';

import { AppModule } from './app.module';
import { RequestContextService } from './common/context/request-context.service';
import { StructuredLoggerService } from './common/logger/structured-logger.service';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { createSwaggerConfig } from './config/swagger.config';

type RequestWithIds = Request & {
  requestId?: string;
  correlationId?: string;
};

function resolveCorsOrigin() {
  const nodeEnv = process.env.NODE_ENV ?? 'development';
  const corsOrigin = (process.env.CORS_ORIGIN ?? '').trim();

  if (nodeEnv === 'production' && (!corsOrigin || corsOrigin === '*')) {
    throw new Error(
      'CORS_ORIGIN deve ser configurado com origens explícitas em produção.',
    );
  }

  if (!corsOrigin || corsOrigin === '*') {
    return '*';
  }

  const origins = corsOrigin
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (nodeEnv === 'production' && origins.includes('*')) {
    throw new Error('CORS_ORIGIN não pode conter * em produção.');
  }

  return origins;
}

function getHeaderValue(req: Request, headerName: string): string | undefined {
  const value = req.headers[headerName];

  if (Array.isArray(value)) {
    return value[0];
  }

  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim();
  }

  return undefined;
}

function createRequestContextMiddleware(requestContext: RequestContextService) {
  return (req: RequestWithIds, res: Response, next: NextFunction): void => {
    const requestId = getHeaderValue(req, 'x-request-id') ?? randomUUID();

    const correlationId = getHeaderValue(req, 'x-correlation-id') ?? requestId;

    req.requestId = requestId;
    req.correlationId = correlationId;

    res.setHeader('x-request-id', requestId);
    res.setHeader('x-correlation-id', correlationId);

    requestContext.run(
      {
        requestId,
        correlationId,
        method: req.method,
        route: req.originalUrl ?? req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      },
      () => next(),
    );
  };
}

function apiVersionAliasMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  if (/^\/(api\/v1|v1)(\/|$)/.test(req.url)) {
    req.url = req.url.replace(/^\/(api\/v1|v1)(?=\/|$)/, '') || '/';
  }

  next();
}

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  const requestContext = app.get(RequestContextService);
  const structuredLogger = app.get(StructuredLoggerService);
  app.useLogger(structuredLogger);
  app.use(createRequestContextMiddleware(requestContext));

  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(apiVersionAliasMiddleware);

  const corsOrigin = resolveCorsOrigin();

  app.enableCors({
    origin: corsOrigin,
    credentials: corsOrigin !== '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'x-request-id',
      'x-correlation-id',
    ],
    exposedHeaders: ['x-request-id', 'x-correlation-id'],
  });

  const port = Number(process.env.PORT ?? 3000);

  const swaggerEnabled =
    process.env.NODE_ENV === 'development' ||
    process.env.SWAGGER_ENABLED === 'true';

  if (swaggerEnabled) {
    const swaggerConfig = createSwaggerConfig();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      deepScanRoutes: true,
    });

    SwaggerModule.setup('api/docs', app, swaggerDocument, {
      customSiteTitle: 'Beauty Core API Docs',
      swaggerOptions: {
        persistAuthorization: true,
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
        docExpansion: 'none',
        filter: true,
        displayRequestDuration: true,
      },
    });
  }

  app.use(
    '/uploads/public',
    express.static(join(process.cwd(), 'uploads', 'public')),
  );

  await app.listen(port);

  logger.log(`Beauty Core API iniciada na porta ${port}`);
  logger.log(`Ambiente: ${process.env.NODE_ENV ?? 'development'}`);
  logger.log(
    `CORS_ORIGIN: ${
      Array.isArray(corsOrigin) ? corsOrigin.join(', ') : corsOrigin
    }`,
  );
  logger.log('Versionamento ativo: /api/v1 e /v1 como aliases compativeis');

  if (swaggerEnabled) {
    logger.log(`Swagger disponivel em http://localhost:${port}/api/docs`);
  } else {
    logger.log('Swagger desativado por configuracao de ambiente');
  }

  logger.log('Uploads estaticos ativos em /uploads/public');
  logger.log(
    'Health checks ativos em /health, /health/redis, /health/database e /health/full',
  );
}

void bootstrap();
