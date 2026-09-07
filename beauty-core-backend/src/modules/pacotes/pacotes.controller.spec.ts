import { Test, TestingModule } from '@nestjs/testing';
import { PacotesController } from './pacotes.controller';

describe('PacotesController', () => {
  let controller: PacotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacotesController],
    }).compile();

    controller = module.get<PacotesController>(PacotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
