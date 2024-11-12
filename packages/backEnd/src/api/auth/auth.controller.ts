import { Controller, Post, Body, Res } from '@nestjs/common'
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

  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
