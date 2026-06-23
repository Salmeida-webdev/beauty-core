import { Test, TestingModule } from '@nestjs/testing';
import { NiveisFidelidadeService } from './niveis-fidelidade.service';

describe('NiveisFidelidadeService', () => {
  let service: NiveisFidelidadeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NiveisFidelidadeService],
    }).compile();

    service = module.get<NiveisFidelidadeService>(NiveisFidelidadeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
