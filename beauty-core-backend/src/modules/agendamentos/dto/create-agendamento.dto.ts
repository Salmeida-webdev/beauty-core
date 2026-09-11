import { StatusAgendamento } from '@prisma/client';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateAgendamentoDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID da unidade onde o agendamento será realizado. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O unidadeId deve ser um UUID válido.',
  })
  unidadeId: string;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do cliente vinculado ao agendamento. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId: string;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do serviço que será realizado no agendamento. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O servicoId deve ser um UUID válido.',
  })
  servicoId: string;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do profissional responsável pelo atendimento. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O profissionalId deve ser um UUID válido.',
  })
  profissionalId: string;

  @ApiProperty({
    example: '2026-06-14T14:00:00.000Z',
    description: 'Data e hora de início do agendamento em formato ISO 8601.',
  })
  @IsDateString(
    {},
    {
      message: 'A data e hora de início deve estar em formato válido.',
    },
  )
  dataHoraInicio: string;

  @ApiProperty({
    example: '2026-06-14T15:00:00.000Z',
    description: 'Data e hora de fim do agendamento em formato ISO 8601.',
  })
  @IsDateString(
    {},
    {
      message: 'A data e hora de fim deve estar em formato válido.',
    },
  )
  dataHoraFim: string;

  @ApiPropertyOptional({
    example: 'Cliente prefere atendimento no período da tarde.',
    description:
      'Observações opcionais sobre o agendamento, visíveis no painel administrativo.',
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

  @ApiPropertyOptional({
    enum: StatusAgendamento,
    example: Object.values(StatusAgendamento)[0],
    description:
      'Status inicial opcional do agendamento. Os valores disponíveis vêm do enum StatusAgendamento do Prisma.',
  })
  @IsOptional()
  @IsEnum(StatusAgendamento, {
    message: 'O status do agendamento informado é inválido.',
  })
  status?: StatusAgendamento;
}
