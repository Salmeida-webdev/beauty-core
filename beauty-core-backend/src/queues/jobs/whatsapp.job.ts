export interface WhatsappJob {
  empresaId: string;

  telefone?: string;
  destinatario?: string;

  mensagem: string;

  clienteId?: string;
  usuarioId?: string;
  templateId?: string;

  tipo?:
    | 'WHATSAPP'
    | 'LEMBRETE_AGENDAMENTO'
    | 'LEMBRETE_24H'
    | 'LEMBRETE_2H'
    | 'CONFIRMACAO_AGENDAMENTO'
    | 'CAMPANHA_WHATSAPP';

  dataReferencia?: string;

  metadata?: Record<string, any>;
}