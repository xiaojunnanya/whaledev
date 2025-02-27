import { Controller, Post, Body } from '@nestjs/common'
import { MenuService } from './menu.service'
import { LoginDto } from './dto/menu.dto'
import { WhaleSkipAuth } from '@/decorator/router.decorator'

@WhaleSkipAuth()
@Controller('')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('/user/login')
  login(@Body() loginDto: LoginDto) {
    return this.menuService.login(loginDto)
  }
}
