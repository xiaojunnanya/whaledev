import { Injectable, Logger } from '@nestjs/common';
import { EmailCodeDto } from './dto/auth.dto';
import { createTransport, Transporter } from 'nodemailer';
import * as path from 'path';
import * as fs from 'fs';
import * as ejs from 'ejs';
import { AUTHOR, EMAIL_PASS, EMAIL_USER } from '@/config';

@Injectable()
export class AuthService {
  private readonly transporter: Transporter;
  private readonly emailTemplatePath = path.join(
    __dirname,
    '../../../public/email.html',
  );
  private readonly validity = 5; // 验证码有效期（分钟）

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com', // smtp服务的域名
      port: 587, // smtp服务的端口
      secure: false,
      auth: {
        user: EMAIL_USER, // 你的邮箱地址
        pass: EMAIL_PASS, // 你的授权码
      },
    });
  }

  async sendEmailCode(emailCode: EmailCodeDto) {
    // 生成一个长度为 6 的随机字符串
    const code: string = Math.random().toString().slice(2, 8);

    try {
      const emailTemplate = fs.readFileSync(this.emailTemplatePath, 'utf-8');

      const emailConfig = {
        code,
        validity: this.validity,
        name: AUTHOR.NAME,
      };

      const emailHtml = ejs.render(emailTemplate, emailConfig);

      await this.transporter.sendMail({
        from: {
          name: AUTHOR.PROJECTNAME,
          address: EMAIL_USER,
        },
        to: emailCode.email,
        subject: '注册信息',
        html: emailHtml,
      });
    } catch (error) {
      Logger.error('发送邮件失败', error);
    }

    return `This action sends email code to ${emailCode.email}`;
  }

  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
