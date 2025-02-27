import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common'
import { PagesService } from './pages.service'
import { createPageDto, updatePageDto } from './dto/pages.dto'

@Controller('pages')
export class PagesController {
  constructor(private readonly pagesService: PagesService) {}

  @Post('create')
  async createPage(@Body() data: createPageDto) {
    return this.pagesService.createPage(data)
  }

  @Get('list')
  async getPageList(@Query('project_id') project_id: string) {
    return this.pagesService.getPageList(project_id)
  }

  @Post('update')
  async updatePage(@Body() data: updatePageDto) {
    return this.pagesService.updatePage(data)
  }

  @Delete('delete/:page_id')
  async deletePage(@Param('page_id') page_id: string) {
    return this.pagesService.deletePage(page_id)
  }

  @Get('/detail/:project_id/:page_id')
  getPageDetail(
    @Param('project_id') project_id: string,
    @Param('page_id') page_id: string,
  ) {
    return this.pagesService.getPageDetail(project_id, page_id)
  }
}
