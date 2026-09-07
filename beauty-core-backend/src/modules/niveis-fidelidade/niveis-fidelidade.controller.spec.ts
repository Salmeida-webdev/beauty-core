import { Test, TestingModule } from '@nestjs/testing';
import { NiveisFidelidadeController } from './niveis-fidelidade.controller';

describe('NiveisFidelidadeController', () => {
  let controller: NiveisFidelidadeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NiveisFidelidadeController],
    }).compile();

    controller = module.get<NiveisFidelidadeController>(NiveisFidelidadeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
