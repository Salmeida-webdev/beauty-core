import { UnauthorizedException } from '@nestjs/common';

export function getEmpresaId(req: any): string {
  const empresaId = req?.user?.empresaId;

  if (!empresaId) {
    throw new UnauthorizedException('Empresa não identificada no token');
  }

  return empresaId;
}