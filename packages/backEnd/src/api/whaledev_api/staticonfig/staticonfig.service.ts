import { ReturnResult } from '@/common/returnResult'
import { Injectable } from '@nestjs/common'

@Injectable()
export class StaticonfigService {
  getProjectType() {
    const data: any = [
      // {
      //   label: '前台项目',
      //   value: 'reception',
      // },
      // {
      //   label: '后台项目',
      //   value: 'backstage',
      // },
      {
        label: '页面',
        value: 'page',
      },
    ]

    return ReturnResult.success('ok', data)
  }

  getProjectStatus() {
    const data: any = [
      {
        label: '进行中',
        value: 'inProgress',
        color: '#0099FF',
      },
      {
        label: '已完成',
        value: 'completed',
        color: '#52C41A',
      },
      {
        label: '已暂停',
        value: 'paused',
        color: '#FAAD14',
      },
      {
        label: '已废弃',
        value: 'obsolete',
        color: '#FF4D4F',
      },
    ]

    return ReturnResult.success('ok', data)
  }
}
