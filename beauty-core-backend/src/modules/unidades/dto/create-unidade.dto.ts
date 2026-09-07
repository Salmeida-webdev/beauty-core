import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUnidadeDto {
  @ApiProperty({
    example: 'Unidade Centro',
    description:
      'Nome da unidade da empresa. Usado para identificar filiais, locais de atendimento ou pontos físicos da operação.',
    minLength: 2,
    maxLength: 120,
  })
  @IsString({
    message: 'O nome da unidade deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome da unidade deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome da unidade deve ter no máximo 120 caracteres.',
  })
  nome: string;

  @ApiPropertyOptional({
    example: '83999999999',
    description:
      'Telefone opcional da unidade com DDD. Pode ser usado para contato, WhatsApp e exibição no painel.',
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
      'E-mail opcional da unidade. Pode ser usado para contato administrativo, notificações ou identificação interna.',
    maxLength: 150,
  })
  @IsOptional()
  @IsEmail({}, {
    message: 'O e-mail da unidade informado é inválido.',
  })
  @MaxLength(150, {
    message: 'O e-mail da unidade deve ter no máximo 150 caracteres.',
  })
  email?: string;

  @ApiPropertyOptional({
    example: 'Rua Principal, 123, Centro, João Pessoa - PB',
    description:
      'Endereço opcional da unidade. Usado para identificação do local físico de atendimento.',
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