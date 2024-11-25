import { PrismaService } from '@/global/mysql/prisma.service'
import { StoreService } from '@/global/store/store.service'
import { Injectable } from '@nestjs/common'
import { createPageDto, updatePageDto } from './dto/pages.dto'
import { v4 as uuidv4 } from 'uuid'
import { customResponse } from '@/interceptor/response.interceptor'

@Injectable()
export class PagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly store: StoreService,
  ) {}

  private readonly selectData = {
    id: true,
    page_id: true,
    page_name: true,
    page_type: true,
  }

  async createPage(data: createPageDto) {
    const u = uuidv4()
    const page_id = `page${u.split('-')[0]}`
    const { page_name, project_id, page_type } = data
    await this.prisma.pages.create({
      data: {
        page_name,
        project_id,
        page_type,
        page_id,
      },
    })

    return customResponse(0, '创建成功', 'success')
  }

  async getPageList(project_id: string) {
    const list = await this.prisma.pages.findMany({
      where: {
        project: {
          user_id: this.store.get('user_id'),
        },
        project_id,
        status: 0,
      },
      select: this.selectData,
    })

    return customResponse(0, '获取成功', 'success', list)
  }

  async updatePage(data: updatePageDto) {
    const { page_id, page_name } = data
    await this.prisma.pages.update({
      where: {
        project: {
          user_id: this.store.get('user_id'),
        },
        status: 0,
        page_id,
      },
      data: {
        page_name,
      },
    })

    return customResponse(0, '更新成功', 'success')
  }

  async deletePage(page_id: string) {
    await this.prisma.pages.update({
      where: {
        project: {
          user_id: this.store.get('user_id'),
        },
        page_id,
        status: 0,
      },
      data: {
        status: 1,
      },
    })

    return customResponse(0, '删除成功', 'success')
  }

  async getPageDetail(page_id: string) {
    const detail = await this.prisma.pages.findUnique({
      where: {
        project: {
          user_id: this.store.get('user_id'),
        },
        page_id,
        status: 0,
      },
      select: this.selectData,
    })

    return customResponse(0, '获取成功', 'success', detail)
  }
}
