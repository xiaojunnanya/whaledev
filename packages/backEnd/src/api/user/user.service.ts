import { PrismaService } from '@/global/mysql/prisma.service'
import { StoreService } from '@/global/store/store.service'
import { customResponse } from '@/interceptor/response.interceptor'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(
    @Inject(PrismaService) private readonly prisma: PrismaService,
    @Inject(StoreService) private readonly store: StoreService,
  ) {}

  async getUserInfo() {
    const res = await this.prisma.user.findUnique({
      where: {
        user_id: this.store.get('user_id'),
      },
      select: {
        user_id: true,
        username: true,
        avatar: true,
        status: true,
      },
    })

    return customResponse(0, 'ok', 'success', res)
  }
}
