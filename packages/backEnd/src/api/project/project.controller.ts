import { Body, Controller, Get, Post } from '@nestjs/common'
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
  getProjectList() {
    return this.projectService.getProjectList()
  }
}
