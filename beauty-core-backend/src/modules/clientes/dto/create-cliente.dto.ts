import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClienteDto {
  @ApiProperty({
    example: 'Maria Silva',
    description:
      'Nome completo do cliente. Usado no cadastro, agendamentos, fidelidade, histórico e área do cliente.',
    minLength: 2,
    maxLength: 120,
  })
  @IsString({
    message: 'O nome deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome deve ter no máximo 120 caracteres.',
  })
  nome: string;

  @ApiProperty({
    example: '83999999999',
    description:
      'Telefone do cliente com DDD. Usado para contato, WhatsApp, autenticação OTP e identificação do cliente.',
    minLength: 10,
    maxLength: 15,
  })
  @IsString({
    message: 'O telefone deve ser um texto.',
  })
  @Length(10, 15, {
    message: 'O telefone deve ter entre 10 e 15 caracteres.',
  })
  telefone: string;

  @ApiPropertyOptional({
    example: 'maria@email.com',
    description:
      'E-mail opcional do cliente. Pode ser usado para contato, relatórios e futuras integrações.',
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
    example: '/uploads/clientes/maria-silva.png',
    description:
      'Caminho ou URL opcional da foto do cliente. Normalmente preenchido após upload de arquivo.',
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

  @ApiPropertyOptional({
    example: '1995-05-20',
    description:
      'Data de nascimento do cliente em formato ISO. Usada para aniversários, campanhas, fidelidade e automações.',
  })
  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'A data de nascimento deve estar em formato de data válido.',
    },
  )
  dataNascimento?: string;

  @ApiPropertyOptional({
    example: 'Cliente prefere atendimento no período da tarde.',
    description:
      'Observações internas opcionais sobre o cliente, visíveis no painel administrativo.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({
    message: 'As observações devem ser um texto.',
  })
  @MaxLength(500, {
    message: 'As observações devem ter no máximo 500 caracteres.',
  })
  observacoes?: string;
}
