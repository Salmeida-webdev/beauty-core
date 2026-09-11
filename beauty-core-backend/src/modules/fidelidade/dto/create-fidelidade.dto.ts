import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class CreateFidelidadeDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do cliente que terá o registro de fidelidade criado. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId: string;
}
