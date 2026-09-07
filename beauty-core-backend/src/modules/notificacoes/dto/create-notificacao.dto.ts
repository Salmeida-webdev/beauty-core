import { TipoNotificacao } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNotificacaoDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do usuário que receberá a notificação. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O usuarioId deve ser um UUID válido.',
  })
  usuarioId: string;

  @ApiProperty({
    enum: TipoNotificacao,
    example: Object.values(TipoNotificacao)[0],
    description:
      'Tipo da notificação. Os valores disponíveis vêm do enum TipoNotificacao do Prisma.',
  })
  @IsEnum(TipoNotificacao, {
    message: 'O tipo da notificação informado é inválido.',
  })
  tipo: TipoNotificacao;

  @ApiProperty({
    example: 'Novo agendamento',
    description:
      'Título da notificação exibido ao usuário no painel administrativo.',
    minLength: 2,
    maxLength: 150,
  })
  @IsString({
    message: 'O título da notificação deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'O título da notificação é obrigatório.',
  })
  @MinLength(2, {
    message: 'O título da notificação deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(150, {
    message: 'O título da notificação deve ter no máximo 150 caracteres.',
  })
  titulo: string;

  @ApiProperty({
    example: 'Um novo agendamento foi criado no sistema.',
    description:
      'Mensagem detalhada da notificação exibida ao usuário.',
    minLength: 2,
    maxLength: 500,
  })
  @IsString({
    message: 'A mensagem da notificação deve ser um texto.',
  })
  @IsNotEmpty({
    message: 'A mensagem da notificação é obrigatória.',
  })
  @MinLength(2, {
    message: 'A mensagem da notificação deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(500, {
    message: 'A mensagem da notificação deve ter no máximo 500 caracteres.',
  })
  mensagem: string;
}