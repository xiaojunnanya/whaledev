import { Controller, Get } from '@nestjs/common'
import { StaticonfigService } from './staticonfig.service'

@Controller('staticonfig')
export class StaticonfigController {
  constructor(private readonly staticonfigService: StaticonfigService) {}

  @Get('/project_type')
  getProjectType() {
    return this.staticonfigService.getProjectType()
  }
}
