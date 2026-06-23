import { FormaPagamento } from '@prisma/client';

import { ApiProperty } from '@nestjs/swagger';

import { IsEnum } from 'class-validator';

export class RegistrarPagamentoDto {
  @ApiProperty({
    enum: FormaPagamento,
    example: Object.values(FormaPagamento)[0],
    description:
      'Forma de pagamento utilizada para registrar a quitação da movimentação financeira. Os valores disponíveis vêm do enum FormaPagamento do Prisma.',
  })
  @IsEnum(FormaPagamento, {
    message: 'A forma de pagamento informada é inválida.',
  })
  formaPagamento: FormaPagamento;
}