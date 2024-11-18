import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { WhaleSkipAuth } from './decorator/router.decorator'

@WhaleSkipAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }
}
