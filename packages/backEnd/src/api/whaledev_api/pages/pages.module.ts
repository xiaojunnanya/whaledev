import { Module } from '@nestjs/common'
import { PagesService } from './pages.service'
import { PagesController } from './pages.controller'
import { PageJsonModule } from '../page_json/page_json.module'

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  imports: [PageJsonModule],
})
export class PagesModule {}
