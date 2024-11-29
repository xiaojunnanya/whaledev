import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { PageJsonService } from './page_json.service'
import { savePageJsonDto } from './dto/page_json.dtp'

@Controller('page_json')
export class PageJsonController {
  constructor(private readonly pageJsonService: PageJsonService) {}

  @Post('save')
  async savePageJson(@Body() data: savePageJsonDto) {
    return this.pageJsonService.savePageJson(data)
  }

  @Get('get')
  async getPageJson(@Query('page_id') page_id: string) {
    return this.pageJsonService.getPageJson(page_id)
  }
}
