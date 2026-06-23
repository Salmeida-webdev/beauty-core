import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

const ADMINISTRATIVE_ROLES = [
  Role.SUPER_ADMIN,
  Role.ADMIN,
  Role.GERENTE,
  Role.RECEPCAO,
  Role.PROFISSIONAL,
] as const;

export class UpdateUsuarioDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID da empresa vinculada ao usuário. Campo sensível. Permitido apenas para SUPER_ADMIN ao mover/criar vínculo de usuário administrativo. Não deve ser usado para SUPER_ADMIN global.',
  })
  @IsOptional()
  @IsUUID()
  empresaId?: string;

  @ApiPropertyOptional({
    example: 'Maria Silva Atualizada',
    description: 'Nome completo do usuário.',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  nome?: string;

  @ApiPropertyOptional({
    example: 'maria.atualizada@beautycore.com',
    description: 'E-mail único usado para login administrativo.',
  })
  @IsOptional()
  @IsEmail()
  @MaxLength(120)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email?: string;

  @ApiPropertyOptional({
    example: '83999999999',
    description: 'Telefone/WhatsApp do usuário.',
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  telefone?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.beautycore.com/usuarios/maria.png',
    description: 'URL ou caminho da foto do usuário.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  foto?: string;

  @ApiPropertyOptional({
    enum: ADMINISTRATIVE_ROLES,
    example: Role.GERENTE,
    description:
      'Role administrativa do usuário. Alteração protegida pela política central de roles.',
  })
  @IsOptional()
  @IsIn(ADMINISTRATIVE_ROLES, {
    message:
      'Role inválida para usuário administrativo. Use SUPER_ADMIN, ADMIN, GERENTE, RECEPCAO ou PROFISSIONAL.',
  })
  role?: Role;

  @ApiPropertyOptional({
    example: 'NovaSenhaForte@123',
    description: 'Nova senha do usuário.',
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  senha?: string;
}