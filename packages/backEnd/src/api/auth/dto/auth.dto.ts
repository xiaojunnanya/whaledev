import { IsEmail, IsIn, IsNotEmpty } from 'class-validator';

export class EmailCodeDto {
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsNotEmpty({ message: '邮箱不能为空' })
  email: string;

  @IsIn(['login', 'register', 'forgot'], {
    message: 'type 只能为 login、register、forgot 中的一个',
  })
  type: 'login' | 'register' | 'forgot';
}
