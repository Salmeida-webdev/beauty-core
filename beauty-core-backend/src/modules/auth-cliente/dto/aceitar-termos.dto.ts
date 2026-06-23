import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class AceitarTermosDto {
  @ApiProperty({
    example: true,
    description:
      'Confirmação de aceite dos termos de uso pelo cliente final. Deve ser true para concluir o primeiro acesso.',
  })
  @IsBoolean({
    message: 'O campo aceitouTermos deve ser verdadeiro ou falso.',
  })
  aceitouTermos: boolean;
}