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
  async getPageList(@Query('project_id') project_id: any) {
    return this.pagesService.getPageList(project_id)
  }

  @Post('update')
  async updatePage(@Body() data: updatePageDto) {
    return this.pagesService.updatePage(data)
  }

  @Delete('delete/:id')
  async deletePage(@Param('id') id: string) {
    console.log(id, 'id')
    return this.pagesService.deletePage(id)
  }
}
