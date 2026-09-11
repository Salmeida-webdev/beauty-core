export const SCHEDULER_TIMEZONE_DEFAULT = 'America/Sao_Paulo';

export const SCHEDULER_ROTINAS = [
  'aniversarios',
  'lembretes_agendamento',
  'pacotes_vencidos',
  'campanhas_agendadas',
  'relatorios_diarios',
  'limpeza_notificacoes',
  'limpeza_auditoria',
  'limpeza_sessoes',
];

export const SchedulerCron = {
  ANIVERSARIOS_DIARIOS: '0 0 8 * * *',
  LEMBRETES_AGENDAMENTO: '0 */30 * * * *',
  PACOTES_VENCIDOS: '0 0 3 * * *',
  CAMPANHAS_AGENDADAS: '0 */15 * * * *',
  RELATORIOS_DIARIOS: '0 0 6 * * *',
  LIMPEZA_NOTIFICACOES: '0 0 2 * * 0',
  LIMPEZA_AUDITORIA: '0 0 3 * * 0',
  LIMPEZA_SESSOES: '0 0 4 * * *',
};
