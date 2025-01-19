import { Injectable } from '@nestjs/common'
import { savePageJsonDto } from './dto/page_json.dtp'
import { PrismaService } from '@/global/mysql/prisma.service'
import { StoreService } from '@/global/store/store.service'
import { ReturnResult } from '@/common/returnResult'

@Injectable()
export class PageJsonService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly store: StoreService,
  ) {}

  async savePageJson(data: savePageJsonDto) {
    const { page_id, page_json } = data

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
    const data = await this.prisma.page_json.findUnique({
      where: {
        page_id,
      },
    })

    return ReturnResult.success('查询成功', data)
  }
}
