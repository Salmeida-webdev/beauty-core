import { ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUnidadeDto {
  @ApiPropertyOptional({
    example: 'Unidade Centro Premium',
    description:
      'Nome atualizado da unidade da empresa. Campo opcional para atualização parcial.',
    minLength: 2,
    maxLength: 120,
  })
  @IsOptional()
  @IsString({
    message: 'O nome da unidade deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome da unidade deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome da unidade deve ter no máximo 120 caracteres.',
  })
  nome?: string;

  @ApiPropertyOptional({
    example: '83999999999',
    description:
      'Telefone atualizado da unidade com DDD. Pode ser usado para contato, WhatsApp e exibição no painel.',
    maxLength: 20,
  })
  @IsOptional()
  @IsString({
    message: 'O telefone da unidade deve ser um texto.',
  })
  @MaxLength(20, {
    message: 'O telefone da unidade deve ter no máximo 20 caracteres.',
  })
  telefone?: string;

  @ApiPropertyOptional({
    example: 'centro@beautycore.com',
    description:
      'E-mail atualizado da unidade. Pode ser usado para contato administrativo, notificações ou identificação interna.',
    maxLength: 150,
  })
  @IsOptional()
  @IsEmail(
    {},
    {
      message: 'O e-mail da unidade informado é inválido.',
    },
  )
  @MaxLength(150, {
    message: 'O e-mail da unidade deve ter no máximo 150 caracteres.',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Rua Principal, 456, Centro, João Pessoa - PB',
    description:
      'Endereço atualizado da unidade. Usado para identificação do local físico de atendimento.',
    maxLength: 255,
  })
  @IsOptional()
  @IsString({
    message: 'O endereço da unidade deve ser um texto.',
  })
  @MaxLength(255, {
    message: 'O endereço da unidade deve ter no máximo 255 caracteres.',
  })
  endereco?: string;
}
