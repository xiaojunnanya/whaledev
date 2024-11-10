import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import AllExceptionsFilter from './expection/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // class-validator异常
  app.useGlobalPipes(new ValidationPipe())

  // 捕获所有的错误
  app.useGlobalFilters(new AllExceptionsFilter())

  app.setGlobalPrefix('/whaledev/v1')

  await app.listen(3173)
  Logger.log('开始使用nest，端口号3173')
}
bootstrap()
