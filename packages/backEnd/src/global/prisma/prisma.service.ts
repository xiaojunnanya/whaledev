import { prismaErrorMiddleware } from '@/middleware/prisma.middleware'
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super() // 调用父类构造函数，初始化 PrismaClient
    this.$use(prismaErrorMiddleware()) // 在构造函数中注册 Prisma 中间件
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
