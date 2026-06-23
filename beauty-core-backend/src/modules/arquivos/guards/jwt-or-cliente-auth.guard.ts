import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOrClienteAuthGuard extends AuthGuard(['jwt', 'cliente-jwt']) {}
