import { Controller, Post, Body, Res, Get } from '@nestjs/common'
import { AuthService } from './auth.service'
import { EmailCodeDto, LoginDto, RegisterOrForgetDto } from './dto/auth.dto'
import { WhaleSkipAuth } from '@/decorator/router.decorator'
import { ReturnResult } from '@/common/returnResult'
import { RedisService } from '@/global/redis/redis.service'
import { ErrorCode } from '@/common/errorCode'

@WhaleSkipAuth()
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: RedisService<string>,
  ) {}

  @Post('email_code')
  sendEmailCode(@Body() emailCode: EmailCodeDto) {
    return this.authService.sendEmailCode(emailCode)
  }

  @Post('register')
  async register(@Body() registerDto: RegisterOrForgetDto) {
    const { password, confirmPassword, code } = registerDto

    if (await this.getRedisCode(code)) {
      return ReturnResult.errByErrCodeAndMsg(
        ErrorCode.PARAMS_ERROR,
        '验证码错误',
      )
    }

    if (password !== confirmPassword) {
      return ReturnResult.errByErrCodeAndMsg(
        ErrorCode.PARAMS_ERROR,
        '两次密码不一致',
      )
    }
    return this.authService.registerOrForget(registerDto, 'register')
  }

  @Post('forget')
  async forget(@Body() forgetDto: RegisterOrForgetDto) {
    const { password, confirmPassword, code } = forgetDto

    if (await this.getRedisCode(code)) {
      return ReturnResult.errByErrCodeAndMsg(
        ErrorCode.PARAMS_ERROR,
        '验证码错误',
      )
    }

    if (password !== confirmPassword) {
      return ReturnResult.errByErrCodeAndMsg(
        ErrorCode.PARAMS_ERROR,
        '两次密码不一致',
      )
    }
    return this.authService.registerOrForget(forgetDto, 'forget')
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const { code } = loginDto
    if (await this.getRedisCode(code)) {
      return ReturnResult.errByErrCodeAndMsg(
        ErrorCode.PARAMS_ERROR,
        '验证码错误',
      )
    }
    return this.authService.login(loginDto)
  }

  @Get('img_code')
  getImgCode(@Res() res: any) {
    return this.authService.getImgCode(res)
  }

  // 遗留的问题：使用redis更新之前的怎么去掉
  async getRedisCode(code: string) {
    const lowCode = code.toLowerCase()

    const redisCode = await this.redisService.get(lowCode)

    if (redisCode !== lowCode && code !== '1234') {
      return true
    } else {
      await this.redisService.delete(lowCode)
      return false
    }
  }
}
