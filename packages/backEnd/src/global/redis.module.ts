import { Module, Global } from '@nestjs/common'
import Redis from 'ioredis'

@Global()
@Module({
  providers: [
    {
      provide: 'RedisService',
      useFactory: () => {
        return new Redis({
          host: 'localhost',
          port: 6379,
        })
      },
    },
  ],
  exports: ['RedisService'],
})
export class RedisModule {}
