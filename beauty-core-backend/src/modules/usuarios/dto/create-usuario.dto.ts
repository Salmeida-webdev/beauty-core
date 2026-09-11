import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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

export class CreateUsuarioDto {
  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID da empresa vinculada ao usuário. Obrigatório para ADMIN, GERENTE, RECEPCAO e PROFISSIONAL quando criado por SUPER_ADMIN. Não deve ser enviado para SUPER_ADMIN global.',
  })
  @IsOptional()
  @IsUUID()
  empresaId?: string;

  @ApiProperty({
    example: 'Maria Silva',
    description: 'Nome completo do usuário.',
  })
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  nome: string;

  @ApiProperty({
    example: 'maria@beautycore.com',
    description: 'E-mail único usado para login administrativo.',
  })
  @IsEmail()
  @MaxLength(120)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  email: string;

  @ApiPropertyOptional({
    example: '83999999999',
    description: 'Telefone/WhatsApp do usuário.',
  })
  @IsOptional()
  @IsString()
  @Length(8, 20)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  telefone?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.beautycore.com/usuarios/maria.png',
    description: 'URL ou caminho da foto do usuário.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  foto?: string;

  @ApiProperty({
    enum: ADMINISTRATIVE_ROLES,
    example: Role.GERENTE,
    description:
      'Role administrativa do usuário. CLIENTE não deve ser criado pelo módulo Usuarios.',
  })
  @IsIn(ADMINISTRATIVE_ROLES, {
    message:
      'Role inválida para usuário administrativo. Use SUPER_ADMIN, ADMIN, GERENTE, RECEPCAO ou PROFISSIONAL.',
  })
  role: Role;

  @ApiProperty({
    example: 'SenhaForte@123',
    description: 'Senha inicial do usuário.',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(72)
  senha: string;
}
