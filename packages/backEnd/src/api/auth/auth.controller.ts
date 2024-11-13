import { Controller, Post, Body, Res, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailCodeDto, LoginDto, RegisterOrForgetDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('emailCode')
  sendEmailCode(@Body() emailCode: EmailCodeDto) {
    return this.authService.sendEmailCode(emailCode)
  }

  @Post('register')
  register(@Body() registerDto: RegisterOrForgetDto) {
    return this.authService.registerOrForget(registerDto, 'register')
  }

  @Post('forget')
  forget(@Body() forgetDto: RegisterOrForgetDto) {
    return this.authService.registerOrForget(forgetDto, 'forget')
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Get('imgCode')
  getImgCode(@Res() res: any) {
    return this.authService.getImgCode(res)
  }
}
