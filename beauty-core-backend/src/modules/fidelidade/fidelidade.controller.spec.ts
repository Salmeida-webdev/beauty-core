import { Test, TestingModule } from '@nestjs/testing';
import { FidelidadeController } from './fidelidade.controller';

describe('FidelidadeController', () => {
  let controller: FidelidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FidelidadeController],
    }).compile();

    controller = module.get<FidelidadeController>(FidelidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
