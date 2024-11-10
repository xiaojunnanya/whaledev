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
          retryStrategy(times) {
            const maxRetries = 5 // 最大重连次数
            if (times >= maxRetries) {
              return null // 达到最大重连次数后停止重连
            }
            return Math.min(times * 1000, 3000)
          },
        })
      },
    },
  ],
  exports: ['RedisService'],
})
export class RedisModule {}
