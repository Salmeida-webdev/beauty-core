import { ApiProperty } from '@nestjs/swagger';

export class LgpdClienteExportResponseDto {
  @ApiProperty({
    example: '2026-06-21T14:30:00.000Z',
    description: 'Data/hora em que a exportação LGPD foi gerada.',
  })
  exportadoEm!: string;

  @ApiProperty({
    example: 'clx123clienteid',
    description: 'ID do cliente exportado.',
  })
  clienteId!: string;

  @ApiProperty({
    example: 'clx123empresaid',
    description: 'ID da empresa vinculada ao cliente.',
  })
  empresaId!: string;

  @ApiProperty({
    description: 'Dados cadastrais do cliente.',
    type: Object,
  })
  perfil!: Record<string, unknown>;

  @ApiProperty({
    description: 'Agendamentos vinculados ao cliente.',
    type: [Object],
  })
  agendamentos!: Record<string, unknown>[];

  @ApiProperty({
    description: 'Informações de pontos, fidelidade ou histórico de pontos quando disponíveis.',
    type: Object,
  })
  pontos!: Record<string, unknown>;

  @ApiProperty({
    description: 'Pacotes, sessões ou vínculos comerciais do cliente quando disponíveis.',
    type: Object,
  })
  pacotes!: Record<string, unknown>;

  @ApiProperty({
    description: 'Notificações vinculadas ao cliente.',
    type: [Object],
  })
  notificacoes!: Record<string, unknown>[];

  @ApiProperty({
    description: 'Mensagens WhatsApp vinculadas ao cliente.',
    type: [Object],
  })
  mensagensWhatsApp!: Record<string, unknown>[];
}

export class LgpdAnonimizacaoResponseDto {
  @ApiProperty({
    example: true,
    description: 'Indica se a anonimização foi concluída.',
  })
  success!: boolean;

  @ApiProperty({
    example: 'clx123clienteid',
    description: 'ID técnico preservado do cliente anonimizado.',
  })
  clienteId!: string;

  @ApiProperty({
    example: 'clx123empresaid',
    description: 'ID da empresa vinculada ao cliente.',
  })
  empresaId!: string;

  @ApiProperty({
    example: '2026-06-21T14:30:00.000Z',
    description: 'Data/hora da anonimização.',
  })
  anonimizadoEm!: string;

  @ApiProperty({
    description: 'Campos anonimizados.',
    example: ['nome', 'telefone', 'email'],
  })
  camposAnonimizados!: string[];

  @ApiProperty({
    example: 'Movimentações financeiras e auditoria histórica foram preservadas.',
    description: 'Observação operacional sobre integridade histórica.',
  })
  observacao!: string;
}
