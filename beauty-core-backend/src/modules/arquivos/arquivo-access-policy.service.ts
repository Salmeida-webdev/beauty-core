import { ForbiddenException, Injectable } from '@nestjs/common';
import { Arquivo } from '@prisma/client';

interface AuthenticatedFileUser {
  sub?: string;
  id?: string;
  usuarioId?: string;
  clienteId?: string;
  empresaId?: string;
  role?: string;
}

@Injectable()
export class ArquivoAccessPolicyService {
  assertCanAccess(user: AuthenticatedFileUser, arquivo: Arquivo): void {
    if (!user) {
      throw new ForbiddenException('Usuário não autenticado.');
    }

    if (!user.empresaId) {
      throw new ForbiddenException('Empresa não identificada no token.');
    }

    if (user.empresaId !== arquivo.empresaId) {
      throw new ForbiddenException('Arquivo pertence a outra empresa.');
    }

    if (user.role === 'ADMIN' || user.role === 'GERENTE') {
      return;
    }

    if (user.role === 'RECEPCAO') {
      return;
    }

    if (user.role === 'PROFISSIONAL') {
      const usuarioId = user.usuarioId || user.sub || user.id;

      if (arquivo.usuarioId && arquivo.usuarioId === usuarioId) {
        return;
      }

      throw new ForbiddenException(
        'Profissional não tem permissão para acessar este arquivo.',
      );
    }

    if (user.role === 'CLIENTE') {
      const clienteId = user.clienteId || user.sub || user.id;

      if (arquivo.clienteId && arquivo.clienteId === clienteId) {
        return;
      }

      throw new ForbiddenException(
        'Cliente não tem permissão para acessar este arquivo.',
      );
    }

    throw new ForbiddenException(
      'Permissão insuficiente para acessar arquivo.',
    );
  }
}
