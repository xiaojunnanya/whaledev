import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';

@Module({
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
