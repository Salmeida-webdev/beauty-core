import { TipoMensagemWhatsApp } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

import {
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTemplateWhatsAppDto {
  @ApiProperty({
    example: 'Lembrete de Agendamento',
    description:
      'Nome interno do template de WhatsApp. Usado para identificação administrativa no painel.',
    minLength: 2,
    maxLength: 120,
  })
  @IsString({
    message: 'O nome do template deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O nome do template deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(120, {
    message: 'O nome do template deve ter no máximo 120 caracteres.',
  })
  nome: string;

  @ApiProperty({
    enum: TipoMensagemWhatsApp,
    example: Object.values(TipoMensagemWhatsApp)[0],
    description:
      'Tipo do template de WhatsApp. Os valores disponíveis vêm do enum TipoMensagemWhatsApp do Prisma.',
  })
  @IsEnum(TipoMensagemWhatsApp, {
    message: 'O tipo do template de WhatsApp informado é inválido.',
  })
  tipo: TipoMensagemWhatsApp;

  @ApiProperty({
    example: 'Confirmação de agendamento',
    description:
      'Título do template de WhatsApp. Usado para identificação resumida da finalidade da mensagem.',
    minLength: 2,
    maxLength: 150,
  })
  @IsString({
    message: 'O título do template deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O título do template deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(150, {
    message: 'O título do template deve ter no máximo 150 caracteres.',
  })
  titulo: string;

  @ApiProperty({
    example:
      'Olá, {{clienteNome}}! Seu agendamento está confirmado para {{data}} às {{hora}}.',
    description:
      'Conteúdo do template de WhatsApp. Pode conter variáveis textuais para substituição futura, como nome do cliente, data, horário ou serviço.',
    minLength: 1,
    maxLength: 1000,
  })
  @IsString({
    message: 'A mensagem do template deve ser um texto.',
  })
  @MinLength(1, {
    message: 'A mensagem do template deve ter no mínimo 1 caractere.',
  })
  @MaxLength(1000, {
    message: 'A mensagem do template deve ter no máximo 1000 caracteres.',
  })
  mensagem: string;
}