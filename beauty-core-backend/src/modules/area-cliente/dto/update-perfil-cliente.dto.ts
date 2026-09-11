import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdatePerfilClienteDto {
  @ApiPropertyOptional({
    example: 'Maria Clara Demo',
    description:
      'Nome atualizado do cliente final. Permitido para edição pelo próprio cliente no portal/app.',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O nome deve ser um texto.',
  })
  @Length(2, 120, {
    message: 'O nome deve ter entre 2 e 120 caracteres.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: 'maria.atualizada@email.com',
    description:
      'E-mail atualizado do cliente final. Pode ser usado para contato, relatórios e futuras integrações.',
    maxLength: 150,
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'O e-mail informado é inválido.',
    },
  )
  @MaxLength(150, {
    message: 'O e-mail deve ter no máximo 150 caracteres.',
  })
  email?: string;

  @ApiPropertyOptional({
    example: '1995-08-20',
    description:
      'Data de nascimento do cliente final em formato ISO. Usada para aniversários, campanhas e fidelidade.',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data de nascimento deve ser uma data válida.',
    },
  )
  dataNascimento?: string;

  @ApiPropertyOptional({
    example: '/uploads/clientes/maria-clara.png',
    description:
      'Caminho ou URL atualizada da foto do cliente. Normalmente preenchido após upload de arquivo.',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({
    message: 'A foto deve ser um texto.',
  })
  @MaxLength(255, {
    message: 'A foto deve ter no máximo 255 caracteres.',
  })
  foto?: string;
}
