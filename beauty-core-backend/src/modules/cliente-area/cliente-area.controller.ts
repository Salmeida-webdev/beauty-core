import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { ClienteAuthGuard } from '../auth-cliente/guards/cliente-auth.guard';
import { ClienteAreaService } from './cliente-area.service';
import { ClienteAreaQueryDto } from './dto/cliente-area-query.dto';

type ClienteAuthUser = {
  sub?: string;
  clienteId?: string;
  empresaId: string;
  telefone?: string;
  role?: 'CLIENTE';
};

type ClienteRequest = Request & {
  user: ClienteAuthUser;
};

@ApiTags('Cliente Area (deprecated)')
@ApiBearerAuth('JWT Cliente')
@UseGuards(ClienteAuthGuard)
@Controller('cliente-area')
export class ClienteAreaController {
  constructor(private readonly clienteAreaService: ClienteAreaService) {}

  private getAuth(req: ClienteRequest) {
    const clienteId = req.user.clienteId ?? req.user.sub;

    return {
      clienteId,
      empresaId: req.user.empresaId,
    };
  }

  @Get('me')
  @ApiOperation({ summary: 'Retorna o perfil público do cliente logado.' })
  me(@Req() req: ClienteRequest) {
    return this.clienteAreaService.me(this.getAuth(req));
  }

  @Get('me/dashboard')
  @ApiOperation({ summary: 'Retorna o dashboard mobile do cliente logado.' })
  dashboard(@Req() req: ClienteRequest) {
    return this.clienteAreaService.dashboard(this.getAuth(req));
  }

  @Get('me/agendamentos')
  @ApiOperation({ summary: 'Lista os agendamentos do cliente logado.' })
  agendamentos(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.agendamentos(this.getAuth(req), query);
  }

  @Get('me/proximos-agendamentos')
  @ApiOperation({ summary: 'Lista os próximos agendamentos do cliente logado.' })
  proximosAgendamentos(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.proximosAgendamentos(
      this.getAuth(req),
      query,
    );
  }

  @Get('me/ultimo-agendamento')
  @ApiOperation({ summary: 'Retorna o último agendamento do cliente logado.' })
  ultimoAgendamento(@Req() req: ClienteRequest) {
    return this.clienteAreaService.ultimoAgendamento(this.getAuth(req));
  }

  @Get('me/fidelidade')
  @ApiOperation({ summary: 'Retorna o resumo de fidelidade do cliente logado.' })
  fidelidade(@Req() req: ClienteRequest) {
    return this.clienteAreaService.fidelidade(this.getAuth(req));
  }

  @Get('me/pontos')
  @ApiOperation({ summary: 'Lista o histórico de pontos do cliente logado.' })
  pontos(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.pontos(this.getAuth(req), query);
  }

  @Get('me/beneficios')
  @ApiOperation({ summary: 'Lista os benefícios disponíveis para o cliente.' })
  beneficios(@Req() req: ClienteRequest) {
    return this.clienteAreaService.beneficios(this.getAuth(req));
  }

  @Get('me/pacotes')
  @ApiOperation({ summary: 'Lista os pacotes do cliente separados por status.' })
  pacotes(@Req() req: ClienteRequest) {
    return this.clienteAreaService.pacotes(this.getAuth(req));
  }

  @Get('me/pacotes/:pacoteId')
  @ApiOperation({ summary: 'Retorna os detalhes de um pacote do cliente.' })
  pacoteDetalhes(
    @Req() req: ClienteRequest,
    @Param('pacoteId') pacoteId: string,
  ) {
    return this.clienteAreaService.pacoteDetalhes(
      this.getAuth(req),
      pacoteId,
    );
  }

  @Get('me/notificacoes')
  @ApiOperation({ summary: 'Lista as notificações do cliente logado.' })
  notificacoes(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.notificacoes(this.getAuth(req), query);
  }

  @Get('me/notificacoes/nao-lidas')
  @ApiOperation({ summary: 'Lista as notificações não lidas do cliente.' })
  notificacoesNaoLidas(@Req() req: ClienteRequest) {
    return this.clienteAreaService.notificacoesNaoLidas(this.getAuth(req));
  }

  @Patch('me/notificacoes/:id/lida')
  @ApiOperation({ summary: 'Marca uma notificação do cliente como lida.' })
  marcarNotificacaoComoLida(
    @Req() req: ClienteRequest,
    @Param('id') id: string,
  ) {
    return this.clienteAreaService.marcarNotificacaoComoLida(
      this.getAuth(req),
      id,
    );
  }

  @Get('me/mensagens-whatsapp')
  @ApiOperation({ summary: 'Lista o histórico de mensagens WhatsApp do cliente.' })
  mensagensWhatsapp(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.mensagensWhatsapp(this.getAuth(req), query);
  }

  @Get('me/historico')
  @ApiOperation({ summary: 'Retorna o histórico consolidado do cliente.' })
  historico(
    @Req() req: ClienteRequest,
    @Query() query: ClienteAreaQueryDto,
  ) {
    return this.clienteAreaService.historico(this.getAuth(req), query);
  }
}
