import { PrismaService } from '@/global/prisma/prisma.service'
import { StoreService } from '@/global/store/store.service'
import { Injectable } from '@nestjs/common'
import { createPageDto, updatePageDto } from './dto/pages.dto'
import { v4 as uuidv4 } from 'uuid'
import { ReturnResult } from '@/common/returnResult'

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

    return ReturnResult.success('创建成功')
  }

  async getPageList(project_id: string) {
    const list = await this.prisma.pages.findMany({
      where: {
        project_id: {
          in: await this.prisma.project
            .findMany({
              where: {
                user_id: this.store.get('user_id'),
                project_id,
                status: 0,
              },
              select: {
                project_id: true,
              },
            })
            .then(projects => projects.map(project => project.project_id)),
        },
        status: 0,
      },
      select: this.selectData,
    })

    return ReturnResult.success('获取成功', list)
  }

  async updatePage(data: updatePageDto) {
    const { page_id, page_name } = data
    await this.prisma.pages.update({
      where: {
        status: 0,
        page_id,
        project_id: {
          in: await this.prisma.project
            .findMany({
              where: {
                user_id: this.store.get('user_id'),
                status: 0,
              },
              select: {
                project_id: true,
              },
            })
            .then(projects => projects.map(project => project.project_id)),
        },
      },
      data: {
        page_name,
      },
    })

    return ReturnResult.success('更新成功')
  }

  async deletePage(page_id: string) {
    await this.prisma.pages.update({
      where: {
        page_id,
        status: 0,
        project_id: {
          in: await this.prisma.project
            .findMany({
              where: {
                user_id: this.store.get('user_id'),
                status: 0,
              },
              select: {
                project_id: true,
              },
            })
            .then(projects => projects.map(project => project.project_id)),
        },
      },
      data: {
        status: 1,
      },
    })

    return ReturnResult.success('删除成功')
  }

  async getPageDetail(project_id: string, page_id: string) {
    const detail = await this.prisma.pages.findUnique({
      where: {
        project_id: {
          in: await this.prisma.project
            .findMany({
              where: {
                user_id: this.store.get('user_id'),
                project_id,
                status: 0,
              },
              select: {
                project_id: true,
              },
            })
            .then(projects => projects.map(project => project.project_id)),
        },
        page_id,
        status: 0,
      },
      select: this.selectData,
    })

    return ReturnResult.success('获取成功', detail)
  }
}
