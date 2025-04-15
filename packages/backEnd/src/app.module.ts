import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ResponseInterceptor } from './interceptor/response.interceptor'
import { RequestInterceptor } from './interceptor/request.interceptor'
import { RouterMiddleware } from './middleware/router.middleware'
import { LoginGuard } from './guards/auth.guard'
import { PrismaModule } from './global/prisma/prisma.module'
import { RedisModule } from './global/redis/redis.module'
import { StoreModule } from './global/store/store.module'
import { LoggerModule } from './global/logger/logger.module'
import { AxiosModule } from './global/axios/axios.module'
import { ConfigModule } from '@nestjs/config'
// whaledev_api
import { AuthModule } from './api/whaledev_api/auth/auth.module'
import { UserModule } from './api/whaledev_api/user/user.module'
import { PagesModule } from './api/whaledev_api/pages/pages.module'
import { PageJsonModule } from './api/whaledev_api/page_json/page_json.module'
import { StaticonfigModule } from './api/whaledev_api/staticonfig/staticonfig.module'
import { ProjectModule } from './api/whaledev_api/project/project.module'
import { AiModule } from './api/whaledev_api/ai/ai.module'
// monitor_api
import { MenuModule } from './api/monitor_api/menu/menu.module'

@Module({
  imports: [
    // module
    LoggerModule,
    PrismaModule,
    RedisModule,
    StoreModule,
    AxiosModule,
    // whaledev_api
    AuthModule,
    StaticonfigModule,
    ProjectModule,
    UserModule,
    PagesModule,
    PageJsonModule,
    // monitor_api
    MenuModule,
    // ----
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'production'}`,
    }),
    AiModule,
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
    consumer.apply(RouterMiddleware).forRoutes('*') // 对所有路由生效
  }
}
