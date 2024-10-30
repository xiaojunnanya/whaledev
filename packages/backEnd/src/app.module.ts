import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './api/auth/auth.module'
import { PrismaModule } from '@/global/prisma.module'
import { RedisModule } from '@/global/redis.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './interceptor/response.interceptor'
import { RequestInterceptor } from './interceptor/request.interceptor'

@Module({
  imports: [PrismaModule, RedisModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor, // 响应拦截器
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor, // 请求拦截器
    },
  ],
})
export class AppModule {}
