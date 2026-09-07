import { AreaClienteService } from '../../src/modules/area-cliente/area-cliente.service';

describe('AreaClienteService privacy DTOs', () => {
  const service = Object.create(AreaClienteService.prototype) as any;

  it('exposes only the portal appointment fields', () => {
    const result = service.toPortalAppointment({
      id: 'appointment-1',
      empresaId: 'internal-company-id',
      clienteId: 'internal-client-id',
      dataHoraInicio: new Date('2026-01-01T10:00:00Z'),
      dataHoraFim: new Date('2026-01-01T11:00:00Z'),
      status: 'CONFIRMADO',
      observacoes: 'observação',
      servico: { id: 'service-1', nome: 'Corte' },
      profissional: { id: 'professional-1', nome: 'Ana', foto: 'foto' },
      unidade: { id: 'unit-1', nome: 'Centro' },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(result).toEqual(expect.objectContaining({
      id: 'appointment-1',
      status: 'CONFIRMADO',
      servico: { nome: 'Corte' },
      profissional: { nome: 'Ana', foto: 'foto' },
      unidade: { nome: 'Centro' },
    }));
    expect(result).not.toHaveProperty('empresaId');
    expect(result).not.toHaveProperty('clienteId');
    expect(result.servico).not.toHaveProperty('id');
    expect(result.profissional).not.toHaveProperty('id');
    expect(result.unidade).not.toHaveProperty('id');
  });

  it('removes tenant and operational fields from history DTOs', () => {
    const point = service.toPortalPointMovement({
      id: 'movement-1',
      empresaId: 'internal-company-id',
      clienteId: 'internal-client-id',
      pontos: 10,
      tipo: 'CREDITO',
      descricao: 'Bônus',
      createdAt: new Date(),
    });
    const message = service.toPortalWhatsappMessage({
      id: 'message-1',
      empresaId: 'internal-company-id',
      clienteId: 'internal-client-id',
      destinatario: '+5500000000000',
      mensagem: 'Olá',
      status: 'ENVIADA',
      erro: 'internal provider error',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    expect(point).not.toHaveProperty('empresaId');
    expect(point).not.toHaveProperty('clienteId');
    expect(message).not.toHaveProperty('empresaId');
    expect(message).not.toHaveProperty('clienteId');
    expect(message).not.toHaveProperty('erro');
  });
});
