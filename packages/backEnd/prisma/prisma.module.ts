import { Module, Global } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Global()
@Module({
  providers: [
    {
      provide: 'PrismaService',
      useFactory: () => {
        const prisma = new PrismaClient()
        return prisma
      },
    },
  ],
  exports: ['PrismaService'],
})
export class PrismaModule {}
