import { IsArray, ValidateNested, IsNotEmpty, IsIn } from 'class-validator'
import { Type } from 'class-transformer'

// 定义单个消息对象的 DTO
export class MessageItemDto {
  @IsNotEmpty({ message: 'content不能为空' })
  content: string

  @IsNotEmpty({ message: 'role不能为空' })
  @IsIn(['function', 'developer', 'system', 'user', 'assistant', 'tool'], {
    message:
      'role 只能为 function, developer, system, user, assistant, tool 中的一个',
  })
  role: 'function' | 'developer' | 'system' | 'user' | 'assistant' | 'tool'

  extra?: {
    path: any
  }
}

// 定义主 DTO，包含消息数组
export class MessagesDto {
  @IsArray()
  @ValidateNested({ each: true }) // 验证数组中的每个元素
  @Type(() => MessageItemDto) // 指定数组中每个元素的类型
  messages: MessageItemDto[]
}
