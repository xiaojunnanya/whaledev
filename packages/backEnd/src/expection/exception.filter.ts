import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common'
import { Response } from 'express'
import { formatDate } from '@/utils'
import { responseType } from '@/type'
import { ErrorException } from '@/config'

// 捕获异常
@Catch()
export default class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const res = ctx.getResponse<Response>()
    let message = ''

    const response: {
      message: any
      type: string
    } = exception.getResponse() as any

    // console.error(response, 'exception')

    if (
      exception.name === 'BadRequestException' &&
      response?.type === 'ValidatorError'
    ) {
      // 处理 class-validator 异常
      message = response?.message || ErrorException.ValidatorError
    } else if (
      exception.name === 'HttpException' &&
      response?.type === 'PrismaError'
    ) {
      // 处理处理数据库异常
      message = response?.message || ErrorException.PrismaError
    } else {
      message = exception.message || ErrorException.ServerError
    }

    const code =
      exception instanceof HttpException ? exception.getStatus() : 500

    const errorResponse: responseType = {
      code: code,
      timestamp: formatDate(),
      data: {
        data: null,
        message,
        msgType: 'error',
      },
      type: 'system',
    }

    res.status(code).json(errorResponse)
  }
}
