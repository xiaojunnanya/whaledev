import { Injectable } from '@nestjs/common'
import { savePageJsonDto, UrlInfoDto } from './dto/page_json.dtp'
import { PrismaService } from '@/global/prisma/prisma.service'
import { StoreService } from '@/global/store/store.service'
import { ReturnResult } from '@/common/returnResult'
import { ErrorCode } from '@/common/errorCode'
import { AxiosService } from '@/global/axios/axios.service'

@Injectable()
export class PageJsonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly store: StoreService,
    private readonly httpService: AxiosService,
  ) {}

  async savePageJson(data: savePageJsonDto) {
    const { page_id, page_json } = data

    const result = await this.checkPermission(page_id)

    if (result !== 'ok') return result

    // 先查询是否有这个page_id，upsert没有则创建，有则更新
    await this.prisma.page_json.upsert({
      where: {
        page_id,
      },
      update: {
        page_json,
      },
      create: {
        page_id,
        page_json,
      },
    })

    return ReturnResult.success('保存成功')
  }

  async getPageJson(page_id: string) {
    const result = await this.checkPermission(page_id)

    if (result !== 'ok') return result

    const data = await this.prisma.page_json.findUnique({
      where: {
        page_id,
      },
    })

    return ReturnResult.success('查询成功', data)
  }

  // 校验权限
  async checkPermission(page_id: string) {
    const user_id = this.store.get('user_id')

    const page = await this.prisma.pages.findUnique({
      where: { page_id },
      select: { project_id: true },
    })

    if (!page)
      return ReturnResult.errByErrCodeAndMsg(
        ErrorCode.NOT_FOUND_ERROR,
        '页面不存在',
      )

    const project = await this.prisma.project.findUnique({
      where: {
        project_id: page.project_id,
        user_id,
      },
      select: { user_id: true },
    })

    if (!project) {
      return ReturnResult.errByErrCode(ErrorCode.NO_AUTH_ERROR)
    }

    return 'ok'
  }

  async savePreviewData(data: UrlInfoDto) {
    const { url, params, method, res, header, body, isCors } = data
    const contentType = data['Content-Type']

    // 处理 params ,将 params 转换成 {a:2,b:''} 的形式
    const paramsData = arrToObj(params)
    const headerData = arrToObj(header)
    const bodyData = arrToObj(body)

    let retRes = null

    switch (method) {
      case 'GET':
        retRes = await this.httpService.get(url, paramsData)
        break
      // case 'POST':
      //   retRes = await this.httpService.post(url, paramsData)
      //   break
      // case 'PUT':
      //   retRes = await this.httpService.put(url, paramsData)
      //   break
      // case 'DELETE':
      //   retRes = await this.httpService.delete(url, paramsData)
      //   break
    }

    // 对res进行处理：默认接口获取的数据就是data
    const spt: string = res === 'data' ? '' : res.replace('data.', '')
    const sptData = !spt ? [] : spt.split('.')

    for (const item of sptData) {
      if (retRes?.[item as keyof typeof retRes]) {
        retRes = retRes?.[item as keyof typeof retRes]
      } else {
        retRes = null
      }
    }

    return ReturnResult.success('保存成功', retRes)
  }
}

function arrToObj(arr: { key: string; value: any }[]) {
  return arr.reduce<{ [key: string]: any }>((acc, { key, value }) => {
    acc[key] = value
    return acc
  }, {})
}
