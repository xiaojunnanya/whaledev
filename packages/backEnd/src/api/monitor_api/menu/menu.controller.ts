import { Controller, Post, Body, Get, Query } from '@nestjs/common'
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

  @Get('/menu/list')
  getMenuList() {
    return this.menuService.getMenuList()
  }

  @Get('/user/refresh-permissions')
  refreshPermissions(@Query('refresh_cache') refresh_cache: string) {
    return this.menuService.refreshPermissions()
  }

  @Get('/dashboard')
  dashboard() {
    return this.menuService.dashboard()
  }
}
