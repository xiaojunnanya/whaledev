import { Test, TestingModule } from '@nestjs/testing';
import { StaticonfigController } from './staticonfig.controller';
import { StaticonfigService } from './staticonfig.service';

describe('StaticonfigController', () => {
  let controller: StaticonfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StaticonfigController],
      providers: [StaticonfigService],
    }).compile();

    controller = module.get<StaticonfigController>(StaticonfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
