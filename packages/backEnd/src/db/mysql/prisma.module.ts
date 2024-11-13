import { Module, Global } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { PrismaService } from './prisma.service'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
