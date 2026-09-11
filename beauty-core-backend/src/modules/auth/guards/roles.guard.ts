import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../../../shared/decorators/roles.decorator';

type RolesGuardRequest = {
  user: {
    role: string;
  };
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesPermitidas = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!rolesPermitidas) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RolesGuardRequest>();
    const usuario = request.user;

    return rolesPermitidas.includes(usuario.role);
  }
}
