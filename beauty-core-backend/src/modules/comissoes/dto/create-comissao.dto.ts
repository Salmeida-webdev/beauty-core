import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsUUID, Max, Min } from 'class-validator';

export class CreateComissaoDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do profissional que receberá a comissão. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O profissionalId deve ser um UUID válido.',
  })
  profissionalId: string;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do agendamento relacionado à comissão. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O agendamentoId deve ser um UUID válido.',
  })
  agendamentoId: string;

  @ApiProperty({
    example: 200,
    description:
      'Valor base do serviço usado para calcular a comissão do profissional.',
    minimum: 0,
  })
  @IsNumber(
    {},
    {
      message: 'O valor do serviço deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O valor do serviço deve ser maior ou igual a 0.',
  })
  valorServico: number;

  @ApiProperty({
    example: 10,
    description:
      'Percentual de comissão aplicado sobre o valor do serviço. Deve estar entre 0 e 100.',
    minimum: 0,
    maximum: 100,
  })
  @IsNumber(
    {},
    {
      message: 'O percentual deve ser um número.',
    },
  )
  @Min(0, {
    message: 'O percentual deve ser maior ou igual a 0.',
  })
  @Max(100, {
    message: 'O percentual deve ser menor ou igual a 100.',
  })
  percentual: number;
}
