import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './api/auth/auth.module'
import { PrismaModule } from './db/mysql/prisma.module'
import { RedisModule } from './db/redis/redis.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './interceptor/response.interceptor'
import { RequestInterceptor } from './interceptor/request.interceptor'
import { RouterMiddleware } from './middleware/router.middleware'
import { StaticonfigModule } from './api/staticonfig/staticonfig.module'
import { ProjectModule } from './api/project/project.module'
import { LoginGuard } from './guards/auth.guard'
@Module({
  imports: [
    AuthModule,
    PrismaModule,
    RedisModule,
    StaticonfigModule,
    ProjectModule,
  ],
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
    {
      provide: APP_GUARD,
      useClass: LoginGuard,
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
