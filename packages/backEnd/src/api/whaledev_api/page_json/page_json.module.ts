import { Module } from '@nestjs/common';
import { PageJsonService } from './page_json.service';
import { PageJsonController } from './page_json.controller';

@Module({
  controllers: [PageJsonController],
  providers: [PageJsonService],
})
export class PageJsonModule {}
