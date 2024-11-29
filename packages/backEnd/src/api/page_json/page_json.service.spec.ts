import { Test, TestingModule } from '@nestjs/testing';
import { PageJsonService } from './page_json.service';

describe('PageJsonService', () => {
  let service: PageJsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PageJsonService],
    }).compile();

    service = module.get<PageJsonService>(PageJsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
