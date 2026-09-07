import { Test, TestingModule } from '@nestjs/testing';
import { ClientesPacotesController } from './clientes-pacotes.controller';

describe('ClientesPacotesController', () => {
  let controller: ClientesPacotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientesPacotesController],
    }).compile();

    controller = module.get<ClientesPacotesController>(ClientesPacotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
