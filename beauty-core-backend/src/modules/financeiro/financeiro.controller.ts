import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { FinanceiroService } from './financeiro.service';

import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { RegistrarPagamentoDto } from './dto/registrar-pagamento.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';
import { ListMovimentacoesQueryDto } from './dto/list-movimentacoes-query.dto';
import { getEmpresaId } from '../../shared/utils/get-empresa-id';

@Controller('financeiro')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'GERENTE')
export class FinanceiroController {
  constructor(private readonly financeiroService: FinanceiroService) {}

  @Get('resumo')
  resumo(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.financeiroService.resumo(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('fluxo-caixa')
  fluxoCaixa(
    @Req() req: any,
    @Query('dataInicio') dataInicio?: string,
    @Query('dataFim') dataFim?: string,
  ) {
    return this.financeiroService.fluxoCaixa(
      getEmpresaId(req),
      dataInicio,
      dataFim,
    );
  }

  @Get('receitas-mes')
  receitasMes(@Req() req: any) {
    return this.financeiroService.receitasMes(getEmpresaId(req));
  }

  @Get('despesas-mes')
  despesasMes(@Req() req: any) {
    return this.financeiroService.despesasMes(getEmpresaId(req));
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateMovimentacaoDto) {
    return this.financeiroService.create(getEmpresaId(req), dto);
  }

  @Get()
  findAll(@Req() req: any, @Query() query: ListMovimentacoesQueryDto) {
    return this.financeiroService.findAll(getEmpresaId(req), query);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.financeiroService.findOne(getEmpresaId(req), id);
  }

  @Patch(':id')
  update(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateMovimentacaoDto,
  ) {
    return this.financeiroService.update(getEmpresaId(req), id, dto);
  }

  @Patch(':id/cancelar')
  cancelar(@Req() req: any, @Param('id', ParseUUIDPipe) id: string) {
    return this.financeiroService.cancelar(getEmpresaId(req), id);
  }

  @Patch(':id/pagar')
  pagar(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RegistrarPagamentoDto,
  ) {
    return this.financeiroService.pagar(getEmpresaId(req), id, dto);
  }
}
