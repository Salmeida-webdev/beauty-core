import { Test, TestingModule } from '@nestjs/testing';
import { ClientesPacotesService } from './clientes-pacotes.service';

describe('ClientesPacotesService', () => {
  let service: ClientesPacotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientesPacotesService],
    }).compile();

    service = module.get<ClientesPacotesService>(ClientesPacotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
