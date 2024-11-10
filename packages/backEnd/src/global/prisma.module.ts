import { Module, Global } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Global()
@Module({
  providers: [
    {
      provide: 'PrismaService',
      useFactory: () => {
        return new PrismaClient()
      },
    },
  ],
  exports: ['PrismaService'],
})
export class PrismaModule {}
