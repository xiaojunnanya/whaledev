import { Module } from '@nestjs/common';
import { StaticonfigService } from './staticonfig.service';
import { StaticonfigController } from './staticonfig.controller';

@Module({
  controllers: [StaticonfigController],
  providers: [StaticonfigService],
})
export class StaticonfigModule {}
