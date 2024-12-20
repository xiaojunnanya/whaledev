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

  @Delete('delete/:id')
  async deletePage(@Param('id') id: string) {
    return this.pagesService.deletePage(id)
  }

  @Get('/detail/:id')
  getPageDetail(@Param('id') id: string) {
    return this.pagesService.getPageDetail(id)
  }
}
