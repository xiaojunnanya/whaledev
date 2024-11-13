import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './api/auth/auth.module'
import { PrismaModule } from './db/mysql/prisma.module'
import { RedisModule } from './db/redis/redis.module'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './interceptor/response.interceptor'
import { RequestInterceptor } from './interceptor/request.interceptor'
import { RouterMiddleware } from './middleware/router.middleware'

@Module({
  imports: [AuthModule, PrismaModule, RedisModule],
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
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RouterMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }) // 对所有路由生效
  }
}
