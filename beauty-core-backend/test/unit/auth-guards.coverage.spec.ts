import { ClienteAuthGuard } from '../../src/modules/auth-cliente/guards/cliente-auth.guard';
import { JwtOrClienteAuthGuard } from '../../src/modules/arquivos/guards/jwt-or-cliente-auth.guard';
import { JwtAuthGuard } from '../../src/modules/auth/guards/jwt-auth.guard';

describe('Authentication guards', () => {
  it('exports concrete guards that can be instantiated', () => {
    expect(new JwtAuthGuard()).toBeInstanceOf(JwtAuthGuard);
    expect(new ClienteAuthGuard()).toBeInstanceOf(ClienteAuthGuard);
    expect(new JwtOrClienteAuthGuard()).toBeInstanceOf(JwtOrClienteAuthGuard);
  });
});
