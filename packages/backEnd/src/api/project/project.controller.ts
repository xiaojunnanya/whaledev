import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { createProjectDto } from './dto/project.dto'

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  createProject(@Body() data: createProjectDto) {
    return this.projectService.createProject(data)
  }

  @Get('list')
  getProjectList(@Query('page', ParseIntPipe) page: number = 1) {
    return this.projectService.getProjectList(page)
  }

  @Delete('/delete/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.deleteProject(id)
  }

  @Put('/update/:id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: createProjectDto,
  ) {
    return this.projectService.updateProject(id, data)
  }

  @Get('/search')
  searchProject(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('keyword') keyword: string = '',
  ) {
    return this.projectService.searchProject(keyword, page)
  }
}
