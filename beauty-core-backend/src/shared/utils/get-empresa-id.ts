import { UnauthorizedException } from '@nestjs/common';

type AuthenticatedEmpresaRequest = {
  user?: {
    empresaId?: string;
    empresa_id?: string;
    id?: string;
  };
};

export function getEmpresaId(req: AuthenticatedEmpresaRequest): string {
  const empresaId = req?.user?.empresaId;

  if (!empresaId) {
    throw new UnauthorizedException('Empresa não identificada no token');
  }

  return empresaId;
}
