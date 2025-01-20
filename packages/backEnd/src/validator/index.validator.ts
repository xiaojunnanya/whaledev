import { BadRequestException, ValidationPipe } from '@nestjs/common'
import {
  ValidationArguments,
  ValidationError,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

// 校验密码强度
@ValidatorConstraint()
export class PasswordStrengthValidator implements ValidatorConstraintInterface {
  validate(value: string, validationArguments: ValidationArguments) {
    // 正则表达式：至少包含一个字母、一个数字和一个符号
    const hasLetter = /[a-zA-Z]/.test(value)
    const hasNumber = /[0-9]/.test(value)

    // 检查是否同时包含字母、数字
    return hasLetter && hasNumber
  }
}

export const CustomValidationPipe = new ValidationPipe({
  exceptionFactory: (errors: ValidationError[]) => {
    // 自定义错误格式
    const error = errors.map(error => error.constraints || {})

    const result = error.map(obj => Object.values(obj).join(', ')).join(', ')
    console.log(result)
    return new BadRequestException({
      message: result,
      errors: error,
      type: 'ValidatorError',
    })
  },
})
