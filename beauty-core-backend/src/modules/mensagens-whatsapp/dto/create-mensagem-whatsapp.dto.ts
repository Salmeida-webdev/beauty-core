import { TipoMensagemWhatsApp } from '@prisma/client';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMensagemWhatsAppDto {
  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do cliente relacionado à mensagem de WhatsApp. Deve pertencer à empresa autenticada quando informado.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do usuário administrativo relacionado à mensagem de WhatsApp.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O usuarioId deve ser um UUID válido.',
  })
  usuarioId?: string;

  @ApiPropertyOptional({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID opcional do template de WhatsApp utilizado para gerar a mensagem.',
  })
  @IsOptional()
  @IsUUID('4', {
    message: 'O templateId deve ser um UUID válido.',
  })
  templateId?: string;

  @ApiProperty({
    enum: TipoMensagemWhatsApp,
    example: Object.values(TipoMensagemWhatsApp)[0],
    description:
      'Tipo da mensagem de WhatsApp. Os valores disponíveis vêm do enum TipoMensagemWhatsApp do Prisma.',
  })
  @IsEnum(TipoMensagemWhatsApp, {
    message: 'O tipo da mensagem de WhatsApp informado é inválido.',
  })
  tipo: TipoMensagemWhatsApp;

  @ApiProperty({
    example: '83999999999',
    description:
      'Número do destinatário da mensagem com DDD. Usado para envio via WhatsApp e histórico de comunicação.',
    minLength: 10,
    maxLength: 15,
  })
  @IsString({
    message: 'O destinatário deve ser um texto.',
  })
  @Length(10, 15, {
    message: 'O destinatário deve ter entre 10 e 15 caracteres.',
  })
  destinatario: string;

  @ApiProperty({
    example: 'Olá! Seu agendamento está confirmado para amanhã às 14h.',
    description:
      'Conteúdo da mensagem de WhatsApp que será registrada ou enviada.',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString({
    message: 'A mensagem deve ser um texto.',
  })
  @MinLength(1, {
    message: 'A mensagem deve ter no mínimo 1 caractere.',
  })
  @MaxLength(1000, {
    message: 'A mensagem deve ter no máximo 1000 caracteres.',
  })
  mensagem: string;
}
