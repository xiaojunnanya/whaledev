import { IsEmail, IsIn, IsNotEmpty } from 'class-validator'
import { codeTypeType } from '../type/index.type'

export class EmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string

  @IsIn(['login', 'register', 'forget'], {
    message: 'type 只能为 login、register、forget 中的一个',
  })
  type: codeTypeType
}
