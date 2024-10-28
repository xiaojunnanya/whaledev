import { Inject, Injectable, Logger } from '@nestjs/common'
import { EmailCodeDto } from './dto/auth.dto'
import { createTransport, Transporter } from 'nodemailer'
import * as fs from 'fs'
import * as ejs from 'ejs'
import { AUTHOR, EMAIL_PASS, EMAIL_USER } from '@/config/index.config'
import { Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { codeTypeType } from './type/index.type'

@Injectable()
export class AuthService {
  private readonly transporter: Transporter
  private readonly emailTemplatePath = './public/email.html'
  private readonly validity = 5 // 验证码有效期（分钟）

  constructor(@Inject('PrismaService') private readonly prisma: PrismaClient) {
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

  async sendEmailCodeFun(emailCode: EmailCodeDto, res: Response, code: string) {
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
      Logger.error('发送邮件失败', error)
      res.customResponse({
        code: 200,
        message: '发送邮件失败，请稍后再试',
        data: null,
      })
    }
  }

  async sendAndStorage(data: {
    emailCode: EmailCodeDto
    code: string
    res: Response
    email: string
    type: codeTypeType
  }) {
    const { emailCode, code, res, email, type } = data
    // TODO: 发送验证码并存储到数据库
    await this.sendEmailCodeFun(emailCode, res, code)

    // 存储验证码
    await this.prisma.email_code.create({
      data: {
        email,
        type,
        code,
      },
    })
  }

  async sendEmailCode(emailCode: EmailCodeDto, res: Response) {
    //  生成一个长度为 6 的随机字符串
    const code: string = Math.random().toString().slice(2, 8)
    /**
     * 注册：先判断邮箱是有个人信息（用户信息表查询）
     *  有信息表示注册过，提示当前邮箱已注册，请直接登录
     *  没信息则没有注册过，发送验证码
     *
     * 登录：先判断邮箱是否有个人信息（用户信息表查询）
     *  有信息表示登录过，发送验证码
     *  没有信息表示没有注册过，提示当前邮箱未注册，请先注册
     *
     * 忘记密码：先判断邮箱是否有个人信息（用户信息表查询）
     *  有信息表示注册过，发送验证码
     *  没有信息表示没有注册过，提示当前邮箱未注册，请先注册
     *
     */

    const { type, email } = emailCode

    let returnMessage = '发送成功'

    let isSend = true

    const msg = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    // 遗留的问题：需要修改为redis存储
    if ((type === 'register' && !msg) || (type !== 'register' && msg)) {
      this.sendAndStorage({
        emailCode,
        code,
        res,
        email,
        type,
      })
    } else {
      returnMessage =
        type === 'register'
          ? '当前邮箱已注册，请直接登录'
          : '当前邮箱未注册，请先注册'
      isSend = false
    }

    res.customResponse({
      code: 200,
      message: returnMessage,
      data: isSend ? { code } : null,
    })
  }
}
