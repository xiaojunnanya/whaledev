import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator'
import { codeTypeType } from '../type/index.type'
import { PasswordStrengthValidator } from '@/validator/index.validator'

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
  @MinLength(6, { message: '密码长度不能小于6位' })
  @MaxLength(18, { message: '密码长度不能大于18位' })
  @Validate(PasswordStrengthValidator, {
    message: '密码强度不够，请使用字母、数字、符号的组合',
  })
  password: string

  @IsNotEmpty({ message: '确认密码不能为空' })
  confirmPassword: string

  @IsNotEmpty({ message: '验证码不能为空' })
  code: string
}
