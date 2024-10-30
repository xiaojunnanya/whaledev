import { IsEmail, IsIn, IsNotEmpty } from 'class-validator'
import { codeTypeType } from '../type/index.type'

export class EmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsIn(['register', 'forget'], {
    message: 'type 只能为 register、forget 中的一个',
  })
  type: codeTypeType
}

export class RegisterDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsNotEmpty({ message: '邮箱验证码不能为空' })
  emailCode: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string
}
