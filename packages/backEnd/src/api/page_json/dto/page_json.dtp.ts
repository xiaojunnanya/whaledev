import { IsNotEmpty } from 'class-validator'

export class savePageJsonDto {
  @IsNotEmpty({ message: 'page_id不能为空' })
  page_id: string

  @IsNotEmpty({ message: 'page_json不能为空' })
  page_json: string
}
