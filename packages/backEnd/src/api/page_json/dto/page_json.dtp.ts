import { IsIn, IsNotEmpty } from 'class-validator'

export class savePageJsonDto {
  @IsNotEmpty({ message: 'page_id不能为空' })
  page_id: string

  @IsNotEmpty({ message: 'page_json不能为空' })
  page_json: string
}

export class UrlInfoDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsIn(['GET', 'POST', 'PUT', 'DELETE'], {
    message: 'method 只能为 GET, POST, PUT, DELETE中的一个',
  })
  method: string

  @IsNotEmpty()
  url: string

  @IsNotEmpty()
  header: { key: string; value: string }[]

  @IsNotEmpty()
  params: { key: string; value: string }[]

  @IsNotEmpty()
  body: { key: string; value: string }[]

  @IsNotEmpty()
  @IsIn(
    [
      'application/json',
      'application/x-www-form-urlencoded',
      'multipart/form-data',
      'text/plain',
      'text/xml',
    ],
    {
      message:
        'Content-Type 只能为 application/json, application/x-www-form-urlencoded, multipart/form-data, text/plain, text/xml中的一个',
    },
  )
  'Content-Type': string

  @IsNotEmpty()
  isCors: boolean

  @IsNotEmpty()
  res: any
}
