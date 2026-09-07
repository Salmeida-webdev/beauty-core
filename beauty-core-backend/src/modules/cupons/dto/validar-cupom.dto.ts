import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class ValidarCupomDto {
  @ApiProperty({
    example: 'BEAUTY20',
    description:
      'Código do cupom que será validado dentro do contexto da empresa autenticada.',
    minLength: 2,
    maxLength: 40,
  })
  @IsString({
    message: 'O código do cupom deve ser um texto.',
  })
  @MinLength(2, {
    message: 'O código do cupom deve ter no mínimo 2 caracteres.',
  })
  @MaxLength(40, {
    message: 'O código do cupom deve ter no máximo 40 caracteres.',
  })
  codigo: string;
}