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

  @Delete('/delete/:project_id')
  deleteProject(@Param('project_id') project_id: string) {
    return this.projectService.deleteProject(project_id)
  }

  @Put('/update/:project_id')
  updateProject(
    @Param('project_id') project_id: string,
    @Body() data: createProjectDto,
  ) {
    return this.projectService.updateProject(project_id, data)
  }

  @Get('/search')
  searchProject(
    @Query('page', ParseIntPipe) page: number = 1,
    @Query('keyword') keyword: string = '',
  ) {
    return this.projectService.searchProject(keyword, page)
  }

  @Get('/detail/:project_id')
  getProjectDetail(@Param('project_id') project_id: string) {
    return this.projectService.getProjectDetail(project_id)
  }
}
