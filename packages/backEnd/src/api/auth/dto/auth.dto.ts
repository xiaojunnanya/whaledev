import { IsEmail, IsIn, IsNotEmpty, MinLength, Validate } from 'class-validator'
import { codeType } from '../type/index.type'
import { PasswordStrengthValidator } from '@/validator/index.validator'

export class EmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsIn(['register', 'forget'], {
    message: 'type 只能为 register、forget 中的一个',
  })
  type: codeType
}

export class RegisterOrForgetDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsNotEmpty({ message: '邮箱验证码不能为空' })
  emailCode: string

  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(8, { message: '密码长度不能小于8位' })
  @Validate(PasswordStrengthValidator, {
    message: '密码必须由数字和字母组成',
  })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string
}

export class LoginDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsNotEmpty({ message: '密码不能为空' })
  password: string

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string
}
