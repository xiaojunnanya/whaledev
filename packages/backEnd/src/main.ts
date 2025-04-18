import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'
import AllExceptionsFilter from './expection/exception.filter'
import { NestExpressApplication } from '@nestjs/platform-express'
import { CustomValidationPipe } from './validator/index.validator'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // class-validator异常
  app.useGlobalPipes(CustomValidationPipe)

  // 捕获所有的错误
  app.useGlobalFilters(new AllExceptionsFilter())

  // 添加全局路由前缀
  app.setGlobalPrefix('/whaledev', {
    exclude: ['/', '/whaledev/*'],
  })

  // 静态资源的展示
  app.useStaticAssets(join(__dirname, './assets/images'), {
    prefix: '/whaledev',
  })

  await app.listen(3173)
  Logger.log('开始使用nest，端口号3173')
}
bootstrap()
