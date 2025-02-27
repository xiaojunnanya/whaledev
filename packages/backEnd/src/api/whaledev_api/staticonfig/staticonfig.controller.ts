import { Controller, Get } from '@nestjs/common'
import { StaticonfigService } from './staticonfig.service'
import { WhaleSkipAuth } from '@/decorator/router.decorator'

@Controller('staticonfig')
export class StaticonfigController {
  constructor(private readonly staticonfigService: StaticonfigService) {}

  @WhaleSkipAuth()
  @Get('project_type')
  getProjectType() {
    return this.staticonfigService.getProjectType()
  }

  @WhaleSkipAuth()
  @Get('project_status')
  getProjectStatus() {
    return this.staticonfigService.getProjectStatus()
  }
}
