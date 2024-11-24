import { IsIn, IsNotEmpty, MaxLength } from 'class-validator'

export class createPageDto {
  @MaxLength(10, { message: '页面名称不能超过10个字符' })
  @IsNotEmpty({ message: '页面名称不能为空' })
  page_name: string

  @IsIn(['custom', 'template', 'flow'], {
    message: 'page_type 只能为 custom、template、flow中的一个',
  })
  @IsNotEmpty({ message: '页面类型不能为空' })
  page_type: 'custom' | 'template' | 'flow'

  @IsNotEmpty({ message: '项目id不能为空' })
  project_id: string
}

export class updatePageDto {
  @MaxLength(10, { message: '页面名称不能超过10个字符' })
  @IsNotEmpty({ message: '页面名称不能为空' })
  page_name: string

  @IsNotEmpty({ message: '页面id不能为空' })
  page_id: string
}
