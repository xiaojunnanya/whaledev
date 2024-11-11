import {
  ValidationArguments,
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
    const hasSymbol = /[^a-zA-Z0-9]/.test(value)

    // 检查是否同时包含字母、数字和符号
    return hasLetter && hasNumber && hasSymbol
  }
}
