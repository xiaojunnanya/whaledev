import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  // 查
  async findUserByEmail(email: string) {
    return await this.user.findUnique({
      where: {
        email,
      },
    })
  }

  // 增

  // 删

  // 改
}
