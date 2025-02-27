import { ReturnResult } from '@/common/returnResult'
import { PrismaService } from '@/global/prisma/prisma.service'
import { StoreService } from '@/global/store/store.service'
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

    return ReturnResult.success('ok', res)
  }
}
