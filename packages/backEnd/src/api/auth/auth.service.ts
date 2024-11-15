import { Inject, Injectable } from '@nestjs/common'
import { EmailCodeDto, LoginDto, RegisterOrForgetDto } from './dto/auth.dto'
import { createTransport, Transporter } from 'nodemailer'
import * as fs from 'fs'
import * as ejs from 'ejs'
import * as svgCaptcha from 'svg-captcha'
import { AUTHOR, EMAIL_PASS, EMAIL_USER } from '@/config'
import Redis from 'ioredis'
import { v4 as uuidv4 } from 'uuid'
import { createResponse } from '@/interceptor/response.interceptor'
import { codeType } from './type/index.type'
import { PrismaService } from '@/db/mysql/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  private readonly transporter: Transporter
  private readonly emailTemplatePath = './public/email.html'
  private readonly validity = 5 // 验证码有效期（分钟）

  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject('RedisService') private readonly redis: Redis,
  ) {
    this.transporter = createTransport({
      host: 'smtp.qq.com', // smtp服务的域名
      port: 587, // smtp服务的端口
      secure: false,
      auth: {
        user: EMAIL_USER, // 你的邮箱地址
        pass: EMAIL_PASS, // 你的授权码
      },
    })
  }

  /**
   * 发送邮件验证码
   * @param emailCode 邮箱信息
   * @param code 验证码
   * @returns
   */
  async sendEmailCodeFun(emailCode: EmailCodeDto, code: string) {
    try {
      const emailTemplate = fs.readFileSync(this.emailTemplatePath, 'utf-8')

      const emailConfig = {
        code,
        validity: this.validity,
        name: AUTHOR.NAME,
      }

      const emailHtml = ejs.render(emailTemplate, emailConfig)

      await this.transporter.sendMail({
        from: {
          name: AUTHOR.PROJECTNAME,
          address: EMAIL_USER,
        },
        to: emailCode.email,
        subject: '注册信息',
        html: emailHtml,
      })
    } catch (error) {
      return createResponse(0, '发送邮件失败，请稍后再试', 'error')
    }
  }

  // 发送验证码
  async sendEmailCode(emailCode: EmailCodeDto) {
    //  生成一个长度为 6 的随机字符串
    const code: string = Math.random().toString().slice(2, 8)
    /**
     * 注册：先判断邮箱是有个人信息（用户信息表查询）
     *  有信息表示注册过，提示当前邮箱已注册，请直接登录
     *  没信息则没有注册过，发送验证码
     *

     * 忘记密码：先判断邮箱是否有个人信息（用户信息表查询）
     *  有信息表示注册过，发送验证码
     *  没有信息表示没有注册过，提示当前邮箱未注册，请先注册
     *
     */

    let returnMsg = '发送成功，请注意查收您的邮箱'
    let isSuccess = true

    const { type, email } = emailCode

    const msg = await this.prisma.findUserByEmail(email)

    if ((type === 'register' && !msg) || (type === 'forget' && msg)) {
      await this.sendEmailCodeFun(emailCode, code)
      await this.redis.setex(email, this.validity * 60, code)
    } else {
      isSuccess = false
      returnMsg =
        type === 'register'
          ? '当前邮箱已注册，请直接登录'
          : '当前邮箱未注册，请先注册'
    }

    return createResponse(0, returnMsg, isSuccess ? 'success' : 'info')
  }

  // 注册和忘记密码
  async registerOrForget(registerDto: RegisterOrForgetDto, type: codeType) {
    const { email, emailCode, password, confirmPassword, code } = registerDto

    const userRes = await this.prisma.user.findUnique({ where: { email } })

    if ((type === 'register' && userRes) || (type === 'forget' && !userRes)) {
      const message =
        type === 'register'
          ? '当前邮箱已注册，请直接登录'
          : '当前邮箱未注册，请先注册'
      return createResponse(0, message, 'info')
    }

    if (password !== confirmPassword)
      return createResponse(0, '两次密码不一致，请确认密码后重试', 'error')

    const redisCode = await this.redis.get(email)
    if (!redisCode)
      return createResponse(0, '验证码不存在或已过期，请重新发送', 'error')

    if (redisCode !== emailCode)
      return createResponse(0, '验证码错误，请重新输入', 'error')

    // 遗留的问题：图形验证码 code 的验证

    let returnMsg = ''
    if (type === 'register') {
      // 注册
      await this.prisma.user.create({
        data: {
          user_id: uuidv4(),
          email,
          password,
        },
      })
      returnMsg = '注册成功'
    } else {
      // 修改密码
      await this.prisma.user.update({
        where: { email },
        data: {
          password,
        },
      })
      returnMsg = '修改密码成功，请返回重新登录'
    }

    // 删除图形验证码
    await this.redis.del(email)

    return createResponse(0, returnMsg, 'success')
  }

  // 登录
  async login(loginDto: LoginDto) {
    const { email, password, code } = loginDto

    const userRes = await this.prisma.user.findUnique({ where: { email } })

    if (!userRes) return createResponse(0, '当前邮箱未注册，请先注册', 'error')

    if (userRes.password !== password)
      return createResponse(0, '密码错误', 'error')

    // 遗留的问题：token无感刷新

    // 遗留的问题：图形验证码 code 的验证

    return createResponse(0, '登录成功', 'success', {
      token: this.jwtService.sign({
        user_id: userRes.user_id,
      }),
      avatar: userRes.avatar,
      status: userRes.status,
      user_id: userRes.user_id,
      username: userRes.username,
    })
  }

  // 返回图形验证码
  async getImgCode(res: any) {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 120, //宽度
      height: 44, //高度
      background: '#0099FF', //背景颜色
    })

    res.type('image/svg+xml')
    res.status(200).send(captcha.data)
  }
}
