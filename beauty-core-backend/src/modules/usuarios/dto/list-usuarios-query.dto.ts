import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsIn, IsOptional } from 'class-validator';

import { PaginationDto } from '../../../shared/dto/pagination.dto';

const ADMINISTRATIVE_USER_ROLES = [
  Role.SUPER_ADMIN,
  Role.ADMIN,
  Role.GERENTE,
  Role.RECEPCAO,
  Role.PROFISSIONAL,
] as const;

export class ListUsuariosQueryDto extends PaginationDto {
  @ApiPropertyOptional({
    enum: ADMINISTRATIVE_USER_ROLES,
    example: Role.PROFISSIONAL,
    description:
      'Filtra usuários administrativos por role. CLIENTE não pertence a este módulo.',
  })
  @IsOptional()
  @IsIn(ADMINISTRATIVE_USER_ROLES, {
    message:
      'Role inválida. Use SUPER_ADMIN, ADMIN, GERENTE, RECEPCAO ou PROFISSIONAL.',
  })
  role?: Role;
}
