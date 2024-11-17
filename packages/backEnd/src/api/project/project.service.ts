import { Injectable } from '@nestjs/common'
import { createProjectDto } from './dto/project.dto'
import { v4 as uuidv4 } from 'uuid'
import { customResponse } from '@/interceptor/response.interceptor'
import { PrismaService } from '@/global/mysql/prisma.service'
import { StoreService } from '@/global/store/store.service'

@Injectable()
export class ProjectService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly store: StoreService,
  ) {}

  async createProject(data: createProjectDto) {
    // const user_id = this.store.getUserId()
    // console.log(user_id, 'user_id')
    // await this.prisma.project.create({
    //   data: {
    //     user_id: this.asyncStore.get('user_id'),
    //     project_id: uuidv4(),
    //     project_name: data.project_name,
    //     project_desc: data.project_desc,
    //     project_type: data.project_type,
    //     project_state: data.project_state,
    //   },
    // })

    return customResponse(0, '创建成功', 'success')
  }

  async getProjectList() {
    const projectList = await this.prisma.project.findMany({
      where: {
        user_id: '1',
      },
    })
    console.log('projectList', projectList)
    return customResponse(0, '获取成功', 'success', projectList)
  }
}
