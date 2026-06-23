import { ApiProperty } from '@nestjs/swagger';

import {
  IsNumber,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class PontuarPorValorDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do cliente que receberá pontos com base no valor gasto. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId: string;

  @ApiProperty({
    example: 200,
    description:
      'Valor gasto pelo cliente que será convertido em pontos conforme a configuração de fidelidade da empresa.',
    minimum: 0.01,
  })
  @IsNumber({}, {
    message: 'O valor gasto deve ser um número.',
  })
  @Min(0.01, {
    message: 'O valor gasto deve ser maior ou igual a 0.01.',
  })
  valorGasto: number;

  @ApiProperty({
    example: 'Pontuação gerada por compra de procedimento estético.',
    description:
      'Descrição ou motivo da pontuação por valor gasto. Usada no histórico de fidelidade do cliente.',
    maxLength: 255,
  })
  @IsString({
    message: 'A descrição deve ser um texto.',
  })
  @MaxLength(255, {
    message: 'A descrição deve ter no máximo 255 caracteres.',
  })
  descricao: string;
}