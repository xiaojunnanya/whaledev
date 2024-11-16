import { customResponse } from '@/interceptor/response.interceptor'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StaticonfigService {
  getProjectType() {
    const data: any = [
      {
        lable: '前台项目',
        value: 'reception',
      },
      {
        lable: '后台项目',
        value: 'backstage',
      },
    ]

    return customResponse(0, 'ok', 'success', { data })
  }
}
