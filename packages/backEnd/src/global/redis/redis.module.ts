import { Module, Global } from '@nestjs/common'
import Redis from 'ioredis'
import { RedisService } from './redis.service'
import { RedisComment } from './redis.comment'
import { ConfigService } from '@nestjs/config'

@Global()
@Module({
  providers: [
    {
      provide: 'RedisClientConnect',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST')
        const port = configService.get<number>('REDIS_PORT')
        const password = configService.get<string>('REDIS_PASSWORD')

        return new Redis({
          host,
          port,
          password,
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
    RedisService,
    RedisComment,
  ],
  exports: ['RedisClientConnect', RedisService, RedisComment],
})
export class RedisModule {}
