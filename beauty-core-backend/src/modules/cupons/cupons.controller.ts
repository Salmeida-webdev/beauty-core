import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CuponsService } from './cupons.service';

import { CreateCupomDto } from './dto/create-cupom.dto';
import { UpdateCupomDto } from './dto/update-cupom.dto';
import { ValidarCupomDto } from './dto/validar-cupom.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { Roles } from '../../shared/decorators/roles.decorator';

@Controller('cupons')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CuponsController {
  constructor(private readonly cuponsService: CuponsService) {}

  @Post()
  @Roles('ADMIN', 'GERENTE')
  create(@Req() req, @Body() dto: CreateCupomDto) {
    return this.cuponsService.create(req.user.empresaId, dto);
  }

  @Get()
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  findAll(@Req() req) {
    return this.cuponsService.findAll(req.user.empresaId);
  }

  @Get(':id')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  findOne(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.cuponsService.findOne(req.user.empresaId, id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'GERENTE')
  update(
    @Req() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCupomDto,
  ) {
    return this.cuponsService.update(
      req.user.empresaId,
      id,
      dto,
    );
  }

  @Patch(':id/inativar')
  @Roles('ADMIN', 'GERENTE')
  inativar(@Req() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.cuponsService.inativar(
      req.user.empresaId,
      id,
    );
  }

  @Post('validar')
  @Roles('ADMIN', 'GERENTE', 'RECEPCAO', 'PROFISSIONAL')
  validar(
    @Req() req,
    @Body() dto: ValidarCupomDto,
  ) {
    return this.cuponsService.validar(
      req.user.empresaId,
      dto,
    );
  }
}