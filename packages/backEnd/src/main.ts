import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common'
import { LogInterceptor } from './aop/log.interceptor'
import AllExceptionsFilter from './expection/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 捕获class-validator抛出的异常，重新抛出HttpException，在AllExceptionsFilter中捕获
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors = []) => {
        const formattedErrors = validationErrors.reduce((acc, error: any) => {
          acc[error.property] = Object.values(error.constraints)
          return acc
        }, {} as Record<string, string[]>)

        return new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST, // 400
            error: formattedErrors,
          },
          HttpStatus.BAD_REQUEST,
        )
      },
    }),
  )

  // 捕获所有的错误
  app.useGlobalFilters(new AllExceptionsFilter())

  // 全局绑定日志拦截器，打印请求日志
  app.useGlobalInterceptors(new LogInterceptor())

  await app.listen(3001)
  Logger.log('开始使用nest，端口号3001')
}
bootstrap()
