import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class CreateClientePacoteDto {
  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do cliente que receberá o pacote. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O clienteId deve ser um UUID válido.',
  })
  clienteId: string;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440000',
    description:
      'ID do pacote que será vinculado ao cliente. Deve pertencer à empresa autenticada.',
  })
  @IsUUID('4', {
    message: 'O pacoteId deve ser um UUID válido.',
  })
  pacoteId: string;
}
