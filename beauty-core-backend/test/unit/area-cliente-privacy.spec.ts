import {
  StatusAgendamento,
  TipoMensagemWhatsApp,
  TipoMovimentacaoPontos,
} from '@prisma/client';

import { AreaClienteService } from '../../src/modules/area-cliente/area-cliente.service';

describe('AreaClienteService privacy DTOs', () => {
  const service = Object.create(
    AreaClienteService.prototype,
  ) as AreaClienteService;

  it('serializes appointment fields without exposing tenant and relation ids', () => {
    const dataHoraInicio = new Date('2026-01-01T10:00:00Z');
    const dataHoraFim = new Date('2026-01-01T11:00:00Z');
    const createdAt = new Date('2026-01-01T09:00:00Z');
    const updatedAt = new Date('2026-01-01T09:30:00Z');
    const appointment = {
      id: 'appointment-1',
      empresaId: 'internal-company-id',
      clienteId: 'internal-client-id',
      dataHoraInicio,
      dataHoraFim,
      status: StatusAgendamento.CONFIRMADO,
      observacoes: 'observação',
      servico: { id: 'service-1', nome: 'Corte' },
      profissional: { id: 'professional-1', nome: 'Ana', foto: 'foto' },
      unidade: { id: 'unit-1', nome: 'Centro' },
      createdAt,
      updatedAt,
    };

    const result = service['toPortalAppointment'](appointment);

    expect(result).toEqual({
      id: 'appointment-1',
      dataHoraInicio,
      dataHoraFim,
      status: StatusAgendamento.CONFIRMADO,
      observacoes: 'observação',
      servico: { nome: 'Corte' },
      profissional: { nome: 'Ana', foto: 'foto' },
      unidade: { nome: 'Centro' },
      createdAt,
      updatedAt,
    });
    expect(result).not.toHaveProperty('empresaId');
    expect(result).not.toHaveProperty('clienteId');
    expect(result.servico).not.toHaveProperty('id');
    expect(result.profissional).not.toHaveProperty('id');
    expect(result.unidade).not.toHaveProperty('id');
  });

  it('serializes history records with client fields and without internal data', () => {
    const pointCreatedAt = new Date('2026-02-01T12:00:00Z');
    const point = service['toPortalPointMovement']({
      id: 'movement-1',
      pontos: 10,
      tipo: TipoMovimentacaoPontos.GANHO,
      descricao: 'Bônus',
      createdAt: pointCreatedAt,
    });
    const messageCreatedAt = new Date('2026-02-02T12:00:00Z');
    const messageUpdatedAt = new Date('2026-02-02T12:30:00Z');
    const message = service['toPortalWhatsappMessage']({
      id: 'message-1',
      destinatario: '+5500000000000',
      mensagem: 'Olá',
      tipo: TipoMensagemWhatsApp.SISTEMA,
      status: 'ENVIADA',
      dataEnvio: messageCreatedAt,
      createdAt: messageCreatedAt,
      updatedAt: messageUpdatedAt,
    });

    expect(point).toEqual({
      id: 'movement-1',
      pontos: 10,
      tipo: TipoMovimentacaoPontos.GANHO,
      descricao: 'Bônus',
      createdAt: pointCreatedAt,
    });
    expect(message).toEqual({
      id: 'message-1',
      tipo: TipoMensagemWhatsApp.SISTEMA,
      destinatario: '+5500000000000',
      mensagem: 'Olá',
      status: 'ENVIADA',
      dataEnvio: messageCreatedAt,
      createdAt: messageCreatedAt,
      updatedAt: messageUpdatedAt,
    });
    expect(point).not.toHaveProperty('empresaId');
    expect(point).not.toHaveProperty('clienteId');
    expect(message).not.toHaveProperty('empresaId');
    expect(message).not.toHaveProperty('clienteId');
    expect(message).not.toHaveProperty('erro');
  });
});
