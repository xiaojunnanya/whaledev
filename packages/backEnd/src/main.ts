import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import AllExceptionsFilter from './expection/exception.filter'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // class-validator异常
  app.useGlobalPipes(new ValidationPipe())

  // 捕获所有的错误
  app.useGlobalFilters(new AllExceptionsFilter())

  // 添加全局路由前缀
  app.setGlobalPrefix('/whaledev/v1', {
    exclude: ['/', '/img/*'],
  })

  // 静态资源的展示
  app.useStaticAssets('src/assets/images', { prefix: '/img' })

  await app.listen(3173)
  Logger.log('开始使用nest，端口号3173')
}
bootstrap()
