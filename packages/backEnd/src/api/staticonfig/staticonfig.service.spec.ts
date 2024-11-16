import { Test, TestingModule } from '@nestjs/testing';
import { StaticonfigService } from './staticonfig.service';

describe('StaticonfigService', () => {
  let service: StaticonfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StaticonfigService],
    }).compile();

    service = module.get<StaticonfigService>(StaticonfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
