import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

type RequestWithContextIds = Request & {
  requestId?: string;
  correlationId?: string;
};

function headerToString(
  value: string | number | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  if (value === undefined) {
    return undefined;
  }

  return String(value);
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<RequestWithContextIds>();

    const responseRequestId = headerToString(
      response.getHeader('x-request-id'),
    );

    const responseCorrelationId = headerToString(
      response.getHeader('x-correlation-id'),
    );

    const requestId = request.requestId ?? responseRequestId;
    const correlationId =
      request.correlationId ?? responseCorrelationId ?? requestId;

    if (requestId) {
      response.setHeader('x-request-id', requestId);
    }

    if (correlationId) {
      response.setHeader('x-correlation-id', correlationId);
    }

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Erro interno do servidor.';
    let error = 'Internal Server Error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      error = exception.name.replace('Exception', '') || 'Http Error';

      const responseBody = exception.getResponse();

      if (typeof responseBody === 'string') {
        message = responseBody;
      } else if (typeof responseBody === 'object' && responseBody !== null) {
        const body = responseBody as Record<string, unknown>;
        message = (body.message as string | string[]) ?? exception.message;
        error = (body.error as string) ?? error;
      } else {
        message = exception.message;
      }
    }

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Não foi possível processar a solicitação.';
      error = 'Bad Request';
    }

    if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Dados inválidos enviados na solicitação.';
      error = 'Bad Request';
    }

    if (exception instanceof Prisma.PrismaClientInitializationError) {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Erro interno do servidor.';
      error = 'Internal Server Error';
    }

    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
      requestId: requestId ?? null,
      correlationId: correlationId ?? null,
    });
  }
}
