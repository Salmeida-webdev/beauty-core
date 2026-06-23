import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { RequestContextData } from './request-context.types';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContextData>();

  run<T>(context: RequestContextData, callback: () => T): T {
    return this.storage.run(context, callback);
  }

  getContext(): RequestContextData | undefined {
    return this.storage.getStore();
  }

  getRequestId(): string | undefined {
    return this.getContext()?.requestId;
  }

  getCorrelationId(): string | undefined {
    return this.getContext()?.correlationId;
  }

  getEmpresaId(): string | undefined {
    return this.getContext()?.empresaId;
  }

  getUsuarioId(): string | undefined {
    return this.getContext()?.usuarioId;
  }

  getClienteId(): string | undefined {
    return this.getContext()?.clienteId;
  }

  setContextData(data: Partial<RequestContextData>): void {
    const context = this.storage.getStore();

    if (!context) {
      return;
    }

    Object.assign(context, data);
  }
}
