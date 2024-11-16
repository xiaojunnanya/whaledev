import { IsIn, IsNotEmpty, MaxLength } from 'class-validator'

export class createProjectDto {
  @MaxLength(10, { message: '项目名称不能超过10个字符' })
  @IsNotEmpty({ message: '项目名称不能为空' })
  project_name: string

  @MaxLength(99, { message: '项目描述不能超过99个字符' })
  project_desc?: string

  @IsNotEmpty({ message: '项目类型不能为空' })
  @IsIn(['register', 'forget'], {
    message: 'project_type 只能为 reception、backstage 中的一个',
  })
  project_type: 'reception' | 'backstage'

  @IsIn(['inProgress', 'completed', 'paused', 'obsolete'], {
    message:
      'project_state 只能为 inProgress、completed、paused、obsolete 中的一个',
  })
  @IsNotEmpty({ message: '项目状态不能为空' })
  project_state: 'inProgress' | 'completed' | 'paused' | 'obsolete'
}
