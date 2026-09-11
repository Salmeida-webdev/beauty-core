import { TipoMensagemWhatsApp } from '@prisma/client';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCampanhaWhatsAppDto {
  @ApiProperty({
    example: 'Campanha de Retorno',
    description:
      'Nome da campanha de WhatsApp. Usado para identificação administrativa no painel.',
  })
  @IsString({
    message: 'O nome da campanha deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O nome da campanha é obrigatório.',
  })
  nome: string;

  @ApiPropertyOptional({
    example: 'Campanha para clientes que não agendam há mais de 30 dias.',
    description:
      'Descrição opcional da campanha de WhatsApp, usada para organização interna.',
  })
  @IsOptional()
  @IsString({
    message: 'A descrição da campanha deve ser um texto.',
  })
  descricao?: string;

  @ApiProperty({
    enum: TipoMensagemWhatsApp,
    example: Object.values(TipoMensagemWhatsApp)[0],
    description:
      'Tipo da mensagem de WhatsApp utilizada na campanha. Os valores disponíveis vêm do enum TipoMensagemWhatsApp do Prisma.',
  })
  @IsEnum(TipoMensagemWhatsApp, {
    message: 'O tipo da mensagem de WhatsApp informado é inválido.',
  })
  tipo: TipoMensagemWhatsApp;

  @ApiProperty({
    example:
      'Olá! Temos uma condição especial para você voltar a cuidar da sua beleza conosco.',
    description: 'Conteúdo da mensagem que será usada na campanha de WhatsApp.',
  })
  @IsString({
    message: 'A mensagem da campanha deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A mensagem da campanha é obrigatória.',
  })
  mensagem: string;

  @ApiPropertyOptional({
    example: 250,
    description:
      'Quantidade total opcional de destinatários previstos para a campanha.',
  })
  @IsOptional()
  @IsInt({
    message: 'O total de destinatários deve ser um número inteiro.',
  })
  totalDestinatarios?: number;
}
