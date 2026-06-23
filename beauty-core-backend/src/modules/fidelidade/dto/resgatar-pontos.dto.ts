import { ApiProperty } from '@nestjs/swagger';

import {
  IsInt,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class ResgatarPontosDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do cliente que terá pontos resgatados do saldo de fidelidade. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId: string;

  @ApiProperty({
    example: 100,
    description:
      'Quantidade de pontos que será resgatada do saldo de fidelidade do cliente.',
    minimum: 1,
  })
  @IsInt({
    message: 'Os pontos devem ser um número inteiro.',
  })
  @Min(1, {
    message: 'A quantidade de pontos deve ser no mínimo 1.',
  })
  pontos: number;

  @ApiProperty({
    example: 'Resgate de benefício de fidelidade.',
    description:
      'Descrição ou motivo do resgate de pontos. Usada no histórico de fidelidade do cliente.',
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